const FavoritePlace = require('../Schemas/FavoritePlaces');
const User = require('../Schemas/UserSchema');
exports.createFavoritePlaces = async (req,res) => {
    try {
    
        const {name,user,userId,location,city,country,latitude,longitude,addedOn} = req.body;
        if( !name || !location || !user || !userId || !city || !country || !latitude || !longitude || !addedOn) {
            res.status(400).json({
                success:false,
                message:'Please fill the form correctly.',
            });
            return;
        }
        const UserWhoCreated = await User.find({_id:userId});
        if(!UserWhoCreated) {
            res.status(400).json({
                success:false,
                message:'User with this id doesnt exist',
            });
            return;
        }

       const newFishingPoint = new FavoritePlace({
           name:name,
          address:{
              location:location,
              city:city,
              country:country
          },
          coordinates:{
              latitude:latitude,
              longitude:longitude
          },
          user:UserWhoCreated,
          userId:userId,
          addedOn:addedOn
       }) 
       await newFishingPoint.save();
       res.status(200).json({
           success:true,
           message:'A favorite place was successfully created!',
           Data:newFishingPoint
       })
    } catch(e) {
       res.status(400).json({
           success:false,
           message:'An Error occured while creating favorite place',
           Error:e
       })
    }
}

exports.getFavoritePlace = async (req,res) => {
    try { 
    const favPlace = await FavoritePlace.find({_id:req.params.id});
    res.status(200).json({
        success:true,
        message:`${favPlace.length === 0 ? 'No favorite place available with this id':'Successfully fetched the favorite place.'}`,
        Data:favPlace,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching a favorite place for you.',
            Error:e,
        })
    }
}


exports.deleteFavoritePlace = async (req,res) => {
    try { 
    const favPlaceExist = await FavoritePlace.find({_id:req.params.id});
    if(!favPlaceExist) {
        res.status(400).json({
            success:false,
            message:'A favorite place with this id doesnt exist.'
        });
        return;
    }  
    const deletedFav = await FavoritePlace.findByIdAndRemove(req.params.id);
    res.status(200).json({
        success:true,
        message:`A favorite place was successfully deleted`,
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while deleting a favorite place for you.',
            Error:e,
        })
    }
}

exports.getMyFavoritePlace = async (req,res) => {
    try { 
    const myFavPlaces = await FavoritePlace.find({userId:req.params.userId});
    res.status(200).json({
        success:true,
        message:`Your favorite places were successfully fetched`,
        Data:myFavPlaces,
        count:myFavPlaces.length
    })
    } catch(e) {
        res.status(400).json({
            success:false,
            message:'An Error occured while fetching favorite places for you.',
            Error:e,
        })
    }
}
