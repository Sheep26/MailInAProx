const urlParams = new URLSearchParams(window.location.search);

async function loadEmail() {
    const email_req = await fetch(`/api/get_email?mail_id=${urlParams.get('mail_id')}`);
    const email = await email_req.json();
    const main_element = document.getElementById('email');
    const email_subject = document.getElementById('email-subject');
    const email_name = document.getElementById('email-name');
    const email_email = document.getElementById('email-email');

    email_subject.innerText = email.subject;
    email_name.innerText = email.name_from ?? email.mail_from;
    email_email.innerText = email.name_from ? `<${email.mail_from}>` : "d";

    main_element.innerHTML = `
    <span>${email.content}</span>
    `;
}

async function deleteEmail() {
    const delete_req = await fetch(`/api/delete_email`, { method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mail_id: urlParams.get('mail_id')
        })});

    if (delete_req.status == 200)
        window.location = "/";
}

loadEmail();