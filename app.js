
 //Task class: Represents Task and it's props
class Task{
    constructor(title,type,date){
        this.title = title;
        this.type = type;
        this.date = date;

    }
}
 //UI class : Handle UI Tasks
class UI{
    static displayTasks(){
        const StoredTasks =[
            {
                title: 'Read EPI',
                type: 'study',
                date:'17-07-2021'

        },{
            title:'water the plants',
            type:'chore',
            date:'25-07-2021'

        }];

        const tasks = StoredTasks;

        tasks.forEach((task)=> UI.addTastToList(task));
    }
    static addTastToList(task){
        const list = document.querySelector('#task-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td> ${task.title}</td>
        <td> ${task.type}</td>
        <td> ${task.date}</td>
        <td><a href='#' class="btn btn-danger btn-sm delete">X</a></td>
        
        `;
        list.appendChild(row);

    }

    static deleteTask(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();

        }

    }
    static clearFields(){
        document.querySelector('#title').value="";
        document.querySelector('#type').value="";
        document.querySelector('#date').value="";
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
     const date = document.querySelector('#date').value;


     //Instanciate Task 
     const task = new Task(title,type,date);
     console.log(task);

     //Add taskt to UI

     UI.addTastToList(task);

     //clear the clutter after submit
     UI.clearFields();
     
 });

 //Event : Remove a Task

 document.querySelector('#task-list').addEventListener('click',(event)=>{
     UI.deleteTask(event.target)
 });
