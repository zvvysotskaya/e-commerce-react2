import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDUr4yo9rQTdBnt-ey-S61vRuPkn69uRWg",
    authDomain: "e-commerce-react2.firebaseapp.com",
    databaseURL: "https://e-commerce-react2.firebaseio.com",
    projectId: "e-commerce-react2",
    storageBucket: "",
    messagingSenderId: "280007278479",
    appId: "1:280007278479:web:0d3473da756ab1b7"
};
export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;
    //if object exists we query db
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if (!snapShot.exists) {
        const { displayName, email} = userAuth;
        const createdAt = new Date();
        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log("error creating an user", error.massage);
        }
    }
    return userRef;

} 
firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
//for google authentication


const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;