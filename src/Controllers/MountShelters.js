const MountShelter = require('../Schemas/MountShelters');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createMountShelter = async (req,res) => {
    try {
       
        const {seats,TEL,name,latitude,longitude,altitude} = req.body;
        if(!name || !seats || !TEL || !latitude || !longitude || !altitude) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newMountShelter = new MountShelter({
          addedOn:new Date(),
          latitude:latitude,
          longitude:longitude,
          TEL:TEL,
          seats:seats,
          name:name,
          altitude:altitude,
          image:'...'
       }) 
       await newMountShelter.save();

       const notification_body = {
        title:'A new mount shelter was added',
        body:`${name} mount shelter was added in app.`
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
            message:`A mount shelter was successfully created :)`,
            Data:newMountShelter
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
           message:'An Error occured while creating mount shelter',
           Error:e
       })
    }
}


exports.getAllMountShelters = async (req,res) => {
    try { 
    const AllMountShelters = await MountShelter.find();
    res.status(200).json({
        success:true,
        message:`${AllMountShelters.length === 0 ? 'No Mount Shelter available' : 'Successfully fetched all Mount shelters'}`,
        Data:AllMountShelters,
        count:AllMountShelters.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching mount shelter for you.',
            Error:e,
        })
    }
}

exports.getMountShelter = async (req,res) => {
    try { 
    const fetchedShelter = await MountShelter.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedShelter.length === 0 ? 'No mount shelter available with this id':'Successfully fetched the mount shelter.'}`,
        Data:fetchedShelter,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a mount shelter for you.',
            Error:e,
        })
    }
}


exports.updateMountShelter = async (req,res) => {
    try {
    const mountshelterr = await MountShelter.find({_id:req.params.id});
    if(!mountshelterr) {
        res.status(400).json({
            success:false,
            message:'A Mount Shelter with this id doesnt exist.'
        });
        return;
    }    
    const updatedMountShelter = await MountShelter.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Mount Shelter was successfully updated.',
        Data:updatedMountShelter,
        count:updatedMountShelter.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a mount shelter for you.',
            Error:e,
        })
    }
}


exports.deleteMountShelter = async (req,res) => {
    try { 
    const shelterExist = await MountShelter.find({_id:req.params.id});
    if(!shelterExist) {
        res.status(400).json({
            success:false,
            message:'A mount shelter with this id doesnt exist.'
        });
        return;
    }  
    await MountShelter.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Mount shelter was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Mount shelter for you.',
            Error:e,
        })
    }
}

