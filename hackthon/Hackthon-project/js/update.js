import {app , auth , db , storage} from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged  ,signOut ,updatePassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs  ,getDoc,addDoc, where, query , onSnapshot  ,orderBy , deleteField  ,doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";

onAuthStateChanged(auth, async(user) => {
    if (user) {

var userss = document.getElementById("username")
var pass1 = document.getElementById("pass1")
// const q = query(collection(db, "posts"), where("email", "==", user.email));
// const querySnapshot = await getDocs(q);
// querySnapshot.forEach(async(doc) => {
  const q = query(collection(db, "users"), where("email", "==", user.email));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
  userss.innerHTML=
  `${doc.data().fname}  ${doc.data().lname} 
<button onclick="update('${doc.id}')">update</button>

  `
  console.log(doc.data());
    
})
}

async function update(postId) {
  const postRef = doc(db, "users", postId);
  const postSnapshot = await getDoc(postRef);
  const postData = postSnapshot.data();
  
  const firstname = prompt("first name")
  const lastname = prompt("last name")
  // Assuming you have an input form for editing with id="editpostname" and id="editpostdesc"
  
  
  try {
    await updateDoc(postRef, {
      fname: firstname,
      lname:lastname
    });
    window.location.reload()
    // Optionally, update the UI to reflect the changes
  } catch (error) {
    console.error("Error updating document: ", error);
  }
}
window.update = update

})



