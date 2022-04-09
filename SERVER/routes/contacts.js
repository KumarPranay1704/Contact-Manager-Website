// const fs = require('fs');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const upload = multer({dest:"uploads/"})
// const Contact = require('../models/Contact');
const contactController = require('../controller/contact.controller');
let contactsData=[];

router.get('/',contactController.listContacts);

router.get('/getbyId/:id',contactController.getContactById);

router.get('/getbyphone/:phone',contactController.getContactByPhone);

router.get('/getbyemail/:email',contactController.getContactByEmail);

router.post('/save',contactController.createContacts);

router.put('/updatebyid/:id',contactController.updateContactsById);

router.put('/updatebyemail/:email',contactController.updateContactsByEmail);

router.put('/updatebyphone/:phone',contactController.updateContactsByPhone);

router.delete('/deletebyid/:id',contactController.deleteContactsById);

router.delete('/deletebyemail/:email',contactController.deleteContactsByEmail);

router.delete('/deletebyphone/:phone',contactController.deleteContactsByPhone);

router.get('/:userid',auth,contactController.getContactsByUser);

router.post('/upload',upload.single('imagefile'),(req,res)=>{
    res.status(200).json({
        details:req.file
    })
})

module.exports = router;


// router.get('/',async(req,res)=>{
//     try{
//         const contacts = await Contact.find();
//         res.status(200).json({
//             message:"Contacts Fetched Successfully",
//             ContactData:contacts
//         })
//     }catch(err){
//      res.status(500).json({
//          message:"Something Went Wrong",
//          Error:err
//      })
//     }
//  })

// router.get('/getbyphone/:phone', async (req, res) => {
//     const phone = req.params.phone;
//     try {
//         // const contact = await Contact.findOne({contactPhone:phone});
//         const contact = await Contact.find({contactPhone:phone});
//         if (contact) {
//             res.status(200).json({
//                 message: "Contacts Fetched Successfully",
//                 ContactData: contact
//             })
//         }
//         else {
//             res.status(500).json({
//                 message: "Contact Not Found",
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "Something Went Wrong",
//             Error: err
//         })
//     }
// })

// router.get('/getbyemail/:email', async (req, res) => {
//     const email = req.params.email;
//     try {
//         // const contact = await Contact.findOne({contactEmail:email});
//         const contact = await Contact.find({contactEmail:email});
//         if (contact) {
//             res.status(200).json({
//                 message: "Contacts Fetched Successfully",
//                 ContactData: contact
//             })
//         }
//         else {
//             res.status(500).json({
//                 message: "Contact Not Found",
//             })
//         }
//     } catch (err) {
//         res.status(500).json({
//             message: "Something Went Wrong",
//             Error: err
//         })
//     }
// })
 
 
//  router.post('/save',async (req,res)=>{
//      const contactObj = {
//          contactName: req.body.cname,
//          contactEmail: req.body.cemail,
//          contactPhone: req.body.cphone,
//          contactType: req.body.ctype
//      }
 
//      try {
//          const contact = new Contact(contactObj);
//          await contact.save();
//          res.status(200).json({
//              message: "Contact Added Successfully",
//              ContactData: contact
//          })
//      } catch (err) {
//          res.status(500).json({
//              message:"Something Went wrong",
//              Error:err
//          })
//      }
     
//  })
//  router.put('/updatebyid/:id',async (req,res)=>{
//     const id = req.params.id;
//     const contactObj = {
//                 contactName: req.body.cname,
//                 contactEmail: req.body.cemail,
//                 contactPhone: req.body.cphone,
//                 contactType: req.body.ctype
//             }
//     try{
//         const updatedContact =await Contact.findByIdAndUpdate(id,{$set:contactObj});

