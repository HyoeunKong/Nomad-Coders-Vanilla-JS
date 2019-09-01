const toDoForm = document.querySelector(".js-toDoForm"),
        toDoInput = toDoForm.querySelector("input"),
        toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';


let toDos = [];


function deleteToDo(event){
    const btn = event.target
    const li = btn.parentNode;
    toDoList.removeChild(li);
    console.log(toDos);
    const cleanToDos = toDos.filter(function(toDo){
        //console.log(toDo.id, li.id);
        return toDo.id !== parseInt(li.id)
    
        
    }); //filerFn이 체크가된 아이템들의 array를 준다.
   toDos = cleanToDos
   saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
    const li = document.createElement("li"); 
    const delBtn = document.createElement("button");
    //console.dir(delBtn);
    delBtn.innerHTML = "delete";
    delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    const newId = toDos.length + 1;
    span.innerText = text;
    //console.dir(span)
    li.appendChild(span);
    li.appendChild(delBtn);
    li.id = newId;
    toDoList.appendChild(li);
    //console.log(toDos.length);
    const toDoObj = {
        text:text,
        id: newId
    };
     
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue = toDoInput.value;   
    paintToDo(currentValue)
    toDoInput.value = "";

}


function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
   
    if(loadedToDos !== null){
        const parsedToDos = JSON.parse(loadedToDos);
        //console.log("-----------------")
        //console.log(parsedToDos)
        parsedToDos.forEach(function(toDo){
            paintToDo(toDo.text);
        });
        
      } 
    }

        
function init(){
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit)
}

init();