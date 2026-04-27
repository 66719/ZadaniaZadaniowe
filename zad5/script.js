const toggle = document.getElementById("themeToggle");
const link = document.querySelector("link[rel='stylesheet']");

if (localStorage.getItem("theme") === "green") {
    link.href = "green.css";
    toggle.checked = true;
}

toggle.addEventListener("change", () => {
    if (toggle.checked) {
        link.href = "green.css";
        localStorage.setItem("theme", "green");
    } else {
        link.href = "red.css";
        localStorage.setItem("theme", "red");
    }
});

const collapsible = document.querySelector(".collapsible");
const skillsList = document.querySelector(".skills-list");
const arrow = document.querySelector(".arrow");

collapsible.addEventListener("click", () => {
    skillsList.classList.toggle("collapsed");
    arrow.classList.toggle("rotated");
});


// ===== FORM VALIDATION =====

const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // очистка помилок
    document.getElementById("nameError").textContent = "";
    document.getElementById("surnameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    // regex
    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // NAME
    if (name === "") {
        document.getElementById("nameError").textContent = "Wprowadź imię";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById("nameError").textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    // SURNAME
    if (surname === "") {
        document.getElementById("surnameError").textContent = "Wprowadź nazwisko";
        isValid = false;
    } else if (!nameRegex.test(surname)) {
        document.getElementById("surnameError").textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    // EMAIL
    if (email === "") {
        document.getElementById("emailError").textContent = "Wprowadź email";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Niepoprawny email";
        isValid = false;
    }

    // MESSAGE
    if (message === "") {
        document.getElementById("messageError").textContent = "Wprowadź wiadomość";
        isValid = false;
    }

    // SUCCESS
    if (isValid) {
        document.getElementById("successMessage").textContent = "Formularz wysłany poprawnie!";
        form.reset();
    }
});