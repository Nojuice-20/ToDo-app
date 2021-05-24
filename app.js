
class TaskManager {
  constructor(name){
      this.allTasks = [];
      const tasks = Object.assign({}, this.allTasks);
      
  }

  updateLocalStorage() {
    localStorage.setItem('allTasks', JSON.stringify(this.allTasks));
  }

  
  makeTaskObjects (assignedBy, assignedTo, description, dueDate, status){
    console.log("make task running")
    
    let ID = 0
    
    if(this.allTasks.length === 0){
        ID = 1
    } else {
        let lastItemID = this.allTasks[this.allTasks.length-1].ID
        ID = lastItemID + 1

    }
    
  
    let newTask = {
        "AssignedBy": assignedBy, 
        "Des": description,
        "AssignedTo": assignedTo,
        "DueD": dueDate,
        "status": status,
        "ID": ID
        }
    
        this.allTasks.push(newTask)
        this.updateLocalStorage()
    
  }

  getAllallTasks(){
      console.log(this.allTasks);
      this.updateLocalStorage()
      
  }

  renderTask(taskObj){
      let cardHTML =   `<div class="col" taskID="${taskObj.ID}">
      <div class="card text-dark bg-light mb-3" style="max-width: 18rem;">
      <div class="card-body">
            <p class="card-text">Maker: <br> ${taskObj.AssignedBy} </p>
            <p class="card-text">Task: <br> ${taskObj.Des} </p>
            <p class="card-text"> Assigined to: <br> ${taskObj.assignedTo}</p>
            <p class="card-text">Date: ${taskObj.DueD}</p>
            <p class="card-text">Status: ${taskObj.status} </p>
            <button class="delete btn btn-danger" card-id=${taskObj.ID}>Delete</button>
          </div>
        </div>
    </div>`

      let cardsHTMLrow = document.querySelector('#cardsArea');
      cardsHTMLrow.innerHTML += cardHTML;
      this.updateLocalStorage()
  
      const card = document.createElement('div');
      card.classList.add('card', 'list-group-item');
      card.setAttribute('id', 'task-' + ID);
      card.innerHTML = cardHTML
  
      card.querySelector('button.delete').addEventListener('click', (e) => {
        const taskId = e.currentTarget.getAttribute('card-id');
        this.deleteTask(taskId);
      });
      
    }
   
  
    deleteTask(taskId) {
      delete this.tasks[taskId];
      const cardToDelete = document.getElementById('taskObj-' + ID);
      cardToDelete.remove();
      this.updateLocalStorage();
    }
    
    
  }
  



const taskManager = new TaskManager()

document.querySelector('#addbutton').addEventListener('click', function(){
  const assignedBy = document.querySelector('#Assigner').value;
  const assignedTo = document.querySelector('#Description').value;
  const description = document.querySelector('#Assigned-To').value;
  const dueDate = document.querySelector('#DueDate').value;
  const status = document.querySelector('#StatusSel').value;

  let allValuesValid = validateForm(assignedBy, assignedTo, description, dueDate, status)

  if(allValuesValid == true){
      console.log("all valid")
      taskManager.makeTaskObjects (assignedBy, assignedTo, description, dueDate, status)
      taskManager.renderTask(taskManager.allTasks[taskManager.allTasks.length - 1])
      
      
  } else {
      console.log("Not valid")
  }

  
  
});



function validateForm(assignedBy, assignedTo, description, dueDate, status){
  

  let isAllValid = false

  if (((assignedTo.length > 0) && (assignedTo.length < 20)) && ((assignedBy.length > 0) && (assignedBy.length < 20)) && ((description.length > 0) && (description.length < 10)) && (dueDate) && (status)) {
      isAllValid = true
      return isAllValid;
  }

  

}









