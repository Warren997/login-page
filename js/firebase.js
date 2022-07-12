// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB7-xCp9uZHeP9vqxuzj8Qf-u4wxmcnufU",
    authDomain: "certain-cursor-346006.firebaseapp.com",
    databaseURL: "https://certain-cursor-346006-default-rtdb.firebaseio.com",
    projectId: "certain-cursor-346006",
    storageBucket: "certain-cursor-346006.appspot.com",
    messagingSenderId: "238384194554",
    appId: "1:238384194554:web:2787a0e2399c65b3313a43"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore()
const auth = getAuth();

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    addDoc,
    updateDoc,
    deleteDoc,
    deleteField
}
from "https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js";




// --- Register Variables

var exampleFirstName = document.querySelector('#exampleFirstName')
var exampleLastName = document.querySelector('#exampleLastName')
var exampleAge = document.querySelector('#exampleAge')
var exampleInputEmail1 = document.querySelector('#exampleInputEmail1')
var regUserName = document.querySelector('#regUserName')
var exampleInputPassword2 = document.querySelector('#exampleInputPassword2')



// --- Write to FireStore

async function addDocument_AutoID() {
    var ref = doc(db, "Accounts", regUserName.value)
    const docRef = await setDoc(
            ref, {
                FirstName: exampleFirstName.value,
                LastName: exampleLastName.value,
                Age: exampleAge.value,
                Email: exampleInputEmail1.value,
                UserName: regUserName.value,
                Password: exampleInputPassword2.value,
            }
        )
        .then(() => {
            alert('data added successfully')
            exampleFirstName.value = ""
            exampleLastName.value = ""
            exampleAge.value = ""
            exampleInputEmail1.value = ""
            regUserName.value = ""
            exampleInputPassword2.value = ""
        })
        .catch((error) => {
            alert('Unsuccessful operation, error;' + error)
        })
}


// --- write data in FireStore but set random id 
// async function addDocument_AutoID(){
//     var ref = doc(db,"Accounts"
//     const docRef = await addDoc(
//         ref,{
//             FirstName: exampleFirstName.value,
//             LastName: exampleLastName.value,
//             Age: exampleAge.value,
//             Email: exampleInputEmail1.value,
//             UserName: regUserName.value,
//             Password: exampleInputPassword2.value,
//         }
//     )
//     .then(()=>{
//         alert('data added successfully')
//     })
//     .catch((error)=>{
//         alert('Unsuccessful operation, error;' + error)
//     })
// }




// Register Form Btn
document.querySelector('#regSubmit').addEventListener('click', () => {


    // -- Authentication for Registration 
    if (!/^([^0-9]*)$/.test(exampleFirstName.value)) {
        alert("The first name should only contain alphabets!");
    } else if (!/^([^0-9]*)$/.test(exampleLastName.value)) {
        alert("The last name should only contain alphabets!");
    } else {

        // -- Firebase Authentication
        var email = document.querySelector('#exampleInputEmail1').value
        var password = document.querySelector('#exampleInputPassword2').value

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
                addDocument_AutoID()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
                alert(errorMessage)
            });
    }
})



// --- Login Variables

var logUsername = document.querySelector('#exampleUserName')
var logPassword = document.querySelector('#exampleInputPassword1')


// --- Read to FireStore

async function GetADocument() {
    var ref = doc(db, 'Accounts', logUsername.value)
    const docSnap = await getDoc(ref)

    if (docSnap.exists()) {
        let dbPass = docSnap.data().Password;
        if (dbPass == logPassword.value) {
            window.location = "pages/home.html";
        } else {
            alert("Wrong password!");
        }
    } else {
        alert('No such data')
        console.log(docSnap.exists())
    }
}


// --- Login Form Btn
document.querySelector('#logSubmit').addEventListener('click', () => {

    var jsArray = [logUsername.value];
    sessionStorage.setItem("jsArray", JSON.stringify(jsArray));

    GetADocument()
})