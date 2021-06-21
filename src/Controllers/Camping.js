const Camping = require('../Schemas/Camping');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createCampingPoint = async (req,res) => {
    try {

        const {email,TEL,zipCode,address,site,placeName,latitude,longitude} = req.body;
        if(!email || !TEL || !zipCode || !address || !site || !placeName ||  !latitude || !longitude ) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newCampingPoint = new Camping({
          placeName:placeName,
          address:address,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date(),
          site:site,
          TEL:TEL,
          email:email,
          zipCode:zipCode
        
       }) 
       await newCampingPoint.save();
       const notification_body = {
        title:'A new camping point has been saved',
        body:`${placeName} camping point was added.`
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
         message:`${placeName} , camping point was successfully created :)`,
         Data:newCampingPoint,
         notification:apiRes.json()
     })
    }).catch(e => {
     res.status(400).json({
         success:false,
         Message:e
     })
    }) 
       res.status(200).json({
           success:true,
           message:`${placeName} , camping point was successfully created :)`,
           Data:newCampingPoint
       })
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating camping Point',
           Error:e
       })
    }
}


exports.getAllCampingPoints = async (req,res) => {
    try { 
    const AllCampingPoints = await Camping.find();
    res.status(200).json({
        success:true,
        message:`${AllCampingPoints.length === 0 ? 'No camping point available' : 'Successfully fetched all camping points'}`,
        Data:AllCampingPoints,
        count:AllCampingPoints.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching camping points for you.',
            Error:e,
        })
    }
}

exports.getCampingPoint = async (req,res) => {
    try { 
    const campPoint = await Camping.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${campPoint.length === 0 ? 'No camping point available with this id':'Successfully fetched the camping point.'}`,
        Data:campPoint,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a camping point for you.',
            Error:e,
        })
    }
}


exports.updateACampingPoint = async (req,res) => {
    try {
    const campingPointExist = await Camping.find({_id:req.params.id});
    if(!campingPointExist) {
        res.status(400).json({
            success:false,
            message:'A camping point with this id doesnt exist.'
        });
        return;
    }    
    const campingPoint = await Camping.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This camping point was successfully updated.',
        Data:campingPoint,
        count:campingPoint.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a camping point for you.',
            Error:e,
        })
    }
}


exports.deleteCampingPoint = async (req,res) => {
    try { 
    const campingPointExist = await Camping.find({_id:req.params.id});
    if(!campingPointExist) {
        res.status(400).json({
            success:false,
            message:'A camping point with this id doesnt exist.'
        });
        return;
    }  
    await Camping.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A camping point was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a camping point for you.',
            Error:e,
        })
    }
}

