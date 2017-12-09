let express = require('express');
let router = express.Router();
let Document = require("../models/Document");
let passport = require("passport");



//Get a User's medical document
router.get('/', function(req, res) {
  Document.find({citizenKey:req.body.citizenKey},function(err, document){
    if (err){
      return res.json({
        success:false,
        message:'the required document does not exist',
      })
    }
    res.json(document)
  });
});


//Create a new document
//Only the CIO is authorized to add documents
router.post('/create', function(req, res) {
  if (req.body.role == "cio") {
    if ( !req.body.date || !req.body.acts ) {
      res.json({
        success:false,
        message:"please fill in all the required fields"
      })
    } else {
      let newDocument = new Document ({
        citizenKey: req.body.citizenKey,
        content: req.body.content,
      });

      newDocument.save(function(err){
        if (err) {
          return res.json({
            success: false,
            message: 'Please try again, something went wrong'
          });
        }
        res.json({
          success: true,
          message: 'Successfully created a new document.',
          diary: newDocument
        });
      })
    }
  } else {
    res.json({
      success: false,
      message: 'Sorry you are not authorized to add document',
    });
  }
});



//Modify an existing document
//Only a doctor is allowed to modify a document

router.post('/update', function(req, res) {
  if (res.body.role =="doctor") {
    if ( !req.body.id) {
      res.json({
        success:false,
        message:"something went wrong"
      })
    } else {
      Diary.findOne({id:req.body._id}, function(err, diary){
        if (err) {
          return res.json({
            success: false,
            message: 'Please try again, something went wrong'
          });
        } else {
          console.log(diary);
          diary.acts = req.body.acts || diary.acts;
          diary.title = req.body.title || diary.title;
          diary.hidden = req.body.hidden || diary.hidden;
          diary.save()
          return res.json({
            success: true,
            message: 'Successfully updated your diary <3.',
            diary:diary
          });
        }
      })
    }
  } else {
    return res.json({
      success: false,
      message: 'Sorry you are not authorized to add document',
    });
  }
});

module.exports = router;
