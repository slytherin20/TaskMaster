// Reading image file
const reader = new FileReader();
const file = document.getElementById("file");
const img = document.getElementById("img");

reader.onload=element=>{
    img.src=element.target.result;
};

file.addEventListener("change",element=>{
   const f = element.target.files[0];
   reader.readAsDataURL(f);
});

//Getting reference of the DOM elements
const task = document.querySelector("#add-task");
const customLabel = document.querySelector("#custom-label");
const color = document.querySelector("#color-picker");
const highPriority = document.querySelector("#high-priority");
const mediumPriority = document.querySelector("#medium-priority");
const lowPriority = document.querySelector("#low-priority");
const labelBlock = document.querySelector("#custom-labels");
const showTask = document.querySelector("#main-col #append-task");
const doneTasks = document.querySelector("#add-col #taskdone");
let addItems=[];
let priority =0;
let customLabels=[{label:"All",color:"#d71627"}];
let doneTask = [];

//Displaying labels
renderLabels(customLabels);

//Setting priority of task

highPriority.onclick = function(){
    priority = 1;
    console.log(priority);
};
mediumPriority.onclick = function(){
    priority=2;
    console.log(priority);
};
lowPriority.onclick = function(){
    priority=3;
    console.log(priority);
};

//Changing color of color button
color.oninput = function(){
    color.style.backgroundColor = `${color.value}`;
    color.style.color = `${color.value}`;
};


//Showing color field description
color.onmouseover = function(){
    color.title = "Choose color for the custom label."
};

//Adding task
function addTaskObject(){
    if(task.value){
        var flag=-1;
        var obj = {
            todo:task.value,
            prioritylevel:priority,
            time: new Date()
        };
        //Adding custom label to the list.
        if(customLabel.value){
            obj = customlabelRender(customLabel,obj);

            //Checking if it already exists.
            customLabels.map(el=>{
                if(el.label===obj.label){
                    flag=1;
                }
            });
            if(flag===-1) customLabels.push({label:obj.label,color:obj.color});

        }

        renderLabels(customLabels);
        addItems.push({todo:obj.todo,prioritylevel: obj.prioritylevel,label:obj.label,time:obj.time});
        console.table(addItems);
        console.table(customLabels);
        //Displaying all the tasks
        renderTasks(addItems);

        //Resetting priority to zero before next task
        priority=0;
    }else{
        window.alert("Please add a task value and Try again!!");
    }
}

//Custom label addition to list
function customlabelRender(customlabel,obj){
    if(customLabels.length!==0){
        customLabels.map(el=>{
           if(el.label===customlabel.value){
               el.color = color.value;
           }
        });
    }
                obj.label = customlabel.value;
                obj.color = color.value;

    return obj;
}

//Show labels on side bar
function renderLabels(customLabels){
  const labelList = customLabels.map(el=>{
      if(el.label)
          return createLabelList(el);
  });
  labelBlock.innerHTML = labelList.join("");
}
//Creating label list
function createLabelList(element){
    return `<button class="btn mb-1" style="background-color: ${element.color}" onclick="showSameLabelTask('${element.label}')">${element.label}</button>
    `
}

//Rendering different  priority task.
function createPriorityList(element){
    if(element.label){
        return `<li>
       <span>${element.todo}</span>
        <button class='btn-sm' style=" background-color: white;
  color: black; border:2px solid ${findColor(element.label)}">${element.label}</button>
        <button class="task-done" onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>


</li>`
    }
    else{
        return `<li>
       <span>${element.todo}</span>
        <button class="task-done" onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>


</li>`
    }
}

//Finding all high priority tasks
function highPriorityTask(){
    const priorityList = addItems.map(el=>{
       if(el.prioritylevel===1) return createPriorityList(el);
    });
    const joinedPriorityList = priorityList.join("");
    showTask.innerHTML =joinedPriorityList

}

//Finding all medium priority tasks
function mediumPriorityTask(){
    const priorityList = addItems.map(el=>{
        if(el.prioritylevel===2) return createPriorityList(el);
    });
    const joinedPriorityList = priorityList.join("");
    showTask.innerHTML = joinedPriorityList;
}

