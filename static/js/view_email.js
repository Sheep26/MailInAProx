const urlParams = new URLSearchParams(window.location.search);

async function loadEmail() {
    const email_req = await fetch(`/api/get_email?mail_id=${urlParams.get('mail_id')}`);
    const email = await email_req.json();
    const main_element = document.getElementById('email');
    const email_name = document.getElementById('email-subject');

    email_name.innerText = email.subject;

    main_element.innerHTML = `
    <span>${email.content}</span>
    `;
}

loadEmail();