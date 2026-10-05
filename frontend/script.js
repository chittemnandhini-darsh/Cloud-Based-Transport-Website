const API_URL = "http://localhost:5000";


// Load services

async function loadServices() {

    try {

        const response =
            await fetch(`${API_URL}/api/services`);

        const services =
            await response.json();

        const container =
            document.getElementById("serviceContainer");

        services.forEach(service => {

            const card =
                document.createElement("div");

            card.className = "card";

            card.innerHTML = `
                <h3>${service.name}</h3>

                <p>
                    ${service.description}
                </p>

                <h4>
                    Starting Price: ₹${service.price}
                </h4>
            `;

            container.appendChild(card);

        });

    } catch (error) {

        console.log("Error loading services:", error);

    }
}


// Booking form

document
    .getElementById("bookingForm")
    .addEventListener("submit", async function(event) {

        event.preventDefault();

        const bookingData = {

            name:
                document.getElementById("name").value,

            phone:
                document.getElementById("phone").value,

            service:
                document.getElementById("service").value,

            pickup:
                document.getElementById("pickup").value,

            destination:
                document.getElementById("destination").value,

            date:
                document.getElementById("date").value
        };


        try {

            const response =
                await fetch(`${API_URL}/api/bookings`, {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(bookingData)

                });


            const result =
                await response.json();


            document.getElementById("message").innerHTML =
                `
                <p>
                    ${result.message}
                </p>

                <p>
                    Booking ID:
                    ${result.booking.id}
                </p>

                <p>
                    Status:
                    ${result.booking.status}
                </p>
                `;


            document
                .getElementById("bookingForm")
                .reset();


        } catch (error) {

            document.getElementById("message").innerHTML =
                "Unable to connect to server.";

            console.log(error);

        }

    });


// Load services when page opens

loadServices();