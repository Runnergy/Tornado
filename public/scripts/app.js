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
        determineWinner('first', 'second');
        determineWinner('second', 'third');
        determineWinner('third', 'fourth');
        determineWinner('fourth', 'fifth');
        
    }

    function determineWinner(currentRound, nextRound)
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