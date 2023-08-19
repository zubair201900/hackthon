import {app , auth , db , storage} from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
import {onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {ref, uploadBytes ,getDownloadURL  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";


var sign = document.getElementById("signupbtn")
sign.addEventListener("click", () => {
    var fname = document.getElementById("fname").value
    var lname = document.getElementById("lname").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var repeatpassword = document.getElementById("repeatpassword").value
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user);
      const storageRef = ref(storage, email);
  
  // 'file' comes from the Blob or File API
 


      try {
        const docRef = await addDoc(collection(db, "users"), {
          fname:fname,
          lname:lname,
          email:email,
          repeatpassword:repeatpassword,
        });
        console.log("Document written with ID: ", docRef.id);
        Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'Your work has been saved',
              showConfirmButton: false,
              timer: 1500
            })
          } catch (e) {
            console.error("Error adding document: ", e);
          }
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500
          })
          setTimeout(()=>{
            window.location.href = "../pages/index.html"
          },3000)
            // ...
        })
        .catch((error) => {
        
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage)
            // ..
        });
})
// onAuthStateChanged(auth, async(user) => {
//     if (user) {
// window.location.href="./index.html"
//     }
// })