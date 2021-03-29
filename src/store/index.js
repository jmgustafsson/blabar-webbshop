/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
// import shop from '../api/shop'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
    state: { // = data
        products: [],
        // {id, quantity}
        cart: [],
        checkoutStatus: null
    },

    getters: { // = computed properties
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
        // fetchProducts({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         // make the call
        //         // run setProducts mutations
        //         shop.getProducts((products) => {
        //             commit("setProducts", products);
        //             resolve()
        //         });
        //     })
        // },

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
                // find cartItem
                const cartItem = context.state.cart.find(item => item.id === product.product_id)
                if (!cartItem) {
                    // pushProductToCart
                    context.commit("pushProductToCart", product.product_id);
                    console.log(this.pushProductToCart);
                } else {
                    // incrementItemQuantity
                    context.commit("incrementItemQuantity", cartItem)
                }
                // context.commit("decrementProductInventory", product)
            }
        },

        checkout({ state, commit }) {
            shop.buyProducts(
                state.cart,
                () => {
                    commit("emptyCart")
                    commit("setCheckoutStatus", "success")
                },
                () => {
                    commit("setCheckoutStatus", "fail")
                }
            )
        }
    },

    mutations: {
        setProducts(state, products) {
            // update products
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

        // decrementProductInventory(state, product) {
        //     product.inventory--
        // },

        setCheckoutStatus(state, status) {
            state.checkoutStatus = status
        },

        emptyCart(state) {
            state.cart = []
        }
    },
})
