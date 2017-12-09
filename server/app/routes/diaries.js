let express = require('express');
let router = express.Router();
let Diary = require("../models/Diary");
let passport = require("passport");



//List all the diaries for a user
router.get('/', passport.authenticate('jwt', {session: false}), function(req, res) {
  Diary.find({},function(err, diaries){
    res.json(diaries)
  });
});

//Create a new diary
router.post('/create', passport.authenticate('jwt', {session: false}), function(req, res) {
  if ( !req.body.date || !req.body.acts ) {
    res.json({
      success:false,
      message:"please fill in all the required fields"
    })
  } else {
    let newDiary = new Diary ({
      title: req.body.title,
      date: req.body.date,
      acts: req.body.acts
    });

    newDiary.save(function(err){
      if (err) {
        return res.json({
          success: false,
          message: 'Please try again, something went wrong'
        });
      }
      res.json({
        success: true,
        message: 'Successfully created a new diary <3.',
        diary: newDiary
      });
    })
  }
});

router.post('/update', passport.authenticate('jwt', {session: false}), function(req, res) {
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
});

router.post('/delete', passport.authenticate('jwt', {session: false}), function(req, res) {
  if ( !req.body.id) {
    res.json({
      success:false,
      message:"something went wrong"
    })
  } else {
    Diary.remove({id:req.body._id}, function(err){
      if (err) {
        return res.json({
          success: false,
          message: 'Please try again, something went wrong'
        });
      } else {
        return res.json({
          success: true,
          message: 'Diary removed.'
      });
      }
    })
  }
});


module.exports = router;
