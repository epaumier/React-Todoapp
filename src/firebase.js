import firebase from "firebase";

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyCWB5BRRdpPysu3LKEM0QYXgSBFsmQqTh8',
    authDomain: "todo-2dc22.firebaseapp.com",
    databaseURL: "https://todo-2dc22.firebaseio.com",
    /* projectId: "todo-2dc22", */
    storageBucket: "todo-2dc22.appspot.com",
    /* messagingSenderId: "628125513818" */
  };
    firebase.initializeApp(config);

    export default firebase
