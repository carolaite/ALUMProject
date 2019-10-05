  const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/User");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("user");
});

router.post("/",   async (req, res, next) => {
  const { name, email, password, password2 } = req.body;

  if (!name || !email || !password || !password2)
    return res.render("error", { errorMessage: `Dados insuficinetes!` });

  if (password !== password2)
    return res.render("error", { errorMessage: `As senhas devem ser iguais!` });

  if (await User.findOne({ email }))
    return res.render("user", {
      errorMessage: `Usuário já cadastrado!`
    });

  try {
    const userCreate = await User.create(req.body);
    userCreate.password = undefined;
    console.log("user", userCreate);
    return res.redirect("/login");
  } catch (err) {
    return res.render("error", {
      errorMessage: `Erro ao criar Usuário: ${err}`
    });
  }
});

module.exports = router;
