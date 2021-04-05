<template>
  <div class="Signup">
    <h1>Registrera</h1>
    <div class="textbox">
      <input type="text" placeholder="Användarnamn" v-model="username" />
    </div>
    <div class="textbox">
      <input type="password" placeholder="Lösenord" v-model="password" />
    </div>
    <div class="textbox">
      <input
        type="password"
        placeholder="Upprepa lösenord"
        v-model="password_repeat"
      />
    </div>

    <input class="btn" type="button" @click="signUp" value="Registrera" />
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
      password_repeat: "",
      msg: "",
    };
  },

  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat,
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;

        this.$router.push("/login");
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
.Signup {
  margin: auto;
  width: 280px;
}
.Signup h1 {
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
