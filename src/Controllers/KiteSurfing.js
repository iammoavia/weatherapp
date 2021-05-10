const KiteSurfing = require('../Schemas/KiteSurfing');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createKiteSurfing = async (req,res) => {
    try {
      
        const {name,address,zipCode,TEL,latitude,longitude,site} = req.body;
        if(!name || !address || !latitude || !longitude || !TEL || !zipCode || !site) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newKiteSurfing = new KiteSurfing({
          address:address,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date(),
          name:name,
          zipCode:zipCode,
          TEL:TEL,
          site:site
       }) 
       await newKiteSurfing.save();
       const notification_body = {
        title:'A new kite surfing has been saved',
        body:`${name} kitesurfing point was added.`
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

       
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating a kite surfing',
           Error:e
       })
    }
}


exports.getAllKiteSurfings = async (req,res) => {
    try { 
    const AllKiteSurfings = await KiteSurfing.find();
    res.status(200).json({
        success:true,
        message:`${AllKiteSurfings.length === 0 ? 'No kite surfing available' : 'Successfully fetched all kite surfings'}`,
        Data:AllKiteSurfings,
        count:AllKiteSurfings.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching kite surfings for you.',
            Error:e,
        })
    }
}

exports.getKiteSurfing = async (req,res) => {
    try { 
    const fetchedKiteSurfing = await KiteSurfing.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedKiteSurfing.length === 0 ? 'No kite surfing available with this id':'Successfully fetched the kite surfing.'}`,
        Data:fetchedKiteSurfing,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a kite surfing for you.',
            Error:e,
        })
    }
}


exports.updateKiteSurfing = async (req,res) => {
    try {
    const kiteSurfingExists = await KiteSurfing.find({_id:req.params.id});
    if(!kiteSurfingExists) {
        res.status(400).json({
            success:false,
            message:'A kite surfing with this id doesnt exist.'
        });
        return;
    }    
    const updatedKiteSurfing = await KiteSurfing.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This kite surfing was successfully updated.',
        Data:updatedKiteSurfing,
        count:updatedKiteSurfing.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a kite surfing for you.',
            Error:e,
        })
    }
}


exports.deleteKiteSurfing = async (req,res) => {
    try { 
    const kiteSurfingExist = await KiteSurfing.find({_id:req.params.id});
    if(!kiteSurfingExist) {
        res.status(400).json({
            success:false,
            message:'A kite surfing with this id doesnt exist.'
        });
        return;
    }  
    await KiteSurfing.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A kite surfing was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a kite surfing for you.',
            Error:e,
        })
    }
}

