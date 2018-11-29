import React from 'react';
import {withRouter} from 'react-router-dom'
import { Input, FormGroup, Form, Button, Alert } from 'reactstrap';

import firebase from "../firebase";


class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
    uid: '',
    emailalreadyinuse: false,
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
    firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
      const user = firebase.auth().currentUser;
      let uid = user.uid

      this.props.history.push({
        pathname: '../pages/TodoList',
      })

      firebase.database().ref('/todoapp/users/' + uid).set({
        username: username,
        email: email,
      });
    
      firebase.database().ref('/todoapp/users/'+ uid + '/activelist/').set({
        todos: []
      });
    }).catch((error) => {
      this.setState({
          emailalreadyinuse: false,
      })
          // Handle Errors here.
          var errorCode = error.code;
    var errorMessage = error.message;
    if (errorCode === "auth/email-already-in-use") {
      this.setState({
          emailalreadyinuse: true
      })
    }
    else {
      alert(errorMessage)
    }
        })
   event.preventDefault();
  }
  
 componentWillUnmount() {

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
          autoComplete="username"
        />
        </FormGroup>

        <FormGroup>
        <Input
          value={this.state.email}
          name="email"
          onChange={this.email}
          type="text"
          placeholder="Email Address"
          autoComplete="email"
        />
        </FormGroup>

        <FormGroup>
        <Input
          value={this.state.passwordOne}
          name="passwordOne"
          onChange={this.passwordOne}
          type="password"
          placeholder="Password"
          autoComplete="new-password"
        />
        </FormGroup>
        
        <FormGroup>
        <Input
          value={this.state.passwordTwo}
          name="passwordTwo"
          onChange={this.passwordTwo}
          type="password"
          placeholder="Confirm Password"
          autoComplete="new-password"
        />
        </FormGroup>
       
        <Button disabled={isInvalid} type="submit">
          Sign Up
        </Button>

        

        { error && <p>{error.message}</p> }
      </Form>

              { this.state.emailalreadyinuse &&
            <Alert color="danger">
                Email already in use !
            </Alert>
        }

</div>
    );
  }
}



export default withRouter(SignUpForm);

