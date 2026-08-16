const recipient_element = document.getElementById('recipient');
const subject_element = document.getElementById('subject');
const content_element = document.getElementById('content');

const urlParams = new URLSearchParams(window.location.search);
const compose = urlParams.get('compose');
const recipient = urlParams.get('recipient');
const subject = urlParams.get('subject');
const content = urlParams.get('content');

if (recipient)
    recipient_element.value = recipient;

if (subject)
    subject_element.value = subject;

if (content)
    content_element.value = content;

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