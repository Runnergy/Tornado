let mongoose =require('mongoose');

//creat a MODEL class
let tournamentModel= mongoose.Schema({
    tournament_id: String,
    title: String,
    participant: [String],
    type : String
    

},
{
collection :"tournamentobject"

}); 
module.exports=mongoose.model('Tournament',tournamentModel);