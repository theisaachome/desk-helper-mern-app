const express = require('express');
const { registerUser,loginUser,getProfileMe } = require('../controllers/userController');
const router = express.Router();

router.post("/",registerUser);


module.exports = router;