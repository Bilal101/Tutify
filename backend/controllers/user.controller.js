const User = require('../models/models').User;
var session = require('express-session');
// Nodejs encryption with CTR
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

// this method fetches all available users in our database
exports.getUser = async function (req, res) {
    User.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
};

// this method overwrites existing user in our database
exports.updateUser = async function (req, res) {
    const { id, update } = req.body;
    User.findByIdAndUpdate(id, update, (err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

// this function encrypts the password for security reasons
exports.encrypt = function (text) {
    let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
}

// this function decrpyts the password for use in the login page
exports.decrypt = function (text) {
    let encryptedText = Buffer.from(text.encryptedData, 'hex');
    let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}

// this method adds new user in our database
exports.putUser = async function (req, res) {
    let data = new User();
    const { id, first_name, last_name ,program_of_study, email,password, school,school_name_other,education_level} = req.body;
    // testing the encryption feature
    var encrypted_password = exports.encrypt(req.body.password).encryptedData;
    //var school_name_other1 = ""; 
    

    if ((!id && id !== 0) || !first_name || !last_name || !email || !password || !program_of_study || !education_level || !school) {
        return res.json({
        success: false,
        error: 'INVALID INPUTS',
        });
    }
    
    data.first_name = first_name;
    data.last_name = last_name;
    data.email = email;
    data.program_of_study = program_of_study;
    data.password = encrypted_password;
    data.education_level = education_level;
    data.school = school;
    //data.classes_tutored = classes_tutored;
    //data.type_tutoring = type_tutoring;
    data.id = id;
    data.save((err) => {
        if (err) return res.json({ success: false, error: err });
        return res.json({ success: true });
    });
};

exports.authUser = async function (req,res){
    var email = req.body.email;
    var password = exports.encrypt(req.body.password).encryptedData;


    User.findOne({ email:email, password:password} , function(err,user){
    if(err){
        console.log(err);
        return res.status(500).send();

    }
    if(user){
        req.session.user = user;
        req.session.isLoggedIn = true;
        //req.flash('success', 'You are signed in.');

        req.session.save();
        res.send(req.session);

        return res.status(200).send;

    }

    req.session.isLoggedIn = false;
    /**req.flash(
        'danger',
        'Invalid email or password, please try again.'
      );*/
    req.session.save();
    res.send(req.session);
   
    return res.status(400).send();

    })
};

//this function logs the user out and destroys the session
exports.logout = async function(req,res){
        if (req.session.user) {
          req.session.destroy();
        } 
};

//this function checks if a session is running
exports.checkSession = async function(req,res){
    if (req.session.isLoggedIn) {
        res.send(req.session);
    } 
};


// this method removes existing user in our database
exports.deleteUser = async function (req, res) {
    const { id } = req.body;
    User.findByIdAndRemove(id, (err) => {
        if (err) return res.send(err);
        return res.json({ success: true });
    });
};