const express = require('express');
const { registerUser,loginUser,getProfileMe } = require('../controllers/userController');
const requiredSignin = require('../middlewares/authMiddlewares');
const router = express.Router();

router.post("/",registerUser);
router.post("/login",loginUser);
router.get("/me",requiredSignin,getProfileMe);


module.exports = router;