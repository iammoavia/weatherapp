const Airport = require('../Schemas/Airports');
const fetch = require('node-fetch');
const axios = require('axios');
const https = require('https');
const Notification = require('../Schemas/Notification');
exports.createAirport = async (req,res) => {
    try {
          
        const {name,latitude,longitude,site,email,FAX,TEL,zipCode,address} = req.body;
        if(!name  || !latitude || !longitude || !site || !email || !FAX || !TEL || !zipCode || !address) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newAirport = new Airport({
          name:name,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date(),
          site:site,
          email:email,
          FAX:FAX,
          TEL:TEL,
          zipCode:zipCode,
          address:address
       }) 
       await newAirport.save();
       const notification_body = {
        title:'A new airport has been saved',
        body:`${name} airport was added.`
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
            message:`${name} , Airport was successfully created :)`,
            Data:newAirport,
            notification:apiRes.json()
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
           message:'An Error occured while creating airport',
           Error:e
       })
    }
}


exports.getAllAirports = async (req,res) => {
    try { 
    const airports = await Airport.find();
    res.status(200).json({
        success:true,
        message:`${airports.length === 0 ? 'No Airport available' : 'Successfully fetched airports'}`,
        Data:airports,
        count:airports.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching airports for you.',
            Error:e,
        })
    }
}

exports.getAirport = async (req,res) => {
    try { 
    const airport = await Airport.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${airport.length === 0 ? 'No Airport available with this id':'Successfully fetched the airport.'}`,
        Data:airport,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching an airport for you.',
            Error:e,
        })
    }
}


exports.updateAnAirport = async (req,res) => {
    try {
    const airportExist = await Airport.find({_id:req.params.id});
    if(!airportExist) {
        res.status(400).json({
            success:false,
            message:'An airport with this id doesnt exist.'
        });
        return;
    }    
    const airport = await Airport.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This airport was successfully updated.',
        Data:airport,
        count:airport.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating an airport for you.',
            Error:e,
        })
    }
}


exports.deleteAirport = async (req,res) => {
    try { 
    const airportExist = await Airport.find({_id:req.params.id});
    if(!airportExist) {
        res.status(400).json({
            success:false,
            message:'An airport with this id doesnt exist.'
        });
        return;
    }  
    const airport = await Airport.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`An Airport was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting an airport for you.',
            Error:e,
        })
    }
}

