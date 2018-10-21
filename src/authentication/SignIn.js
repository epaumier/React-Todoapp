import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Form, FormGroup, Input } from 'reactstrap';

import firebase from "../firebase";

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
         
    this.state = {    email: '',
    password: '',
    error: null,
    }
    this.onSubmit = this.onSubmit.bind(this);
    this.email = this.email.bind(this);
    this.password = this.password.bind(this);
    }

    email(input) {
        let name = input.target.name
        this.setState({
          [name]: input.target.value
        });
      }
    
    password(input) {
        let name = input.target.name
        this.setState({
          [name]: input.target.value
        });
      }


onSubmit = (event) => {
    try {
firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password);
}

catch(error) {
    // Handle Errors here.
console.log(error);
    // ...
  }

finally {
    this.props.history.push({
        pathname: '../pages/TodoList',
        state: {
           isLoggedIn: true,
           username: this.state.username,
       },
     }
     )
event.preventDefault();
}


/* 
.then(() => {
        this.props.history.push('../pages/TodoList')
        event.preventDefault(); 
    })
    .catch(error => {
        var errorCode = error.code;
        if (errorCode === 'auth/wrong-password') {
        console.log('Wrong password.');
    } else {
  
    }
      }); */
/* 
    .catch(function(error) {
        var errorCode = error.code; 
        if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
        } else {
  
            }
    } */
}

    render() {
        const {
            email,
            password,
            error,
          } = this.state;

          const isInvalid =
          email === '' ||
          password === '';
        
    return (

        <div className='Input'>
        <Form onSubmit={this.onSubmit}  style={{
        textAlign: 'center',
        width: '30%',
        marginLeft: 'auto',
        marginRight: 'auto',
         }} >
            <FormGroup>
                <Input
                    value={this.state.email}
                    name="email"
                    onChange={this.email}
                    type="email"
                    placeholder="Enter Email"
                />
            </FormGroup>

            <FormGroup>
                <Input 
                    value={this.state.password}
                    name="password"
                    onChange={this.password} 
                    type="password"
                    placeholder="Enter Password"
                />
            </FormGroup>
            <Button disabled={isInvalid} type="submit"> Sign In </Button>
            { error && <p>{error.message}</p> }
        </Form>
        </div>
            )}};

export default withRouter(SigninForm);
