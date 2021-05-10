const FishingShelter = require('../Schemas/FishingShelters');
const User = require('../Schemas/UserSchema');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createFishingShelter = async (req,res) => {
    try {
    
        const {latitude,longitude,name} = req.body;
        if( !name || !latitude || !longitude) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }

       const newFishingShelter = new FishingShelter({
          name:name,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date()
       }) 
       await newFishingShelter.save();
       const notification_body = {
        title:'A new shelter has been saved',
        body:`${name} shelter point was added.`
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
            message:'A fishing shelter was successfully created!',
            Data:newFishingShelter
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
           message:'An Error occured while creating fishing shelter',
           Error:e
       })
    }
}


exports.getAllFishingShelters = async (req,res) => {
    try { 
    const FishingShelters = await FishingShelter.find();
    res.status(200).json({
        success:true,
        message:`${FishingShelter.length === 0 ? 'No Fishing shelter available' : 'Successfully fetched fishing shelters'}`,
        count:FishingShelter.length,
        Data:FishingShelters
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching fishing shelters for you.',
            Error:e,
        })
    }
}

exports.getFishingShelter = async (req,res) => {
    try { 
    const fishingShelter = await FishingShelter.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fishingShelter.length === 0 ? 'No fishing shelter available with this id':'Successfully fetched the fishing shelter.'}`,
        Data:fishingShelter,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a fishing shelter for you.',
            Error:e,
        })
    }
}


exports.updateAFishingShelter = async (req,res) => {
    try {
    const fishingShelterExist = await FishingShelter.find({_id:req.params.id});
    if(!fishingShelterExist) {
        res.status(400).json({
            success:false,
            message:'A fishing shelter with this id doesnt exist.'
        });
        return;
    }    
    const updatedShelter = await FishingShelter.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.status(200).json({
        success:true,
        message:'This fishing shelter was successfully updated.',
        Data:updatedShelter,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a fishing shelter for you.',
            Error:e,
        })
    }
}


exports.deleteFishingShelter = async (req,res) => {
    try { 
    const fishingShelterExist = await FishingShelter.find({_id:req.params.id});
    if(!fishingShelterExist) {
        res.status(400).json({
            success:false,
            message:'A fishing shelter with this id doesnt exist.'
        });
        return;
    }  
    const deletedShelter = await FishingShelter.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A fishing shelter was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a fishing shelter for you.',
            Error:e,
        })
    }
}

