<template>
  <v-container class="my-5">
    <!--Profile Picture-->
    <v-row align="center" justify="center">
      <v-img
        class="mr-2"
        contain
        src="@/assets/pfp.png"
        transition="scale-transition"
        max-width="300"
      />
    </v-row>
    <!--Settings-->
    <v-row align="center" justify="center">
      <h1
        justify-center
        class="text-decoration-underline big-letters white--text"
      >
        Room Settings
      </h1>
    </v-row>
    <!--General Settings Information-->
    <v-row align="center" justify="center">
      <v-container class="white-border">
        <v-card class="pa-6 accent" width="100%" outlined>
          <v-row>
            <p class="setting-subheader ml-3">Room Name</p>
            <v-col cols="14">
              <!-- if you want more values from 1 v model pass an array from child -->
              <EditData v-model="room.name" :title="`Room Name`" />
            </v-col>
          </v-row>
          <p class="setting-information">{{ room.name }}</p>
          <v-row>
            <p class="setting-subheader ml-3">Members</p>
            <v-col cols="14">
              <MemberList
                @updatedMemberData="room.members = $emit"
                :memberData="room.members"
                :title="'Members'"
              />
            </v-col>
          </v-row>
          <p class="setting-subheader">Leave</p>
          <!-- #todo -->
          <ButtonPopupConfirm
              buttonClass="font-family-Raleway red accent-2 white--text"
              buttonText="Leave Room"
              icon="mdi-exit-to-app"
              :popupOptions="{
                title: 'Are you sure you want to leave this room?',
                buttonClass: 'font-family-Raleway red accent-2 white--text',
                buttonText: 'Leave Room',
              }"
              @confirm="leaveRoom"
            />
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import PopupEditData from "@/components/generalSettingsComponents/PopupEditData";
import ButtonPopupConfirm from "@/components/buttonComponents/ButtonPopupConfirm";
import MemberList from "@/components/meetingSettingsComponents/MemberList";
// import * as services from "@/services";

export default {
  name: "SettingsContent",
  data() {
    return {
      room: {
        name: "Coding Interns",
        members: [
          {
            name: "Baby",
            lastName: "Joe",
            id: "123",
            pfp: "@/assets/pfp.png",
            isMember: true,
          },
          {
            name: "Joe",
            lastName: "Mama",
            id: "345",
            pfp: "@/assets/pfp.png",
            isMember: false,
          },
          {
            name: "Joe",
            lastName: "Papa",
            id: "567",
            pfp: "@/assets/pfp.png",
            isMember: true,
          },
          {
            name: "Joe",
            lastName: "Guy",
            id: "432",
            pfp: "@/assets/pfp.png",
            isMember: true,
          },
          {
            name: "Joe",
            lastName: "Grandma",
            id: "332",
            pfp: "@/assets/pfp.png",
            isMember: false,
          },
        ],
        // currentUser: this.room.members[0],
      },
    };
  },
  methods: {
    async leaveRoom() {
      // TODO
      console.log("leaving room");
    },
  },

  components: {
    EditData: PopupEditData,
    ButtonPopupConfirm,
    MemberList,
  },
};
</script>

<style>
.big-letters {
  font-size: 3.4em;
  max-width: font;
}

.setting-subheader {
  text-decoration: underline;
  color: white;
  font-size: 2em;
}

.setting-information {
  color: white;
  font-size: 1.5em;
}

.white-border {
  border-style: solid;
  border-color: white;
  border-radius: 10px;
}

.font-Raleway {
  font-family: Raleway;
}
</style>
