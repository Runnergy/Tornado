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

        if(title === 'Tournament brackets')
        {
            determineWinner('first', 'second');
            determineWinner('second', 'third');
            determineWinner('third', 'forth');
            determineWinner('forth', 'fifth');

            let clearButton = document.querySelector('#btnClearBracket');
            clearButton.addEventListener('click', clearBrackets);
        }
        
    }

    function determineWinner(currentRound, nextRound)
    {
        // current round's participants
        let roundParticipants = document.getElementsByClassName(currentRound);

        // participants in current round
        let roundParticipantsArray = document.getElementById(currentRound + 'RoundParticipants').value;
        let nextRoundParticipantsArray = document.getElementById(nextRound + 'RoundParticipants').value;
        
        let currentArray = roundParticipantsArray.split(",");
        let nextArray = nextRoundParticipantsArray.split(",");
        
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

                roundParticipantsArray = document.getElementById(currentRound + 'RoundParticipants').value;
    
                currentArray = roundParticipantsArray.split(",");

                nextArray[nextIndex] = currentArray[index];
                // console.log(nextArray);
                let nextRoundParticipantsArray = document.getElementById(nextRound + 'RoundParticipants');
                nextRoundParticipantsArray.value = nextArray;
                
                console.log(currentArray);
                console.log(nextArray);
                console.log(nextRoundParticipantsArray.value);
            });
        }
        
    }

    function clearBrackets()
    {
        let secondParticipantsArray = document.getElementById('secondRoundParticipants');
        let thirdParticipantsArray = document.getElementById('thirdRoundParticipants');
        let forthParticipantsArray = document.getElementById('forthRoundParticipants');
        let fifthParticipantsArray = document.getElementById('fifthRoundParticipants');
        
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

    // // ??
    // function determineScore()
    // {
    //     // let participants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //     // let participant1, participant2, participant3, participant4, participant5, participant6, participant7, participant8 = 0;
    //     // let participant9, participant10, participant11, participant12, participant13, participant14, participant15, participant16 = 0;
        

    //     let allContainers = document.querySelectorAll('.participant');
    //     // console.log(allContainers[0].getElementsByClassName('participant-num')[0].innerText);
    //     let participants = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    //     // console.log(participants[0]++);
    //     console.log(allContainers[0]);

    //     for (let index = 0; index < allContainers.length; index++) {
    //         let participantNum = allContainers[index].querySelector('.participant-num').innerText;
    //         console.log(`aa: ${allContainers[0].querySelector('.participant-num').innerText}`);
    //         console.log(`aa: ${allContainers[1].querySelector('.participant-num').innerText}`);

    //         switch (participantNum) {
    //             case '1': participants[0]++; break;
    //             case '2': participants[1]++; break;
    //             case '3': participants[2]++; break;
    //             case '4': participants[3]++; break;
    //             case '5': participants[4]++; break;
    //             case '6': participants[5]++; break;
    //             case '7': participants[6]++; break;
    //             case '8': participants[7]++; break;
    //             case '9': participants[8]++; break;
    //             case '10': participants[9]++; break;
    //             case '11': participants[10]++; break;
    //             case '12': participants[11]++; break;
    //             case '13': participants[12]++; break;
    //             case '14': participants[13]++; break;
    //             case '15': participants[14]++; break;
    //             case '16': participants[15]++; break;
    //             default: break;
    //         }

    //         return participants;
            
    //     }
    //     // for (const container in allContainers) 
    //     // {
    //     //     console.log(container);
    //     //     let participantNum = container.queryselector('.participant-num').innerText;
    //     //     switch (participantNum) {
    //     //         case 1: participants[0]++; break;
    //     //         case 2: participants[1]++; break;
    //     //         case 3: participants[2]++; break;
    //     //         case 4: participants[3]++; break;
    //     //         case 5: participants[4]++; break;
    //     //         case 6: participants[5]++; break;
    //     //         case 7: participants[6]++; break;
    //     //         case 8: participants[7]++; break;
    //     //         case 9: participants[8]++; break;
    //     //         case 10: participants[9]++; break;
    //     //         case 11: participants[10]++; break;
    //     //         case 12: participants[11]++; break;
    //     //         case 13: participants[12]++; break;
    //     //         case 14: participants[13]++; break;
    //     //         case 15: participants[14]++; break;
    //     //         case 16: participants[15]++; break;
    //     //         default: break;
    //     //     }
    //     // }
    // }
    // // ??
    // function addScore()
    // {
    //     let participants = determineScore();

    //     let scoreInputs = document.querySelectorAll('.invisible');
    //     for (let index = 0; index < scoreInputs.length; index++) 
    //     {
    //         scoreInputs[index].value = participants[index];
    //         console.log(scoreInputs[index].value);
    //     }
    // }



})();