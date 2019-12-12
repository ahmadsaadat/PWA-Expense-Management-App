        //sign up
        const signUpForm = document.querySelector('#signup-form');
        console.log('sign up',signUpForm);
        signUpForm.addEventListener('submit', (e) => {
        
        e.preventDefault();
        
        const email = signUpForm['signUpEmail'].value;
        const password = signUpForm['signUpPassword'].value;
        
        console.log(email, password);
        
        //sign up the user
        auth.createUserWithEmailAndPassword(email, password).then(cred =>{
        
                return db.collection('users').doc(cred.user.email).set({
                email: signUpForm['signUpEmail'].value,
                company: signUpForm['signUpCompany'].value,
                type: signUpForm['signUpType'].value

        }).then(() => {

                console.log(cred);
                signUpForm.reset();

                localStorage.clear();
                
                if(cred){

                        auth.signOut().then(() => {
                                console.log('logged out');
                                localStorage.removeItem('email');
                                window.location.replace("/index.html")
                        });
                        
                            e.preventDefault();
                        
                    }

        })
        });
        });     