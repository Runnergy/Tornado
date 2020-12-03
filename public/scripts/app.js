// IIFE
(function () {
    function Start() {

        console.log("App started...");

        let title = document.title;

        let deleteButtons = document.querySelectorAll('.btn-delete');
        
        // confirm msg if delete btn is clicked
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

        if(title === 'Home')
        {
            gsap.registerPlugin(ScrollTrigger);
            
            gsap.from('#tornado-icon', {
                height: 400, 
                duration: 1, 
                opacity:0, 
                ease: "bounce"
            });

            gsap.to('#hero-dragon', {
                scrollTrigger: {
                    start: "100px 80px",
                    end: "1500px 80px",
                    scrub: 2,
                    toggleActions: "restart none none none"
                },
                x:900
            });

            gsap.from('#tornado-icon-txt', {y: 50, duration: 1, opacity:0, ease: "expo", delay: 0.5});
            gsap.from('#hero-description', {y: 50, duration: 1, opacity:0, ease: "expo", delay: 1});

            gsap.from('.home-options', {
                scrollTrigger: {
                    start: "200px 80px",
                    end: "200px 80px",
                    toggleActions: "restart none none none"
                },
                y: 50, 
                duration: 1.5, 
                opacity:0, 
                stagger: 0.6,
                ease: "expo"
            });
        }

        if(title === 'About Us')
        {
            gsap.from('.team-member', {
                y: 10, 
                duration: 2, 
                opacity:0, 
                stagger: 0.3,
                ease: "expo"
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
    }
    
    window.addEventListener("load", Start);

    if(document.title == "Contact Us")
    {
        let cancelButton = document.getElementById("resetButton");
    
        cancelButton.addEventListener("click", (event) => {
           event.preventDefault();
            if(confirm("Are you sure?"))
            {
               location.href = "/home";
            }
        })
    }

    // fn to check if password and retype password match
    if(document.title == "Register"){
        let password = document.getElementById("password");
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
})();

// display <small> message tag to convey no of participants req
function displayParticipant() {
    let fourBouts = document.getElementById("fourBouts");
    let eightBouts = document.getElementById("eightBouts");
    let fourbout = document.getElementById("fourbout");
    let eightbout = document.getElementById("eightbout");
    fourbout.style.display = fourBouts.checked ? "block" : "none";
    eightbout.style.display = eightBouts.checked ? "block" : "none";
};
//function added to make the id reference scoll smooth
function smoothScroll() {
    var element = document.getElementById("tournamentTable");
    element.scrollIntoView();
};

// contact page form submission confirmation
function contactFunction()
{
    if(confirm("Your submission was successfull..."))
    {
        document.getElementById("contactForm").reset();
    }
};

// for responsive tables
( function( root, factory ) {
    "use strict";
    
    if ( typeof define === "function" && define.amd ) {
        define( [ "jquery" ], function( $ ) {
            return factory( root, root.document, $ );
        } );
    } else {
        return factory( root, root.document, root.jQuery );
    }

} )( this, function( window, document, $ ) {
    "use strict";
    
    if ( window.responsiveTables ) {
        console.error( "window.responsiveTables is already defined globally", window.responsiveTables );
        return;
    }

    var responsiveTables = {

        version: "1.0.6",

        titleTpl: function( data ) {
            return "<span data-type='responsive'>" + data + "</span>";
        },

        /**
         * @method init
         * @param selector {String} optional - pass if you wish to update tables that do not meet the selector: table.responsive
         * @param force {Boolean} [default=false] - optional - set true to reiterate over previous converted tables
         */
        init: function( selector, force ) {
            var me = this,
                tables = $( selector ? selector : "table.responsive" ),
                table, ths, th, trs, tds, td, text, it; //for later

            if ( tables.length > 0 ) {

                for ( var i = 0, l = tables.length; i < l; i++ ) {
                    //iterate over each table
                    table = $( tables[ i ] );
                    if ( table.attr( "data-type" ) && !force ) {
                        //ignore this table
                        continue;
                    }
                    table.attr( "data-type", "responsive" );
                    //get all the table header for the give table
                    trs = table.find( "> thead > tr, > tbody > tr, > tr" );
                    ths = trs.find( "> th" );
                    //iterate over all trs
                    for ( var ii = 0, ll = trs.length; ii < ll; ii++ ) {
                        //find tds and iterate
                        tds = $( trs[ ii ] ).find( "> td" );
                        for ( var iii = 0, lll = tds.length; iii < lll; iii++ ) {
                            //for each td - find the correct heading
                            th = ths[ iii ];
                            it = $( tds[ iii ] );
                            //get the text content
                            text = th.textContent || th.innerText || "";
                            if ( force ) {
                                it.find( "span[data-type='responsive']" ).remove();
                            }
                            //prepend td with the correct template
                            td = it.prepend( me.titleTpl( text ) );
                        }
                    }
                }
            }
        }

    };
    
    //define globally
    window.responsiveTables = responsiveTables;
    return responsiveTables;
} );