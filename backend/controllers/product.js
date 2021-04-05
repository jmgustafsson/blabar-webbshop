// Import function from Product Model
import { getProducts } from "../models/productModel.js";

// Get All Products
export const showProducts = (req, res) => {
  getProducts((err, results) => {
    if (err) {
      res.send(err);
    } else {
      res.json(results);
    }
  });
};
