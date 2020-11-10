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
    }
    
    window.addEventListener("load", Start);
})();