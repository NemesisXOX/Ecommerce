import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config={
        apiKey: "AIzaSyB-Anc5Y4lGJT-UiwDRbKf6jaSRXE6DCtA",
        authDomain: "crwn-db-ff6cc.firebaseapp.com",
        projectId: "crwn-db-ff6cc",
        storageBucket: "crwn-db-ff6cc.appspot.com",
        messagingSenderId: "281735665798",
        appId: "1:281735665798:web:f0fcd32981d9d09ca85907",
        measurementId: "G-FLG7DY0MJV"
      };

export const createuserProfileDocument =async(userAuth, otherData)=>{
        if(!userAuth) return;
        const userRef = firestore.doc(`users/${userAuth.uid}`);
        console.log(userAuth);
        const snapShot = await userRef.get();
        if(!snapShot.exists){
               
                const { displayName , email } = userAuth;
                const createdAt = new Date();
                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...otherData
                        });

                }catch(error){
                console.log('error creating user', error.message);

                }
        }
        return userRef;
}
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({promt: 'select_account'});
export const signInwithGoogle =()=>auth.signInWithPopup(provider);
export default firebase;