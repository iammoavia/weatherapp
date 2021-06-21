const {createKiteSurfing,getAllKiteSurfings,getKiteSurfing,deleteKiteSurfing,updateKiteSurfing} = require('../Controllers/KiteSurfing');
const express = require("express");
const kiteSurfing = require('../Schemas/KiteSurfing');
const router = express.Router();
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
router.post('/create-kitesurfing',createKiteSurfing);
router.get('/get-all-kitesurfings',getAllKiteSurfings);
router.get('/:id',getKiteSurfing);
router.delete('/:id',deleteKiteSurfing);
router.patch('/:id',updateKiteSurfing);
router.post('/upload-kite-surfing-image/:id',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const kiteSurfingExists = await kiteSurfing.find({_id:req.params.id});
    if(!kiteSurfingExists || kiteSurfingExists == null || kiteSurfingExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No kite surfing exists with given id'
      });
      return;
    }
    const kitesurf = await kiteSurfing.findByIdAndUpdate(req.params.id,{
        image:file
    },{
      new:true
    });
    res.status(200).json({
        success:true,
        Data:kitesurf
    })
})
module.exports = router;