<template>
  <div>
    <nav class="nav">
      <h2 class="nav-header">
        <router-link to="/" class="home-link">Blåbär Webbshop</router-link>
      </h2>
      <div class="nav-icons">
        <router-link v-if="!this.$store.getters.isLoggedIn" to="/login">
          <button class="nav-buttons">
            <i class="fas fa-sign-in-alt"></i>
          </button>
        </router-link>
        <router-link v-if="!this.$store.getters.isLoggedIn" to="/signup">
          <button class="nav-buttons">
            <i class="fas fa-user-plus"></i>
          </button>
        </router-link>
        <router-link v-if="this.$store.getters.isLoggedIn" to="/signed">
          <button class="nav-buttons">
            <span v-if="this.$store.getters.isLoggedIn">{{ email }}</span>
            <i class="fas fa-user"></i>
          </button>
        </router-link>
        <button
          @click="logout"
          v-if="this.$store.getters.isLoggedIn"
          class="nav-buttons"
        >
          <i class="fas fa-sign-out-alt"></i>
        </button>
        <button class="nav-buttons" @click="showCart = !showCart">
          <i class="fas fa-shopping-cart"></i>
        </button>
        <span class="total-quantity">0</span>
        <div v-for="product in cart" :key="product.id">
          <span class="total-quantity">{{ totalQuantity }}</span>
        </div>
        <div v-if="showCart" class="cart-dropdown">
          <ul class="cart-dropdown-list">
            <li v-if="cart == 0">Kundvagnen är tom</li>
            <li v-for="product in cart" :key="product.product_id">
              {{ product.name }} {{ product.price }}:-
              {{ product.quantity + "st" }}
              <button @click="removeProduct(product)" class="delete-button">
                X
              </button>
            </li>
          </ul>
          <p style="margin-top: 10px">Summa: {{ total }}:-</p>
          <router-link to="/checkout"
            ><button @click="showCart = false" class="checkout-button">
              Kassan
            </button></router-link
          >
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showCart: false,
      email: "",
      loggedStatus: false,
    };
  },

  async created() {
    if (this.$store.getters.isLoggedIn) {
      this.email = this.$store.getters.getUser.email;
      this.loggedStatus = true;
    }
  },

  computed: {
    cart() {
      return this.$store.getters.cartProducts;
    },

    totalQuantity() {
      return this.$store.getters.cartQuantity;
    },

    total() {
      return this.$store.getters.cartTotal;
    },
  },

  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },

    removeProduct(product) {
      this.$store.dispatch("deleteProductFromCart", product);
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

.home-link {
  text-decoration: none;
  color: inherit;
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
  margin-left: 50px;

  a {
    text-decoration: none;
    color: inherit;
    width: 10rem;
  }
}

.delete-button {
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

.nav {
  align-items: center;
  background: rgb(10, 113, 148);
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 2rem;
  margin: 0;

  &-header {
    font-size: 2.5rem;
  }

  &-icons {
    position: relative;

    .nav-buttons {
      background: none;
      border: 0;
      margin-left: 20px;
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
      width: 19rem;

      .cart-dropdown-list {
        list-style: none;

        li {
          margin: 1rem 0;
        }
      }
    }
  }
}
</style>
