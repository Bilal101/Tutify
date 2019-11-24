
const Files = require('../models/models').Files;
var multer = require('multer');
var mongoose = require('mongoose');
var uuidv4 = require('uuid/v4');
var bp = require("body-parser");
const DIR = './../public/';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, DIR);
  },
  filename: (req, file, cb) => {
      const fileName = file.originalname.toLowerCase().split(' ').join('-');
      cb(null, uuidv4() + '-' + fileName)
  }
});

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    cb(null, true); 
  }
});

exports.testUpload= async (req, res, next) => {
  const url = req.protocol + '://' + req.get('host');
  const file = new Files({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      file: url + '/public/' + req.file.filename
  });
  file.save().then(result => {
      res.status(201).json({
          message: "File uploaded successfully!",
          userCreated: {
              _id: result._id,
              file: result.file
          }
      })
  }).catch(err => {
      console.log(err),
          res.status(500).json({
              error: err
          });
  });

    

}

// this method fetches all files accounts in our database
exports.getFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}

// this method fetches all files accounts in our database
exports.uploadFiles = async function (req, res) {
  Files.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
}


