//sign in
const signInForm = document.querySelector('#signin-form');

signInForm.addEventListener('submit', (e) => {
e.preventDefault();

const email = signInForm['signInEmail'].value;
const password = signInForm['signInPassword'].value;

// get user info
auth.signInWithEmailAndPassword(email, password).then(cred => {
console.log("user signed in");
localStorage.setItem('email', email);

if(cred){

    window.location.replace("/dashboard.html")

}




})


})