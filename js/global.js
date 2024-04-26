var contact_dialog = document.getElementsByTagName('dialog')[0];
var contact_form = document.getElementsByTagName('form')[0];

/*
Function that is called when the 'Contact Us' button is clicked
*/
function showContactForm() {
    contact_dialog.showModal();
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
    }else{
        // Form validation failed. Do nothing for now
    }
}

/*
Function that is called when the 'close' button is clicked 
on the contact form
*/
function closeContactForm() {
    contact_dialog.close();
    // Clear any residual content
}

/*
Function that is called after page content has been loaded.
Will acquire the value of the 'page' parameter and use AJAX to load
the content.
*/
window.onload = function () {
    // acquire parameter
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has('page')) {
        AJAXload(searchParams.get('page'));
    } else {
        AJAXload('home');
    }

}

/*
Function that is called after the 'page' parameter has been acquired
*/
function AJAXload(page) {
    // highlight the appropriate button in the header section
    if (page.substr(0, 8) === 'details_') {
        document.getElementById('btn_home').className = 'btn_active';
    } else {
        document.getElementById('btn_' + page).className = 'btn_active';
    }

    // attemp AJAX call
    if (window.XMLHttpRequest) {
        request = new XMLHttpRequest();
        try {
            request.onreadystatechange = getInfo;
            request.open("GET", 'pages/' + page + '.html', true);
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
Will insert the loaded content into the DIV element with ID 'content'.
*/
function getInfo() {
    if (request.readyState == 4) {
        var val = request.responseText;
        document.getElementById('content').innerHTML = val;
    }
}