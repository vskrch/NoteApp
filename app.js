
 //Task class: Represents Task and it's props
class Task{
    constructor(title,type,date1){
        this.title = title;
        this.type = type;
        this.date1 = date1;

    }
}

 //UI class : Handle UI Tasks
class UI{
    static displayTasks(){
       

        const tasks = Store.getTasks();

        tasks.forEach((task)=> UI.addTastToList(task));
    }
    static addTastToList(task){
        const list = document.querySelector('#task-list');

        const row = document.createElement('tr');
        row.classList.add('task-row');
        row.dataset.date1 = task.date1;

        row.innerHTML = `
        <td> ${task.title}</td>
        <td> ${task.type}</td>
        <td> ${task.date1}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete" task-date1="${task.date1}">X</a></td>
        
        `;
        list.appendChild(row);

    }

    static deleteTask(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();

        }

    }
    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = 
        `
        alert alert-${className}
        `;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#list-form');
        container.insertBefore(div,form);
        //clear alert after 3 sec
        setTimeout(()=>document.querySelector('.alert').remove(),3000);

    }
    static clearFields(){
        document.querySelector('#title').value="";
        document.querySelector('#type').value="";
        document.querySelector('#date1').value="";
    }
}

//storage class
class Store{
    static getTasks(){
        let tasks;
        if(localStorage.getItem('tasks') === null){
            tasks = [];

        }else{
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }
        return tasks;

    }
   static  addTask(task){
       const tasks  = Store.getTasks();
       tasks.push(task);
       localStorage.setItem('tasks',JSON.stringify(tasks));

    }
   static removeTask(date1){
       const tasks = Store.getTasks();
       tasks.forEach((task,index)=>{
           if(task.date1 === date1){

            tasks.splice(index,1)
           }
       });
       localStorage.setItem('tasks',JSON.stringify(tasks));

   }
}


 //Event : Display Tasks/to-do
 document.addEventListener('DOMContentLoaded',UI.displayTasks);

 //Event : Add a Task
 document.querySelector('#list-form').addEventListener('submit',(event)=>{
     //get form data
     event.preventDefault();
     const title = document.querySelector('#title').value;
     const type = document.querySelector('#type').value;
     const date1 = document.querySelector('#date1').value;

//validate
    if(title === '' || type === '' || date1 ===''){
       UI.showAlert("Fill Out first!","danger");
    }else{

  
     //Instanciate Task 
     const task = new Task(title,type,date1);
     console.log(task);
     //show success message
     UI.showAlert('Task Added!','success');
        //Add task to store
        Store.addTask(task);
     //Add task to UI

     UI.addTastToList(task);

     //clear the clutter after submit
     UI.clearFields();
    }
     
 });

 //Event : Remove a Task

 document.querySelector('#task-list').addEventListener('click',(event)=>{
     UI.deleteTask(event.target)
     //remove from storage
     Store.removeTask(event.target.parentElement.previousElementSibling.textContent);
     //show success message
     UI.showAlert('Task removed', 'danger');
 });
