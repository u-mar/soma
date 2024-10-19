var firstnameError = document.getElementById("firstname-error");
var lastnameError = document.getElementById("lastname-error");
var emailError = document.getElementById("email-error");
var queryError = document.getElementById("query-error");
var messageError = document.getElementById("message-error");
var checkError = document.getElementById("check-error");

function validatefirstName() {
  let firstname = document.getElementById("firstname");

  if (!firstname.value) {
    firstnameError.style.display = "block";
    firstname.style.border = "1px solid red";
    return false;
  } else if (!firstname.value.match(/^[a-zA-Z ]+$/)) {
    firstnameError.style.display = "block";
    firstnameError.innerHTML = "Name should contain letters only";
    firstname.style.border = "1px solid red";
    firstname.style.outline = "none";
    return false;
  } else {
    firstnameError.style.display = "none";
    firstname.style.border = "1px solid var(--grey-light)";
    return true;
  }
}

function validatelastname() {
  let lastname = document.getElementById("lastname");
  if (!lastname.value) {
    lastnameError.style.display = "block";
    lastname.style.border = "1px solid red";
    return false;
  } else if (!lastname.value.match(/^[a-zA-Z ]+$/)) {
    lastnameError.style.display = "block";
    lastnameError.innerHTML = "Name should contain letters only";
    lastname.style.border = "1px solid red";
    lastname.style.outline = "none";
    return false;
  } else {
    lastnameError.style.display = "none";
    lastname.style.border = "1px solid var(--grey-light)";
    return true;
  }
}

function validateEmail() {
  let email = document.getElementById("email");
  if (!email.value) {
    emailError.style.display = "block";
    email.style.border = "1px solid red";
    return false;
  } else if (!email.value.match(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/)) {
    emailError.style.display = "block";
    emailError.innerHTML = "Invalid email address";
    email.style.border = "1px solid red";
    email.style.outline = "none";
    return false;
  } else {
    emailError.style.display = "none";
    email.style.border = "1px solid var(--grey-light)";
    return true;
  }
}

function validateQuery() {
  var query = document.querySelectorAll('input[type="radio"]');
  var checkRadio = false;

  query.forEach((radiobutton) => {
    if (radiobutton.checked) {
      checkRadio = true;
    }
  });
  if (checkRadio) {
    queryError.style.display = "none";
    return true;
  } else {
    queryError.style.display = "block";
  }
}

function validateMessage() {
  let message = document.getElementById("message");
  if (!message.value) {
    messageError.style.display = "block";
    message.style.border = "1px solid red";
    return false;
  } else {
    messageError.style.display = "none";
    message.style.border = "1px solid var(--grey-light)";
    return true;
  }
}

function validateCheck() {
  let check = document.getElementById("check");
  if (!check.checked) {
    checkError.style.display = "block";
    return false;
  } else {
    checkError.style.display = "none";
    return true;
  }
}

const alertBox = Swal.mixin({
  customClass: {
    title: "font-size:16px font-weight:700",
  },
});

var form = document.querySelector("form");
function validateForm() {
  if (
    !validatefirstName() ||
    !validatelastname() ||
    !validateEmail() ||
    !validateQuery() ||
    !validateMessage() ||
    !validateCheck()
  ) {
    console.log("form not submitted");
  } else {
    alertBox.fire({
      toast: true,
      position: "top",
      title:
        "<i><img src='./assets/images/icon-success-check.svg' /></i> Message Sent!",
      text: "Thanks for completing the form. We'll be in touch soon!",
      color: "#fff",
      background: "hsl(187, 24%, 22%)",
      showConfirmButton: false,
      timer: 5000,
    });
    form.reset();
    console.log("form submitted");
  }
}