/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // = data
        products: [],
        cart: [],
        checkoutStatus: null
    },

    getters: { // = computed
        availableProducts(state, getters) {
            return state.products.filter(product => product)
        },

        cartProducts(state) {
            return state.cart.map(cartItem => {
                const product = state.products.find(product => product.product_id === cartItem.id)
                return {
                    name: product.product_name,
                    price: product.product_price,
                    quantity: cartItem.quantity
                }
            })
        },

        cartTotal(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.price * product.quantity, 0)
        },

        cartQuantity(state, getters) {
            return getters.cartProducts.reduce((total, product) => total + product.quantity, 0);
        }
    },

    actions: { // = methods
        async getProducts({ commit }) {
            try {
                const response = await axios.get("http://localhost:5000/products");
                this.products = response.data;
                commit("setProducts", this.products);
            } catch (err) {
                console.log(err);
            }
        },

        addProductToCart(context, product) {
            if (product) {
                const cartItem = context.state.cart.find(item => item.id === product.product_id)
                if (!cartItem) {
                    context.commit("pushProductToCart", product.product_id);
                } else {
                    context.commit("incrementItemQuantity", cartItem)
                }
            }
        },

        checkout({ state, commit }) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit("emptyCart")
                    commit("setCheckoutStatus", "success")
                },
            )
        }
    },

    mutations: {
        setProducts(state, products) {
            state.products = products
        },

        pushProductToCart(state, productId) {
            state.cart.push({
                id: productId,
                quantity: 1
            })
        },

        incrementItemQuantity(state, cartItem) {
            cartItem.quantity++
        },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.cart = []
        }
    },
})
