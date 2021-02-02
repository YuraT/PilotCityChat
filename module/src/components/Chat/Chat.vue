<template>
  <!-- prettier-ignore -->
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
  </div>
</template>

<script lang="ts">
/* eslint-disable no-unreachable */
/* eslint-disable no-undef */
import { defineComponent, PropType } from "@vue/composition-api";
// import * as services from "@/services";
import moment from "moment";
import * as Realm from "realm-web";

import { StoreMeta } from "@/@types";

import Message from "./components/Message.vue";
import Sidebar from "./components/Sidebar.vue";
import Header from "./components/Header.vue";

type MongoDocument = globalThis.Realm.Services.MongoDB.Document;
type MongoCollection = globalThis.Realm.Services.MongoDB.MongoDBCollection<MongoDocument>;


export default defineComponent({
  name: "PilotCityChat",
  props: {
    currentUser: {
      type: Object as PropType<Realm.User>,
      required: true,
    },
    userInterface: {
      type: Object as PropType<StoreMeta.UserStruct>,
    },
    collectionUser: {
      type: Object as PropType<MongoCollection>,
      required: true,
    },
    collectionRoom: {
      type: Object as PropType<MongoCollection>,
      required: true,
    },
  },
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
    // currentUser() {
    //   return {};
    //   return services.app.currentUser;
    // },
    currentRoom() {
      return {};
      return this.$store.state.currentRoom;
    },
    currentMessages() {
      return [];
      return this.$store.state.currentRoom?.messages;
    },
    users() {
      return [];
      return this.$store.state.users;
    },
    rooms() {
      return [];
      return this.$store.state.rooms;
    },
  },

  methods: {
    sendMessage() {
      console.log(
        "services.Messages.sendMessage(this.currentRoom._id, this.newMessage);"
      );
      // services.Messages.sendMessage(this.currentRoom._id, this.newMessage);
      this.newMessage = "";
    },
    userOfId(id) {
      return this.users.find(user => user.userId == id);
    },
    formatTime(time) {
      const formattedTime = moment(time).calendar();
      // this.formattedTimes.push(formattedTime);
      // console.log("formattedTimes: ", this.formattedTimes);
      return formattedTime;
    },
    sameSenderAndTime(msg, prevMsg) {
      if (prevMsg) {
        const msgTime = moment(msg._id.getTimestamp()).calendar();
        const prevMsgTime = moment(prevMsg._id.getTimestamp()).calendar();
        return msg.user == prevMsg.user && msgTime == prevMsgTime;
      } else return false;
    },
    handleRoomUpdate(change) {
      console.log("handleRoomUpdate(change)");
      return;
      const { documentKey, updateDescription } = change;
      const { updatedFields } = updateDescription;
      const room = this.$store.state.rooms.find(room =>
        room._id.equals(documentKey._id)
      );

      if (room) {
        for (const field in updatedFields) {
          // fields[0] instead of just field because field === something like "messages.6" for an array
          const fields = field.split(".");

          switch (fields[0]) {
            case "messages": {
              const index = fields[1];
              // if message at updated index doesnt exist, push it
              if (!room.messages[index]) {
                this.$store.dispatch("pushMessage", {
                  roomId: documentKey._id,
                  message: updatedFields[field],
                });
              } else {
                // might use this for editing messages
              }
            }
          }
        }
      } else {
        // if room doesnt exist in store (hasnt been loaded), just display a notificaion
        // TODO: add notifications here later
      }
    },
    async watchRooms() {
      console.log("watching rooms");
      return;
      await services.Rooms.watchRooms(change => {
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
    // import { store } from "@/store/store";

    // if (!this.$store.state.currentRoom) {
    //   await this.$store.dispatch("fetchRooms");
    //   await this.$store.dispatch("fetchUsers");
    //   if (this.$store.state.rooms[0]) {
    //     // if it exists, set currentRoom to the first room on load
    //     await this.$store.dispatch(
    //       "setCurrentRoom",
    //       this.$store.state.rooms[0]._id
    //     );
    //   }

    //   this.watchRooms();
    // }
    console.log("found rooms ", await this.$props.collectionRoom.find({}));
    console.log("this.currentUser", this.currentUser);
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
