const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:String, required:true},
    dueDate:{type:Date,required:true},
    status:{type:String,enum:["Pending","In Progress", "Completed"], default:"Pending"},
    priority:{type:String, enum:["Low","Medium","High"],required:true}
})


module.exports = mongoose.model("Task",taskSchema)