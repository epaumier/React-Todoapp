import React from 'react';
import { Link } from 'react-router-dom';
import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import firebase from '../firebase';

class Navigation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: new Date(),
        isLoggedIn: true,
        username: '',
    
        };
      this.onClick = this.onClick.bind(this);
  
  }

  getDerivedStateFromProps() {
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
  });
}

  
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
    const isLoggedIn = this.state; 
    console.log('isLoggedIn ?')
    console.log(this.isLoggedIn)
  return (

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

/*   <Navbar color="light" light expand="md">
  <NavbarBrand href="/">Todo App</NavbarBrand>
  <Nav className="ml-auto" navbar>
  <NavItem>
      <NavLink tag={Link}  to="/pages/Home">Home</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/TodoList">Todo List</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/SignIn" >Sign In</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/SignUp">Sign Up</NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={Link} to="/pages/Account">Account</NavLink>
    </NavItem>
    <NavItem>
      <Button  onClick={this.onClick} color="light" >Sign Out</Button>
    </NavItem>
    </Nav>
  </Navbar> */
   ) }
}
  export default withRouter(Navigation);