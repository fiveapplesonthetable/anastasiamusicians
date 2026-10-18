// Enquiries are emailed by Web3Forms (web3forms.com). The access key is linked to the
// inbox that receives them; it is meant to be public, so it is fine in this file.
const WEB3FORMS_ACCESS_KEY = "3b4250d5-b837-4dd0-ba25-ad295011725d";

document.getElementById("year").textContent = new Date().getFullYear();

// Buttons like "Ask about your date" preselect the matching enquiry type.
document.querySelectorAll("a[data-topic]").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("topic").value = link.dataset.topic;
  });
});

const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
const button = form.querySelector("button");

form.addEventListener("submit", async event => {
  event.preventDefault();
  status.className = "form-status";
  if (!form.checkValidity()) {
    status.textContent = "Please add your name, a valid email and a message.";
    status.classList.add("err");
    return;
  }
  button.disabled = true;
  button.textContent = "Sending…";
  try {
    const data = Object.fromEntries(new FormData(form));
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        access_key: WEB3FORMS_ACCESS_KEY,
        subject: `Website enquiry: ${data.topic} from ${data.name}`,
        from_name: "Anastasia's website",
        replyto: data.email,
      }),
    });
    const result = await response.json();
    if (!result.success) throw new Error(result.message);
    form.reset();
    status.textContent = "Thank you, your message has been sent. I’ll be in touch soon.";
    status.classList.add("ok");
  } catch {
    status.textContent = "Sorry, something went wrong. Please email ayaviolin@gmail.com directly.";
    status.classList.add("err");
  } finally {
    button.disabled = false;
    button.textContent = "Send message";
  }
});
