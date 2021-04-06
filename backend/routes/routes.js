/*eslint-disable*/
import express from "express";
import { showProducts } from "../controllers/product.js";
import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import jwt from "jsonwebtoken";
import db from "../config/database.js";
import userMiddleware from "../middleware/users.js";

// init express router
const router = express.Router();

// Get All Product
router.get("/products", showProducts);

// Create New Product
router.post("/orderhistory", (req, res, next) => {
  var username = req.body.params.user;
  var products = req.body.params.orderProducts;
  var orderQuery =
    'INSERT INTO history (userEmail, product, orderPlaced) VALUES ("' +
    username +
    '", "' +
    products +
    '", now())';
  db.query(orderQuery);
});
router.post("/signup", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      req.body.username
    )});`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          msg: "Den här användarnamnet används redan! :)",
        });
      } else {
        // username is available
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            // has hashed pw => add to database
            db.query(
              `INSERT INTO users (id, email, password, registered) VALUES ('${uuid()}', ${db.escape(
                req.body.username
              )}, ${db.escape(hash)}, now())`,
              (err, result) => {
                if (err) {
                  throw err;
                  return res.status(400).send({
                    msg: err,
                  });
                }
                return res.status(201).send({
                  msg: "Registerad! <3",
                });
              }
            );
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE email = ${db.escape(req.body.username)};`, //här
    (err, result) => {
      // user does not exists
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Användarnamn eller lösenord är inkorrekt! :(",
        });
      }
      // check password
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          // wrong password
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Användarnamn eller lösenord är inkorrekt! :(",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].username,
                userId: result[0].id,
              },
              "SECRETKEY",
              {
                expiresIn: "7d",
              }
            );
            db.query(
              `UPDATE users SET last_login = now() WHERE id = '${result[0].id}'`
            );
            return res.status(200).send({
              msg: "Loggad in! :)",
              token,
              user: result[0],
            });
          }
          return res.status(401).send({
            msg: "Användarnamn eller lösenord är inkorrekt! :(",
          });
        }
      );
    }
  );
});

router.post("/history", (req, res, next) => {
  var userName = req.body.params.user;

  var queryHistory =
    'SELECT * FROM history WHERE userEmail = "' + userName + '"';

  db.query(queryHistory, (err, data, fields) => {
    if (err) throw err;
    else {
      var orderHistory = [];

      data.forEach(function(entry) {
        orderHistory.push(entry);
      });
      res.json(orderHistory);
    }
  });
});

export default router;
