const AWS = require('aws-sdk');
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require("path");

const endpoint = new AWS.Endpoint('https://kr.object.ncloudstorage.com');
const region = 'kr-standard';
//const config = require("../config/key.js");

const S3 = new AWS.S3({
    endpoint: endpoint,
    region: region,
    credentials: {
        accessKeyId : process.env.S3_KEY,
        secretAccessKey: process.env.S3_SECRET,
    }
});

function setUpload(bucket){
    var upload = multer({
        storage: multerS3({
            s3: S3,
            bucket: bucket,
            acl: "public-read-write",
            key: function (req, file, cb) {
                let extension = path.extname(file.originalname)
                let name = path.parse(file.originalname).name;
                cb(null, name + "-" + Date.now().toString() + extension);
            },
        }),
    }).single("file");
    return upload;
}

module.exports = setUpload;