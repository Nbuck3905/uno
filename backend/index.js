const databaseSettings = require("./knexfile.js").development;
const knex = require("knex")(databaseSettings);
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const jwt = require("jsonwebtoken");
const http = require("http").createServer(app);
const io = require("socket.io")(http); // <-- Web Socket Server

io.on("connection", async socket => {
  socket.on("games.get", async () => {
    let games = await knex("games").select();
    io.emit("games", games);
  });
  socket.on("game.create", async game => {
    await knex("games").insert(game);
    let games = await knex("games").select();
    io.emit("game.created", games);
  });
  socket.on("game.join", async game => {
    await knex("games")
      .where({ id: game.id })
      .update(game);
    io.emit("game.joined", game);
  });
  socket.on("player.get", async player_id => {
    let player = await knex("users")
      .where({ id: player_id })
      .select();
    io.emit("player", player);
  });
  socket.on("game.delete", async game => {
    console.log("game.delete was emitted");
    await knex("games")
      .where({ name: game.name })
      .del();
    io.emit("game.deleted", game);
  });
  socket.on("game.leave", async game => {
    console.log("game.leave was emitted");
    console.log(game);
    await knex("games")
      .where({ id: game.game.id })
      .update({
        ...game.game,
        users: JSON.stringify(
          JSON.parse(game.game.users).filter(id => id != game.user_id)
        )
      });
    io.emit("game.left", game.user_id);
  });
});

app.use(bodyParser.json());
app.use(cors());

/////// users

app.get("/users", (req, res) => {
  async function getUsers() {
    let users = await knex("users").select(); //.join('hands', 'users.id', '=', 'hands.user_id')
    res.json(users);
  }
  getUsers();
});

app.post("/user/login", (req, res) => {
  async function getUser() {
    let userArray = await knex("users")
      .where({ username: req.body.username })
      .select();
    console.log(userArray);
    if (userArray[0] !== undefined) {
      if (userArray[0].password === req.body.password) {
        let user = userArray[0];
        token = await jwt.sign(
          { user },
          "Uno translates from spanish to one in English"
        );
        return res.json({ user: user, token: token });
      }
    }
    return res.json({
      error: true,
      message: "Username/password combination invalid."
    });
  }
  getUser();
});

app.post("/users", (req, res) => {
  async function postUser() {
    let existingUser = await knex("users")
      .where({ username: req.body.username })
      .select();
    if (existingUser.length > 0) {
      return res.json({ error: true, message: "Username already exists" });
    }
    let user = await knex("users").insert(req.body);
    let newUser = user[0];
    token = await jwt.sign(
      { ...req.body, id: newUser },
      "Uno translates from spanish to one in English"
    );
    return res.json({ user: { ...req.body, id: newUser }, token: token });
  }
  postUser();
});

app.get("/user", verifyToken, (req, res) => {
  jwt.verify(
    req.token,
    "Uno translates from spanish to one in English",
    (error, authData) => {
      if (error) {
        res.send("No logged in user");
      } else {
        res.json(authData);
      }
    }
  );
});

app.patch("/users/:id", (req, res) => {
  async function patchUser() {
    let user = await knex("users")
      .where({ id: req.params.id })
      .update(req.body);
    res.send(user.json());
  }
  patchUser();
});

app.delete("/users/:id", (req, res) => {
  async function deleteUser() {
    let user = await knex("users")
      .where({ id: req.params.id })
      .del();
    res.send(console.log(`${user} deleted`));
  }
  deleteUser();
});

////// hands

app.get("/hands", (req, res) => {
  async function getHands() {
    let hands = await knex("hands").select();
    res.send(hands);
  }
  getHands();
});

app.get("/hands/:id", (req, res) => {
  async function getHand() {
    let hand = await knex("hands")
      .where({ id: req.params.id })
      .select();
    res.send(hand);
  }
  getHand();
});

app.post("/hands", (req, res) => {
  async function postHand() {
    let hand = await knex("hands").insert(req.body);
    res.send(JSON.stringify(hand.json()));
  }
  postHand();
});

////// games

app.get("/games", (req, res) => {
  async function getGames() {
    let games = await knex("games").select();
    res.send(games);
  }
  getGames();
});

app.get("/games/:id", (req, res) => {
  async function getGame() {
    let game = await knex("games")
      .where({ id: req.params.id })
      .select();
    res.send(game);
  }
  getGame();
});

app.post("/games", (req, res) => {
  async function postGame() {
    let game = await knex("games").insert(req.body);
    res.json({ game: { ...req.body, id: game } });
  }
  postGame();
});

app.patch("/games/:id", (req, res) => {
  async function patchGame() {
    let game = await knex("games")
      .where({ id: req.params.id })
      .update(req.body);
    res.send(game.json());
  }
  patchGame();
});

app.delete("/games/:id", (req, res) => {
  async function deleteGame() {
    let game = await knex("games")
      .where({ id: req.params.id })
      .del();
    res.send(console.log(`${game} deleted`));
  }
  deleteGame();
});

function verifyToken(req, res, next) {
  const [method, token] = req.headers.authorization.split(" ");
  if (method !== undefined) {
    req.token = token;
    next();
  }
}

http.listen(3001);
