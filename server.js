const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");

const users = require("./routers/api/users");
const students = require("./routers/api/student");
const room = require("./routers/api/room");
const staff = require("./routers/api/staff");


const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// DB Config
const db = require("./config/keys_dev").mongoURI;

// connect to mongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Use Routes
app.use("/api/users", users);
app.use("/api/student", students);
app.use("/api/room", room);
app.use("/api/staff", staff);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

module.exports = { app };
