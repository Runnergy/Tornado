let mongoose =require('mongoose');
const round = require('./tournament_round');
let roundSchema = mongoose.model('round').schema;

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: String,
    rounds: [roundSchema],
    roundTotal: String,
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

