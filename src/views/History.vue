// src/views/Home.vue

<template>
  <div>
    <h1>{{ username }}</h1>
    <div>
      <table id="firstTable">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Email</th>
            <th>Product</th>
            <th>Order placed</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(order, index) in orderHistory" v-bind:key="index">
            <td>{{ order.orderId }}</td>
            <td>{{ order.userEmail }}</td>
            <td>{{ order.product }}</td>
            <td>{{ order.orderPlaced }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AuthService from "@/services/AuthService.js";

export default {
  data() {
    return {
      orderHistory: "",
      username: "",
    };
  },

  methods: {
    async history() {
      const responseHistory = await AuthService.history(window.emailAdress);
      console.log(responseHistory);

      this.orderHistory = responseHistory;
    },
  },

  async created() {
    if (!this.$store.getters.isLoggedIn) {
      this.$router.push("/login");
    }
    this.history();

    this.username = this.$store.getters.getUser.email;

    this.secretMessage = await AuthService.getSecretContent();
  },
};
</script>

<style scoped>
table {
  font-family: "Open Sans", sans-serif;
  width: 750px;
  border-collapse: collapse;
  border: 3px solid #44475c;
  margin: 20px 10px;
}

table th {
  text-transform: uppercase;
  text-align: left;
  background: #44475c;
  color: #fff;
  padding: 8px;
  min-width: 30px;
}

table td {
  text-align: left;
  padding: 8px;
  border-right: 2px solid #7d82a8;
}
table td:last-child {
  border-right: none;
}
table tbody tr:nth-child(2n) td {
  background: #d4d8f9;
}
</style>
