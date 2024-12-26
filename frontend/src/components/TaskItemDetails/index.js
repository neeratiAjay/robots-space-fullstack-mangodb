import Popup from 'reactjs-popup'
import {useState} from "react"

import "./index.css"

export const TaskItem = props => {
  const{task,deleteItem,updateItem} = props
  const{id,name,description,dueDate,status,priority} = task
  const [taskName,setTaskName] = useState(name)
  const [taskDescription,setTaskDescription] = useState(description)
  const[taskDueDate,setTaskDueDate] = useState(dueDate)
  const[taskStatus,setTaskStatus] = useState(status)
  const[taskPriority,setTaskPriority] = useState(priority)

  const onClickDelete = ()=>deleteItem(id)
  
  const updateTask = (event)=>{
    event.preventDefault()
    const newTask ={
      name:taskName,
      description:taskDescription,
      dueDate:taskDueDate,
      status:taskStatus,
      priority:taskPriority,
      id:id
    }
    updateItem(newTask)
  }
  
  return (
    <>
    <li className="task-item">
      <div  className="items-btn-container">
      <h1 className="task-title">{name}</h1>
      <div>
      
      <Popup modal trigger ={<button className="edit-btn text-center" type="button">Edit</button>} >
              {close=>(
                  <form  className="form-container" onSubmit={(event)=>{updateTask(event)
                      close()}}>
                    <h1 className='text-primary'>Edit Task Details</h1>
                   <div className="d-flex flex-row input-label-container">
                  <label className="label" htmlFor="name">Task Name: </label>
                  <input type = "text" placeholder = "Task Name"  id = "name"
                   value={taskName}
                   onChange={(e)=>setTaskName(e.target.value)}
                  className = "task-input" required/>
                 </div>
                 <div className="d-flex flex-row">
                 <label className="label" htmlFor="description">Description: </label>
                 <textarea cols={30} rows={4} placeholder=" Task Description" id = "description"
                 value={taskDescription}
                 onChange={(e)=>setTaskDescription(e.target.value)}
                 className="text-area"></textarea>
                 </div>
                 <div className="d-flex flex-row input-label-container">
                  <label htmlFor = "status" className="label">Status: </label>
                 <select className="drop-down"  id = "status"
                value={taskStatus} onChange={(e)=>setTaskStatus(e.target.value)}>
                  <option value = "Pending">Pending</option>
                  <option value ="In progress">In Progress</option>
                  <option value="Completed">Completed</option>
                 </select>
                 </div>
                 <div className="d-flex flex-row input-label-container">
                  <label className="label" htmlFor ="due-date">Due Date: </label>
                  <input type ="date" defaultValue={taskDueDate} onChange={(e)=>setTaskDueDate(e.target.value)}
                  id ="due-date" className="date-input"/>
                 </div>
                 <div className="d-flex flex-row input-label-container">
                  <label htmlFor = "priority" className="label">Priority: </label>
                  <select className="drop-down" id ="priority"
                  value={taskPriority} onChange={(e)=>setTaskPriority(e.target.value)}>
                  <option value = "Low">Low</option>
                  <option value ="Medium">Medium</option>
                  <option value="High">High</option>
                 </select>
                 </div>
                 <div className="btns-container">
                 <button className="cancel-btn" type="button" onClick={()=>close()}> Cancel</button>
                 <button className="task-add-btn" type="submit">Save Task</button>
                 </div>
                  </form>
              )}
      </Popup>
      <button className="delete-btn text-center" type="button"onClick = {onClickDelete}>Delete</button>
      
      
      </div>
      </div>
     <div className="list-item-row-container">
     <p className="description">{description}</p>
     <p className="description"> <span className="span">Due date:</span> {dueDate}</p>
     <p className="description"><span className="span">Status: </span>{status}</p>
     <p className="description"> <span className="span">Priority: </span>{priority}</p>
     </div>

    </li>
    
    </>
  )
}
