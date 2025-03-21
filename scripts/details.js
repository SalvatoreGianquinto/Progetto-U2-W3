const videogameURL = "https://striveschool-api.herokuapp.com/api/product/"
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzBmMTM4MzRiZjAwMTUwMDA3MGIiLCJpYXQiOjE3NDI1NDkyMzMsImV4cCI6MTc0Mzc1ODgzM30.jSrzA0q4QuukJv1TLhiSkvAYFXil29ITeH1lZumZ7yc"

const getProductDetails = function () {
  const urlParams = new URLSearchParams(window.location.search)
  const productId = urlParams.get("id")

  if (!productId) {
    alert("ID prodotto non trovato!")
    return
  }

  fetch(videogameURL + productId, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((product) => {
      const productCard = document.getElementById("product-card")
      productCard.innerHTML = `
        <img src="${
          product.imageUrl || "https://via.placeholder.com/150"
        }" class="card-img-top" alt="${product.name}" />
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">${product.description}</p>
          <p class="card-text">Brand: ${product.brand}</p>
          <p class="card-text">Prezzo: ${product.price}€</p>
          <a href="home.html" class="btn btn-primary">Torna alla Home</a>
        </div>
      `
    })
    .catch((error) => {
      console.log("Si è verificato un errore nel recupero dei dettagli", error)
      alert("Si è verificato un errore nel recupero dei dettagli.")
    })
}

window.addEventListener("DOMContentLoaded", getProductDetails)
