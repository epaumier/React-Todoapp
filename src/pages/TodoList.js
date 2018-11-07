import React from 'react';
import { withRouter } from 'react-router-dom';
import {ListGroup, Input} from 'reactstrap'
import TodoItem from './TodoItem';
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
      }
      this.handleChange = this.handleChange.bind(this); 
    }
    
LoadUserID() {
  var self = this;
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const currentuid = user.uid
      console.log('currentuid');
      console.log(currentuid);
        self.setState({
          uid: currentuid,
    }) 

    var ref = firebase.database().ref('/todoapp/users/' + self.state.uid + '/list/todos');
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
        tasklist: database
      });
      }
    })
    
    } else {
        console.log('no one is logged in')
      }
        }
).bind(this)}


componentDidMount() {
  this.LoadUserID();
}

componentWillUnmount() {
  this.LoadUserID();
}   
        
deleteTask = (event) => {
const i = event.target.value
let todos = this.state.tasklist.slice();

todos.splice(i, 1);

  this.setState({
      tasklist: todos
  });
  firebase.database().ref('/todoapp/users/' + this.state.uid + '/list/').set({
    todos
    });
  if(todos.length === 0) {
    this.setState({
      emptytasklist : true
    })
  }
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
    firebase.database().ref('/todoapp/users/' + this.state.uid + '/list/').set({
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
    firebase.database().ref('/todoapp/users/' + this.state.uid + '/list/').set({
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

  console.log('Etat de data');
  console.log(data);

  const emptytasklist = this.state.emptytasklist
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
        )
    }
}

export default withRouter(TodoList);
