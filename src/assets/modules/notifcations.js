"use strict";

var connection = new signalR.HubConnectionBuilder()
    .withUrl("http://localhost:5000/notificationHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
    })
    .build();

$(function () {
    connection
        .start()
        .then(function () {
            console.log("Connection started");
        })
        .catch(function (err) {
            return console.error(err.toString());
        });
});

// Receive and log the message
connection.on("ReceiveMessage", function (product) {
 
    console.log(product)
    Toastify({
        text: "Product " + product.name_Global + " has been updated to " + product.price + " SAR",
        duration: 3000,
        destination: "http://localhost:4200/#/productDetails/"+ 14,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
        onClick: function(){} // Callback after click
      }).showToast();
});

setInterval(() => {
    // Select the element with the class #1n0sv8k and change its width
var elements1 = document.querySelectorAll('.bpFabContainer.#1n0sv8k');
elements1.forEach(function(element) {
    element.style.width = 'auto'; // or any other value you prefer
});

// Select the element with the class #ux4pmf and change its height
var elements2 = document.querySelectorAll('.bpFabContainer.#ux4pmf');
elements2.forEach(function(element) {
    element.style.height = 'auto'; // or any other value you prefer
});
}, 1000);