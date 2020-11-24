let mongoose =require('mongoose');

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: String,
    // participants: [participantSchema],
    roundTotal: String,
    round1: [String],
    round2: [String],
    round3: [String],
    round4: [String],
    round5: [String],
    type: String,
    enddate: Date,
    startdate: Date,
    host: String,
    status: String,
    description: String
},
{
collection :"tournaments"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);

