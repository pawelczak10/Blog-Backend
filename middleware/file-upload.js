const multer = require('multer');
const uuid = require('uuid/v1');
const User = require('../models/user');
const MulterAzureStorage = require('multer-azure-blob-storage').MulterAzureStorage;


var blob_name = function(){
  User.image = User.name + uuid()
  return User.image
};


//Create and update BLOBS
const azureStorage = new MulterAzureStorage({
  accountName: 'tripaccount',
  accessKey: '',
  containerName: 'avatars',
  containerSecurity: 'blob',
  blobName: blob_name
});

const fileUpload = multer({
  storage: azureStorage
});

module.exports = fileUpload;
