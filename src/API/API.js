import firebase from 'firebase'
import API_KEY from './ApiKey'

firebase.initializeApp(API_KEY);

const createUser = ( email, password ) => (    
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then( res=> res )
        .catch( err=> err.message)
)
const signinUser = ( email, password ) => (
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res=>res)
        .catch(err => err.message)
)

const refAuth = firebase.auth()

const signOutUser = () =>(
    firebase.auth().signOut()
        .then(  res => res)
        .catch( err => err.message)
)
var teste
const loadData = ( referencia ) => firebase.database().ref(referencia)


export default {
    createUser,
    signinUser,
    signOutUser,
    refAuth,
    loadData
}