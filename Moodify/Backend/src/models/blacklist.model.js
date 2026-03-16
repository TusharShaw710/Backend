const mongoose=require("mongoose");

const blackListSchema=mongoose.Schema({
    token:String
},{
    timestamps:true
});

const blackListModel = mongoose.model("blackList", blackListSchema);

module.exports = blackListModel;