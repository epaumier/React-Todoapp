import React from 'react';
import {
  withRouter,
  
} from 'react-router-dom'
import { Input, FormGroup, Form, Button } from 'reactstrap';

import firebase from "../firebase";


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    uid: ''
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.username = this.username.bind(this);
    this.email = this.username.bind(this);
    this.passwordOne = this.username.bind(this);
    this.passwordTwo = this.username.bind(this);
  }
  
  username(input) {
    let name = input.target.name
    this.setState({
      [name]: input.target.value
    });
  }
    
  email(input) {
    let name = input.target.name
    this.setState({
      [name]: input.target.value
    });
  }
    
  passwordOne(input) {
    let name = input.target.name
    this.setState({
      [name]: input.target.value
    });
  }
    
  passwordTwo(input) {
    let name = input.target.name
    this.setState({
      [name]: input.target.value
    });
  }

  onSubmit = (event) => {
    const email = this.state.email;
    const password = this.state.passwordOne;
    const username = this.state.username; 
    var self = this;
     firebase.auth().createUserWithEmailAndPassword(email, password);


    //Authentication State observer => waits for the sign up process to be done and then signs
    //in the user. It must be present on all pages that needs info about signed in user
     firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            var uid = user.uid;
            user.updateProfile({
              displayName: username,
            })
            firebase.database().ref('/todoapp/users/' + uid).set({
                username: username,
                email: email,
              });
              firebase.database().ref('/todoapp/users/'+ uid + '/list/').set({
               todos: [{itemId:'0', itemText:'Click me to delete'}]
              });
        } else {
          console.log('No user is signed in.')
        }
        self.setState({
          uid: uid
        })
      }); 

     this.props.history.push({
       pathname: '../pages/TodoList',
       state: {
          isLoggedIn: true,
          username: this.state.username,
          uid: this.state.uid,
      },
    }
    )

  event.preventDefault();  
  } 
  
 componentWillUnmount() {
  firebase.auth().onAuthStateChanged();
} 
 
  render() {
 
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    console.log('this.state.username');
    console.log(this.state.username);
    console.log('this.state.email');
    console.log(this.state.email);
    console.log('this.state.passwordOne');
    console.log(this.state.passwordOne);

    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '10%'
      }}>
<h2 style={{paddingBottom: '2rem'}}>Time to Sign Up !</h2>        
      <Form onSubmit={this.onSubmit} >
      <FormGroup>
        <Input
          value={this.state.username}
          name="username"
          onChange={this.username}
          type="text"
          placeholder="Username"
        />
        </FormGroup>

        <FormGroup>
        <Input
          value={this.state.email}
          name="email"
          onChange={this.email}
          type="text"
          placeholder="Email Address"
        />
        </FormGroup>

        <FormGroup>
        <Input
          value={this.state.passwordOne}
          name="passwordOne"
          onChange={this.passwordOne}
          type="password"
          placeholder="Password"
        />
        </FormGroup>
        
        <FormGroup>
        <Input
          value={this.state.passwordTwo}
          name="passwordTwo"
          onChange={this.passwordTwo}
          type="password"
          placeholder="Confirm Password"
        />
        </FormGroup>
       
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        

        { error && <p>{error.message}</p> }
      </Form>

</div>
    );
  }
}



export default withRouter(  SignUpForm, );

