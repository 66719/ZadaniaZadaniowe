const toggle = document.getElementById("themeToggle");
const link = document.querySelector("link[rel='stylesheet']");

// ===== THEME =====
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


// ===== COLLAPSIBLE =====
const collapsible = document.querySelector(".collapsible");
const skillsContainer = document.getElementById("skillsList");
const arrow = document.querySelector(".arrow");

collapsible.addEventListener("click", () => {
    skillsContainer.classList.toggle("collapsed");
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

    document.getElementById("nameError").textContent = "";
    document.getElementById("surnameError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("messageError").textContent = "";
    document.getElementById("successMessage").textContent = "";

    const nameRegex = /^[A-Za-z]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "") {
        document.getElementById("nameError").textContent = "Wprowadź imię";
        isValid = false;
    } else if (!nameRegex.test(name)) {
        document.getElementById("nameError").textContent = "Imię nie może zawierać cyfr";
        isValid = false;
    }

    if (surname === "") {
        document.getElementById("surnameError").textContent = "Wprowadź nazwisko";
        isValid = false;
    } else if (!nameRegex.test(surname)) {
        document.getElementById("surnameError").textContent = "Nazwisko nie może zawierać cyfr";
        isValid = false;
    }

    if (email === "") {
        document.getElementById("emailError").textContent = "Wprowadź email";
        isValid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Niepoprawny email";
        isValid = false;
    }

    if (message === "") {
        document.getElementById("messageError").textContent = "Wprowadź wiadomość";
        isValid = false;
    }

    if (isValid) {
        document.getElementById("successMessage").textContent = "Formularz wysłany poprawnie!";
        form.reset();
    }
});


// ===== FETCH JSON (ZADANIE 6) =====
fetch("data.json")
    .then(res => res.json())
    .then(data => {

        // SKILLS
        data.skills.forEach(skill => {
            const li = document.createElement("li");
            li.textContent = skill;
            skillsContainer.appendChild(li);
        });

        // PROJECTS (JSON)
        const projectsList = document.getElementById("projectsList");

        let projects = JSON.parse(localStorage.getItem("projects")) || data.projects;

        function renderProjects() {
            projectsList.innerHTML = "";

            projects.forEach((project, index) => {
                const li = document.createElement("li");
                li.textContent = project;

                // delete button
                const btn = document.createElement("button");
                btn.textContent = "X";
                btn.style.marginLeft = "10px";

                btn.addEventListener("click", () => {
                    projects.splice(index, 1);
                    saveProjects();
                    renderProjects();
                });

                li.appendChild(btn);
                projectsList.appendChild(li);
            });
        }

        function saveProjects() {
            localStorage.setItem("projects", JSON.stringify(projects));
        }

        renderProjects();

        // ADD PROJECT
        const input = document.getElementById("projectInput");
        const addBtn = document.getElementById("addProjectBtn");

        addBtn.addEventListener("click", () => {
            const value = input.value.trim();

            if (value !== "") {
                projects.push(value);
                saveProjects();
                renderProjects();
                input.value = "";
            }
        });

    })
    .catch(err => console.log(err));