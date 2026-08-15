const main = document.getElementById('main');
let openComposes = 0;
let composeIndex = 0;

function openCompose() {
    let element = document.createElement('iframe');
    element.id = `compose-${composeIndex}`;
    element.classList.add('compose-panel');
    element.src = `/static/html/compose.html?compose=${composeIndex}`;

    element.bottom = 0;
    element.style.right = `${42 * openComposes}svw`;

    composeIndex++;
    openComposes++;
    main.appendChild(element);
}

function moveComposes() {
    let elements = main.querySelectorAll('iframe');
    let found_composes = 0;

    elements.forEach((iframe) => {
        iframe.style.right = `${26 * found_composes}svw`;
        found_composes++;
    });
}

function closeCompose(compose) {
    main.removeChild(document.getElementById(`compose-${compose}`));
    openComposes--;

    moveComposes();
}

function hideCompose(compose) {
    document.getElementById(`compose-${compose}`).style.display = "none";
    openComposes--;

    moveComposes();
}

window.addEventListener('message', function(event) {
    if (event.data.type === 'close-me')
        closeCompose(event.data.compose);

    if (event.data.type === 'hide-me')
        hideCompose(event.data.compose);
});