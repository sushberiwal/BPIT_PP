let todoInput = document.querySelector(".todo-input");
let todosList = document.querySelector(".todo-list");

todoInput.addEventListener("keypress" , handleKeyPress);

function handleKeyPress(event){
    if(event.key == "Enter"){
        let todo = event.target.value;
        if(todo){
         let li = document.createElement("li");
         li.classList.add("todo");
         // sets the html of li
         li.innerHTML = todo;
         li.addEventListener("dblclick" , handleDeleteTodo);
         todosList.append(li);
         event.target.value="";
        }
        else{
            alert("Enter a todo !!");
        }
     }
}

function handleDeleteTodo(e){
    e.target.remove();
}