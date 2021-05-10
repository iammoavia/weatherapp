const Slipway = require('../Schemas/Slipways');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createSlipway = async (req,res) => {
    try {
       
        const {name,latitude,longitude} = req.body;
        if(!name || !latitude || !longitude) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newSlipway = new Slipway({
           name:name,
           latitude:latitude,
           longitude:longitude,
           image:'...',
          addedOn:new Date()
       }) 
       await newSlipway.save();
       const notification_body = {
        title:'A new slipway was added',
        body:`${name} slipway was added in app.`
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
            message:`A Slipway was successfully created :)`,
            Data:newSlipway
        })
    }).catch(e => {
     res.status(400).json({
         success:false,
         Message:e
     })
    }) 


      
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating a Slipway',
           Error:e
       })
    }
}


exports.getAllSlipways = async (req,res) => {
    try { 
    const AllSlipways = await Slipway.find();
    res.status(200).json({
        success:true,
        message:`${AllSlipways.length === 0 ? 'No Slipway available' : 'Successfully fetched all Slipways'}`,
        Data:AllSlipways,
        count:AllSlipways.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching Slipways for you.',
            Error:e,
        })
    }
}

exports.getSlipway = async (req,res) => {
    try { 
    const fetchedSlipway = await Slipway.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedSlipway.length === 0 ? 'No Slipway available with this id':'Successfully fetched the Slipway.'}`,
        Data:fetchedSlipway,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a Slipway for you.',
            Error:e,
        })
    }
}


exports.updateSlipways = async (req,res) => {
    try {
    const slipwayExists = await Slipway.find({_id:req.params.id});
    if(!slipwayExists) {
        res.status(400).json({
            success:false,
            message:'A Slipway with this id doesnt exist.'
        });
        return;
    }    
    const updatedSlipway = await Slipway.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Slipway was successfully updated.',
        Data:updatedSlipway,
        count:updatedSlipway.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a Slipway for you.',
            Error:e,
        })
    }
}


exports.deleteSlipways = async (req,res) => {
    try { 
    const SlipwayExist = await Slipway.find({_id:req.params.id});
    if(!SlipwayExist) {
        res.status(400).json({
            success:false,
            message:'A Slipway with this id doesnt exist.'
        });
        return;
    }  
    await Slipway.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Slipway was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Slipway for you.',
            Error:e,
        })
    }
}

