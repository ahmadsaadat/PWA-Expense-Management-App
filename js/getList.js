//shows user their uploads using the listObjects method
//we are also implementing a getObject method if the user chooses to see their object uploaded
var appId = 'YOUR_APP_ID';
var roleArn = 'YOUR_ROLE_ARN';
AWS.config.region = 'us-east-1';
AWS.config.update({
        accessKeyId : '',
        secretAccessKey : ''
    });
s3 = new AWS.S3({apiVersion: '2006-03-01'});

const employeeRefresh = document.querySelector('#employeerefresh');

employeeRefresh.addEventListener('click', function(){


    var params =({

        Bucket: 'yash-pwa-app',
        Prefix: localStorage.getItem('company')+'/'+localStorage.getItem('email')+'/'

    });

    s3.listObjects(params, function(err, data) {
        
        var Array = data.Contents;
        
        if (err){ 
            console.log(err, err.stack);
       } 
       else {

            Array.forEach(element => {
               
                const ul = document.querySelector('.employeeGetList');
                const li = document.createElement('li');
    
    
                li.textContent = `${element.Key}`;
                ul.prepend(li);

            });

        
       }    
   
      });

})


const refresh = document.querySelector('#refresh');

refresh.addEventListener('click', function(){


    var params =({

        Bucket: 'yash-pwa-app',
        Prefix: localStorage.getItem('company')+'/'

    });

    s3.listObjects(params, function(err, data) {

        var Array = data.Contents;        

        if (err){ 
            console.log(err, err.stack);
       } 
       else {
            

        Array.forEach(element => {
            // document.querySelector('.adminGetList').innerHTML += `<p class="adminGetListP" style="font-size: 0.8em"> ${element.Key} </p>`;
        
            const ul = document.querySelector('.adminGetList');
            const li = document.createElement('li');


            li.textContent = `${element.Key}`;
            ul.prepend(li);
        
        });
        
       }    
   
      });


})

