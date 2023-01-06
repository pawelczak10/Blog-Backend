const multer = require('multer');
const uuid = require('uuid/v1');
const User = require('../models/user');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;


var blob_name = function () {
    User.image = User.name + uuid()
    return User.image
};


//Create and update BLOBS
const azureStorage = new MulterAzureStorage({
    accountName: 'tripaccount',
    accessKey: 'MvAI160KjMP9MFIPEBntoIIn2TMQPxJMRYA10fbnlFUd4AlTYTGlkzF2dMYwsSHuTn0ps8bkhON++AStei4+jg==',
    containerName: 'places',
    containerSecurity: 'blob',
    blobName: blob_name
});

const fileUpload = multer({
    storage: azureStorage
});

module.exports = fileUpload;