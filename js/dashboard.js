const dashboard = document.querySelector(".fileUpload");
const employee = document.querySelector(".employee");
const generic = document.querySelector(".generic");


// user data reference
const user = db.collection('users');
var query = user.where("email", "==", localStorage.getItem('email'));


if(navigator.onLine == true){

db.collection("users").where("email", "==", localStorage.getItem('email')).get()
.then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {

            let html="";

            const p = `
            <p> Email: ${doc.data().email} </p>
            <p> Company: ${doc.data().company} </p>
            <p> User Type : ${doc.data().type} </p>
            `;
            
            html += p;

            generic.innerHTML = html;



            if(doc.data().type == "Employee"){
                
                localStorage.setItem("type", "Employee");
                localStorage.setItem("company", doc.data().company);
                document.querySelector('.employee').style.display = "block";
                


            }
            else{

                localStorage.setItem("type", "Admin");
                localStorage.setItem("company", doc.data().company);
                document.querySelector('.admin').style.display = "block";
            
                
            }

        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}
else{

    console.log("offline");

    let html="";

    const p = `
    <p> Email: ${localStorage.getItem("email")} </p>
    <p> Company: ${localStorage.getItem("company")} </p>
    <p> User Type : ${localStorage.getItem("type")} </p>
    `;
    
    html += p;

    generic.innerHTML = html;

    if(localStorage.getItem("type") == "Employee"){
        
        document.querySelector('.employee').style.display = "block";
        


    }
    else{

        document.querySelector('.admin').style.display = "block";
    
        
    }




}






