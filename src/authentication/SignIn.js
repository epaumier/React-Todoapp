import React from 'react';
import { withRouter } from 'react-router-dom';

import { Button, Form, FormGroup, Input, Alert } from 'reactstrap';

import firebase from "../firebase";

class SigninForm extends React.Component {
    constructor(props) {
        super(props);
         
    this.state = {    email: '',
    password: '',
    error: null,
    wrongpassword: false,
    invalidemail: false,
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
firebase.auth().signInWithEmailAndPassword(
    this.state.email,
    this.state.password).then(() => {
        this.props.history.push({
            pathname: '../pages/TodoList',
            state: {
               isLoggedIn: true,
               username: this.state.username,
               bidule: this.state.bidule,
           },
        }
    )}
    ).catch((error) => {
    this.setState({
        wrongpassword: false,
        invalidemail: false,
    })
        // Handle Errors here.
        var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode === 'auth/wrong-password') {
    console.log('Wrong password.');
    this.setState({
        wrongpassword: true
    })
  } else if (errorCode === 'auth/invalid-email') {
    console.log('Invalid Email');
    this.setState({
        invalidemail: true
    })
  }
  else {
      alert(errorMessage)
  }
  console.log(error);

        // ...
      })
      event.preventDefault();
    };

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

        <div className='Input'  style={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            width: '30%',
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: '10%'
             }}>
        <h2 style={{paddingBottom: '2rem'}}>Please Sign in</h2>
        <Form onSubmit={this.onSubmit}>
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
        
        <div style={{marginTop: '2rem'}}>
        { this.state.wrongpassword &&
            <Alert color="danger">
                Wrong Password !
            </Alert>
        }
        { this.state.invalidemail &&
            <Alert color="danger">
                Invalid Email !
            </Alert>
        }
        </div>
        </div>
            )}};

export default withRouter(SigninForm);
