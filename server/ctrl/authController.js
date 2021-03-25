const bcrypt = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    let [user] = await db.check_user(username);

    if (user) {
      return res.status(400).send("Email already exists");
    }

    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(password, salt);
    let [newUser] = await db.register(username, hash);
    console.log(newUser);

    // delete newUser.password;

    // req.session.user = newUser;

    res.status(200).send("Registration successful");
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    const db = req.app.get("db");

    let [user] = await db.check_user(username);
    if (!user) {
      return res.status(400).send("Email/Password doesnt exists");
    }

    let authenticated = bcrypt.compareSync(password, user.password);
    if (!authenticated) {
      return res.status(401).send("Email/Password doesnt exists");
    }

    delete user.password;
    req.session.user = user;
    res.status(200).send(req.session.user);
  },
};
