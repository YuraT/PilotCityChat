<template>
  <div class="chat" v-scroll:#chatWindow="$vuetify.goTo(9999, { duration: 0 })">
    <Header :room="currentRoom || {}" />
    <Sidebar v-model="currentRoom" :rooms="rooms" :currentUser="currentUser" />
    <!-- @toggleDrawer="drawer != drawer" -->

    <!-- Chat window -->
    <!-- Idea: render the most recent 10 messages,
    wrap the rest inside a v-lazy component so they don't 
    need to load immediately?-->
    <v-main>
      <v-container class="secondary pl-3 pr-6 mb-n8" id="chatWindow" fluid>
        <Message
          v-for="(message, index) in currentMessages || []"
          :key="message._id.toHexString()"
          :is-owned="message.user == currentUser._id"
          :content="message.text"
          :name="userOfId(message.user).username"
          :timestamp="formatTime(message._id.getTimestamp())"
          :group-with-prev-msg="
            sameSenderAndTime(message, currentMessages[index - 1])
          "
        />
      </v-container>
    </v-main>

    <!-- Send Message bar -->
    <v-footer app inset class="secondary pa-3">
      <v-textarea
        append-outer-icon="mdi-send"
        auto-grow
        autofocus
        background-color="accent"
        clearable
        :color="this.colors.green"
        dark
        dense
        flat
        hide-details="auto"
        id="textArea"
        outlined
        placeholder="Type a message..."
        rows="0"
        v-model="newMessage"
        @click:append-outer="sendMessage"
        @keydown.enter.exact.prevent="sendMessage"
      ></v-textarea>
    </v-footer>

    <!-- Extra properties, maybe implement later -->
    <!-- :rules="[rules.required]" -->

    <!-- Leftover from the template: add contact popup dialog
      <v-dialog v-model="dialog" width="800px">
      <v-card>
        <v-card-title class="grey darken-2">Create contact</v-card-title>
        <v-container>
          <v-row class="mx-2">
            <v-col class="align-center justify-space-between" cols="12">
              <v-row align="center" class="mr-0">
                <v-avatar size="40px" class="mx-3">
                  <img src="//ssl.gstatic.com/s2/oz/images/sge/grey_silhouette.png" alt />
                </v-avatar>
                <v-text-field placeholder="Name"></v-text-field>
              </v-row>
            </v-col>
            <v-col cols="6">
              <v-text-field prepend-icon="mdi-account-card-details-outline" placeholder="Company"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field placeholder="Job title"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-mail" placeholder="Email"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field type="tel" prepend-icon="mdi-phone" placeholder="(000) 000 - 0000"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field prepend-icon="mdi-text" placeholder="Notes"></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-btn text color="primary">More</v-btn>
          <v-spacer></v-spacer>
          <v-btn text color="primary" @click="dialog = false">Cancel</v-btn>
          <v-btn text @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>-->
  </div>
</template>

<script>
import Vue from "vue";
import * as services from "@/services";
import moment from "moment";

import Message from "@/components/Message";
import Sidebar from "@/components/Sidebar";
import Header from "../components/Header";

export default Vue.extend({
  name: "Chat",
  components: {
    Message,
    Sidebar,
    Header,
  },
  data: () => {
    return {
      // drawer: true
      // formattedTimes: [],
      newMessage: null,
      colors: {
        green: "#6eba7f",
      },
      // Possible field validation for empty text area
      // windowHeight: null,
      // rules: {
      //   required: v => !!v || "This field is required"
      // }
    };
  },
  computed: {
    currentUser() {
      return services.app.currentUser;
    },
    currentRoom() {
      return this.$store.state.currentRoom;
    },
    currentMessages() {
      return this.$store.state.currentRoom?.messages;
    },
    users() {
      return this.$store.state.users;
    },
    rooms() {
      return this.$store.state.rooms;
    },
  },

  methods: {
    sendMessage() {
      services.Messages.sendMessage(this.currentRoom._id, this.newMessage);
      this.newMessage = "";
    },
    userOfId(id) {
      return this.users.find((user) => user.userId == id);
    },
    formatTime(time) {
      let formattedTime = moment(time).calendar();
      // this.formattedTimes.push(formattedTime);
      // console.log("formattedTimes: ", this.formattedTimes);
      return formattedTime;
    },
    sameSenderAndTime(msg, prevMsg) {
      if (prevMsg) {
        let msgTime = moment(msg._id.getTimestamp()).calendar();
        let prevMsgTime = moment(prevMsg._id.getTimestamp()).calendar();
        return msg.user == prevMsg.user && msgTime == prevMsgTime;
      } else return false;
    },
    handleRoomUpdate(change) {
      const { documentKey, updateDescription } = change;
      const { updatedFields } = updateDescription;
      const room = this.$store.state.rooms.find(room => room._id.equals(documentKey._id));

      if (room) {
        for (const field in updatedFields) {
          // fields[0] instead of just field because field === something like "messages.6" for an array
          let fields = field.split(".");

          switch (fields[0]) {
            case "messages": {
              let index = fields[1];
              // if message at updated index doesnt exist, push it
              if (!room.messages[index]) {
                this.$store.dispatch("pushMessage", {
                  roomId: documentKey._id,
                  message: updatedFields[field],
                })
              } else {
                // might use this for editing messages
              }
            }
          }
        }
      } else { // if room doesnt exist in store (hasnt been loaded), just display a notificaion
      // TODO: add notifications here later
      }
    },
    async watchRooms() {
      console.log("watching rooms");
      await services.Rooms.watchRooms((change) => {
        const { operationType } = change;
        switch (operationType) {
          case "update": {
            this.handleRoomUpdate(change);
          } 
        }
      });
    },
  },
  async created() {
    // this.windowHeight = document.getElementById("chatWindow").clientHeight;
    if (!this.$store.state.currentRoom) {
      await this.$store.dispatch("fetchRooms");
      await this.$store.dispatch("fetchUsers");
      if (this.$store.state.rooms[0]) {
        // if it exists, set currentRoom to the first room on load
        await this.$store.dispatch("setCurrentRoom", this.$store.state.rooms[0]._id);
      }

      this.watchRooms();
    }
  },
});
</script>

<style>
/*  */
/* .chat {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
} */
/* Ideally would like to change the color of 
the text cursor, as it is hard to see
when hovering over the text area. */
/* .chat #textArea {
  cursor: pointer;
} */
/* .messages {
  overflow: auto;
}
.messages::-webkit-scrollbar {
  width: 3px;
}
.messages::-webkit-scrollbar-track {
  background: #ddd;
}
.messages::-webkit-scrollbar-thumb {
  background: #aaa;
} */
</style>
