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
      <h1 class="text-decoration-underline big-letters white--text">
        Settings
      </h1>
    </v-row>
    <!--General Settings Information-->
    <v-row align="center" justify="center">
      <v-container class="white-border">
        <v-card class="pa-6 accent" width="100%" outlined>
          <v-row>
            <p class="setting-subheader ml-3">Username</p>
            <v-col cols="14">
              <!-- if you want more values from 1 v model pass an array from child -->
              <EditUsername
                @input="updateUser"
                v-model="username"
                :title="`Username`"
              />
            </v-col>
          </v-row>
          <p class="setting-information">{{ username }}</p>

          <v-row>
            <p class="setting-subheader ml-3">Email</p>
            <v-col cols="14">
              <EditUsername
                @input="updateUser"
                v-model="email"
                :title="`Email`"
              />
            </v-col>
          </v-row>
          <p class="setting-information">{{ email }}</p>

          <div class="my-2">
            <p class="setting-subheader">Password</p>
            <!-- #todo -->
            <ResetPasswordPopup :email="email" />
          </div>

          <div class="my-2">
            <p class="setting-subheader">Log Out</p>
            <ButtonPopupConfirm
              buttonClass="font-family-Raleway red accent-2 white--text"
              buttonText="Log Out"
              icon="mdi-exit-to-app"
              :popupOptions="{
                title: 'Are you sure you want to log out?',
                buttonClass: 'font-family-Raleway red accent-2 white--text',
                buttonText: 'Log Out',
              }"
              @confirm="logOut"
            />
          </div>
        </v-card>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import * as services from "@/services";
import Popup from "@/components/generalSettingsComponents/ButtonPopup";
import ButtonPopupConfirm from "@/components/buttonComponents/ButtonPopupConfirm";
import PopupEditData from "@/components/generalSettingsComponents/PopupEditData";
export default {
  name: "SettingsContent",
  data() {
    return {
      user: {
        myPfp: "@/assets/pfp.png",
      },
    };
  },
  computed: {
    email() {
      return services.app.currentUser?.profile?.email;
    },
    username() {
      return services.app.currentUser?.customData?.username;
    },
  },
  methods: {
    getImgUrl() {
      /*this method doesn't work, trying to make show picture dynamically
            console.log("picture required by code")
            return require("@/assets/pfp.png")
*/
    },
    updateUser() {
      services.Users.updateUserDocument({
        username: this.username,
        // email: this.email // does not work for now, going to have to do this through realm
      });
    },
    emitData(data) {
      console.log("clicked me");
      this.$emit("input", data);
    },
    async logOut() {
      await services.Auth.logOut();
      this.$router.push("/");
    },
  },

  components: {
    ResetPasswordPopup: Popup,
    EditUsername: PopupEditData,
    ButtonPopupConfirm: ButtonPopupConfirm,
  },
};
</script>

<style>
.big-letters {
  font-size: 3.5em;
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
