const FishingPoint = require('../Schemas/FishingPoints');
const User = require('../Schemas/UserSchema');
exports.createFishingPoint = async (req,res) => {
    try {
    
        const {latitude,longitude,catchName,weight} = req.body;
        if(!latitude || !longitude || !catchName || !weight) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
        const UserWhoCreated = await User.find({_id:req.params.userId});
        if(!UserWhoCreated) {
            res.status(400).json({
                success:false,
                message:'User with this id doesnt exist',
            });
            return;
        }

       const newFishingPoint = new FishingPoint({
          
          latitude:latitude,
          longitude:longitude,          
          userId:req.params.userId,
          addedOn:new Date(),
          catchName:catchName,
          weight:weight,
          image:'loading...'
       }) 
       await newFishingPoint.save();
       res.status(200).json({
           success:true,
           message:'A fishing point was successfully created!',
           Data:newFishingPoint
       })
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating fishing point',
           Error:e
       })
    }
}


exports.getAllFishingPoints = async (req,res) => {
    try { 
    const FishingPoints = await FishingPoint.find();
    res.status(200).json({
        success:true,
        message:`${FishingPoints.length === 0 ? 'No Fishing point available' : 'Successfully fetched fishing points'}`,
        Data:FishingPoints,
        count:FishingPoints.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching fishing points for you.',
            Error:e,
        })
    }
}

exports.getFishingPoint = async (req,res) => {
    try { 
    const fishingPoint = await FishingPoint.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${fishingPoint.length === 0 ? 'No fishing point available with this id':'Successfully fetched the fishing point.'}`,
        Data:fishingPoint,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a fishing point for you.',
            Error:e,
        })
    }
}


exports.updateAFishingPoint = async (req,res) => {
    try {
    const fishingPointExist = await FishingPoint.find({_id:req.params.id});
    if(!fishingPointExist) {
        res.status(400).json({
            success:false,
            message:'A fishing point with this id doesnt exist.'
        });
        return;
    }    
    const fishingPoint = await FishingPoint.findByIdAndUpdate(req.params.id,req.body,{
        new:true
    });
    res.status(200).json({
        success:true,
        message:'This fishing point was successfully updated.',
        Data:fishingPoint,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while updating a fishing point for you.',
            Error:e,
        })
    }
}


exports.deleteFishingPoint = async (req,res) => {
    try { 
    const fishingPointExist = await FishingPoint.find({_id:req.params.id});
    if(!fishingPointExist) {
        res.status(400).json({
            success:false,
            message:'A fishing point with this id doesnt exist.'
        });
        return;
    }  
    const deletedPoint = await FishingPoint.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A fishing point was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a fishing point for you.',
            Error:e,
        })
    }
}

exports.getMyFishingPoints = async (req,res) => {
    try { 
    const myfishingPoints = await FishingPoint.find({userId:req.params.userId});
    res.status(200).json({
        success:true,
        message:`Your fishing points were successfully fetched`,
        Data:myfishingPoints,
        count:myfishingPoints.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching fishing points for you.',
            Error:e,
        })
    }
}
