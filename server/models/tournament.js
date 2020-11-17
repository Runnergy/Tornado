let mongoose =require('mongoose');
const participant = require('./participant');
let participantSchema = mongoose.model('participant').schema;

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: String,
    participants: [participantSchema],
    round: String,
    type: String,
    enddate: Date,
    startdate: Date,
    hostname: String,
    status: String
},
{
collection :"tournaments"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);

