import React from "react";
import { withRouter, Route, Link, } from "react-router-dom";

import Home from './pages/Home';
import TodoList from './pages/TodoList';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import Account from './pages/Account'

import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap';
import firebase from './firebase';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        isLoggedIn: null,
        username: '',
        };
      this.onClick = this.onClick.bind(this);
  }
  
/*     componentDidMount() {
        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            this.SetState({
              isLoggedIn: true
            })
          } else {
            this.SetState({
              isLoggedIn: false
            })
          }
          console.log('user de firebase')
          console.log(user)
  
        }.bind(this));      
      }  */


  onClick = (event) => {
    event.preventDefault();
   firebase.auth().signOut().then(function() {
    console.log('Sign-out successful.')
    }).catch(function(error) {
    console.log('An error happened.')
    });
    this.props.history.push('./Home')
    
    };
  
  render() {
    const isLoggedIn = this.state.isLoggedIn; 
  return (
        <div>
    <div>
    {
      !!isLoggedIn ?
      <div>
  <Navbar color="light" light expand="md">
  <NavbarBrand href="/">Todo App</NavbarBrand>
  <Nav className="ml-auto" navbar>
  <NavItem>
      <NavLink tag={Link}  to="/pages/Home">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/TodoList">Todo List</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/Account">Account</NavLink>
    </NavItem>
    <NavItem>
      <p>Welcome {this.state.username}</p>
    </NavItem>
    <NavItem>
      <Button  onClick={this.onClick} color="light" >Sign Out</Button>
    </NavItem>
    </Nav>
  </Navbar>
    </div> 
      
      :

  <Navbar color="light" light expand="md">
  <NavbarBrand href="/">Todo App</NavbarBrand>
  <Nav className="ml-auto" navbar>
  <NavItem>
      <NavLink tag={Link}  to="/pages/Home">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/SignIn" >Sign In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/SignUp">Sign Up</NavLink>
    </NavItem>
    <NavItem>
      <Button  onClick={this.onClick} color="light" >Sign Out</Button>
    </NavItem>
      </Nav>
  </Navbar>
    }
    </div>

<div>


<Route path="/pages/Home" component={Home} />
<Route path="/pages/TodoList" component={TodoList} />
<Route path="/pages/SignIn" component={SignIn} />
<Route path="/pages/Account" component={Account} />
<Route path="/pages/SignUp" component={SignUp} />


</div>

</div>
)
  }
}
export default withRouter (App);