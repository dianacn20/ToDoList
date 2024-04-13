import firebase from '@react-native-firebase/app';
import '@react-native-firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBVIXieDa29i7NVO_OcK12M2eAfF1eHWG0",
  authDomain: "todoapp-1f06e.firebaseapp.com",
  projectId: "todoapp-1f06e",
  storageBucket: "todoapp-1f06e.appspot.com",
  messagingSenderId: "683142805925",
  appId: "1:683142805925:web:9d99d2fd3a8c4493dd504c",
  measurementId: "G-EGBECYTS7S"
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class Fire {
  constructor(callback) {
    this.init(callback);
  }

  init(callback) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        callback(null, user);
      } else {
        firebase
          .auth()
          .signInAnonymously()
          .catch(error => {
            callback(error);
          });
      }
    });
  }

  getLists(callback) {
    let user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/users/${user.uid}/lists`)
      .on('value', snapshot => {
        let lists = [];
        snapshot.forEach(child => {
          lists.push({
            id: child.key,
            name: child.val().name,
            todos: child.val().todos,
          });
        });
        callback(lists);
      });
  }

  detach() {
    let user = firebase.auth().currentUser;
    firebase.database().ref(`/users/${user.uid}/lists`).off();
  }

  addList(list, callback) {
    let user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/users/${user.uid}/lists`)
      .push(list, error => {
        if (error) {
          callback(error);
        } else {
          callback(null);
        }
      });
  }

  updateList(list) {
    let user = firebase.auth().currentUser;
    firebase
      .database()
      .ref(`/users/${user.uid}/lists/${list.id}`)
      .set(list);
  }
}

export default Fire;
