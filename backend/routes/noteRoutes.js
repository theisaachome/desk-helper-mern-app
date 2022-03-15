const express = require("express");
const { getAllNotes, addNote } = require("../controllers/noteController");
const requiredSignin = require("../middlewares/authMiddlewares");
const router = express.Router({ mergeParams: true });


router.route("/")
    .get(requiredSignin,getAllNotes)
    .post(requiredSignin,addNote)

module.exports = router;