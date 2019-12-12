const logtype = document.querySelectorAll('.logtype');

var firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
    };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//make auth and firestore references
const auth = firebase.auth();
const db = firebase.firestore(); 

//listen for auth status changes
auth.onAuthStateChanged(user => {
    if(user != null){

        logtype[0].style.display = "none";
        logtype[1].style.display = "none";
        logtype[2].style.display = "flex";
        logtype[3].style.display = "flex";

        
        
    }
    else{

        console.log("the user is not logged in");
        logtype[0].style.display = "flex";
        logtype[1].style.display = "flex";
        logtype[2].style.display = "none";
        logtype[3].style.display = "none";        

        
    }
})

//logout the user
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {

    localStorage.clear();

    auth.signOut().then(() => {
        console.log('logged out');
        localStorage.removeItem('email');
        window.location.replace("/index.html")
    });

    e.preventDefault();


})



