const {createFishingPoint,getAllFishingPoints,getFishingPoint,deleteFishingPoint,updateAFishingPoint,getMyFishingPoints} = require('../Controllers/FishingPoints');
const express = require("express");
const router = express.Router();
const FishingPointsSchema = require('../Schemas/FishingPoints');
router.use(express.json());
const multer = require('multer');
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
router.post('/create-fishing-point/:userId',createFishingPoint);
router.get('/get-all-fishing-points',getAllFishingPoints);
router.get('/get-my-fishing-points/:userId',getMyFishingPoints);
router.get('/:id',getFishingPoint);
router.delete('/:id',deleteFishingPoint);
router.patch('/:id',updateAFishingPoint);
router.post('/upload-catch-point-image/:catchId',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const fishingPointExists = await FishingPointsSchema.find({_id:req.params.catchId});
    if(!fishingPointExists || fishingPointExists == null || fishingPointExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No fishing point exists with given id'
      });
      return;
    }
    const fishingPoint = await FishingPointsSchema.findByIdAndUpdate(req.params.catchId,{
        image:file
    },{
      new:true
    });
    res.status(200).json({
        success:true,
        Data:fishingPoint
    })
})
///flflfl
module.exports = router;