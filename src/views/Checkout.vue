<template>
  <div class="center-screen">
    <h1 class="header">Kassan</h1>
    <section>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} {{ product.price }}:- {{ product.quantity }}st
        </li>
      </ul>
      <p class="totalsum">Summa: {{ total }}:-</p>
      <div>
        <button style="margin-bottom: 10px" class="checkout-button">
          Rensa
        </button>
      </div>
      <button @click="$store.dispatch('checkout')" class="checkout-button">
        Beställ
      </button>
      <p v-if="$store.state.checkoutStatus">
        {{ $store.state.checkoutStatus }}
      </p>
    </section>
  </div>
</template>

<script>
export default {
  name: "Checkout",
  computed: {
    products() {
      return this.$store.getters.cartProducts;
    },

    total() {
      return this.$store.getters.cartTotal;
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
  font-weight: normal;
  margin: 0;
  padding: 0;
}

.center-screen {
  text-align: center;
}

.header {
  margin-top: 20px;
  text-align: center;
  font-size: 50px;
}

.totalsum {
  text-align: center;
  margin: 20px 0;
}

ul {
  list-style: none;
  padding: 0;

  li {
    margin: 5px 0;
  }
}

.checkout-button {
  background: rgb(10, 113, 148);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 2.5rem;
  width: 10rem;
}
</style>