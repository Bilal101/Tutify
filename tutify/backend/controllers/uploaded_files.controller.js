const UploadedFiles = require('../models/models').UploadedFiles;
const Files = require('../models/models').Files;
const Tutor = require('../models/models').Tutor;
var mongoose = require('mongoose');

// This method adds restriction information for uploaded documents.
exports.addUploadedFiles = async function (req, res) {
    let uploaded_files = new UploadedFiles();
    const { name, adminTutor, uploadedDocs } = req.body;
    const { filename } = req.file;
    const { _id } = new mongoose.Types.ObjectId();

    var newEvents = [];
    var count = 0;
    var name_shortened = "";

    // Eventually, this will be implemented
    if(name.split(".")[0].length > 25){
       name_new = name.substring(0,25)+"."+name.split(".")[1];
    }
    else{
       name_new = name;
    }

    uploaded_files.save(function (err) {
        UploadedFiles.findByIdAndUpdate(_id,
            {
                $set: {
                    "name": name_new,
                    "adminTutor": adminTutor,
                    "encryptedname": filename,
                    "link": "http://localhost:3000/document/" + filename
                },
                $push: {
                    // for now, just added tests, will add actual id's eventually
                    "sharedToStudents": "test",
                    "sharedToCourses": "test2"
                }
            },
            { "new": true, "upsert": true },
            function (err, tutor) {
                if (err) throw err;
            });
    });

    res.redirect("/uploadingDocs" + req.body.name);
}

// this method gets events from the database
exports.populateUploadedFiles = async function (req, res) {
    var tutor_id = 0;

    Object.keys(req.sessionStore.sessions).forEach(function (key) {
        var parsed_tutor_cookie = JSON.parse(req.sessionStore.sessions[key]);
        var parsed_tutor_info = parsed_tutor_cookie .userInfo;
        if (typeof parsed_tutor_info !== "undefined") {
            tutor_id = parsed_tutor_info._id;
        }
    });

    UploadedFiles.find({ adminTutor: tutor_id }, function (err, uploaded_docs) {
        //console.log(uploaded_docs);
        return res.json({ success: true, file: uploaded_docs });
    });

};
