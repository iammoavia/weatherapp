const {createMoonCalendar,getAllMoonCalendars,deleteMoonCalendar} = require('../Controllers/MoonCalendar');
const express = require("express");
const router = express.Router();
router.use(express.json());
const MoonCalendar = require('../Schemas/MoonCalendar');
const multer = require('multer');
const storage = multer.diskStorage({
  destination:function(req,file,cb) {
    cb(null,'./uploads/')
  },
  filename:function(req,file,cb) {
    cb(null, JSON.stringify(Math.random()) + file.originalname);
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
router.post('/create-moon-calendar',createMoonCalendar);
router.get('/get-all-moon-calendars',getAllMoonCalendars);

router.post('/upload-moon-calendar-image',upload.single('image'),async(req,res) => {
    const file = req.file.path;
    const newMoonCalendar = new MoonCalendar({
        addedOn:new Date(),
        image:file,
        month:req.body.month,
        year:req.body.year
    })
    await newMoonCalendar.save();

    res.status(200).json({
        success:true,
        Data:newMoonCalendar
    })
})

router.delete('/:id',deleteMoonCalendar);
module.exports = router;