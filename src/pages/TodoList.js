import React from 'react';
import { withRouter } from 'react-router-dom';
import {ListGroup} from 'reactstrap'
import { Input } from 'reactstrap';
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
      }
      this.handleChange = this.handleChange.bind(this); 
    }

LoadUserID() {
  var self = this
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      const currentuid = user.uid
      console.log('currentuid');
      console.log(currentuid);
        self.setState({
          uid: currentuid
    }) 

    var ref = firebase.database().ref('/todoapp/users/' + self.state.uid + '/list/todos');
    ref.once('value').then(snap=>{
      let database = snap.val();
            
      console.log('Etat de la DB initiale');
      console.log(database);           
      self.setState({
        tasklist: database
      });
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
        
deleteTask(event) {
    const i = event.target.itemId
    let todos = this.state.tasklist.slice();
    todos.splice(i, 1);
    console.log('etat de todos dans deletetask')
    console.log(todos)

    this.setState({
      tasklist : todos
    })

  }    

    handleChange(input) {
        let name = input.target.name
        this.setState({
          [name]: input.target.value
        });
      }
      
CreateTask = (event) => {
    
  
  
  if (event.key === 'Enter'){

        let newTaskList = this.state.tasklist
        let todos = this.state.tasklist
        let newEntry = {
          itemId: Date.now(),
          itemText: event.target.value
        }

        newTaskList.push(newEntry)

        this.setState({
          tasklist: newTaskList
        })
  
        this.setState({
          NewInputValue: ""
        })
        
         firebase.database().ref('/todoapp/users/' + this.state.uid + '/list/').set({
          todos
        });
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

  return (
        <div> 
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

            <ListGroup 
              className='List'
              style={{
                textAlign: 'center',
                width: '40%',
                marginLeft: 'auto',
                marginRight: 'auto',
              }}>
              
              {data.map((item,i) => <TodoItem
               itemText={item.itemText}
               itemId={item.itemId}
               key={i}
               deleteTask={this.deleteTask.bind(this)} />)}
            </ListGroup>

                
            
        </div>
        )
    }
}

export default withRouter(TodoList);
