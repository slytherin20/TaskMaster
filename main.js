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

//Adding task
const task = document.getElementById("add-task");
const addTask = document.getElementById("add");
const customLabel = document.getElementById("custom-label");
const color = document.getElementById("color-picker");
const highPriority = document.getElementById("high-priority");
const mediumPriority = document.getElementById("medium-priority");
const lowPriority = document.getElementById("low-priority");
let addItems = [];
let priority=[];





