let mongoose =require('mongoose');

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: String,
    participants: [{
    participant:{
            participantName: String,
            history:Array
         }
        }],
    round : String,
    type: String
},
{
collection :"tournaments"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);