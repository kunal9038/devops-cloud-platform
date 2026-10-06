// Smooth navigation

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const target = document.querySelector(
            this.getAttribute("href")
        );

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


// Fetch real backend status

async function loadSystemStatus() {

    try {

        const response = await fetch(
            "http://localhost:5000/api/status"
        );

        if (!response.ok) {
            throw new Error("Backend unavailable");
        }

        const data = await response.json();

        console.log("Backend status:", data);

        // Update deployment information

        const deploymentTitle =
            document.querySelector(".deployment-main h3");

        const deploymentSubtitle =
            document.querySelector(".deployment-main p");

        const version =
            document.querySelector(
                ".deployment-info div:nth-child(1) strong"
            );

        const environment =
            document.querySelector(
                ".deployment-info div:nth-child(2) strong"
            );

        const status =
            document.querySelector(
                ".deployment-info div:nth-child(3) strong"
            );


        deploymentTitle.textContent =
            data.environment.charAt(0).toUpperCase()
            + data.environment.slice(1);

        deploymentSubtitle.textContent =
            data.application;

        version.textContent =
            "v" + data.version;

        environment.textContent =
            data.deployment;

        status.textContent =
            data.status;


        // Make the status indicator green

        status.classList.add("success");


    } catch (error) {

        console.error(
            "Unable to connect to backend:",
            error
        );

    }

}


// Load status when page opens

loadSystemStatus();


// Simple deployment status animation

const progressBar = document.querySelector(".progress div");

let progress = 0;

function animateProgress() {

    progress += 1;

    if (progress > 100) {
        progress = 0;
    }

    progressBar.style.width = progress + "%";

}

setInterval(animateProgress, 80);

