const express = require("express");
const { 
    getAllTickets, 
    createTicket, 
    getTicket, 
    updateTicket, 
    deleteTicket } = require("../controllers/ticketController");
const requiredSignin = require("../middlewares/authMiddlewares");
const router = express.Router();



// Re-route into note router
const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

router.route("/")
    .get(requiredSignin,getAllTickets)
    .post(requiredSignin,createTicket);

router.route("/:id")
    .get(requiredSignin,getTicket)
    .put(requiredSignin,updateTicket)
    .delete(requiredSignin,deleteTicket);

module.exports = router;