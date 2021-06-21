const Hospital = require('../Schemas/Hospitals');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createHospital = async (req,res) => {
    try {

        
        const {name,site,FAX,TEL,zipCode,address,latitude,longitude} = req.body;
        if(!name || !site || !FAX || !TEL || !address || !zipCode || !latitude || !longitude) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newHospital = new Hospital({
          name:name,
          address:address,
          site:site,
          TEL:TEL,
          FAX:FAX,
          zipCode:zipCode,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date()
       }) 
       await newHospital.save();
       const notification_body = {
        title:'A new Hospital has been saved',
        body:`${name} hospital was added.`
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
            message:`${name} , Hospital was successfully created :)`,
            Data:newHospital
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
           message:'An Error occured while creating Hospital',
           Error:e
       })
    }
}


exports.getAllHospitals = async (req,res) => {
    try { 
    const AllHospitals = await Hospital.find();
    res.status(200).json({
        success:true,
        message:`${AllHospitals.length === 0 ? 'No Hospital available' : 'Successfully fetched all Hospitals'}`,
        Data:AllHospitals,
        count:AllHospitals.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching Hospitals for you.',
            Error:e,
        })
    }
}

exports.getHospital = async (req,res) => {
    try { 
    const hospital = await Hospital.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${hospital.length === 0 ? 'No Hospital available with this id':'Successfully fetched the hospital.'}`,
        Data:hospital,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a hospital for you.',
            Error:e,
        })
    }
}


exports.updateAHospital = async (req,res) => {
    try {
    const hospitalExist = await Hospital.find({_id:req.params.id});
    if(!hospitalExist) {
        res.status(400).json({
            success:false,
            message:'A Hospital with this id doesnt exist.'
        });
        return;
    }    
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Hospital was successfully updated.',
        Data:updatedHospital,
        count:updatedHospital.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a Hospital for you.',
            Error:e,
        })
    }
}


exports.deleteHospital = async (req,res) => {
    try { 
    const hospitalExist = await Hospital.find({_id:req.params.id});
    if(!hospitalExist) {
        res.status(400).json({
            success:false,
            message:'A Hospital with this id doesnt exist.'
        });
        return;
    }  
    await Hospital.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Hospital was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Hospital for you.',
            Error:e,
        })
    }
}

