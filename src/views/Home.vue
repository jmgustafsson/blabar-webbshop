<template>
  <div>
    <nav class="nav">
      <h2 class="nav__header">Blåbär Webbshop</h2>
      <div class="nav__icons">
        <button class="nav__buttons">
          <i class="fas fa-sign-in-alt"></i>
        </button>
        <button class="nav__buttons">
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button class="nav__buttons">
          <i class="fas fa-user"></i>
        </button>
        <button class="nav__buttons" @click="showCart = !showCart">
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
          <button @click="addToCart(product)" class="quantity__button">
            Köp
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
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 2,
          name: "Laptop",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 3,
          name: "Skärm",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 4,
          name: "Router",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 5,
          name: "Skrivare",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 6,
          name: "Server",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 7,
          name: "Norton Antivirus",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 8,
          name: "Microsoft Office",
          description: "Beskrivning av produkten",
          quantity: 0,
        },
        {
          id: 9,
          name: "Tangentbord",
          description: "Beskrivning av produkten",
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
    addToCart(product) {
      for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === product.id) {
          this.products[i].quantity++;
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

  &__icons {
    position: relative;

    .nav__buttons {
      background: none;
      border: 0;
      margin-left: 10px;
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
      right: -20px;
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
  margin-top: 9rem;

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
  }
}
</style>
