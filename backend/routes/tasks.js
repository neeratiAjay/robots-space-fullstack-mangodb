const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

//GET API for  Get all tasks
router.get('/', async (req, res) => {
    try{
        const tasks = await Task.find();
        res.status(200).json(tasks);
    }catch(error){
        console.log("Server Error",error)
        res.status(500).json({ error: error.message })
    }
  
});

// POST API for add new task 
router.post("/", async(req,res)=>{
    try{
        const newTask =  new Task(req.body)
        const savedTask = newTask.save()
        res.json(newTask)
    }catch(error){
        console.log("Server Error",error)
        res.status(500).json({ error: error.message })
    }
   
})
//PATCH API for update tasks 

router.patch('/:id', async(req,res)=>{
    try{
        const updateTask = await Task.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json(updateTask);
    }catch(error){
        console.log("Server Error",error)
        res.status(500).json({ error: error.message })
    }
    
});

//DELETE API for Delete  tasks
router.delete("/:id",async(req,res)=>{
    try{
        await Task.findByIdAndDelete(req.params.id)
        res.json({message:"task deleted successfully"})
        
    }catch(error){
        console.log("Server Error",error)
        res.status(500).json({ error: error.message })
    }
    
}) 

module.exports = router