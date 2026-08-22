const urlParams = new URLSearchParams(window.location.search);

async function loadEmail() {
    const email_req = await fetch(`/api/get_sent_email?sent_id=${urlParams.get('sent_id')}`);
    const email = await email_req.json();
    const main_element = document.getElementById('email');
    const email_subject = document.getElementById('email-subject');
    const email_name = document.getElementById('email-name');
    const email_email = document.getElementById('email-email');

    email_subject.innerText = email.subject;
    email_name.innerText = email.name_from ?? email.mail_from;
    email_email.innerText = email.name_from ? `<${email.mail_from}>` : "";

    main_element.innerHTML = `
    <span>${email.content}</span>
    `;
}

async function deleteSentEmail() {
    const delete_req = await fetch(`/api/delete_sent_email`, { method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sent_id: urlParams.get('sent_id')
        })});

    if (delete_req.status == 200)
        window.location = "/sent";
}

loadEmail();