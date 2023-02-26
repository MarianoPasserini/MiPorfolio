var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  slides[slideIndex-1].style.display = "block";  
}

// Form section

const form = document.querySelector(".contact-form");

form.addEventListener("submit", e => {
  e.preventDefault();

  const api_key = process.env.EMAIL_PASSWORD;
  const to_email = "marianpasse1@gmail.com";
  const from_email = "renacer258@gmail.com";
  const from_name = "Mariano";

  const name = form.querySelector("#name").value;
  const email = form.querySelector("#email").value;
  const message = form.querySelector("#message").value;

  const data = {
    personalizations: [
      {
        to: [
          {
            email: to_email
          }
        ],
        subject: "New Message from Your Website"
      }
    ],
    from: {
      email: from_email,
      name: from_name
    },
    content: [
      {
        type: "text/html",
        value: `
          <p>You have a new message from your website:</p>
          <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Message: ${message}</p>
        `
      }
    ]
  };

  fetch("https://api.sendgrid.com/v3/mail/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${api_key}`
    },
    body: JSON.stringify(data)
  })
    .then(() => {
      alert("Message sent successfully!");
      form.reset();
    })
    .catch(error => {
      console.error("Error:", error);
      alert("There was an error sending the message. Please try again later.");
    });
});

