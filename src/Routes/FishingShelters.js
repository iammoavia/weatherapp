const {createFishingShelter,getAllFishingShelters,getFishingShelter,deleteFishingShelter,updateAFishingShelter} = require('../Controllers/FishingShelters');
const express = require("express");
const router = express.Router();
router.use(express.json());
const multer = require('multer');
const FishingShelterSchema = require('../Schemas/FishingShelters');
const storage = multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/*' || file.mimetype === 'video/mpv') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 1000
  },
  // fileFilter:fileFilter
});

router.post('/upload-fishing-shelter-image/:shelterId',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const fishingshelterExists = await FishingShelterSchema.find({_id:req.params.shelterId});
    if(!fishingshelterExists || fishingshelterExists == null || fishingshelterExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No fishing point exists with given id'
      });
      return;
    }
    const fishingshelter = await FishingShelterSchema.findByIdAndUpdate(req.params.shelterId,{
        image:file
    },{
      new:true
    });
    res.status(200).json({
        success:true,
        Data:fishingshelter
    })
})

router.post('/create-fishing-shelter',createFishingShelter);
router.get('/get-all-fishing-shelters',getAllFishingShelters);
router.get('/:id',getFishingShelter);
router.delete('/:id',deleteFishingShelter);
router.patch('/:id',updateAFishingShelter);
module.exports = router;