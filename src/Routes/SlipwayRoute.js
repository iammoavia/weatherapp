const {createSlipway,deleteSlipways,updateSlipways,getSlipway,getAllSlipways} = require('../Controllers/Slipways');
const express = require("express");
const router = express.Router();
const SlipWaySchema = require('../Schemas/Slipways');
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
router.post('/create-slipway',createSlipway);
router.get('/get-all-slipways',getAllSlipways);
router.get('/:id',getSlipway);
router.delete('/:id',deleteSlipways);
router.patch('/:id',updateSlipways);
router.post('/upload-slipway-image/:slipwayId',upload.single('image'),async(req,res) => {
   try {
    const file = req.file.path;
    const slipwayExists = await SlipWaySchema.find({_id:req.params.slipwayId});
    console.log(slipwayExists);
    if(!slipwayExists || slipwayExists == null || slipwayExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No fishing point exists with given id'
      });
      return;
    }
    const updatedslipWay = await SlipWaySchema.findByIdAndUpdate(req.params.slipwayId,{
        image:file
    },{
      new:true
    });
    res.status(200).json({
        success:true,
        Data:updatedslipWay
    })
   } catch(e) {
    res.status(400).json({
      success:false,
      Message:e
  })
   }
})
///flflfl
module.exports = router;