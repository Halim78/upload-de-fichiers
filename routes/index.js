const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  dest: 'tmp/',
  limits: {
    fileSize: 3*1024*1024
  },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.includes('image/png')){
      cb(new Error('mauvais format de fichier'));
    }
    cb(null, true);
  }
})


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });
  
  
  router.post('/monupload', upload.array('photos'),  (req, res, next) => {
      req.files.forEach(file => {
          fs.rename(file.path, 'public/images/' + file.originalname, (err) => {
              if (err) throw err;
              res.send("ok");
            });
          })
        });
        
        
        
        // router.post('/upload', upload.single('photo'), function (req, res, next) {
        //   fs.rename(req.file.path, 'public/images/' + req.file.originalname, function(err){
        //     if (err) {
        //         res.send('problème durant le déplacement');
        //     } else {
        //         res.send('Fichier uploadé avec succès');
        //     }
        //   });
        // })

module.exports = router;




















