const express = require('express');
const router = express.Router();
const { User } = require("../Model/User.js");
const { Counter } = require("../Model/Counter.js");

router.post("/register", (req, res) => {
    let temp = req.body;
    Counter.findOne({name: "counter"}).then((doc) => {
        temp.userNum = doc.userNum;
        const userData = new User(temp);
        userData
            .save()
            .then(() => {
            Counter.updateOne({name: "counter"}, { $inc : {userNum: 1}}).then(() => {
                res.status(200).json({success: true});
            })
        })
    })
    .catch((err) => {
        console.log(err);
        res.status(400).json({success: false});
    });
});

router.get('/isAdmin/:uid', (req, res) => {
  User.findOne({ uid: req.params.uid })
    .then(user => {
      if (!user) return res.status(404).json({ success: false });
      res.status(200).json({ success: true, isAdmin: user.isAdmin });
    })
    .catch(err => res.status(500).json({ success: false, error: err }));
});


module.exports = router;