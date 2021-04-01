/*eslint-disable*/
import express from "express";
import { showProducts, createProduct } from "../controllers/product.js";
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
router.post("/products", createProduct);

router.post("/signup", userMiddleware.validateRegister, (req, res, next) => {
  db.query(
    `SELECT * FROM users WHERE LOWER(email) = LOWER(${db.escape(
      //här
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
                // här
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

router.get("/secret-route", userMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("This is the secret content. Only logged in users can see that!");
});

router.post("/history", (req, res, next) => {
  var emailAdress = req.body.params.userEmail;

  var queryHistory =
    'SELECT * FROM history WHERE userEmail = "' + emailAdress + '"';
  // + req.body.email;
  // var queryHistory = (`SELECT product FROM history WHERE LOWER(userEmail) = ?`, [email]);
  // sql = mysql.format(`SELECT * FROM history WHERE LOWER(userEmail) = "LOWER(${db.escape(?)});"`,req.body.email)
  console.log(req.body.params.userEmail);
  console.log(queryHistory);

  db.query(queryHistory, (err, data, fields) => {
    if (err) throw err;
    else {
      var orderHistory = [];

      data.forEach(function(entry) {
        orderHistory.push(entry);
      });

      res.json(orderHistory);
      // console.log(orderHistory);
    }
  });
});

export default router;
