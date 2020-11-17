let mongoose =require('mongoose');

//creat a MODEL class
let participantModel= mongoose.Schema({
participantname: String,
history: Array
},
{
collection :"participant"

}); 
module.exports=mongoose.model('participant',participantModel);