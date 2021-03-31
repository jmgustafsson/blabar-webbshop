const _products = [
  { id: 1, name: "Speldator", price: 17990, quantity: 0 },
  { id: 2, name: "Laptop", price: 7990, quantity: 0 },
  { id: 3, name: "Skärm", price: 2490, quantity: 0 },
  { id: 4, name: "Router", price: 990, quantity: 0 },
  { id: 5, name: "Skrivare", price: 1990, quantity: 0 },
  { id: 6, name: "Server", price: 12990, quantity: 0 },
  { id: 7, name: "Antivirus", price: 390, quantity: 0 },
  { id: 8, name: "Office", price: 1390, quantity: 0 },
  { id: 9, name: "Tangentbord", price: 590, quantity: 0 },
  { id: 10, name: "Ipad", price: 5990, quantity: 0 },
  { id: 11, name: "Iphone 12 Pro", price: 12990, quantity: 0 },
  { id: 12, name: "Macbook Pro", price: 25990, quantity: 0 },
];

export default {
  getProducts(cb) {
    setTimeout(() => cb(_products), 100);
  },

  buyProducts(products, cb, errorCb) {
    setTimeout(() => {
      Math.random() > 0.5 || navigator.userAgent.indexOf("PhantomJS") > -1
        ? cb()
        : errorCb();
    }, 100);
  },
};
