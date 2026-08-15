async function loadInbox() {
    const emails_req = await fetch('/api/get_emails');
    const emails = await emails_req.json();
    const inbox = document.getElementById("inbox");

    var index = 0;

    for (let email of emails) {
        console.log(email);
        let element = document.createElement('div');
        let hr = document.createElement('hr');
        hr.style.width = "100%";

        element.classList.add("email");
        element.classList.add("email-hoverable");
        element.classList.add("unselectable");

        element.innerHTML = `
        <div class="flex column">
            <span>${email.mail_from}</span>
            <span>${email.subject}</span>
        </div>

        <span></span>
        `;

        if (index > 0)
            inbox.appendChild(hr);

        inbox.appendChild(element);
        index++;
    }
}

loadInbox();