//     if(updatedContact==null){
//         res.status(400).json({
//             message:"Contact not updated/Id not found",
//         })
//     }
//     else{
//         res.status(200).json({
//             message:"Contact updated Successfully",
//             updatedContact:updatedContact,
//         })
//     }
//     }catch(err){
//         res.status(500).json({
//             message:"Something Went wrong",
//             Error:err,
//         })
//     }
// })

 
//  router.put('/updatebyemail/:email',async (req,res)=>{
//      const email = req.params.email;
//      const contactObj = {
//                  contactName: req.body.cname,
//                  contactEmail: req.body.cemail,
//                  contactPhone: req.body.cphone,
//                  contactType: req.body.ctype
//              }
//      try{
//          const updatedContact =await Contact.findOneAndUpdate({contactEmail:email},{$set:contactObj});
 
//      if(updatedContact==null){
//          res.status(400).json({
//              message:"Contact not updated/Email not found",
//          })
//      }
//      else{
//          res.status(200).json({
//              message:"Contact updated Successfully",
//              updatedContact:updatedContact,
//          })
//      }
//      }catch(err){
//          res.status(500).json({
//              message:"Something Went wrong",
//              Error:err,
//          })
//      }
//  })

//  router.put('/updatebyphone/:phone',async (req,res)=>{
//     const phone = req.params.phone;
//     const contactObj = {
//                 contactName: req.body.cname,
//                 contactEmail: req.body.cemail,
//                 contactPhone: req.body.cphone,
//                 contactType: req.body.ctype
//             }
//     try{
//         const updatedContact =await Contact.findOneAndUpdate({contactPhone:phone},{$set:contactObj});

//     if(updatedContact==null){
//         res.status(400).json({
//             message:"Contact not updated/Phone number not found",
//         })
//     }
//     else{
//         res.status(200).json({
//             message:"Contact updated Successfully",
//             updatedContact:updatedContact,
//         })
//     }
//     }catch(err){
//         res.status(500).json({
//             message:"Something Went wrong",
//             Error:err,
//         })
//     }
// })
 
 
//  router.delete('/deletebyid/:id',async (req,res)=>{
//      const id = req.params.id;
//      try{
//          const deletedContact =await Contact.findByIdAndDelete(id);
 
//      if(deletedContact==null){
//          res.status(400).json({
//              message:"Contact not deleted/Id not found",
//          })
//      }
//      else{
//          res.status(200).json({
//              message:"Contact deleted Successfully",
//              deletedContact:deletedContact,
//          })
//      }
//      }catch(err){
//          res.status(500).json({
//              message:"Something Went wrong",
//              Error:err,
//          })
//      }
//  })

//  router.delete('/deletebyemail/:email',async (req,res)=>{
//     const email = req.params.email;
//     try{
//         const deletedContact =await Contact.findOneAndDelete({contactEmail:email});

//     if(deletedContact==null){
//         res.status(400).json({
//             message:"Contact not deleted / Email not found",
//         })
//     }
//     else{
//         res.status(200).json({
//             message:"Contact deleted Successfully",
//             deletedContact:deletedContact,
//         })
//     }
//     }catch(err){
//         res.status(500).json({
//             message:"Something Went wrong",
//             Error:err,
//         })
//     }
// })

// router.delete('/deletebyphone/:phone',async (req,res)=>{
//     const phone = req.params.phone;
//     try{
//         const deletedContact =await Contact.findOneAndDelete({contactPhone:phone});

//     if(deletedContact==null){
//         res.status(400).json({
//             message:"Contact not deleted / Phone number not found",
//         })
//     }
//     else{
//         res.status(200).json({
//             message:"Contact deleted Successfully",
//             deletedContact:deletedContact,
//         })
//     }
//     }catch(err){
//         res.status(500).json({
//             message:"Something Went wrong",
//             Error:err,
//         })
//     }
// })




















// router.get('/',(req,res)=>{
//     if(fs.existsSync('./contacts.json')){
//         const contactsBuffer = fs.readFileSync('./contacts.json');
//         if(contactsBuffer.length!=0){
//             contactsData = JSON.parse(contactsBuffer);

//             res.status(200).json({
//                 message:"Data Fetched Successfully",
//                 contacts:contactsData
//             })
//         }
//         else{
//             res.status(200).json({
//                 message:"No Contacts Found",
//             })
//         }
//     }else{
//         res.status(200).json({
//             message:"No Contacts Found",
//         })
//     }
// })

