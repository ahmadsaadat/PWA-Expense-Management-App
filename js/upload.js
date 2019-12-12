var appId = 'YOUR_APP_ID';
var roleArn = 'YOUR_ROLE_ARN';
var bucketName = 'yash-pwa-app';
AWS.config.region = 'us-east-1';
AWS.config.update({
        accessKeyId : '',
        secretAccessKey : ''
    });
var bucket = new AWS.S3({
    params: {
        Bucket: bucketName
    }
});
var fileChooser = document.getElementById('file-chooser');
var button = document.getElementById('upload-button');
var errorMessage = document.getElementById('errorMessage');
var successfulMessage = document.getElementById('successfulMessage');

button.addEventListener('click', function() {


    var file = fileChooser.files[0];
    if (file) {

        var date = new Date();
        
        let year = date.getFullYear();
        let month = date.getMonth();
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        

        errorMessage.innerHTML = '';
        successfulMessage.innerHTML='';
        var params = {
            Key: localStorage.getItem('company')+'/'+localStorage.getItem('email')+"/"+year+'-'+month+'-'+day+' '+hour+':'+minute,
            ContentType: file.type,
            Body: file,
            ACL: 'public-read',
            Metadata: {
                Company : localStorage.getItem('company'), 
                User: localStorage.getItem('email'),
                Amount: "",
                Date : year+"/"+month+"/"+day,
                Time : hour+":"+minute
               }
            };
            
        bucket.putObject(params, function (err, data) {
            if (err) {
                errorMessage.innerHTML = 'Your file should upload when connection is back! ';
                console.log('error');
            } else {
                successfulMessage.innerHTML = `Your upload has been successful and is now named:  <br> ${params.Key}`;
                console.log('success');
            }
        });
    } else {
        results.innerHTML = 'Nothing to upload.';
    }
});

