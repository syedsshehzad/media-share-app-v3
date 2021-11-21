import { Display } from "./Display.jsx";
import { S3_BUCKET_NAME } from "../objects/environmental_variables.js";

var renderPics = function (s3, items) {
    document.querySelector('.w3-animate-fading').innerHTML = '';
    var domContainer = document.querySelector('#react');
    ReactDOM.render(<Display items={items} client={s3} />, domContainer);
}

var getUnapproved = function (s3) {
    document.querySelector('.w3-animate-fading').innerHTML = '';
    ReactDOM.unmountComponentAtNode(document.querySelector('#react'));
    if (!s3) {
        alert('You are not signed in.');
        return;
    }

    s3.listObjectsV2(
        {
            Bucket: S3_BUCKET_NAME
        },
        function (err, data) {
            if (err) {
                document.querySelector('.w3-animate-fading').append(err.message);
                return;
            } else if (data.Contents.length == 1) {
                document.querySelector('.w3-animate-fading').innerHTML= 'No items';
            } else {
                document.querySelector('.w3-animate-fading').append(`Loading ${data.Contents.filter(item => item.Key.indexOf('/') < 0).length}`);
            }
            
            var images = [];
            data.Contents.filter(item => item.Key.indexOf('/') < 0).forEach((item, i, arr) => {
                s3.getObject(
                    {
                        Bucket: S3_BUCKET_NAME,
                        Key: item.Key
                    },
                    function (err, data) {
                        if (err) throw err;
                        console.log("Got the data for " + i + ": " + item.Key);
                        console.log(data);
                        console.log(data.ContentLength/1000);
                        images.push( {Key: item.Key, Body: data.Body} );
                        if (images.length == arr.length) {
                            renderPics(s3, images);
                        }
                    }
                );
            });
        }
    );
}

var getApproved = function (s3) {
    document.querySelector('.w3-animate-fading').innerHTML = '';
    ReactDOM.unmountComponentAtNode(document.querySelector('#react'));
    if (!s3) {
        alert('You are not signed in.');
        return;
    }

    s3.listObjectsV2(
        {
            Bucket: S3_BUCKET_NAME,
            Prefix: 'approved/'
        },
        function (err, data) {
            if (err) {
                document.querySelector('.w3-animate-fading').append(err.message);
                return;
            } else if (data.Contents.length == 1) {
                document.querySelector('.w3-animate-fading').innerHTML= 'No items';
            } else {
                document.querySelector('.w3-animate-fading').append(`Loading ${data.Contents.length-1}`);
            }

            var images = [];
            data.Contents.filter(item => item.Size > 0).forEach(function (item, index, array) {
                s3.getObject(
                    {
                        Bucket: S3_BUCKET_NAME,
                        Key: item.Key
                    },
                    function (err, data) {
                        if (err) throw err;
                        images.push( {Key: item.Key, Body: data.Body} );
                        console.log(index + " " + item.Key + " of " + array.length);
                        if (images.length == array.length) renderPics(s3, images);
                    }
                );
            });
        }
    );
}

var deletePic = function (s3, key) {
    s3.deleteObject(
        {
            Bucket: S3_BUCKET_NAME,
            Key: key
        },
        function (err, data) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                console.log(data);
                alert('Deleted successfully');
            }
        }
    );
}

var approvePic = function (s3, key) {
    s3.copyObject(
        {
            Bucket: S3_BUCKET_NAME,
            CopySource: `aws-cognito-resources/${key}`,
            Key: `approved/${key}`
        },
        function (err, data) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                alert(JSON.stringify(data.CopyObjectResult));
                console.log(data);
                deletePic(s3, key);
            }
        }
    );
}

var uploadPic = function (s3) {
    if (!s3) {
        alert('There\'s a problem!');
    }
    var file = document.querySelector('input').files[0];
    var title = document.getElementsByName('title')[0].value || file.name;

    console.log(title)
    s3.upload(
        {
            Bucket: S3_BUCKET_NAME,
            Key: title,
            Body: file
        },
        null,
        function (err, response) {
            if (err) {
                alert(err.message);
                console.log(err);
            } else {
                console.log(response);
                alert(`${response.key} was successfully uploaded to ${response.Bucket}.`);
            }

        }
    );
};

export {
    getUnapproved,
    getApproved,
    deletePic,
    approvePic,
    uploadPic
}