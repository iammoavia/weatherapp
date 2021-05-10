const {createMountShelter,getAllMountShelters,getMountShelter,deleteMountShelter,updateMountShelter} = require('../Controllers/MountShelters');
const express = require("express");
const router = express.Router();
const MountShelters = require('../Schemas/MountShelters');
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

router.post('/upload-mount-shelter-image/:shelterId',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const fishingPointExists = await MountShelters.find({_id:req.params.shelterId});
    if(!fishingPointExists || fishingPointExists == null || fishingPointExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No mount shelter exists with given id'
      });
      return;
    }
    const updatedMountShelter = await MountShelters.findByIdAndUpdate(req.params.shelterId,{
        image:file
    },{
        new:true
    });
    res.status(200).json({
        success:true,
        Data:updatedMountShelter
    })
})

router.post('/create-mount-shelter',createMountShelter);
router.get('/get-all-mount-shelters',getAllMountShelters);
router.get('/:id',getMountShelter);
router.delete('/:id',deleteMountShelter);
router.patch('/:id',updateMountShelter);
module.exports = router;