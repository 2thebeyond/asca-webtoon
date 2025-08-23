const express = require('express');
const router = express.Router();
const multer = require("multer");

const { Post } = require("../Model/Post.js");
const { User } = require("../Model/User.js");
const { Counter } = require("../Model/Counter.js");
const { checkAdmin } = require("../middleware/checkAdmin");
const path = require('path');

const setUpload = require("../Util/upload.js");

router.post('/submit', checkAdmin, (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
    author: req.body.author,
    head: req.body.head,
    coverImage: req.body.coverImage,
    contentImage: req.body.contentImage,
  };
  Counter.findOne({name : "counter"})
    .exec()
    .then((counter) => {
      temp.postNum = counter.postNum;
      User.findOne({uid: req.body.uid})
        .exec()
        .then((userInfo) => {
          if (userInfo.isAdmin === true){
            temp.user = userInfo._id;
            const ToonPost = new Post(temp);
            ToonPost.save().then((doc) => {
            Counter.updateOne(
              {name: "counter"}, 
              {$inc : {postNum : 1}}
            ).then(() => {
              res.status(200).json({ success: true });
            });
          });
        } else {
          res.status(403).json({ success: false });
          console.log("관리자 권한이 없습니다.");
        }
      });
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    });
});

router.post('/list', (req, res) => {
  let sort = {};
  sort.createdAt = -1;
  Post.find({$or: [
    { title : {$regex: req.body.searchTerm}}, { content : {$regex: req.body.searchTerm}}
  ]})
    .populate("user")
    .sort(sort)
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, postList: doc })
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    })
});

router.post('/detail', (req, res) => {
  Post.findOne({postNum : Number(req.body.postNum)})
    .populate("user")
    .exec()
    .then((doc) => {
      res.status(200).json({ success: true, post: doc })
    })
    .catch((err) => {
      res.status(400).json({ success: false });
    })
});

router.post("/edit", checkAdmin, (req, res) => {
  let temp = {
    title: req.body.title,
    content: req.body.content,
    tag: req.body.tag,
    author: req.body.author,
    head: req.body.head,
    coverImage: req.body.coverImage,
    contentImage: req.body.contentImage,
    user: req.body.user,
  };
  User.findOne({uid: req.body.uid})
    .exec()
    .then((userInfo) => {
      if (userInfo.isAdmin === true){
        Post.updateOne({ postNum: Number(req.body.postNum) }, { $set: temp })
        .exec()
        .then(() => {
          res.status(200).json({ success: true });
      })
        .catch((err) => {
          res.status(400).json({ success: false });
      });
      } else {
        res.status(403).json({ success: false });
        console.log("관리자 권한이 없습니다.");
      }
    })
});

router.post('/delete', checkAdmin, (req, res) => {
  User.findOne({uid: req.body.uid})
    .exec()
    .then((userInfo) => {
      if (userInfo.isAdmin === true){
        Post.deleteOne({postNum : Number(req.body.postNum)})
          .exec()
          .then(() => {
            res.status(200).json({ success: true })
          })
          .catch((err) => {
            res.status(400).json({ success: false });
          })
        }
        else {
          res.status(403).json({ success: false });
        }
    });
});


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'image/');
//   },
//   filename: function (req, file, cb) {
//     // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     const name = path.parse(file.originalname).name;
//     const ext = path.extname(file.originalname);
//     const timestamp = Date.now();
//     //cb(null, name + '-' + Date.now());
//     cb(null, `${name}` + '-' + `${timestamp}` + `${ext}`);
//   },
// });

// const upload = multer({ storage: storage }).single("file");

// router.post("/image/upload", (req, res) => {
//   upload(req, res, err => {
//     if (err) {
//       res.status(400).json({ success: false });
//     } else {
//       res.status(200).json({ success: true, filePath : res.req.file.path });
//     }
//   })
// });


router.post(
  "/image/upload", 
  setUpload("asca-webtoon/post"), 
  (req, res, next) => {
    res.status(200).json({ success: true, filePath : res.req.file.location });
  }
);

// router.post('/delete', (req, res) => {
//   User.findOne({uid: req.body.uid})
//     .exec()
//     .then((userInfo) => {
//       if (userInfo.isAdmin === true){
//         Post.deleteOne({postNum : Number(req.body.postNum)})
//           .exec()
//           .then(() => {
//             res.status(200).json({ success: true })
//           })
//           .catch((err) => {
//             res.status(400).json({ success: false });
//           })
//         }
//         else {
//           res.status(403).json({ success: false });
//         }
//     });
// });


module.exports = router;