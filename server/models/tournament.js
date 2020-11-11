let mongoose =require('mongoose');

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    title: String,
    participants: Array,
    bout : String
},
{
collection :"tournaments"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);