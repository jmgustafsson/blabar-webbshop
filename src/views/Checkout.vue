<template>
  <div>
    <h1 class="header">Kassan</h1>
    <section>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.name }} {{ product.price }}:- {{ product.quantity }}st
          <button @click="removeProduct(product)" class="remove-product-button">
            X
          </button>
        </li>
      </ul>
      <p class="totalsum">Summa: {{ total }}:-</p>
      <button @click="$store.dispatch('order')" class="order-button">
        Beställ
      </button>
      <p v-if="$store.state.checkoutStatus">
        {{ $store.state.checkoutStatus }}
      </p>
      <div>
        <button @click="clearCart" class="clear-button">Rensa Korg</button>
      </div>
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

  methods: {
    removeProduct(product) {
      this.$store.dispatch("deleteProductFromCart", product);
    },

    clearCart(product) {
      this.$store.dispatch("deleteAllProductsFromCart", product);
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
  font-size: 20px;
}

section {
  margin: auto;
  width: 300px;
  text-align: center;
}

.header {
  margin-top: 20px;
  text-align: center;
  font-size: 50px;
}

.totalsum {
  margin: 20px 0;
}

ul {
  list-style: none;
  padding: 0;

  li {
    margin: 20px 0;
    text-align: start;
  }
}

.remove-product-button {
  background: rgb(10, 113, 148);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 1.5rem;
  width: 1.5rem;
  float: right;
}

.order-button {
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

.clear-button {
  background: rgb(10, 113, 148);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  height: 2.5rem;
  width: 8rem;
  margin-top: 20px;
}
</style>