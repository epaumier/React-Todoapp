import React from 'react';
import { withRouter } from 'react-router-dom';
import {ListGroup, Input, Collapse, Button,} from 'reactstrap'
import TodoItem from './TodoItem';
import DeletedItem from './DeletedItem';
import firebase from "../firebase";

class TodoList extends React.Component {
    constructor(props) {
        super(props);

    this.state =
       { 
        tasklist : [],
        NewInputValue: '',
        uid: '',
        emptytasklist: false,
        emptydellist: false,
        deletedlist : [],
        collapse: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.toggle = this.toggle.bind(this); 
    }
    
LoadUserID() {
  let self = this;
  //
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const currentuid = user.uid
      console.log('currentuid');
      console.log(currentuid);
        self.setState({
          uid: currentuid,
    })

    const ref = firebase.database().ref('/todoapp/users/' + self.state.uid + '/activelist/todos');
    const del = firebase.database().ref('/todoapp/users/' + self.state.uid + '/deletedlist/todos');
    
    del.once('value').then(snap=>{
      let delitems = snap.val();
      if (delitems == null) {
        self.setState({
          emptydellist: true
        })
      }
      self.setState({
        deletedlist: delitems
      });
    })
    
    ref.once('value').then(snap=>{
      let database = snap.val();

      if (database == null) {
        self.setState({
          emptytasklist: true
        })
      }
      else{
      console.log('Etat de la DB initiale');
      console.log(database);           
      self.setState({
        tasklist: database,
      });
    }
    })
    
    } else {
        console.log('no one is logged in')
    }
  }
  ).bind(this)
}


componentDidMount() {
  this.LoadUserID();
}

componentWillUnmount() {
  this.LoadUserID();
}   
        
deleteTask = (event) => {
//event.target.value is the "value" property of the clicked item. In this case the clicked item
//is the list group item, and the value is the index.
const i = event.target.value

//Slicing an array is creating a shallow copy. In this case I am making a copy of the tasklist state.
let todos = this.state.tasklist.slice();
console.log('todos')
console.log(todos)
console.log('state deletedlist')
console.log(this.state.deletedlist)

//Below I use a conditional for removing todos from the active list and moving them to the 
//deleted items list in order to avoid pushing data into an empty arrays which will crash
//the app

//If the array exists and is not empty:
//I push into the state deletedlist array the item with the corresponding index.
// This array is mapped just below the active todos.
if(Array.isArray(this.state.deletedlist) && this.state.deletedlist.length){
let deleted = this.state.deletedlist.slice();
deleted.push(todos[i]);

//Splicing adds/removes items to an array. Here I remove from the array the item with the corresponding index
todos.splice(i, 1);

this.setState({
  tasklist: todos,
  deletedlist: deleted
});

firebase.database().ref('/todoapp/users/' + this.state.uid + '/activelist/').set({
  todos : todos
});

firebase.database().ref('/todoapp/users/' + this.state.uid + '/deletedlist/').set({
  todos: deleted
});

}

//The array does not exist or is empty:
//I push into a new array the item with the corresponding index
else {
  let deleteditems = []
  deleteditems.push(todos[i]);

  //Splicing adds/removes items to an array. Here I remove from the array the item with the corresponding index
  todos.splice(i, 1);
  
  //Setting state on both arrays in order to reflect the latest values of each
  //since the del list is empty, i have to display it by setting true on emptydellist
  this.setState({
    tasklist: todos,
    deletedlist: deleteditems,
    emptydellist : false
  });

  //Below I am transferring to Firebase the new values of each arrays
  firebase.database().ref('/todoapp/users/' + this.state.uid + '/deletedlist/').set({
    todos: deleteditems
    });
  

  firebase.database().ref('/todoapp/users/' + this.state.uid + '/activelist/').set({
    todos
  });
}

//If the todos array's length is equal to 0, the corresponding state is set to true which triggers a conditonal
//displaying the message "The todolist is empty"
if(todos.length === 0) {
  this.setState({
      emptytasklist : true
  })
}
}

