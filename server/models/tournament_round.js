let mongoose =require('mongoose');

//creat a MODEL class
let roundModel= mongoose.Schema({
    participants: [String]
},
{
collection :"round"
}); 
module.exports=mongoose.model('round',roundModel); 