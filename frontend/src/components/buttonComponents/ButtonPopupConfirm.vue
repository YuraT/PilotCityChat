<template>
  <div>
    <v-btn large :class="buttonClass" @click="isClicked = true">
      <span>{{ buttonText }}</span>
      <v-icon right>mdi-exit-to-app</v-icon>
    </v-btn>

    <v-dialog max-width="600px" v-model="isClicked">
      <v-card>
        <v-card-title class="headline">{{ popupOptions.title }}</v-card-title>

        <v-card-text>
          <!-- todo leave chat -->
          <v-btn @click="$emit('confirm')" :class="popupOptions.buttonClass">
            {{ popupOptions.buttonText }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "ButtonPopupConfirm",
  props: {
    buttonClass: String,
    buttonText: String,
    icon: String,
    popupOptions: {
      type: Object,
      validator: (options) =>
        options.title.constructor === String &&
        options.buttonClass.constructor === String &&
        options.buttonText.constructor === String,
    },
  },
  data() {
    return {
      isClicked: false,
    };
  },
};
</script>
