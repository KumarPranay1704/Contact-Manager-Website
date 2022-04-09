const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
    contactName:{
        type:String,
        required:true
    },
    contactEmail:{
        type:String,
        required:true
    },
    contactPhone:{
        type:String,
        required:true
    },
    contactType:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users'
    }
})

module.exports=mongoose.model('contacts',ContactSchema);