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
                determineWinnerRound('second');
                    break;
                case '1': 
                determineWinnerRound('third');
                    break;
                case '2': 
                determineWinnerRound('forth');
                    break;
                case '3': 
                determineWinnerRound('fifth');
                    break;
                case '4': 
                determineWinnerRound('fifth');
                    break;
            
                default:
                    break;
            }
        }

        if(title === 'Tournament brackets')
        {
            let bracketWidth = document.getElementById('resultBracket').clientWidth;

            let exportButtons = document.getElementsByClassName('btnExport');

            for (const exportButton of exportButtons) {
                    exportButton.addEventListener('click', () => {
                    let opt = {
                        html2canvas:  { width: bracketWidth }
                    }; 

                    let resultBracket = document.getElementById('resultBracket');
                    let resultTable = document.getElementById('resultTable');
                    
                    html2pdf().from(resultTable).toPdf().set(opt).get('pdf').then(function (pdf) {
                        pdf.addPage();
                    }).from(resultBracket).toContainer().toCanvas().toPdf().save();
                });
            }
        }

        if(title === "Update Tournament"|| title === "Create Tournament")
        {
            dateValidation();
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

    if(document.title == "Register")
    {let password = document.getElementById("password");
    let passwordconfirm = document.getElementById("password1");
    
    function checkPassword(){
        let status = document.getElementById("password_checking");
         let buttonsubmit =document.getElementById("submitbtn");
    
        status.innerHTML = "";
        buttonsubmit.removeAttribute("disabled");
    
        if(password.value === "")
            return;
    
        if(passwordconfirm.value === password.value)
            return;
    
        status.innerHTML = "Passwords do not match";
        status.style.color="red";
        buttonsubmit.setAttribute("disabled", "disabled");
    }
    
    password.addEventListener("change", function(event){
        checkPassword();
    });
    passwordconfirm.addEventListener("change", function(event){
        checkPassword();
    });
        
}

    function determineWinnerRound(nextRound)
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

    function dateValidation()
    {
        let submitButton = document.getElementById('btnSubmit');

        submitButton.addEventListener('click', (event) => {
            
            let startdate = new Date(document.getElementById('startdate').value);
            let enddate = new Date(document.getElementById('enddate').value);

            // time difference in milliseconds
            const diffTime = enddate - startdate;

            // difference in days
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

            // date input fields
            let dateStartdate = document.getElementById('startdate');
            let dateEnddate = document.getElementById('enddate');

            // if enddate - startdate is less then 0, call preventDefault function, displaying error
            if(diffDays < 0)
            {
                event.preventDefault();

                // invalid input class
                dateStartdate.classList.add("is-invalid");
                dateEnddate.classList.add("is-invalid");
            }
            else
            {
                // remove invalid input class
                dateStartdate.classList.remove("is-invalid");
                dateEnddate.classList.remove("is-invalid");

                // add valid input class
                dateStartdate.classList.add("is-valid");
                dateEnddate.classList.add("is-valid");
            }
        });
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

function myFunction() {
  var element = document.getElementById("tournamentTable");
  element.scrollIntoView();
}