/*
 * Add your JavaScript to this file to complete the assignment.
 */
var createTwitButton = document.getElementById("create-twit-button");
var modalBackdrop = document.getElementById("modal-backdrop");
var modal = document.getElementById("create-twit-modal");
var modalCancelButton = document.getElementsByClassName("modal-cancel-button")[0];
var modalCloseButton = document.getElementsByClassName("modal-close-button")[0];
var twitText = document.getElementById("twit-text-input");
var twitAuthor = document.getElementById("twit-attribution-input");
var modalAcceptButton = document.getElementsByClassName("modal-accept-button")[0];
var searchInput = document.getElementById("navbar-search-input");
var searchButton = document.getElementById("navbar-search-button");

function modalShow(event) {
    if (modal.classList.contains("hidden")) {
        twitText.value = "";
        twitAuthor.value = "";
        modal.classList.remove('hidden');
        modalBackdrop.classList.remove('hidden');
    }
}

function modalHide(event) {
    if (!(modal.classList.contains("hidden"))) {
        modal.classList.add('hidden');
        modalBackdrop.classList.add('hidden');
    }
}

function checkFields(event) {
    if ((twitText.value == "") || (twitAuthor.value == "")) {
        alert("Failed to send twit, lacking an author and/or message");
        return 1;
    }
}

function createTwit(event) {
    //makes sure both fields are filled before proceeding
    if (checkFields() === 1) {
        return;
    }
    //establishes the parts of the twit as variables.
    //Based on the HTML, we can determine the structure of the twit
    var twit = document.createElement('article'); //the outermost layer of the twit
    var twitIcon = document.createElement('div');
    var bullhorn = document.createElement('i'); //i indicates icon
    var twitContent = document.createElement('div');
    var twitMessage = document.createElement('p');
    var authorLink = document.createElement('a');
    var author = document.createElement('p');
    var body = document.getElementsByClassName('twit-container')[0];
    //This block of code below essentially defines the parts of the twit from inner to outermost.
    //defines the bullhorn variable 
    bullhorn.classList.add('fa');
    bullhorn.classList.add('fa-bullhorn');
    //sets the bullhorn as the twit icon and appends
    twitIcon.classList.add('twit-icon');
    twitIcon.appendChild(bullhorn);

    //tacks twit icon onto the message and sets the value typed
    twitMessage.classList.add('twit-icon');
    twitMessage.textContent = twitText.value;
    //sets author to whatever is typed
    authorLink.href = '#';
    authorLink.textContent = twitAuthor.value;
    author.classList.add('twit-author');
    author.appendChild(authorLink);
    //sets the attribution as the author
    //the message and the attribution (NOT THE AUTHOR) make up the twit content
    twitContent.classList.add("twit-content");
    twitContent.appendChild(twitMessage);
    twitContent.appendChild(author);
    //the twit itself contains the icon and the contents of the twit
    twit.classList.add('twit');
    twit.appendChild(twitIcon);
    twit.appendChild(twitContent);

    //puts the twit on the actual page
    body.appendChild(twit);
    // Hides the modal so we can see the main screen again
    modalHide();

}

function search(event) {
    var twits = document.getElementsByClassName('twit');
    var i = 0;
    for (i = 0; i < 8; i++) {
        if ((twits[i].childNodes[3].childNodes[1].textContent.includes(searchInput.value)) || (twits[i].childNodes[3].childNodes[3].textContent.includes(searchInput.value))) {
            twits[i].classList.remove('hidden');
            continue;
        }
        else {
            twits[i].classList.add('hidden');
        }
    }
    /* This if else logic is necessary for non-default twits (aka the ones the users add).
    Without this logic, any twits added to the page by the user would be included in the live search no matter what because they are structured differently. 
    It has the sane functionality as the first for loop, where it checks the search input against the text and the author, but because they are in different locations for user-added twits, 
    we need to rewrite the statement. In this case, the the first child (0) of twit is the icon itself which we ignore. The second child (1) refers to the contents, which then contains two additional
    children. Those two being the text and the author.*/
    if (twits.length > 8) {
        for (i = 8; i < twits.length; i++) {
            if ((twits[i].childNodes[1].childNodes[0].textContent.includes(searchInput.value)) || (twits[i].childNodes[1].childNodes[1].textContent.includes(searchInput.value))) {
                twits[i].classList.remove('hidden');
                continue;
            }
            else {
                twits[i].classList.add('hidden');
            }
        }
    }
}

createTwitButton.addEventListener('click', modalShow);
modalCancelButton.addEventListener('click', modalHide);
modalCloseButton.addEventListener('click', modalHide);