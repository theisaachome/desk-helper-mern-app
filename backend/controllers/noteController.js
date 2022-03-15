const asyncHandler = require("express-async-handler");
const Note = require("../models/Note");
const Ticket = require("../models/Ticket");
const User = require("../models/User");
const ErrorResponse = require("../utils/errorResponse");


// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getAllNotes = asyncHandler(async(req,res,next)=>{
 // Get user using the id in the JWT
 const user = await User.findById(req.user.id)

 if (!user) {
    return next(new ErrorResponse(`User not found`,401));
}

 const ticket = await Ticket.findById(req.params.ticketId)

 if(!ticket)return next(new ErrorResponse('Ticket not found.',404));

 if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized`,401));
  }


 const notes = await Note.find({ ticket: req.params.ticketId })

 res.status(200).json(notes)

});


// @desc    Create ticket note
// @route   POST /api/tickets/:ticketId/notes
// @access  Private
const addNote = asyncHandler(async(req,res,next)=>{
     // Get user using the id in the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
      return next(new ErrorResponse(`User not found`,401));
  }

  const ticket = await Ticket.findById(req.params.ticketId);

  if(!ticket)return next(new ErrorResponse('Ticket not found.',404));

  if (ticket.user.toString() !== req.user.id) {
    return next(new ErrorResponse(`User not authorized`,401));
  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  })

  res.status(200).json(note)
});

module.exports ={
    getAllNotes,
    addNote,
}