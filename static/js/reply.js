const mail_id_element = document.getElementById('mail_id');
const from_element = document.getElementById('from');

const urlParams = new URLSearchParams(window.location.search);
const compose = urlParams.get('compose');
const mail_id = urlParams.get('mail_id');
const from = urlParams.get('from');

if (mail_id)
    mail_id_element.value = mail_id;

if (from)
    from_element.innerText = from;

function closeMe() {
    window.parent.postMessage({
        type: "close-me",
        compose: compose
    }, window.location.origin);
}

function hideMe() {
    window.parent.postMessage({
        type: "hide-me",
        compose: compose
    }, window.location.origin);
}