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


// --- Firebase Initialize End
console.log('ajjaja')

// --- Variables

var username = document.querySelector("#acc-user-name")
var firstName = document.querySelector("#acc-first-name")
var lastName = document.querySelector("#acc-last-name")
var age = document.querySelector("#acc-age")
var email = document.querySelector("#acc-email")
var password = document.querySelector("#acc-password")



var jsArray = JSON.parse(sessionStorage.getItem("jsArray"));
//document.querySelector("#acc-user-name").innerHTML = jsArray[0]



// --- Read from FireStore

var ref = doc(db, "Accounts", jsArray[0])
const docSnap = await getDoc(ref)

if (docSnap.exists()) {

    username.innerHTML = docSnap.data().UserName
    firstName.innerHTML = docSnap.data().FirstName
    lastName.innerHTML = docSnap.data().LastName
    age.innerHTML = docSnap.data().Age
    email.innerHTML = docSnap.data().Email
    password.innerHTML = docSnap.data().Password


} else {
    alert("No such account")
}


// --- Variables Edit Account

var editUsername = document.querySelector('#edit-user-name')
var editFirstName = document.querySelector("#edit-first-name")
var editLastName = document.querySelector("#edit-last-name")
var editAge = document.querySelector("#edit-age")
var editEmail = document.querySelector("#edit-email")
var editPassword = document.querySelector("#edit-password")



// --- Update form Firebase

async function UpdateFirebaseAcc() {

    var ref = doc(db, "Accounts", editUsername.innerHTML)

    await updateDoc(
            ref, {
                FirstName: editFirstName.value,
                LastName: editLastName.value,
                Age: editAge.value,
                Email: editEmail.value,
                Password: editPassword.value,
            }
        )
        .then(() => {
            alert('Data updated successfully!')
            location.reload()
        })
        .catch((error) => {
            alert('Unsuccessful operation, error:' + error)
        })

}




// --- Edit Account Info Btn
document.querySelector('#editInfo').addEventListener('click', () => {
    document.querySelector('#edit-acc-information').style.display = 'block'
    document.querySelector('#acc-information').style.display = 'none'
    document.querySelector('#edit-user-name').innerHTML = document.querySelector('#acc-user-name').innerHTML
})


// --- Save Changes Btn
document.querySelector('#saveChanges').addEventListener('click', () => {
    UpdateFirebaseAcc()
})


// --- Return to Account Information
document.querySelector('#editInfoReturn').addEventListener('click', () => {
    document.querySelector('#edit-acc-information').style.display = 'none'
    document.querySelector('#acc-information').style.display = 'block'
})


// --- Sign Out
document.querySelector('#signOut').addEventListener('click', () => {
    window.location = "../index.html";
})