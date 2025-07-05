if (document.querySelector(".access__form")) {
  const form = document.getElementById("accessForm");
  const emailInput = document.querySelector(".pod-page__email-input");

  function validateEmail(email) {
    // Check if email is a string
    if (typeof email !== "string") {
      return "Email must be a string";
    }

    const atIndex = email.indexOf("@");
    const lastAtIndex = email.lastIndexOf("@");
    const dotIndex = email.lastIndexOf(".");

    // Trim to check if its not an empty string
    if (email.trim() === "") {
      return "Email cannot be empty.";
    }

    // Check the presence of an '@'
    if (atIndex === -1) {
      return "Email must contain '@'.";
    }

    if (atIndex !== lastAtIndex) {
      return "Email must contain only one '@'.";
    }

    // Check if the '@' symbol is not the first/last index of the email
    if (atIndex === 0 || atIndex === email.length - 1) {
      return "'@' cannot be the first or last character.";
    }

    // Check if there is a dot after '@', but not immedeately after
    if (dotIndex === -1 || dotIndex < atIndex + 2) {
      return "A '.' must appear after '@' and not immediately after it.";
    }

    // Check if our email doesn't start or end with a dot
    if (email.endsWith(".") || email.startsWith(".")) {
      return "Email cannot start or end with a dot.";
    }

    // We need to check if the email has repeated dots
    if (email.includes("..")) {
      return "Email cannot contain consecutive dots.";
    }

    // Check if Local part (before '@') is not empty
    const localPart = email.slice(0, atIndex);

    if (localPart.length === 0) {
      return "Local part (before '@') cannot be empty.";
    }

    // Check if there is a domain
    const domainPart = email.slice(atIndex + 1);
    const domainSections = domainPart.split(".");

    if (domainSections.length < 2) {
      return "Domain must contain a top-level domain (e.g. '.com')";
    }

    // Validating the domain name and tld
    const domainName = domainSections[0];
    const tld = domainSections[1];

    if (domainName.length === 1) {
      return "Domain name (after '@') is missing";
    }

    if (tld.length < 2) {
      return "Top-level domain like (e.g. .com) must be at least 2 characters";
    }

    return "valid";
  }

  form.addEventListener("submit", (e) => {
    const result = validateEmail(emailInput.value);
    const statusMessage = document.querySelector(".js-submit-status-message");

    if (!statusMessage) return;

    if (result !== "valid") {
      e.preventDefault();
      emailInput.style.border = "2px solid #fb3e3e";
      statusMessage.style.color = "#fb3e3e";
      statusMessage.textContent = "❌ " + result;

      setTimeout(() => {
        emailInput.style.border = "none";
        statusMessage.textContent = "";
      }, 5000);
    } else {
      e.preventDefault();
      emailInput.style.border = "2px solid #54e6af";
      statusMessage.style.color = "#54e6af";
      statusMessage.textContent = "✅ Successful";

      setTimeout(() => {
        emailInput.style.border = "none";
        statusMessage.textContent = "";
      }, 5000);
    }
  });
}
