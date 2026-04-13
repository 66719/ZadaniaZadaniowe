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