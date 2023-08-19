import {app , auth , db , storage} from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged  ,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs  , getDoc,addDoc, where, query , onSnapshot  ,orderBy ,  updateDoc, doc , deleteField , deleteDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
var currentUserFullName = "abdul malik";
onAuthStateChanged(auth, async(user) => {
    
    
    
    
    var ids = localStorage.getItem("ids")
    console.log(user.email);
    const q2 = query(collection(db, "posts"));
    onSnapshot(q2, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
                if(doc.data().userid == ids){

document.getElementById("mainpostcontainer").innerHTML+=
`
<div class="post">
<div class="usershowinpost">
    <div>

        <img class="postimg" src="https://th.bing.com/th/id/OIP.Ks3esYczgpcyFHovotx0CQHaGF?w=229&h=188&c=7&r=0&o=5&pid=1.7" alt="">
    </div>
    <div>
        <h3 class="postuser" id="postnamenavigate">${change.data().postname}</h3>
       <p class="postdate">${change.data().name} ${change.data().strTime} </p>
    </div>
</div>
<div class="postpara">
<p id="postpara">${change.data().postdesc}</p>
</div>
<div class="editbtn">

</div>
<div style="display:flex; column-gap:20px; color: #7749F8;">
<div class="delbtn" onclick="deletePost('${change.id}')">
delete
</div>
<div class="delbtn" onclick="editPost('${change.id}')">
edit
</div>
<div/>

</div>
`
                }
})
})

})