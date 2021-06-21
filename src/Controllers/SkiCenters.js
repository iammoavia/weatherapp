const SkiCenter = require('../Schemas/SkiCenters');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createSkiCenter = async (req,res) => {
    try {
       
        const {name,latitude,longitude,site,TEL,zipCode,address} = req.body;
        if(!name || !latitude || !longitude || !site || !TEL || !zipCode || !address ) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newSkicenter = new SkiCenter({
           name:name,
           latitude:latitude,
           longitude:longitude,
           site:site,
           TEL:TEL,
           zipCode:zipCode,
           address:address,
          addedOn:new Date()
       }) 
       await newSkicenter.save();

       const notification_body = {
        title:'A new skicenter was added',
        body:`${name} ski center was added in app.`
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
            message:`A Ski center was successfully created :)`,
            Data:newSkicenter
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
           message:'An Error occured while creating a Ski center',
           Error:e
       })
    }
}


exports.getAllSkicenters = async (req,res) => {
    try { 
    const AllSkicenters = await SkiCenter.find();
    res.status(200).json({
        success:true,
        message:`${AllSkicenters.length === 0 ? 'No Ski center available' : 'Successfully fetched all Ski centers'}`,
        Data:AllSkicenters,
        count:AllSkicenters.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching ski centers for you.',
            Error:e,
        })
    }
}

exports.getSkicenter = async (req,res) => {
    try { 
    const fetchedSkiCenter = await SkiCenter.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedSkiCenter.length === 0 ? 'No Ski center available with this id':'Successfully fetched the Ski center.'}`,
        Data:fetchedSkiCenter,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a ski center for you.',
            Error:e,
        })
    }
}


exports.updateSkiCenters = async (req,res) => {
    try {
    const centerExists = await SkiCenter.find({_id:req.params.id});
    if(!centerExists) {
        res.status(400).json({
            success:false,
            message:'A Ski center with this id doesnt exist.'
        });
        return;
    }    
    const updatedSkicenter = await SkiCenter.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Ski center was successfully updated.',
        Data:updatedSkicenter,
        count:updatedSkicenter.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a ski center for you.',
            Error:e,
        })
    }
}


exports.deleteSkiCenters = async (req,res) => {
    try { 
    const skicenterExist = await SkiCenter.find({_id:req.params.id});
    if(!skicenterExist) {
        res.status(400).json({
            success:false,
            message:'A Ski center with this id doesnt exist.'
        });
        return;
    }  
    await SkiCenter.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Ski center was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Ski center for you.',
            Error:e,
        })
    }
}

