// IIFE
(function () {
    function Start() {
        console.log("App started...");


        let deleteButtons = document.querySelectorAll('.btn-danger');
        
        for(button of deleteButtons)
        {
            button.addEventListener('click', (event)=>{
                if(!confirm("Are you sure?")) 
                {
                    event.preventDefault();
                    window.location.assign('/tournament');
                }
            });
        }

        // determine winner for each round
        determinWinner('first', 'second');
        determinWinner('second', 'third');
        determinWinner('third', 'fourth');
        determinWinner('fourth', 'fifth');
        
    }

    function determinWinner(currentRound, nextRound)
    {
        // current round's participants
        let roundParticipants = document.getElementsByClassName(currentRound);
        
        for (let index = 0; index < roundParticipants.length; index++) 
        {
            // when one of the participant object is clicked
            roundParticipants[index].addEventListener('click', (e) => {
                // calculate the index to display clicked object on the next round's object
                nextIndex = Math.floor((index)/2);

                // next round's participants
                let nextRoundParticipants = document.getElementsByClassName(nextRound);

                // assign clicked current participant's number to the next round's winner number
                nextRoundParticipants[nextIndex].querySelector('.participant-num').innerText = 
                    roundParticipants[index].querySelector('.participant-num').innerText;

                // assign clicked current participant's name to the next round's winner name
                nextRoundParticipants[nextIndex].querySelector('.participant-name').innerText = 
                    roundParticipants[index].querySelector('.participant-name').innerText;
            });
        }
    }
    
    window.addEventListener("load", Start);
})();