// router.post('/save',(req,res)=>{
//     console.log(req.body);
    // const contactName=req.body.cname;
    // const contactEmail=req.body.cemail;
    // const contactPhone=req.body.cphone;
    // const contactType=req.body.ctype;
    // if(fs.existsSync('./contacts.json')){
        // let contactsData=[];
//         const contactsBuffer = fs.readFileSync('./contacts.json');
//         if(contactsBuffer.length!=0){
//             contactsData = JSON.parse(contactsBuffer);
//             const contact = {
//                 contactName: req.body.cname,
//                 contactEmail: req.body.cemail,
//                 contactPhone: req.body.cphone,
//                 contactType: req.body.ctype
//             }
    
//             contactsData.push(contact);
    
//             fs.writeFileSync('./contacts.json',JSON.stringify(contactsData));
//             res.status(201).json({
//                 message:"Contact Added Successfully",
//             })

//         }
//         else{
//             const contact = {
//                 contactName: req.body.cname,
//                 contactEmail: req.body.cemail,
//                 contactPhone: req.body.cphone,
//                 contactType: req.body.ctype
//             }
    
//             contactsData.push(contact);
    
//             fs.writeFileSync('./contacts.json',JSON.stringify(contactsData));
//             res.status(201).json({
//                 message:"Contact Added Successfully",
//             })
//         }
//     }else{
//         const contact = {
//             contactName: req.body.cname,
//             contactEmail: req.body.cemail,
//             contactPhone: req.body.cphone,
//             contactType: req.body.ctype
//         }

//         contactsData.push(contact);

//         fs.writeFileSync('./contacts.json',JSON.stringify(contactsData));
//         res.status(201).json({
//             message:"Contact Added Successfully",
//         })
//     }


// })

// router.put('/update/:phone',(req,res)=>{
//     const phone=req.params.phone;
//     const contactObj = {
//         contactName: req.body.cname,
//         contactEmail: req.body.cemail,
//         contactPhone: req.body.cphone,
//         contactType: req.body.ctype
//     }

//     if(fs.existsSync('./contacts.json')){
//         const contactsBuffer=fs.readFileSync('./contacts.json');
//         if(contactsBuffer.length!=0){
//             const contactsData=JSON.parse(contactsBuffer);
//             const filteredContactArray = contactsData.filter((post)=>post.contactPhone!=phone);
//             if(contactsData.length==filteredContactArray.length){
//                 res.status(400).json({
//                     message:"Contact Not Found",
//                 })
//             }else{
//                 filteredContactArray.push(contactObj);
//                 fs.writeFileSync('./contacts.json',JSON.stringify(filteredContactArray));
//                 res.status(200).json({
//                     message:"Updated Successfully",
//                 })
//             }
//         }else{
//             res.status(400).json({
//                 message:"Contact Not Found",
//             })
//         }

//     }else{
//         res.status(400).json({
//             message:"Contact Not Found",
//         })
//     }
// })


// router.delete('/delete/:phone',(req,res)=>{
//     const phone=req.params.phone;

//     if(fs.existsSync('./contacts.json')){
//         const contactsBuffer=fs.readFileSync('./contacts.json');
//         if(contactsBuffer.length!=0){
//             const contactsData=JSON.parse(contactsBuffer);
//             const filteredContactArray = contactsData.filter((post)=>post.contactPhone!=phone);
//             if(contactsData.length==filteredContactArray.length){
//                 res.status(400).json({
//                     message:"Contact Not Found",
//                 })
//             }else{
//                 fs.writeFileSync('./contacts.json',JSON.stringify(filteredContactArray));
//                 res.status(200).json({
//                     message:"Deleted Successfully",
//                 })
//             }
//         }else{
//             res.status(400).json({
//                 message:"Contact Not Found",
//             })
//         }

//     }else{
//         res.status(400).json({
//             message:"Contact Not Found",
//         })
//     }
// })


