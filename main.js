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
let addItems=[];
let priority =0;
let customLabels=[{label:"All",color:"Red"}];

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

//Adding task
function addTaskObject(){
    var flag=-1;
    var obj = {
        todo:task.value,
        prioritylevel:priority,
    };
    //Adding custom label to the list.
    if(customLabel){
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
    addItems.push({todo:obj.todo,prioritylevel: obj.prioritylevel,label:obj.label});
    console.table(addItems);
    console.table(customLabels);
    //Displaying all the tasks
    renderTasks(addItems);

    //Resetting priority to zero before next task
    priority=0;
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
          createLabelList(el);
  });
  const joinedList = labelList.join("");
  labelBlock.innerHTML = joinedList;
}
//Creating label list
function createLabelList(element){
    
    return `<button style="background-color: ${element.color}" >${element.label}</button>
    `
}

//Rendering different  priority task.
function createPriorityList(element){
    if(element.label){
        return `<li>
       <span>${element.todo}</span>
      <button style="background-color: ${findColor(element.label)}">${element.label}</button>
      
        <button class="task-done"  onclick="TaskDone()">Done</button>
        <button class="Delete-task" onclick="DeleteTask()">Delete</button>


</li>`
    }
    else{
        return `<li>
       <span>${element.todo}</span>
        <button class="task-done"  onclick="TaskDone()">Done</button>
        <button class="Delete-task" onclick="DeleteTask()">Delete</button>


</li>`
    }
}

//Finding all high priority tasks
function highPriorityTask(){
    const priorityList = addItems.map(el=>{
       if(el.prioritylevel===1) return createPriorityList(el);
    });
    console.log(priorityList);
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
    return `<li>
        <span>${element.todo}</span>
        <button style="background-color:${findColor(element.label)}">${element.label}</button>
        <button class="priority" style="background-color: ${color}">${priority}</button>
        <button class="task-done"  onclick="TaskDone()">Done</button>
        <button class="Delete-task" onclick="DeleteTask()">Delete</button>

</li>`
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
    const color = customLabels.map(el=>{
       if(el.label===label)
           return el.color
    });
    return color[1]
}

