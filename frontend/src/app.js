const userForm = document.forms.userForm;
userForm.onsubmit = createUser;
const url = "http://localhost:4000/users";

function createUser(event) {
  event.preventDefault();
  const email = event.target.email.value;
  const userName = event.target.userName.value;
  console.log("Form submitted", { email, userName });

  // making an api request
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName, email: email }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Data", data);
    })
    .catch((err) => {
      console.log("Error,", err);
    });
}
