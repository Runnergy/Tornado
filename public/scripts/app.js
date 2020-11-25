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

        if(title === 'Progress Tournament')
        {
            let currentPage = window.location.href;

            // get the round number using the last character of url
            let roundNumber = currentPage.substr(currentPage.length - 1);
            
            // call function with different parameters
            switch (roundNumber) {
                case '0': 
                determineWinnerRound('first', 'second');
                    break;
                case '1': 
                determineWinnerRound('second', 'third');
                    break;
                case '2': 
                determineWinnerRound('third', 'forth');
                    break;
                case '3': 
                determineWinnerRound('forth', 'fifth');
                    break;
                case '4': 
                determineWinnerRound('forth', 'fifth');
                    break;
            
                default:
                    break;
            }
        }
    }
    
    window.addEventListener("load", Start);

    if(document.title == "Contact Us")
    {
        // get send and cancel button
        let sendButton = document.getElementById("sendButton");
        let cancelButton = document.getElementById("resetButton");
    
        sendButton.addEventListener("click", (event) => {
           event.preventDefault();
    
           // get values from form elements
           let firstName = document.getElementById("fname").value;
           let lastName = document.getElementById("lname").value;
           let email = document.getElementById("email").value;
           let message = document.getElementById("message").value;
           let form = document.forms[0];
    
           if(firstName =="" || lastName=="" || email=="" )
           {
               confirm("Please fill the form...");
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

    function determineWinnerRound(currentRound, nextRound)
    {
        // radio button for each participant
        let rbtnRoundParticipants = document.getElementsByClassName('rbtnRoundParticipants');

        // text input field containing string value of next round's participants
        let nextRoundParticipants = document.getElementById(nextRound + 'RoundParticipants').value;
        
        // split the string and assign them to the array
        let nextParticipantsArray = nextRoundParticipants.split(",");

        for (let index = 0; index < rbtnRoundParticipants.length; index++) 
        {
            // when radio button is changed
            rbtnRoundParticipants[index].addEventListener('change', (e) => {

                // calculate the index to display clicked object on the next round's object
                nextIndex = Math.floor((index)/2);

                // assign changed radio button's value to next round's participants array
                nextParticipantsArray[nextIndex] = rbtnRoundParticipants[index].value;

                // assign the array to next round's text input field
                document.getElementById(nextRound + 'RoundParticipants').value = nextParticipantsArray;
            });   
        }
    }
})();

function displayParticipant() {
        let fourBouts = document.getElementById("fourBouts");
        let eightBouts = document.getElementById("eightBouts");
        let fourbout = document.getElementById("fourbout");
        let eightbout = document.getElementById("eightbout");
        fourbout.style.display = fourBouts.checked ? "block" : "none";
        eightbout.style.display = eightBouts.checked ? "block" : "none";
};