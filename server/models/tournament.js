let mongoose =require('mongoose');
const participant = require('./participant');

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: { type : String},
    participants: [{ type: participant}],
    round: {type: String},
    type:{type: String},
    enddate:{type:Date},
    startdate:{type:Date},
    hostname:{type:String}

},
{
collection :"tournaments"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);

