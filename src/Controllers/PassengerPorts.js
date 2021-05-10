const PassengerPort = require('../Schemas/PassengerPorts');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createPassengerPort = async (req,res) => {
    try {
          
        const {site,address,email,latitude,longitude,FAX,TEL,zipCode,name} = req.body;
        if(!site || !address || !latitude || !longitude || !TEL || !FAX || !name || !zipCode || !email) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newPassengerPort = new PassengerPort({
          address:address,
          email:email,
          FAX:FAX,
          TEL:TEL,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date(),
          site:site,
          name:name,
          zipCode:zipCode
       }) 
       await newPassengerPort.save();

       const notification_body = {
        title:'A new passenger port was added',
        body:`${name} passenger port was added in app.`
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
            message:`A passenger port was successfully created :)`,
            Data:newPassengerPort
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
           message:'An Error occured while creating a passenger port',
           Error:e
       })
    }
}


exports.getAllPassengerPorts = async (req,res) => {
    try { 
    const AllPassengerPorts = await PassengerPort.find();
    res.status(200).json({
        success:true,
        message:`${AllPassengerPorts.length === 0 ? 'No Passenger Port available' : 'Successfully fetched all Passenger Ports'}`,
        Data:AllPassengerPorts,
        count:AllPassengerPorts.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching Passenger port for you.',
            Error:e,
        })
    }
}

exports.getPassengerPort = async (req,res) => {
    try { 
    const fetchedPassengerPort = await PassengerPort.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedPassengerPort.length === 0 ? 'No passenger port available with this id':'Successfully fetched the passenger port.'}`,
        Data:fetchedPassengerPort,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a passenger port for you.',
            Error:e,
        })
    }
}


exports.updatePassengerPort = async (req,res) => {
    try {
    const passengerPortExist = await PassengerPort.find({_id:req.params.id});
    if(!passengerPortExist) {
        res.status(400).json({
            success:false,
            message:'A Passenger port with this id doesnt exist.'
        });
        return;
    }    
    const updatedPassengerPort = await PassengerPort.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Passenger port was successfully updated.',
        Data:updatedPassengerPort,
        count:updatedPassengerPort.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a passenger port for you.',
            Error:e,
        })
    }
}


exports.deletePassengerPort = async (req,res) => {
    try { 
    const portExist = await PassengerPort.find({_id:req.params.id});
    if(!portExist) {
        res.status(400).json({
            success:false,
            message:'A passenger port with this id doesnt exist.'
        });
        return;
    }  
    await PassengerPort.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Passenger port was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a passenger port for you.',
            Error:e,
        })
    }
}

