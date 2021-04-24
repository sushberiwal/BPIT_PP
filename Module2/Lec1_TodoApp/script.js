let todoInput = document.querySelector(".todo-input");
let todosList = document.querySelector(".todo-list");

todoInput.addEventListener("keypress" , function(event){
    if(event.key == "Enter"){
       let todo = event.target.value;
       if(todo){
        let li = document.createElement("li");
        // sets the html of li
        li.innerHTML = todo;
        todosList.append(li);

        event.target.value="";
       }
       else{
           alert("Enter a todo !!");
       }
    }
})