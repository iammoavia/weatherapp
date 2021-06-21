const MoonCalendar = require('../Schemas/MoonCalendar');
const fetch = require('node-fetch');
const Notification = require('../Schemas/Notification');

exports.createMoonCalendar = async (req,res) => {
    try {
       const {year,month} = req.body;
       if(!year || !month) {
           res.status(400).json({
               success:false,
               Message:'Please provide all the attributes'
           });
           return;
       }
       const newMoonCalendar = new MoonCalendar({
          image:null,
          addedOn:new Date(),
          year:year,
          month:month
       }) 
       await newMoonCalendar.save();

       const notification_body = {
        title:'A moon calendar has been saved',
        body:`A moon calendar for month ${month} ${year}  was added.`
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
            message:`A Moon calendar was successfully created :)`,
            Data:newMoonCalendar
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
           message:'An Error occured while creating moon calendar',
           Error:e
       })
    }
}


exports.getAllMoonCalendars = async (req,res) => {
    try { 
    const AllMoonCalendars = await MoonCalendar.find();
    res.status(200).json({
        success:true,
        message:`${AllMoonCalendars.length === 0 ? 'No Moon Calendar available' : 'Successfully fetched all Moon Calendars'}`,
        Data:AllMoonCalendars,
        count:AllMoonCalendars.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching Moon Calendar for you.',
            Error:e,
        })
    }
}

exports.getMoonCalendar = async (req,res) => {
    try { 
    const fetchedMoonCalendar = await MoonCalendar.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fetchedMoonCalendar.length === 0 ? 'No Moon Calendar available with this id':'Successfully fetched the Moon Calendar.'}`,
        Data:fetchedMoonCalendar,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a Moon Calendar for you.',
            Error:e,
        })
    }
}


exports.updateMoonCalendar = async (req,res) => {
    try {
    const MoonCalendarr = await MoonCalendar.find({_id:req.params.id});
    if(!MoonCalendarr) {
        res.status(400).json({
            success:false,
            message:'A Moon Calendar with this id doesnt exist.'
        });
        return;
    }    
    const updatedMoonCalendar = await MoonCalendar.findByIdAndUpdate(req.params.id,req.body);
    res.status(200).json({
        success:true,
        message:'This Moon Calendar was successfully updated.',
        Data:updatedMoonCalendar,
        count:updatedMoonCalendar.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a Moon Calendar for you.',
            Error:e,
        })
    }
}


exports.deleteMoonCalendar = async (req,res) => {
    try { 
    const moonCalendarExist = await MoonCalendar.find({_id:req.params.id});
    if(!moonCalendarExist) {
        res.status(400).json({
            success:false,
            message:'A Moon Calendar with this id doesnt exist.'
        });
        return;
    }  
    await MoonCalendar.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A Moon Calendar was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a Moon Calendar for you.',
            Error:e,
        })
    }
}

