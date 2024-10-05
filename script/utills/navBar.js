let toggleButton = document.querySelector(".mobile-nav-toggle");
let nav = document.querySelector("nav");
toggleButton.addEventListener("click", () => {
	let state = toggleButton.getAttribute("aria-expanded");
	if (state === "true") {
		toggleButton.setAttribute("aria-expanded", "false");
		nav.style.transform = "translateX(100vh)";
	} else {
		toggleButton.setAttribute("aria-expanded", "true");
		nav.style.transform = "translateX(0)";
	}
});
