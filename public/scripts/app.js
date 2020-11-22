// IIFE
(function () {
    function Start() {

        console.log("App started...");

        let title = document.title;

        let deleteButtons = document.querySelectorAll('.btn-delete');
        
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

        // when the user is in Tournament bracket page(not in read-only)
        if(title === 'Tournament brackets')
        {
            // enable user determine winner
            determineWinner('first', 'second');
            determineWinner('second', 'third');
            determineWinner('third', 'forth');
            determineWinner('forth', 'fifth');

            // clear bracket button in bracket page
            let clearButton = document.querySelector('#btnClearBracket');

            // when the clear bracket button is clicked
            clearButton.addEventListener('click', clearBrackets);
        }
    }

    function determineWinner(currentRound, nextRound)
    {
        // array of current round's participants
        let roundParticipants = document.getElementsByClassName(currentRound);

        // participants in current and next round (text input's value)
        let currentParticipantsValue = document.getElementById(currentRound + 'RoundParticipants').value;
        let nextRoundParticipantsValue = document.getElementById(nextRound + 'RoundParticipants').value;
        
        // split the value and assign them to the array
        let currentParticipantsArray = currentParticipantsValue.split(",");
        let nextParticipantsArray = nextRoundParticipantsValue.split(",");
        
        for (let index = 0; index < roundParticipants.length; index++) 
        {
            // when one of the participant object is clicked
            roundParticipants[index].getElementsByTagName('button')[0].addEventListener('click', (e) => {
                // calculate the index to display clicked object on the next round's object
                nextIndex = Math.floor((index)/2);

                // next round's participants
                let nextRoundParticipants = document.getElementsByClassName(nextRound);

                // assign clicked current participant's name to the next round's winner name
                nextRoundParticipants[nextIndex].getElementsByTagName('input')[0].value = 
                    roundParticipants[index].getElementsByTagName('input')[0].value;

                // assign value again in current round (text input's value)
                currentParticipantsValue = document.getElementById(currentRound + 'RoundParticipants').value;
    
                // array containing the list of current round's participants
                currentParticipantsArray = currentParticipantsValue.split(",");

                // assign selected participant's name to the next round's participant array
                nextParticipantsArray[nextIndex] = currentParticipantsArray[index];

                // console.log(nextArray);

                // assign value again in current round (text input's value)
                nextRoundParticipantsArray = document.getElementById(nextRound + 'RoundParticipants');
                nextRoundParticipantsArray.value = nextParticipantsArray;
                
                // console.log(currnetParticipantsArray);
                // console.log(nextParticipantsArray);
                // console.log(nextRoundParticipantsArray.value);
            });
        }
        
    }

    function clearBrackets()
    {
        // all round's participants array
        let secondParticipantsArray = document.getElementById('secondRoundParticipants');
        let thirdParticipantsArray = document.getElementById('thirdRoundParticipants');
        let forthParticipantsArray = document.getElementById('forthRoundParticipants');
        let fifthParticipantsArray = document.getElementById('fifthRoundParticipants');
        
        // assign null to every array 
        secondParticipantsArray.value = null;
        thirdParticipantsArray.value = null;
        forthParticipantsArray.value = null;
        fifthParticipantsArray.value = null;
    }
    
    window.addEventListener("load", Start);

    if(document.title == "Contact Us")
    {
        console.log("on contact page")
        let sendButton = document.getElementById("sendButton");
        let cancelButton = document.getElementById("resetButton");
    
        sendButton.addEventListener("click", (event) => {
           event.preventDefault();
    
           let firstName = document.getElementById("fname").value;
           let lastName = document.getElementById("lname").value;
           let email = document.getElementById("email").value;
           let message = document.getElementById("message").value;
           let form = document.forms[0];
    
           console.log("First Name: " + firstName);
           console.log("Last Name: " + lastName);
           console.log("Email: " + email);
           console.log("Message: " + message );
           console.log("");
    
           if(firstName =="" || lastName=="" || email=="" )
           {
               confirm("Please fill the form...")
           }
           else
           {
            if(confirm("Your submission was successfull..."))
            {
               location.href = "/home";
            }
           }
    
           form.reset();
           
          
        })
    
        cancelButton.addEventListener("click", (event) => {
           event.preventDefault();
            if(confirm("Are you sure?"))
            {
               location.href = "/home";
            }
        })
    }

})();