RestoreTask = (event) => {
  //event.target.value is the "value" property of the clicked item. here value is the index of the deleted todo
  const i = event.target.value
  console.log('i')
  console.log(i)
  //Creating shallow copies of both tasklist and deletedlist arrays located in the state
  let todos = this.state.tasklist.slice();
  let deleted = this.state.deletedlist.slice();

  //Here I am accesing the item with the corresponding index in the array copy of deletedlist,
  //and storing it in a variable called todotorestore.
  let todotorestore = deleted[i];
  console.log('todotorestore')
  console.log(todotorestore)
  
  //Push the 'Todo to restore' in the array todos, which is a copy of the active todo list
  todos.push(todotorestore);

//Removing the restored item from the copy of deleted todos
  deleted.splice(i, 1);
  
//Finally, assigning to state both copies, updating the Active todo list and Deleted todos list  
  this.setState({
    tasklist: todos,
    deletedlist: deleted,
    emptytasklist: false
  });

  firebase.database().ref('/todoapp/users/' + this.state.uid + '/activelist/').set({
    todos: todos
  });

  firebase.database().ref('/todoapp/users/' + this.state.uid + '/deletedlist/').set({
      todos: deleted
  });

  if(deleted.length === 0) {
    this.setState({
        emptydellist : true
    })
  }
}

//Deleted Items are children of a collapse reactstrap component. It is toggled by this method.
toggle() {
  this.setState({ collapse: !this.state.collapse });
}

handleChange(input) {
  let name = input.target.name
  this.setState({
    [name]: input.target.value
  });
}
      
CreateTask = (event) => {
  if (event.key === 'Enter'){
    let todos = this.state.tasklist
    let newTaskList = this.state.tasklist
    if(Array.isArray(todos) && todos.length){
      // array exists and is not empty
    
    let newEntry = {
      itemId: Date.now(),
      itemText: event.target.value
    }
    newTaskList.push(newEntry)
    console.log('NewTasklist')
    console.log(newTaskList)
    this.setState({
      tasklist: newTaskList,
      NewInputValue: "",
    })
    firebase.database().ref('/todoapp/users/' + this.state.uid + '/activelist/').set({
    todos
    });
  }
  else
  {
    let todos = []
    let newEntry = {
      itemId: Date.now(),
      itemText: event.target.value
    }
    todos.push(newEntry)
    console.log('NewEntry')
    console.log(newEntry)
    this.setState({
      tasklist: todos,
      NewInputValue: "",
      emptytasklist: false
    })
    firebase.database().ref('/todoapp/users/' + this.state.uid + '/activelist/').set({
      todos
      });
  }
  }
}

render() {
  console.log('Etat de la liste des tâches');
  console.log(this.state.tasklist);

  console.log('Etat du champs de saisie (input)');
  console.log(this.state.NewInputValue);

  let data = this.state.tasklist
  let del = this.state.deletedlist
  console.log('Etat de data');
  console.log(data);

    console.log('Etat de data');
  console.log(data);

  const emptytasklist = this.state.emptytasklist
  const emptydellist = this.state.emptydellist
  return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          textAlign: 'center',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '10%'
        }}> 
        <div className='Input'>
            <Input  
              value={this.state.NewInputValue} 
              name="NewInputValue"
              placeholder="Enter Task" 
              onChange={this.handleChange}
              onKeyPress={this.CreateTask}
              style={{
                textAlign: 'center',
                width: '30%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
            />   
          </div>

      <div>
      {emptytasklist ? (
        <h2 style={{marginTop: '5rem'}}>The todolist is empty...</h2>
      ) : (
        <ListGroup 
        className='List'
        style={{
          textAlign: 'center',
          width: '40%',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingTop: '2rem',
        }}>
        
        {data.map((item, i) => <TodoItem
         itemText={item.itemText}
         key={item.itemId}
         value={i}
         deleteTask={this.deleteTask.bind(this)} />)}
      </ListGroup>
      )}
      </div>

      <div>
      {emptydellist ? (
        <div></div>
      ) : (
<div>
        <Button color="primary" onClick={this.toggle} 
        style={{ 
          marginBottom: '1rem',
          width: '30%',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '2rem'
        }}>
        Deleted Todos</Button>

        <Collapse isOpen={this.state.collapse}>

          <ListGroup 
            className='List'
            style={{
              textAlign: 'center',
              width: '40%',
              marginLeft: 'auto',
              marginRight: 'auto',
              paddingTop: '2rem',
            }}>
                    
            {del.map((item, i) => <DeletedItem
            itemText={item.itemText}
            key={item.itemId}
            value={i}
            RestoreTask={this.RestoreTask.bind(this)} />)}
          </ListGroup>

        </Collapse>
     </div>   
        )}
        </div>

        </div>
        )
    }
}

export default withRouter(TodoList);
