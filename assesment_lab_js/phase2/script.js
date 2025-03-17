const button = document.getElementById("button");

button.addEventListener("click", function () {
  const h1 = document.querySelector("h1");
  h1.textContent = "Button clicked!";
  h1.style.backgroundColor = "red";
});

//exercise 6
const textField = document.getElementById("textField");

textField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    console.log(textField.value);
  }
});

//exercise 7
const list = document.getElementById("list");

list.addEventListener("click", function (event) {
  if (event.target.tagName === "LI") {
    event.target.remove();
  }
});
