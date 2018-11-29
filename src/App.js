import React from "react";
import { withRouter, Route, Link, } from "react-router-dom";

import About from './pages/About';
import TodoList from './pages/TodoList';
import SignUp from './authentication/SignUp';
import SignIn from './authentication/SignIn';
import Account from './pages/Account';
import ErrorPage from './pages/404';

import { Nav, NavItem, NavLink, Navbar, NavbarBrand, Button } from 'reactstrap';
import firebase from './firebase';





class App extends React.Component {
  constructor(props) {
  super(props);
    this.state = {
      date: new Date(),
      isLoggedIn: false,
      username: '',
    };
  this.onClick = this.onClick.bind(this);
} 



componentDidMount() {
    // Bind the variable to the instance of the class.
  this.authFirebaseListener =  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      var self = this
      let uid = user.uid
      firebase.database().ref('todoapp/users/' + uid).once('value').then(function(snapshot) {
        var username = (snapshot.val() && snapshot.val().username) || 'Anonymous';
        self.setState({
          username: username,
          isLoggedIn: true
        })
        
      });

    } 
    else {
      this.setState({
       isLoggedIn: false
      });
    }
  });
}

componentWillUnmount() {
  this.authFirebaseListener && this.authFirebaseListener() // Unlisten it by calling it as a function 

} 


onClick = (event) => {
event.preventDefault();
firebase.auth().signOut().then(function() {
  console.log('Sign-out successful.')
}).catch(function(error) {
  console.log('An error happened.')
});
this.props.history.push('./About')
this.setState({
  isLoggedIn: false
})
};
  
render() {
  const isLoggedIn = this.state.isLoggedIn;
  console.log('username app.js')
  console.log(this.state.username) 
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
        <NavLink tag={Link}  to="/pages/About">About</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/pages/TodoList">Todo List</NavLink>
      </NavItem>
      <NavItem>
        <NavLink tag={Link} to="/Pages/Account">{this.state.username}</NavLink>
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
          <NavLink tag={Link}  to="/pages/About">About</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/pages/SignIn" >Sign In</NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to="/pages/SignUp">Sign Up</NavLink>
        </NavItem>
      </Nav>
  </Navbar>
    }
      </div>

      <div>
        <Route exact path="/" component ={About}/>
        <Route path="/pages/About" component={About} />
        <Route path="/pages/TodoList" component={TodoList} />
        <Route path="/pages/SignIn" component={SignIn} />
        <Route path="/pages/Account" component={Account} />
        <Route path="/pages/SignUp" component={SignUp} />
        <Route path="/pages/404" component={ErrorPage} />
      </div>
    </div>
  )
}

}
export default withRouter (App);