// const fs = require('fs');


const express = require('express');
const app = express();

app.use(express.json());

const cors = require('cors');
const corsOption={
    "origin":"*"
}
app.use(cors(corsOption));

const contactRoutes=require('./routes/contacts');
app.use('/api/contact',contactRoutes);

const userRoutes=require('./routes/user');
app.use('/api/user',userRoutes);

const logger = require('./middleware/logger');
const dbConn = require('./config/db.conn');
app.use(logger);

const port = process.env.PORT || 3000;

dbConn();


// let contactsData=[];
// app.get('/',(req,res)=>{
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

// app.post('/save',(req,res)=>{
//     console.log(req.body);
//     // const contactName=req.body.cname;
//     // const contactEmail=req.body.cemail;
//     // const contactPhone=req.body.cphone;
//     // const contactType=req.body.ctype;
//     if(fs.existsSync('./contacts.json')){
//         // let contactsData=[];
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

// app.put('/update/:phone',(req,res)=>{
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

// app.delete('/delete/:phone',(req,res)=>{
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

app.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})