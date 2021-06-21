const Subway = require('../Schemas/Subways');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createSubway = async (req,res) => {
    try {
       
        const {name,latitude,longitude,TEL,zipCode,address} = req.body;
        if(!name || !latitude || !longitude || !TEL || !zipCode || !address ) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newSubway = new Subway({
           name:name,
           latitude:latitude,
           longitude:longitude,
           TEL:TEL,
           zipCode:zipCode,
           address:address,
          addedOn:new Date()
       }) 
       await newSubway.save();

       const notification_body = {
        title:'A new subway was added',
        body:`${name} subway was added in app.`
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
            message:`A Subway was successfully created :)`,
            Data:newSubway
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
           message:'An Error occured while creating a Subway',
           Error:e
       })
    }
}


exports.getAllSubways = async (req,res) => {
    try { 
    const AllSubways = await Subway.find();
    res.status(200).json({
        success:true,
        message:`${AllSubways.length === 0 ? 'No Subway available' : 'Successfully fetched all Subways'}`,
        Data:AllSubways,
        count:AllSubways.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching Subways for you.',
            Error:e,
        })
    }
}

exports.getSubway = async (req,res) => {
    try { 
    const fetchedSubway = await Subway.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedSubway.length === 0 ? 'No Subway available with this id':'Successfully fetched the Subway.'}`,
        Data:fetchedSubway,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a Subway for you.',
            Error:e,
        })
    }
}


exports.updateSubways = async (req,res) => {
    try {
    const centerExists = await Subway.find({_id:req.params.id});
    if(!centerExists) {
        res.status(400).json({
            success:false,
            message:'A Subway with this id doesnt exist.'
        });
        return;
    }    
    const updatedSubway = await Subway.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Subway was successfully updated.',
        Data:updatedSubway,
        count:updatedSubway.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a Subway for you.',
            Error:e,
        })
    }
}


exports.deleteSubways = async (req,res) => {
    try { 
    const SubwayExist = await Subway.find({_id:req.params.id});
    if(!SubwayExist) {
        res.status(400).json({
            success:false,
            message:'A Subway with this id doesnt exist.'
        });
        return;
    }  
    await Subway.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Subway was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Subway for you.',
            Error:e,
        })
    }
}

