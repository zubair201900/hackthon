import {app , auth , db , storage} from './firebase.mjs'
import { getAuth, createUserWithEmailAndPassword ,onAuthStateChanged  ,signOut } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { collection, getDocs  , getDoc,addDoc, where, query , onSnapshot  ,orderBy ,  updateDoc, doc , deleteField , deleteDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


const q1 = query(collection(db, "posts"));
onSnapshot(q1, (querySnapshot) => {
  document.getElementById("mainpostcontainer").innerHTML = ''
    querySnapshot.forEach((change) => {
      document.getElementById("mainpostcontainer").innerHTML+=
      `
      <div class="post">
      <div class="usershowinpost">
      <div>

      <img class="postimg" src="https://th.bing.com/th?id=OIP.4VPed2j4f1-q-kzIQQdrnQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="">
    </div>
    <div>
    <h3 class="postuser" onclick="name12('${change.id}' , '${change.data().name}')">${change.data().postname}</h3>
    <p class="postdate">${change.data().name} ${change.data().strTime} </p>
    </div>
    </div>
    <div class="postpara">
    <p id="postpara">${change.data().postdesc}</p>
    </div>
    <div class="editbtn">
    
</div>
<div style="display:flex; column-gap:20px; color: #7749F8;">
<div class="delbtn">
See All from this user
</div>

<div/>

</div>
`

})
// var ids = user.uid
//       function name12(id , name12){
  //         console.log(id);
  //         localStorage.setItem("ids" ,JSON.stringify(ids))
  //         window.location.href="./profile.html"
  //         localStorage.setItem("name12" ,JSON.stringify(name12))
  //       }
  //       window.name12 = name12
})

var name ;
onAuthStateChanged(auth, async(user) => {
    if (user) {
      document.getElementById("postadder").style.display="block"
      var email = user.email
      var userss = document.getElementById("userss")
      var logout = document.getElementById("logout")
      var logout1 = document.getElementById("logout1")
      var loginmain = document.getElementById("loginmain")
      loginmain.style.display="none"
      logout.style.display="block"
      logout1.style.display="block"
    userss.style.display="block"

    const q2 = query(collection(db, "users")  ,where("email" , "==" , user.email));
    onSnapshot(q2, (querySnapshot) => {
      document.getElementById("mainpostcontainer").innerHTML = ''
        querySnapshot.forEach((doc) => {
  
    userss.innerText=doc.data().fname + doc.data().lname 
        console.log(doc.data());
    
    name = doc.data().fname + " " + doc.data().lname 
    logout.innerText=" logout"
    
    userss.addEventListener("click" , async()=>{
    
      window.location.href="./update.html"
    })
    })
    })
    

      const uid = user.uid;


      var Publish = document.getElementById("Publish");
      var newdate = new Date()
      var date = newdate.getDate()
      const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
       var year = newdate.getFullYear();
      var strTime = date + " " + monthNames[newdate.getMonth()] + " " + year
      var newdate1  = newdate.getMilliseconds()
      console.log(newdate1);
      Publish.addEventListener("click" , async()=>{
        var postname = document.getElementById("postname").value
        var postdesc = document.getElementById("postdesc").value
        var userid = user.uid


        try {
          const docRef = await addDoc(collection(db, "posts"), {
            postname:postname,
            postdesc:postdesc,
            strTime:strTime,
            name:name,
            newdate1:newdate1,
            userid:userid,
            email:email

          });
          console.log("Document written with ID: ", docRef.id);
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })

      const q1 = query(collection(db, "posts")  , where("userid" , "==" , user.uid));
        onSnapshot(q1, (querySnapshot) => {
          document.getElementById("mainpostcontainer").innerHTML = ''
            querySnapshot.forEach((change) => {
              document.getElementById("mainpostcontainer").innerHTML+=
              `
              <div class="post">
              <div class="usershowinpost">
              <div>

              <img class="postimg" src="https://th.bing.com/th?id=OIP.4VPed2j4f1-q-kzIQQdrnQHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&pid=3.1&rm=2" alt="">
            </div>
            <div>
            <h3 class="postuser" >${change.data().postname}</h3>
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
      })
      
      
    })
      async function editPost(postId) {
        const postRef = doc(db, "posts", postId);
        const postSnapshot = await getDoc(postRef);
        const postData = postSnapshot.data();
      
        // Assuming you have an input form for editing with id="editpostname" and id="editpostdesc"
        const updatedPostName = prompt("postname")
        const updatedPostDesc = prompt("postdesc")

      
        try {
          await updateDoc(postRef, {
            postname: updatedPostName,
            postdesc: updatedPostDesc,
          });
      
          // Optionally, update the UI to reflect the changes
        } catch (error) {
          console.error("Error updating document: ", error);
        }
      }
      window.editPost = editPost
        // ...
      } else {
        // User is signed out
        // ...
      }

      async function deletePost(postId) {
        const postRef = doc(db, "posts", postId);
      
        try {
          await deleteDoc(postRef);
      
          // Optionally, update the UI to remove the deleted post
        } catch (error) {
          console.error("Error deleting document: ", error);
        }
      }
      window.deletePost = deletePost
  });
  document.getElementById("logout").addEventListener("click", () => {
    signOut(auth).then(() => {
        // Sign-out successful.
        window.location.href = "../pages/index.html"
    }).catch((error) => {
        // An error happened.
    });
})
