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
        destination: "http://localhost:4200/#/productDetails/"+ product.id,
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