//Finding all low priority tasks.
function lowPriorityTask(){
    const priorityList = addItems.map(el=>{
        if(el.prioritylevel===3) return createPriorityList(el);
    });
    const joinedPriorityList = priorityList.join("");
    showTask.innerHTML = joinedPriorityList;
}

//Getting all tasks
function renderingTask(element){
    var priority;
    var color;
    var obj = JSON.stringify(element);
    if(element.prioritylevel){
        if(element.prioritylevel===1)
        {priority="High";
            color="red"}
        else if(element.prioritylevel===2)
        { priority = "Medium";
            color="orange"}
        else if(element.prioritylevel===3) {
            priority = "Low";
            color = "blue"
        }
        if(element.label){
            return `<li>
        <span>${element.todo}</span>
        <button class='btn-sm' style=" background-color: white;
  color: black; border:2px solid ${findColor(element.label)}">${element.label}</button>
        <button class="priority btn-sm" style=" background-color: white;
  color: black; border:2px solid ${color}" >${priority}</button>
        <button class="task-done" onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>

</li>`
        }
        else{
            return `<li>
        <span>${element.todo}</span>
        <button class="priority btn-sm" style=" background-color: white;
  color: black; border:2px solid ${color}">${priority}</button>
        <button class="task-done" onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>

</li>`
        }
    }
    else{
        if(element.label){
            return `<li>
        <span>${element.todo}</span>
        <button class="priority btn-sm" style=" background-color: white;
  color: black; border:2px solid ${findColor(element.label)}">${element.label}</button>
        <button class="task-done"  onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>

</li>`
        }
        else{
            return `<li>
        <span>${element.todo}</span>
        <button class="task-done" onclick="TaskDone(${element.time.valueOf()},'${element.label}')">Done</button>
        <button class="Delete-task" onclick="deleteTask(${element.time.valueOf()},'${element.label}')">Delete</button>

</li>`
        }
    }
}

//Showing all tasks
function renderTasks(arr){
    const appendTask = arr.map(el=>{
       return renderingTask(el);
    });
    const joinedappendTask = appendTask.join("");
    showTask.innerHTML = joinedappendTask;
}

//Finding corresponding label to a color
function findColor(label){
 for(let x of customLabels){
     if(x.label===label){
         return x.color
     }
 }
}

//Showing same label task.
function showSameLabelTask(label) {
    if (label === 'All') {
        renderTasks(addItems);
    }
    else {
        const show = addItems.map(el => {
            if (el.label === label) {
                return renderingTask(el);
            }
        });
        showTask.innerHTML = show.join("")
    }
}

//Done task selection
function TaskDone(date,label){
    var count = countItems(label);
    for(let i=0;i<addItems.length;i++){
        if(date===addItems[i].time.valueOf()) {
            if(count===1){
                removeLabel(label);
                renderLabels(customLabels);
            }
            doneTask.push(addItems[i]);
            addItems.splice(i,1);
            renderTasks(addItems);
            renderDoneTask();
            break;
        }
    }
}

//Deleteing a task.
function deleteTask(date,label){
    var count = countItems(label);
    for(let i=0;i<addItems.length;i++){
        if(date===addItems[i].time.valueOf()) {
            if(count===1){
                removeLabel(label);
                renderLabels(customLabels);
            }
            addItems.splice(i,1);
            renderTasks(addItems);
            break;
        }
    }
}

//Finding number of objects belonging to same label.
function countItems(label){
    var c=0;
    for(let x of addItems){
        if(x.label==label) c=c+1;
    }
    return c;
}

//Removing Label from customlabelList.
function removeLabel(label){
    for(let i=0;i<customLabels.length;i++){
        if(customLabels[i].label==label){
            customLabels.splice(i,1);
            break;
        }
    }
}

//Rendering Completed Tasks

function renderDoneTask(){
    const done = doneTask.map(el=>{
        return `<li>${el.todo}
<button onclick="doneTaskDelete(${el.time.valueOf()})">Delete</button></li>`
    });
    doneTasks.innerHTML = done.join("")

}

//Deleting completed task.
function doneTaskDelete(time){
    for(let i=0;i<doneTask.length;i++){
        if(doneTask[i].time.valueOf()===time){
            doneTask.splice(i,1);
            renderDoneTask();
            return;
        }
    }
}