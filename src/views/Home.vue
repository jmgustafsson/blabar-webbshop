<template>
  <div>
    <nav class="nav">
      <h2 class="nav__header">Blåbär Webbshop</h2>
      <div class="nav__cart">
        <button class="showcart__button" @click="showCart = !showCart">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <span class="total-quantity">{{ totalQuantity }}</span>
        <div v-if="showCart" class="cart-dropdown">
          <ul class="cart-dropdown__list">
            <li v-if="totalQuantity == 0">Kundvagnen är tom</li>
            <li v-for="product in cart" :key="product.id">
              {{ product.name }} {{ product.quantity + "st" }}
            </li>
          </ul>
          <button class="checkout__button">
            <router-link to="/cart">Till kassan</router-link>
          </button>
        </div>
      </div>
    </nav>
    <section class="products">
      <div v-for="product in products" :key="product.id" class="product">
        <h3 class="product__header">{{ product.name }}</h3>
        <img
          src="https://via.placeholder.com/150"
          :alt="product.name"
          class="product__image"
        />
        <p class="product desctription">{{ product.description }}</p>
        <div class="quantity">
          <button
            @click="updateCart(product, 'subtract')"
            class="quantity__button"
          >
            -
          </button>
          <span class="quantity__quantity">{{ product.quantity }}</span>
          <button @click="updateCart(product, 'add')" class="quantity__button">
            +
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: "Speldator",
          description: "This is an incredibly awesome product",
          quantity: 0,
        },
        {
          id: 2,
          name: "Laptop",
          description: "This is an incredibly awesome product",
          quantity: 0,
        },
        {
          id: 3,
          name: "Skärm",
          description: "This is an incredibly awesome product",
          quantity: 0,
        },
      ],
      showCart: false,
    };
  },
  computed: {
    cart() {
      return this.products.filter((product) => product.quantity > 0);
    },
    totalQuantity() {
      return this.products.reduce(
        (total, product) => total + product.quantity,
        0
      );
    },
  },
  methods: {
    updateCart(product, updateType) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          if (updateType === "subtract") {
            if (this.products[i].quantity !== 0) {
              this.products[i].quantity--;
            }
          } else {
            this.products[i].quantity++;
          }
          break;
        }
      }
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

html {
  font-size: 10px;
}

.checkout__button {
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

  a {
    text-decoration: none;
    color: inherit;
  }
}

.nav {
  align-items: center;
  background: rgb(10, 113, 148);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  &__header {
    font-size: 2.5rem;
  }

  &__cart {
    position: relative;

    .showcart__button {
      background: none;
      border: 0;
      outline: none;
      color: white;
      cursor: pointer;
    }

    i {
      font-size: 2rem;
    }

    .total-quantity {
      align-items: center;
      background: lightblue;
      border-radius: 50%;
      display: flex;
      font-weight: bold;
      height: 2rem;
      justify-content: center;
      padding: 0.5rem;
      position: absolute;
      right: -10px;
      top: -10px;
      width: 2rem;
    }

    .cart-dropdown {
      background: white;
      border: 1px solid lightgray;
      border-radius: 10px;
      box-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
      color: #333;
      font-size: 1.3rem;
      overflow: auto;
      padding: 0 1rem;
      position: absolute;
      right: 0;
      width: 12.5rem;

      .cart-dropdown__list {
        list-style: none;

        li {
          margin: 1rem 0;
        }
      }
    }
  }
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

    &__header {
      font-size: 2rem;
      text-align: center;
    }

    &__image {
      display: block;
      margin: 1rem auto;
    }

    &__description {
      font-size: 1.3rem;
      margin-top: 1rem;
    }
  }
}

.quantity {
  margin-top: 2rem;
  text-align: center;

  &__button {
    background: lightblue;
    border: 0;
    border-radius: 10px;
    outline: none;
    color: white;
    cursor: pointer;
    font-size: 1.5rem;
    font-weight: bold;
    height: 2.5rem;
    width: 2.5rem;
  }

  &__quantity {
    font-size: 1.5rem;
    margin: 0 1rem;
  }
}
</style>
