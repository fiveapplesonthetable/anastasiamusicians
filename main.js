// Enquiries are forwarded by FormSubmit (formsubmit.co) to this address.
// FormSubmit asks the address to confirm once per site address before it forwards anything.
const FORM_EMAIL = "ayaviolin@gmail.com";

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
    const response = await fetch(`https://formsubmit.co/ajax/${FORM_EMAIL}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        ...data,
        _subject: `Website enquiry: ${data.topic} from ${data.name}`,
        _template: "table",
      }),
    });
    const result = await response.json();
    if (String(result.success) !== "true") throw new Error(result.message);
    form.reset();
    status.textContent = "Thank you, your message has been sent. Anastasia will be in touch soon.";
    status.classList.add("ok");
  } catch {
    status.textContent = "Sorry, something went wrong. Please email ayaviolin@gmail.com directly.";
    status.classList.add("err");
  } finally {
    button.disabled = false;
    button.textContent = "Send message";
  }
});
