require("dotenv").config();
const express = require("express");
const cors = require("cors");
const massive = require("massive");
const session = require("express-session");
const authCtrl = require("./ctrl/authController");
const middleware = require("./middleware");

const { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  session({
    resave: false,
    secret: SESSION_SECRET,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 14,
    },
  })
);

app.post("/auth/register", middleware.checkUsername, authCtrl.register);
app.post("/auth/login", middleware.checkUsername, authCtrl.login);

massive({
  connectionString: CONNECTION_STRING,
  ssl: { rejectUnauthorized: false },
}).then((db) => {
  app.set("db", db);
  console.log("DB is setup");
  app.listen(SERVER_PORT, () =>
    console.log(`Server running on port ${SERVER_PORT}`)
  );
});
