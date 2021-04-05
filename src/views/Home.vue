<template>
  <div>
    <h1 class="header">Produkter</h1>
    <section class="products">
      <div v-for="product in products" :key="product.id" class="product">
        <h3 class="product-header">{{ product.product_name }}</h3>
        <img
          src="https://fakeimg.pl/150x150"
          :alt="product.name"
          class="product-image"
        />
        <p class="product-price">{{ product.product_price }}:-</p>
        <button @click="addProductToCart(product)" class="buy-button">
          Köp
        </button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "Home",

  computed: {
    products() {
      return this.$store.getters.availableProducts;
    },
  },

  methods: {
    addProductToCart(product) {
      this.$store.dispatch("addProductToCart", product);
    },
  },

  created() {
    return this.$store.dispatch("getProducts");
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

.header {
  margin-top: 20px;
  text-align: center;
  font-size: 50px;
}

.products {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  .product {
    border: 1px solid lightgray;
    border-radius: 10px;
    margin: 2rem;
    padding: 1rem;
    width: 15rem;

    &-header {
      font-size: 2rem;
      text-align: center;
    }

    &-image {
      display: block;
      margin: 1rem auto;
    }

    &-price {
      text-align: center;
      font-size: 1.3rem;
      margin-top: 1rem;
    }
  }
}

.buy-button {
  margin-top: 2rem;
  background: rgb(10, 113, 148);
  border: 0;
  border-radius: 10px;
  outline: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: bold;
  height: 2.5rem;
  width: 4rem;

  &:active {
    background: rgb(80, 182, 216);
    transform: translateY(4px);
  }
}
</style>
