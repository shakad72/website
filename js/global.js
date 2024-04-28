// Global variables
const contact_dialog = document.getElementsByClassName('contact_dialog')[0];
const contactSubmitted_dialog = document.getElementsByClassName('contact_submitted_dialog')[0];
const contact_form = document.getElementsByTagName('form')[0];
const pageList = ['home','our_team','testimonials'];

/*
Function that reveals the contact dialog
*/
function showContactForm() {
    contact_dialog.showModal();
}

/*
Function that closes the contact dialog and clear its form contents
*/
function closeContactForm() {
    contact_dialog.close();
    contact_form.reset();
}

/*
Function that reveals the contact submitted dialog
*/
function showContactSubmittedForm(){
    contactSubmitted_dialog.showModal();
}

/*
Function that closes the contact submitted dialog
*/
function closeContactSubmittedForm(){
    contactSubmitted_dialog.close();
}

/*
Function that is called when the 'Submit' button is clicked
on the contact form
*/
function submitContactForm() {
    // Check validity
    if (contact_form.checkValidity()) {
        // Form validation passed
        // Rather than submit using AJAX, simply close the form for now
        contact_dialog.close();
        contact_form.reset();
        contactSubmitted_dialog.showModal();
        return false;
    }else{
        // Form validation failed. Do nothing for now
    }
}

/*
Function that is called after page content has been loaded.
Will acquire the value of the 'page' search parameter and use AJAX to load
the content.
*/
window.onload = function () {
    // acquire search parameters specified in URL
    const searchParams = new URLSearchParams(window.location.search);
    // Is the 'page' search parameter specified?
    if (searchParams.has('page')) {
        // Yes the 'page' searcn parameter is specified. Attempt to load content using AJAX
        AJAXload(searchParams.get('page'));
    } else {
        // No the 'page' search parameter is NOT specified. Load pages/home.html
        AJAXload('home');
    }

}

/*
Function that is called after the 'page' parameter has been acquired
*/
function AJAXload(pageParam) {
    // Highlight the appropriate button in the header section
    pageList.forEach(function(page){
        if(pageParam.substr(0,page.length)===page){
            document.getElementById('btn_'+page).className='btn_active';
        }
    });
    // Attemp AJAX call
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        try {
            request.onreadystatechange = getInfo;
            request.open("GET", 'pages/' + pageParam + '.html', true);
            request.send();
        } catch (e) {
            alert("Unable to connect to server");
        }
    } else {
        // TODO: Use alternative AJAX call since XMLHttpRequest is not available for use
    }
}


/*
Function that is called when the AJAX call has been successfully completed.
If the requested content was found it will be injected inside the element with the 'content' ID
else the home page will be loaded
*/
function getInfo() {
    if (request.readyState == 4) {
        if(request.status===200){
            var val = request.responseText;
            document.getElementById('content').innerHTML = val;
        }else{
            AJAXload('home');
        }
    }
}