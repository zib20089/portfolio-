document.addEventListener("DOMContentLoaded", () => {
    // Modal Control Elements
    const backdrop = document.getElementById("modalBackdrop");
    const portfolioBtn = document.getElementById("portfolio-btn");
    const aboutBtn = document.getElementById("about-btn");
    const reachBtn = document.getElementById("reach-btn");

    const portfolioModal = document.getElementById("portfolioModal");
    const aboutModal = document.getElementById("aboutModal");
    const reachModal = document.getElementById("reachModal");

    const modals = [portfolioModal, aboutModal, reachModal];
    const emailDropdown = document.getElementById("emailDropdown");
    const discordDropdown = document.getElementById("discordDropdown");

    function closeAllModals() {
        modals.forEach(m => m.classList.remove("visible"));
        backdrop.classList.remove("visible");
        emailDropdown.classList.remove("show");
        discordDropdown.classList.remove("show");
    }

    function openModal(modal) {
        closeAllModals();
        backdrop.classList.add("visible");
        modal.classList.add("visible");
    }

    // Event Listeners for Opening Modals
    portfolioBtn.addEventListener("click", () => openModal(portfolioModal));
    aboutBtn.addEventListener("click", () => openModal(aboutModal));
    reachBtn.addEventListener("click", () => openModal(reachModal));

    // Close when clicking backdrop
    backdrop.addEventListener("click", closeAllModals);

    // Social Links Handling (Open in new tabs)
    document.querySelectorAll(".social-link-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const url = btn.getAttribute("data-url");
            if (url && url !== "#") {
                window.open(url, "_blank", "noopener,noreferrer");
            }
        });
    });

    // Image Comparison Slider Logic (Default 50%, fully responsive clipping)
    const sliderRange = document.getElementById("sliderRange");
    const imageTopWrapper = document.getElementById("imageTopWrapper");
    const sliderHandle = document.getElementById("sliderHandle");
    const imageComparer = document.getElementById("imageComparer");

    function updateSlider(value) {
        // Clips the top image from the right side dynamically (inset: top right bottom left)
        imageTopWrapper.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        sliderHandle.style.left = value + "%";
    }

    if (sliderRange) {
        // Initial setup at 50%
        updateSlider(sliderRange.value);

        sliderRange.addEventListener("input", (e) => {
            updateSlider(e.target.value);
        });

        // Click anywhere on comparer to jump slider position
        imageComparer.addEventListener("click", (e) => {
            const rect = imageComparer.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
            sliderRange.value = percentage;
            updateSlider(percentage);
        });
    }

    // Discord Dropdown & Copy Mechanism
    const discordToggleBtn = document.getElementById("discordToggleBtn");
    const copyDiscordBtn = document.getElementById("copyDiscordBtn");
    const discordUsernameText = document.getElementById("discordUsernameText");

    discordToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        emailDropdown.classList.remove("show");
        discordDropdown.classList.toggle("show");
    });

    copyDiscordBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const discordVal = discordUsernameText.textContent;
        navigator.clipboard.writeText(discordVal).then(() => {
            copyDiscordBtn.textContent = "Copied!";
            setTimeout(() => {
                copyDiscordBtn.textContent = "Copy";
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy discord text: ", err);
        });
    });

    // Email Dropdown & Copy Mechanism
    const emailToggleBtn = document.getElementById("emailToggleBtn");
    const copyEmailBtn = document.getElementById("copyEmailBtn");
    const emailAddressText = document.getElementById("emailAddressText");

    emailToggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        discordDropdown.classList.remove("show");
        emailDropdown.classList.toggle("show");
    });

    copyEmailBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        const emailVal = emailAddressText.textContent;
        navigator.clipboard.writeText(emailVal).then(() => {
            copyEmailBtn.textContent = "Copied!";
            setTimeout(() => {
                copyEmailBtn.textContent = "Copy";
            }, 2000);
        }).catch(err => {
            console.error("Failed to copy email text: ", err);
        });
    });

    // Close dropdowns if clicked outside inside modal
    window.addEventListener("click", () => {
        if (emailDropdown.classList.contains("show")) {
            emailDropdown.classList.remove("show");
        }
        if (discordDropdown.classList.contains("show")) {
            discordDropdown.classList.remove("show");
        }
    });
});