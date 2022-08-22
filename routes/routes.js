const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Address = require("../models/Address");

router.get("/", async (req, res) => {
  const users = await User.findAll({ raw: true });
  res.render("home", { users: users });
});

router.get("/users/create", (req, res) => {
  res.render("adduser");
});

router.post("/users/create", async (req, res) => {
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  console.log(req.body);
  await User.create({ name, occupation, newsletter });

  res.redirect("/");
});

router.get("/users/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ raw: true, where: { id: id } });
  res.render("userview", { user });
});

router.post("/users/delete/:id", async (req, res) => {
  const id = req.params.id;

  await User.destroy({ where: { id: id } });

  res.redirect("/");
});

router.get("/users/edit/:id", async (req, res) => {
  const id = req.params.id;

  const user = await User.findOne({ include: Address, where: { id: id } });

  res.render("useredit", { user: user.get({ plain: true }) });
});

router.post("/users/update", async (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const occupation = req.body.occupation;
  let newsletter = req.body.newsletter;

  if (newsletter === "on") {
    newsletter = true;
  } else {
    newsletter = false;
  }

  const userData = {
    id,
    name,
    occupation,
    newsletter,
  };

  await User.update(userData, { raw: true, where: { id: id } });

  res.redirect("/");
});

router.post("/address/create", function (req, res) {
  const UserId = req.body.UserId;
  const street = req.body.street;
  const number = req.body.number;
  const city = req.body.city;

  const address = {
    street,
    number,
    city,
    UserId,
  };

  Address.create(address)
    .then(res.redirect(`/users/edit/${UserId}`))
    .catch((err) => console.log(err));
});

router.post("/address/delete/", function (req, res) {
  const id = req.body.id;

  Address.destroy({
    where: {
      id: id,
    },
  })
    .then(res.redirect("/"))
    .catch((err) => console.log(err));
});

module.exports = router;
