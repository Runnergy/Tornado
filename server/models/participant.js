let mongoose =require('mongoose');

//creat a MODEL class
let participantModel= mongoose.Schema({
participantname: String,
history: Array
},
{
collection :"participants"

}); 
module.exports=mongoose.model('participant',participantModel);