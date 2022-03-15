const asyncHandler=require('express-async-handler');
const Ticket = require('../models/Ticket');
const User = require("../models/User");
const ErrorResponse = require('../utils/errorResponse');


// @desc    Get user tickets
// @route   GET /api/tickets
// @access  Private
const getAllTickets = asyncHandler(async(req,res,next)=>{
    // check the login user
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('No User for this tickets',401));
    }
    const tickets = await Ticket.find({user:req.user.id});
    res.status(200).json(tickets);
});


// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket =  asyncHandler(async(req,res,next)=>{
    // check user from jwt
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('No User for this tickets',401));
    }
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        return next(new ErrorResponse(`No ticket found with ID ${req.params.id}`,404));
    }
    if(ticket.user.toString() !== req.user.id){
        return next(new ErrorResponse(`No Authorized`,401));
    }
    res.status(200).json(ticket);
});



// @desc    Create new ticket
// @route   POST /api/tickets
// @access  Private
const createTicket =  asyncHandler(async(req,res,next)=>{
    const {product,description} = req.body;
    if (!product || !description) {
        return next(new ErrorResponse('Please add a product and description',400));
    }
    // get user to be the owner of the ticket from request
    const user = await User.findById(req.user.id);
    if(!user)return next(new ErrorResponse("No User found",401));
    // create a new ticket
    const ticket = await Ticket.create({
        product,
        description,
        user:req.user.id,
        status:'new'
    })
    res.status(201).json(ticket);
});

const updateTicket =  asyncHandler(async(req,res,next)=>{
    res.send("update a ticket")
});
const deleteTicket =  asyncHandler(async(req,res,next)=>{
    const user = await User.findById(req.user.id);
    if(!user){
        return next(new ErrorResponse('No User for this tickets',401));
    }
    //  look for ticket
    const ticket = await Ticket.findById(req.params.id);
    if(!ticket){
        return next(new ErrorResponse(`No ticket found with ID ${req.params.id}`,404));
    }
    // check ownership for the ticket
    if(ticket.user.toString() !== req.user.id){
        return next(new ErrorResponse(`No Authorized`,401));
    }
    await ticket.remove();

  res.status(200).json({ success: true })
});

module.exports ={
    getAllTickets,
    getTicket,
    createTicket,
    updateTicket,
    deleteTicket,
}