const Show = require("../models/show.model")
const jwt = require("jsonwebtoken")
const User = require("../models/user.model")

module.exports = {

    createShow: (req, res)=>{

        const newShowObject = new Show(req.body)

        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });

        newShowObject.savedBy = decodedJWT.payload.id

        newShowObject.save()
        .then((newShow)=>{
            console.log(newShow)
            res.json(newShow)
        })
        .catch((err)=>{
            console.log(req.body)
            console.log("createShow failed")
            res.status(400).json(err)
        })
    },


    saveOrUpdate: (req, res)=>{

        const newShowObject = new Show(req.body)

        const decodedJWT = jwt.decode(req.cookies.usertoken, {
            complete: true,
        });

        const userId = decodedJWT.payload.id
        const userName = decodedJWT.payload.userName

        console.log("userId: " + userId)
        console.log("userName: " + userName)

        const testSave = async () =>{
            try{
                let show = await Show.findOne({name: req.body.name})
                let activeUser = await User.find({username: userName})

                if (!show){
                    newShowObject.savedBy = userId

                    newShowObject.save()
                    .then((newShow)=>{
                        console.log(newShow)
                        res.json(newShow)
                    })
                    .catch((err)=>{
                        console.log(req.body)
                        console.log("testShow failed")
                        res.status(400).json(err)
                    })
                }
                else{
                    let updatedShow = await Show.findOneAndUpdate({name: req.body.name}, 
                        {"$addToSet" : {savedBy: userId}}, 
                        {new:true})
                        .then((newShow)=>{
                            console.log(newShow)
                            res.json(newShow)
                        })
                        .catch((err)=>{
                            console.log("testSave " + err)
                        })
                    // activeUser.showsLiked.push(updatedShow)
                    // activeUser = await activeUser.save()
                    // updatedShow.savedBy.push(activeUser)
                    // updatedShow = updatedShow.save()

                    return updatedShow
                }
            }
            catch(e){

            }
        }

        testSave()

    },


    getOneShow: (req, res)=>{
        Show.findOne({name: req.params.name})
            .then((oneShow)=>{
                console.log(oneShow)
                res.json(oneShow)
            })
            .catch((err)=>{
                console.log("getOneShow has failed")
                res.json({
                    message: "Something went wrong in getOneShow",
                    error:err
                })
            })
    },

    getAllShowsByUser : (req, res)=>{
        if(req.jwtpayload.username !== req.params.username){
            console.log("Not currently logged in user")
            console.log("testing for param " + req.params.username)
            User.findOne({username: req.params.username})
                .then((userNotLoggedIn)=>{
                    console.log(userNotLoggedIn)
                    Show.find({savedBy: userNotLoggedIn._id})
                    .populate("savedBy", "username")
                    .then((allShowsFromUser)=>{
                        console.log(allShowsFromUser)
                        res.json(allShowsFromUser)
                    })
                    .catch((err)=>{
                        console.log(err)
                        res.status(400).json(err)
                    })
                })
        }
        else{
            console.log("This is the logged in user")
            console.log("req.jwtpayload.id: ", req.jwtpayload.id)
            Show.find({savedBy:req.jwtpayload.id})
                .populate("savedBy", "username")
                .then((allShowsFromUser)=>{
                    console.log(allShowsFromUser)
                    res.json(allShowsFromUser)
                })
                .catch((err)=>{
                    console.log(err)
                    res.status(400).json(err)
                })
        }
            
    },

    deleteShow : (req, res)=>{
        
        // const newShowObject = new Show(req.body);

        // const decodedJWT = jwt.decode(req.cookies.usertoken, {
        //     complete: true,
        // });

        // const userId = decodedJWT.payload.id;
        // const userName = decodedJWT.payload.userName;

        // console.log("userId: " + userId);
        // console.log("userName: " + userName);

        // const testSave2 = async () => {
        //     try {
        //         let show = await Show.findOne({ _id: req.params.id });
        //         let activeUser = await User.find({ username: userName });

        //         if (!show) {
        //             newShowObject.savedBy = userId;

        //             newShowObject
        //                 .save()
        //                 .then((newShow) => {
        //                     console.log(newShow);
        //                     res.json(newShow);
        //                 })
        //                 .catch((err) => {
        //                     console.log(req.body);
        //                     console.log("testShow failed");
        //                     res.status(400).json(err);
        //                 });
        //         } else {
        //             let updatedShow = await Show.findOneAndUpdate(
        //                 { name: req.body.name },
        //                 { $pull: { savedBy: userId } },
        //                 { new: true }
        //             )
        //                 .then((newShow) => {
        //                     console.log(newShow);
        //                     res.json(newShow);
        //                 })
        //                 .catch((err) => {
        //                     console.log("testSave " + err);
        //                 });
        //             // activeUser.showsLiked.push(updatedShow)
        //             // activeUser = await activeUser.save()
        //             // updatedShow.savedBy.push(activeUser)
        //             // updatedShow = updatedShow.save()

        //             return updatedShow;
        //         }
        //     } catch (e) {}
        // };

        // testSave2();
        
        
        // console.log(req)

        Show.findOneAndUpdate({name: req.params.name}, 
            {"$pull" : {savedBy: req.jwtpayload.id}}, 
            {new:true})
            .then((newShow)=>{
                console.log(newShow)
                res.json(newShow)
            })
            .catch((err)=>{
                console.log(err.res.data)
            })
        

        // Show.updateOne({name:req.params.name}, 
        //     {$pull:{'savedBy': {_id:userId}}}, 
        //     {new:true})
        // .then((updatedShow)=>{
        //     console.log(updatedShow)
        //     res.json(updatedShow)
        // })
        // .catch((err)=>{
        //     console.log("Error in deleteShow")
        //     res.status(400).json(err)
        // })

    }

    
    // testSave: (req, res)=>{
    //     const newShow = await Show.findOne({name:req.body.name})

    // }
}