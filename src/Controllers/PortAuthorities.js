const PortAuthority = require('../Schemas/PortAuthorities');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createPortAuthority = async (req,res) => {
    try {
      

        const {zipCode,address,name,email,FAX,TEL,latitude,longitude} = req.body;
        if(!name || !email || !zipCode || !address || !FAX || !latitude || !longitude || !TEL) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newPortAuthority = new PortAuthority({
           name:name,
          address:address,
          TEL:TEL,
          FAX:FAX,
              latitude:latitude,
              longitude:longitude,
          addedOn:new Date(),
          email:email,
          zipCode:zipCode
       }) 
       await newPortAuthority.save();

       const notification_body = {
        title:'A new port authority was added',
        body:`${name} port authority was added in app.`
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
            message:`A port authority was successfully created :)`,
            Data:newPortAuthority
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
           message:'An Error occured while creating a port authority',
           Error:e
       })
    }
}


exports.getAllPortAuthorities = async (req,res) => {
    try { 
    const AllPortAuthorities = await PortAuthority.find();
    res.status(200).json({
        success:true,
        message:`${AllPortAuthorities.length === 0 ? 'No Port authority available' : 'Successfully fetched all Port authorites'}`,
        Data:AllPortAuthorities,
        count:AllPortAuthorities.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching port authorities for you.',
            Error:e,
        })
    }
}

exports.getPortAuthority = async (req,res) => {
    try { 
    const fetchedPortAuthority = await PortAuthority.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedPortAuthority.length === 0 ? 'No port authority available with this id':'Successfully fetched the port authority.'}`,
        Data:fetchedPortAuthority,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a passenger port for you.',
            Error:e,
        })
    }
}


exports.updatePortAuthority = async (req,res) => {
    try {
    const portAuthorityExist = await PortAuthority.find({_id:req.params.id});
    if(!portAuthorityExist) {
        res.status(400).json({
            success:false,
            message:'A port authority with this id doesnt exist.'
        });
        return;
    }    
    const updatedPortAuthority = await PortAuthority.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This port authority was successfully updated.',
        Data:updatedPortAuthority,
        count:updatedPortAuthority.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a passenger port for you.',
            Error:e,
        })
    }
}


exports.deletePortAuthority = async (req,res) => {
    try { 
    const portExist = await PortAuthority.find({_id:req.params.id});
    if(!portExist) {
        res.status(400).json({
            success:false,
            message:'A port authority with this id doesnt exist.'
        });
        return;
    }  
    await PortAuthority.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A port authority was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a port authority for you.',
            Error:e,
        })
    }
}

