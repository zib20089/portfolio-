document.addEventListener("DOMContentLoaded", () => {
    const gridContainer = document.getElementById("thumbnailGrid");
    if (!gridContainer || typeof thumbnailsData === "undefined") return;

    // Determine if we are inside a subfolder or root by checking path depth
    const isSubfolder = window.location.pathname.includes("/work/") && window.location.pathname.split("/").length > 3;

    thumbnailsData.forEach(item => {
        const card = document.createElement("div");
        card.className = "thumb-card";
        
        // Fix path dynamically based on folder structure
        const imagePath = isSubfolder ? item.src : item.src.replace("../", "work/");

        card.innerHTML = `
            <div class="thumb-img-wrapper">
                <img src="${imagePath}" alt="${item.title}" loading="lazy" crossorigin="anonymous" oncontextmenu="return false;">
            </div>
            <p class="thumb-title">${item.title}</p>
        `;

        // Lock down right-clicks completely on the card
        card.addEventListener("contextmenu", (e) => {
            e.preventDefault();
        });

        gridContainer.appendChild(card);
    });

    // Create modal backdrop dynamically for zoom & download
    const backdrop = document.createElement("div");
    backdrop.className = "modal-backdrop";
    backdrop.innerHTML = `
        <div class="modal-content-wrap">
            <div id="modalCardSlot"></div>
            <button class="download-btn" id="modalDownloadBtn">Download Frame</button>
        </div>
    `;
    document.body.appendChild(backdrop);

    let activeCardNode = null;

    gridContainer.addEventListener("click", (e) => {
        const card = e.target.closest(".thumb-card");
        if (!card) return;

        activeCardNode = card;
        const slot = document.getElementById("modalCardSlot");
        slot.innerHTML = "";
        
        const clone = card.cloneNode(true);
        slot.appendChild(clone);
        
        backdrop.classList.add("visible");
    });

    backdrop.addEventListener("click", (e) => {
        if (e.target === backdrop) {
            backdrop.classList.remove("visible");
        }
    });

    document.getElementById("modalDownloadBtn").addEventListener("click", () => {
        if (!activeCardNode) return;

        // Generate a clean, unique filename based on the thumbnail title
        const titleEl = activeCardNode.querySelector(".thumb-title");
        const rawTitle = titleEl ? titleEl.innerText : "thumbnail";
        const safeFilename = rawTitle
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "-") // Replace special chars with hyphens
            .replace(/-+/g, "-")         // Collapse multiple hyphens
            .substring(0, 40);           // Limit length

        html2canvas(activeCardNode, {
            backgroundColor: null,
            scale: 2,
            useCORS: true,
            allowTaint: true
        }).then(canvas => {
            const link = document.createElement("a");
            link.download = `${safeFilename}.png`;
            link.href = canvas.toDataURL("image/png");
            link.click();
        });
    });
});