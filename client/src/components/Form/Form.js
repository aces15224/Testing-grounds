import React, {useRef } from 'react';
import DropDownDate from "../DropdownDate/DropDownDate"
import API from "../../utils/API";
// import axios from "axios";
const Form = () => {
    const taskRef = useRef();
    const newDate = useRef(); 
    const priorityRef = useRef();
    const categoryRef = useRef();

////////////Take out code below upon completion/////////////////

// const Form = ({setTaskObject, taskObject}) => {
//     const taskRef = useRef();
//     const newDate = useRef(); 
//     const priorityRef = useRef();
//     const categoryRef = useRef();

//////////Take out code above upon completion/////////////////


//Form Submit Function

    const handleFormSubmit = e => {
        e.preventDefault();

        //format date from DropDown Selector//

        var d = new Date(newDate.current),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        let date1=[year, month, day].join('-');

        //format current date//
        // var currentDate = new Date (Date.now()),
        // currentMonth = '' + (currentDate.getMonth() + 1),
        // currentDay = '' + currentDate.getDate(),
        // currentYear = currentDate.getFullYear();
        // if (currentMonth.length < 2) currentMonth = '0' + currentMonth;
        // if (currentDay.length < 2) currentDay = '0' + currentDay;
        // let date2=[currentYear, currentMonth, currentDay].join('-');

        // create object using form data & dropdown
        var taskData = {
            taskItem: taskRef.current.value,
            // createdOn:date2,
            priority:priorityRef.current.value,
            dueDate:date1,
            category: categoryRef.current.value            
        }
        console.log(taskData)
////////////Take out code below upon completion/////////////////

        // setTaskObject({
        //     taskItem: taskRef.current.value,
        //     priority:priorityRef.current.value,
        //     category: categoryRef.current.value,
        //     dueDate:date1 
        // })
////////////Take out code above upon completion/////////////////
              
        //post Info to API
        API.postTask(taskData)
        .then(console.log(taskData))
            taskRef.current.value = "";
            priorityRef.current.value = "";
            categoryRef.current.value = "";
        };  
     
    return(         
        <form className="form-group mt-5 mb-5" onSubmit={handleFormSubmit} >
            <div className="form-group">
                <label className="taskAdd"><h3>Input Task</h3></label>
                <br></br>
                <input className="col-12 form-control" ref={taskRef} type="text"
                    name="taskForm"
                    placeholder="Add a task"
                />
                <select className="custom-select" id="priorityDropDown"ref={priorityRef}  >
                    <option defaultValue>Add a Priority Alert</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <select className="custom-select" id="categoryDropDown"ref={categoryRef} >
                    <option defaultValue>Select a Category</option>
                    <option value='Career'>Career</option>
                    <option value='Education'>Education</option>
                    <option value='Fitness'>Fitness</option>
                    <option value='Personal'>Personal</option>
                    <option value='Health'>Health</option>
                    <option value='Chores'>Chores</option>
                </select>
                <DropDownDate newDate={newDate} />
            </div>        
            <button type="submit" className="submitBtn btn btn-primary"> 
                Submit
            </button>
        </form>
    )      
}

export default Form