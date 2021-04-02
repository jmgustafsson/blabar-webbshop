// src/views/Login.vue

<template>
  <div class="login">
    <h1>Logga in</h1>
    <div class="textbox">
      <input type="text" placeholder="Användarnamn" v-model="username" />
    </div>
    <div class="textbox">
      <input type="password" placeholder="Lösenord" v-model="password" />
    </div>

    <input class="btn" type="button" @click="login" value="Logga in" />
    <p>Saknar du ett konto? Registrera dig här</p>
    <router-link to="/signup">
      <button class="btn">Registrera</button></router-link
    >

    <p v-if="msg">{{ msg }}</p>
  </div>
</template>
<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      username: "",
      password: "",
      msg: "",
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
        };

        window.emailAdress = this.username;

        const response = await AuthService.login(credentials);
        this.msg = response.msg;

        const token = response.token;
        const user = response.user;

        this.$store.dispatch("login", { token, user });

        this.$router.push("/");
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0;
  padding: 0;
  background: white;
  color: black;
}
.login {
  margin: auto;
  width: 280px;
}
.login h1 {
  float: center;
  font-size: 40px;
  border-bottom: 6px solid rgb(10, 113, 148);
  margin-top: 50px;
  padding: 13px 0;
}
.textbox {
  width: 100%;
  overflow: hidden;
  font-size: 20px;
  padding: 8px 0;
  margin: 8px 0;
  border-bottom: 1px solid rgb(10, 113, 148);
}
.textbox input {
  border: none;
  outline: none;
  background: none;
  color: black;
  font-size: 18px;
  width: 100%;
  float: left;
  margin: 10px;
}
.btn {
  width: 100%;
  background: none;
  border: 2px solid rgb(10, 113, 148);
  color: black;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
}
.logout {
  width: 100%;
  background: none;
  border: 2px solid rgb(10, 113, 148);
  color: black;
  padding: 5px;
  font-size: 18px;
  cursor: pointer;
  margin: 12px 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

a {
  color: inherit;
}
</style>
