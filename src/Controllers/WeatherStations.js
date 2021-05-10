const WeatherStation = require('../Schemas/WeatherStations');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createWeatherStation = async (req,res) => {
    try {
       
        const {name,url,latitude,longitude} = req.body;
        if(!name || !url || !latitude || !longitude) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
       const newWeatherStation = new WeatherStation({
          name:name,
          latitude:latitude,
          longitude:longitude,
          addedOn:new Date(),
          url:url
       }) 
       await newWeatherStation.save();
       
       const notification_body = {
        title:'A new weather station was added',
        body:`${name} weather station was added in app.`
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
        message:`${name} , Weather station was successfully created :)`,
        Data:newWeatherStation
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
           message:'An Error occured while creating weather station',
           Error:e
       })
    }
}


exports.getAllWeatherStations = async (req,res) => {
    try { 
    const weatherstations = await WeatherStation.find();
    res.status(200).json({
        success:true,
        message:`${weatherstations.length === 0 ? 'No weather station available' : 'Successfully fetched weather stations'}`,
        Data:weatherstations, 
        count:weatherstations.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching weather stations for you.',
            Error:e,
        })
    }
}

exports.getWeatherStation = async (req,res) => {
    try { 
    const fetchedStation = await WeatherStation.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedStation.length === 0 ? 'No weather station available with this id':'Successfully fetched the weather station.'}`,
        Data:fetchedStation,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a weather station for you.',
            Error:e,
        })
    }
}


exports.updateWeatherStation = async (req,res) => {
    try {
    const weatherStationExist = await WeatherStation.find({_id:req.params.id});
    if(!weatherStationExist) {
        res.status(400).json({
            success:false,
            message:'A weather station with this id doesnt exist.'
        });
        return;
    }    
    const updatedWeatherStation = await WeatherStation.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This weather station was successfully updated.',
        Data:updatedWeatherStation,
        count:updatedWeatherStation.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a weather station for you.',
            Error:e,
        })
    }
}


exports.deleteWeatherStation = async (req,res) => {
    try { 
    const weatherStationExists = await WeatherStation.find({_id:req.params.id});
    if(!weatherStationExists) {
        res.status(400).json({
            success:false,
            message:'A weather station with this id doesnt exist.'
        });
        return;
    }  
    const deletedStation = await WeatherStation.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A weather station was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a weather station for you.',
            Error:e,
        })
    }
}

