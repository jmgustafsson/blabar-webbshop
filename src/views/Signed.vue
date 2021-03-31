// src/views/Home.vue

<template>
  <div>
    <h1>Hi {{ email }}</h1>
    <p>{{ secretMessage }}</p>
    <input type="button" value="Logout" @click="logout" />
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      secretMessage: "",
      email: "",
    };
  },
  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }

    this.email = this.$store.getters.getUser.email;

    this.secretMessage = await AuthService.getSecretContent();
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
  },
};
</script>