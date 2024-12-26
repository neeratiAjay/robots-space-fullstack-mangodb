import {useState,useEffect} from "react"
//import { IoSearch } from "react-icons/io5"
import { TaskItem } from "../TaskItemDetails"
import Popup from 'reactjs-popup'
import{v4 as uuidv4} from "uuid"
import"./index.css"

const Home = () => {
    const [tasksData,setTasksData] = useState([])
    const [name,setName] = useState("")
    const[description,setDescription] = useState("")
    const[priority,setPriority] = useState("Low")
    const [status,setStatus] = useState("Pending")
    const [dueDate,setDueDate] = useState("")
    const[filterStatus,setFilterStatus] = useState("")
    
    useEffect(()=>{
            const getTasksData = async()=>{
            const url = "https://robots-space-fullstack-mangodb.onrender.com/tasks"
           
            const response  = await fetch(url)
            const data = await response.json()
            const updateFormatData = data.map(eachItem=>({
                id:eachItem["_id"],
                name:eachItem.name,
                description:eachItem.description,
                priority:eachItem.priority,
                status:eachItem.status,
                dueDate:eachItem.dueDate
            }))
            setTasksData(updateFormatData)
            
           }
       getTasksData()
    },[])
   
    
    const deleteTask = async(id) =>{
        const url = `https://robots-space-fullstack-mangodb.onrender.com/tasks/${id}`
        const options = {
            method:"DELETE"
        }
        const response = await fetch(url,options)
        const filteredData = tasksData.filter(task =>task.id !==id)
        setTasksData(filteredData)
        if (response.ok === true){
            alert("Task Deleted")
        }
    }
    const addNewTask = async(event)=>{
    event.preventDefault()
    const url = "https://robots-space-fullstack-mangodb.onrender.com/tasks"
    // Convert to Date object
    const dateObj = new Date(dueDate);

    // Extract year, month, and day
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(dateObj.getDate()).padStart(2, '0');

    // Combine into YYYY-MM-DD format
    const formattedDate = `${year}-${month}-${day}`;
    const options ={
        method:"POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify({name,description,dueDate:formattedDate,status,priority})
    }
    const response = await fetch(url,options)
    const newAddedTask ={name,description,dueDate,status,priority,id:uuidv4()}
    if(response.ok===true){
     setTasksData([...tasksData,newAddedTask])
     setName("")
     setDescription("")
     setDueDate("")
     setPriority("Low")
     setStatus("Pending")
     
    }
    }
    const upDateTaskDetails = async(task)=>{
        const {name,id,description,status,priority,dueDate} = task
        
        const url = `https://robots-space-fullstack-mangodb.onrender.com/tasks/${id}`
        const options ={
            method:"PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({name,description,dueDate,status,priority})
        }
        const response = await fetch(url,options)
        const updateFilter = tasksData.filter(eachTask=>{
         if(eachTask.id === id){
            eachTask.name=name
            eachTask.description=description
            eachTask.status=status
            eachTask.priority=priority
            eachTask.dueDate=dueDate 
            
            }
            return eachTask
        })
        if(response.ok){
        setTasksData(updateFilter)
        }
        
    }
    
    const changeFilterStatus = (event)=>{
        setFilterStatus(event.target.value)
        const statusFilteredData = tasksData.filter(eachTask=>eachTask.status.toLowerCase().includes(event.target.value.toLowerCase()))
        setTasksData(statusFilteredData)
    }
   
    
  return (
   <div className="bg-container">
    <div className="d-flex flex-column">
    <div className="header-container">
    <div className="d-flex flex-row">
    <label className="label" htmlFor="filter">Filter by Task:</label>
    <select id = "filter" value={filterStatus} onChange={changeFilterStatus}>
        <option>Select Value</option>
    <option value = "Pending">Pending</option>
    <option value ="In progress">In Progress</option>
    <option value="Completed">Completed</option>
    </select>
    </div>
    <Popup modal trigger ={<button className="add-task-btn" type = "button">
          Add Task
         </button>} >
        {close=>(
            <form  className="form-container" onSubmit={(event)=>{addNewTask(event)
                close()}}>
             <div className="d-flex flex-row input-label-container">
            <label className="label" htmlFor="name">Task Name: </label>
            <input type = "text" placeholder = "Task Name"  id = "name"
             value={name}
             onChange={(e)=>setName(e.target.value)}
            className = "task-input" required/>
           </div>
           <div className="d-flex flex-row">
           <label className="label" htmlFor="description">Description: </label>
           <textarea cols={30} rows={4} placeholder=" Task Description" id = "description"
           value={description}
           onChange={(e)=>setDescription(e.target.value)}
           className="text-area"></textarea>
           </div>
           <div className="d-flex flex-row input-label-container">
            <label htmlFor = "status" className="label">Status: </label>
           <select className="drop-down"  id = "status"
          value={status} onChange={(e)=>setStatus(e.target.value)}>
            <option value = "Pending">Pending</option>
            <option value ="In progress">In Progress</option>
            <option value="Completed">Completed</option>
           </select>
           </div>
           <div className="d-flex flex-row input-label-container">
            <label className="label" htmlFor ="due-date">Due Date: </label>
            <input type ="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)}
            id ="due-date" className="date-input"/>
           </div>
           <div className="d-flex flex-row input-label-container">
            <label htmlFor = "priority" className="label">Priority: </label>
            <select className="drop-down" id ="priority"
            value={priority} onChange={(e)=>setPriority(e.target.value)}>
            <option value = "Low">Low</option>
            <option value ="Medium">Medium</option>
            <option value="High">High</option>
           </select>
           </div>
           <div className="btns-container">
           <button className="cancel-btn" type="button" onClick={()=>close()}> Cancel</button>
           <button className="task-add-btn" type="submit">Add Task</button>
           </div>
            </form>
        )}
    </Popup>
   
    </div>
    </div>
    {(tasksData.length === 0)?<h1 className="text-center text-Primary mt-40">Tasks are Empty</h1>:
    <ul className="ul-container">
    {tasksData.map(eachTask=><TaskItem key = {eachTask.id} task = {eachTask} updateItem = {upDateTaskDetails}   deleteItem={deleteTask}/>)}
    </ul>}
   </div>
  )
}

export default Home

/*<div className="input-container">
        <input type="search" placeholder="Search" className="input"/>
        <button className="search-btn" type = "button">
         <IoSearch size={20}/>
        </button>
    </div>
        )}*/