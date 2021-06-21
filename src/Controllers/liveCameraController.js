const LiveCamera = require('../Schemas/LiveCamera');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createLiveCamera = async (req,res) => {
    try {
        const {city,hosting,latitude,longitude,TEL,site,countryName,hotel} = req.body;
        if(!city || !hosting || !latitude || !longitude || !TEL || !site || !countryName || !hotel) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newLiveCamera = new LiveCamera({
          latitude:latitude,
          longitude:longitude,
          city:city,
          hosting:hosting,
          addedOn:new Date(),
          site:site,
          TEL:TEL,
          image:'...',
          countryName:countryName,
          hotel:hotel
       }) 
       await newLiveCamera.save();
       const notification_body = {
        title:'A new live camera has been saved',
        body:`A live camera in ${city} was added`
    }
    fetch('https://us-central1-lyrical-art-284117.cloudfunctions.net/sendNotification',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(notification_body)
    }).then(async(apiRes) => {
        const newNotification = new Notification(notification_body)
        await newNotification.save();
        res.status(200).json({
            success:true,
            message:`A kite surfing was successfully created :)`,
            Data:newKiteSurfing
        })
    }).catch(e => {
     res.status(400).json({
         success:false,
         Message:e
     })
    }) 
       
       res.status(200).json({
           success:true,
           message:`LiveCamera was successfully created :)`,
           Data:newLiveCamera
       })
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating LiveCamera.',
           Error:e
       })
    }
}


exports.getAllLiveCameraPoints = async (req,res) => {
    try { 
    const AllLiveCameraPoints = await LiveCamera.find();
    res.status(200).json({
        success:true,
        message:`${AllLiveCameraPoints.length === 0 ? 'No LiveCamera available' : 'Successfully fetched all LiveCamera'}`,
        Data:AllLiveCameraPoints,
        count:AllLiveCameraPoints.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching LiveCamera for you.',
            Error:e,
        })
    }
}

exports.getLiveCameraPoint = async (req,res) => {
    try { 
    const liveCamera = await LiveCamera.find({_id:req.params.cameraId});
    res.status(200).json({
        success:true,
        message:`${liveCamera.length === 0 ? 'No LiveCamera point available with this id':'Successfully fetched the LiveCamera.'}`,
        Data:liveCamera,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a LiveCamera point for you.',
            Error:e,
        })
    }
}


exports.updateALiveCameraPoint = async (req,res) => {
    try {
    const LiveCameraPointExist = await LiveCamera.find({_id:req.params.cameraId});
    if(!LiveCameraPointExist) {
        res.status(400).json({
            success:false,
            message:'A LiveCamera point with this id doesnt exist.'
        });
        return;
    }    
    const LiveCameraPoint = await LiveCamera.findByIdAndUpdate(req.params.cameraId,req.body);
    res.status(200).json({
        success:true,
        message:'This LiveCamera point was successfully updated.',
        Data:LiveCameraPoint,
        count:LiveCameraPoint.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a LiveCamera point for you.',
            Error:e,
        })
    }
}


exports.deleteLiveCameraPoint = async (req,res) => {
    try { 
    const LiveCameraPointExist = await LiveCamera.find({_id:req.params.cameraId});
    if(!LiveCameraPointExist) {
        res.status(400).json({
            success:false,
            message:'A LiveCamera point with this id doesnt exist.'
        });
        return;
    }  
    await LiveCamera.findByIdAndRemove(req.params.cameraId);
    res.status(200).json({
        success:true,
        message:`A LiveCamera point was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a LiveCamera point for you.',
            Error:e,
        })
    }
}

