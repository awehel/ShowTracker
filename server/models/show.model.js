const mongoose = require("mongoose")

const ShowSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: [true, "Show name is required"]
        },
        poster_path:{
            type:String,
            required: true
        },
        showComplete:{
            type:Boolean
        },
        savedBy:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:"User"
            }
        ]
        
    

    }, {timestamps:true}
)

const Show = mongoose.model("Show", ShowSchema)
module.exports = Show