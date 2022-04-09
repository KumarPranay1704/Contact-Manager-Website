const Contact = require('../models/Contact');
const joi = require('joi');

exports.listContacts=async(req,res)=>{
    try{
        let contacts = await Contact.find().populate('userid');
        if(!contacts){
            contacts=[];
        }
        res.status(200).json({
            message:"Contacts Fetched Successfully",
            ContactData:contacts
        })
    }catch(err){
     res.status(500).json({
         message:"Something Went Wrong",
         Error:err
     })
    }
}

exports.getContactById=async (req, res) => {
    const id = req.params.id;
    try {
        // const contact = await Contact.findOne({contactPhone:phone});
        const contact = await Contact.findOne({_id:id});
        if (contact) {
            res.status(200).json({
                message: "Contacts Fetched Successfully",
                ContactData: contact
            })
        }
        else {
            res.status(500).json({
                message: "Contact Not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Something Went Wrong",
            Error: err
        })
    }
}


exports.getContactByPhone=async (req, res) => {
    const phone = req.params.phone;
    try {
        const contact = await Contact.find({contactPhone:phone});
        if (contact) {
            res.status(200).json({
                message: "Contacts Fetched Successfully",
                ContactData: contact
            })
        }
        else {
            res.status(500).json({
                message: "Contact Not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Something Went Wrong",
            Error: err
        })
    }
}

exports.getContactByEmail=async (req, res) => {
    const email = req.params.email;
    try {
        // const contact = await Contact.findOne({contactEmail:email});
        const contact = await Contact.find({contactEmail:email});
        if (contact) {
            res.status(200).json({
                message: "Contacts Fetched Successfully",
                ContactData: contact
            })
        }
        else {
            res.status(500).json({
                message: "Contact Not Found",
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "Something Went Wrong",
            Error: err
        })
    }
}

exports.createContacts=async (req,res)=>{
    
    const contactObj = {
        contactName: req.body.cname,
        contactEmail: req.body.cemail,
        contactPhone: req.body.cphone,
        contactType: req.body.ctype,
        userid: req.body.uid
    }
    const Createschema = joi.object({
        cname: joi.string().required().min(3),
        cemail: joi.string().email().required(),
        cphone: joi.string().required().min(16).max(16),
        ctype: joi.string().required(),
        uid:joi.string().required(),
    })

    try {
        await Createschema.validateAsync(req.body);
        const contact = new Contact(contactObj);
        await contact.save();
        res.status(200).json({
            message: "Contact Added Successfully",
            ContactData: contact
        })
    } catch (err) {
        res.status(500).json({
            message:"Something Went wrong",
            Error:err
        })
    }
    
}

exports.updateContactsById=async (req,res)=>{
    const id = req.params.id;
    const contactObj = {
                contactName: req.body.cname,
                contactEmail: req.body.cemail,
                contactPhone: req.body.cphone,
                contactType: req.body.ctype,
                userid: req.body.uid
            }
    try{
        const updatedContact =await Contact.findByIdAndUpdate(id,{$set:contactObj});

    if(updatedContact==null){
        res.status(400).json({
            message:"Contact not updated/Id not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact updated Successfully",
            updatedContact:updatedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.updateContactsByEmail=async (req,res)=>{
    const email = req.params.email;
    const contactObj = {
                contactName: req.body.cname,
                contactEmail: req.body.cemail,
                contactPhone: req.body.cphone,
                contactType: req.body.ctype,
                userid: req.body.uid
            }
    try{
        const updatedContact =await Contact.findOneAndUpdate({contactEmail:email},{$set:contactObj});

    if(updatedContact==null){
        res.status(400).json({
            message:"Contact not updated/Email not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact updated Successfully",
            updatedContact:updatedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.updateContactsByPhone=async (req,res)=>{
    const phone = req.params.phone;
    const contactObj = {
                contactName: req.body.cname,
                contactEmail: req.body.cemail,
                contactPhone: req.body.cphone,
                contactType: req.body.ctype,
                userid: req.body.uid
            }
    try{
        const updatedContact =await Contact.findOneAndUpdate({contactPhone:phone},{$set:contactObj});

    if(updatedContact==null){
        res.status(400).json({
            message:"Contact not updated/Phone number not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact updated Successfully",
            updatedContact:updatedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.deleteContactsById=async (req,res)=>{
    const id = req.params.id;
    try{
        const deletedContact =await Contact.findByIdAndDelete(id);

    if(deletedContact==null){
        res.status(400).json({
            message:"Contact not deleted/Id not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact deleted Successfully",
            deletedContact:deletedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.deleteContactsByEmail=async (req,res)=>{
    const email = req.params.email;
    try{
        const deletedContact =await Contact.findOneAndDelete({contactEmail:email});

    if(deletedContact==null){
        res.status(400).json({
            message:"Contact not deleted / Email not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact deleted Successfully",
            deletedContact:deletedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.deleteContactsByPhone=async (req,res)=>{
    const phone = req.params.phone;
    try{
        const deletedContact =await Contact.findOneAndDelete({contactPhone:phone});

    if(deletedContact==null){
        res.status(400).json({
            message:"Contact not deleted / Phone number not found",
        })
    }
    else{
        res.status(200).json({
            message:"Contact deleted Successfully",
            deletedContact:deletedContact,
        })
    }
    }catch(err){
        res.status(500).json({
            message:"Something Went wrong",
            Error:err,
        })
    }
}

exports.getContactsByUser=async(req,res)=>{
    
    try{
        let contacts = await Contact.find({userid:req.params.userid}).populate('userid');
        if(!contacts){
            contacts=[];
        }
        res.status(200).json({
            message:"Contacts Fetched Successfully",
            ContactData:contacts
        })
    }catch(err){
     res.status(500).json({
         message:"Something Went Wrong",
         Error:err
     })
    }
}
