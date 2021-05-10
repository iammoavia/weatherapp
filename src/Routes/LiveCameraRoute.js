const express = require("express");
const router = express.Router();
router.use(express.json());
const { createLiveCamera,getAllLiveCameraPoints,updateALiveCameraPoint,deleteLiveCameraPoint,getLiveCameraPoint } = require('../Controllers/liveCameraController');
const LiveCamera = require('../Schemas/LiveCamera');
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

router.post('/upload-live-camera-image/:liveCameraId',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const liveCamExists = await LiveCamera.find({_id:req.params.liveCameraId});
    if(!liveCamExists || liveCamExists == null || liveCamExists.length === 0) {
      res.status(404).json({
        success:false,
        Message:'No live camera exists with given id'
      });
      return;
    }
    const updatedlivecam = await LiveCamera.findByIdAndUpdate(req.params.liveCameraId,{
        image:file
    },{
        new:true
    });
    res.status(200).json({
        success:true,
        Data:updatedlivecam
    })
})

router.post("/create-live-camera",createLiveCamera);
router.get('/get-all-livecameras',getAllLiveCameraPoints);
router.patch('/update-live-camera/:cameraId',updateALiveCameraPoint);
router.delete('/delete-livecamera/:cameraId',deleteLiveCameraPoint);
router.get('/get-one-live-camera/:cameraId',getLiveCameraPoint);
module.exports = router;