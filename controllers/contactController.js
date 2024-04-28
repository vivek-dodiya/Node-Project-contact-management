const asyncHandler = require("express-async-handler");
const contact = require("../models/contactModel");
// describe get contactt
// describe api/contactts
// access public
const getcontacts = asyncHandler(async (req, res) => {
  console.log(req.user._id);
  const contacts = await contact.find({user_id : req.user._id});
  res.status(200).json(contacts);
});

// describe get contactt by id
const getcontact = asyncHandler(async (req, res) => {
  const getcontact_by_id = await contact.findById(req.params.id)
  if (!getcontact_by_id) {
    res.status(404);
    throw new Error("Contect not found..");
  }
  res.status(200).json(getcontact_by_id);
});

// describe create new contactt

const createcontact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status();
    throw new Error("all field are mendettory..");
  }
  const createContact = await contact.create({
    name,
    email,
    phone,
    user_id : req.user._id
  });
  console.log(req.body);
  console.log(createContact);
  res.status(201).json(createContact);
});

// describe update contactt
// create put api
const updatecontact = asyncHandler(async (req, res) => {
  const getcontact_by_id = await contact.findById(req.params.id)
  if (!getcontact_by_id) {
    res.status(404);
    throw new Error("Contect not found..");
  }
  if (getcontact_by_id?.user_id?.toString() !== req.user._id){
    res.status(403);
    throw new Error("user dont have permission to update other user contact ")
  }
  const updatedcontect = await contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new:true}
  )
  res
    .status(200)
    .json(updatedcontect);
});

// describe delete contactt
// create delete api
const deletecontact = asyncHandler(async (req, res) => {
  const getcontact_by_id = await contact.findById({_id : req.params.id})
  // console.log(getcontact_by_id,">>>>>>>");
  if (!getcontact_by_id) {
    res.status(404);
    throw new Error("Contect not found..");
  }
  if (contact.user_id.toString() !== req.user.id){
    res.status(403);
    throw new Error("user dont have permission to deleate other user contact ")
  }
  await contact.deleteOne({_id:getcontact_by_id._id})
  // console.log(getcontact_by_id,"><<<<<<<<<<<<<<<<<");
  res
    .status(200)
    .json(getcontact_by_id);
  console.log(getcontact_by_id);
});

module.exports = {
  getcontacts,
  createcontact,
  getcontact,
  updatecontact,
  deletecontact,
};
