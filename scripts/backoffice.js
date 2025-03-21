const printDateInFooter = function () {
  const footerSpan = document.getElementById("year")
  footerSpan.innerText = new Date().getFullYear()
}

const videogameURL = "https://striveschool-api.herokuapp.com/api/product/"
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzBmMTM4MzRiZjAwMTUwMDA3MGIiLCJpYXQiOjE3NDI1NDkyMzMsImV4cCI6MTc0Mzc1ODgzM30.jSrzA0q4QuukJv1TLhiSkvAYFXil29ITeH1lZumZ7yc"

const form = document.getElementById("event-form")
const deleteButton = document.getElementById("delete-button")

form.addEventListener("submit", function (e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const description = document.getElementById("description").value
  const brand = document.getElementById("brand").value
  const price = parseFloat(document.getElementById("price").value)
  const imageUrl = document.getElementById("imageUrl").value

  if (!name || !description || !brand || !price || !imageUrl) {
    alert("Tutti i campi devono essere compilati.")
    return
  }

  const productData = {
    name: name,
    description: description,
    brand: brand,
    price: price,
    imageUrl: imageUrl,
  }

  fetch(videogameURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          throw new Error("Errore API: " + JSON.stringify(errorData))
        })
      }
      return response.json()
    })
    .then((data) => {
      alert("Prodotto aggiunto con successo!")
      form.reset()
    })
    .catch((error) => {
      console.error("Errore:", error)
      alert("Si è verificato un errore: " + error.message)
    })
})

const resetForm = function () {
  form.reset()
}

const deleteProduct = function (productId) {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(videogameURL + productId, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nell'eliminazione del prodotto")
        }
        alert("Prodotto eliminato con successo!")
        window.location.href = "/backoffice.html"
      })
      .catch((error) => {
        console.error("Errore:", error)
        alert(
          "Si è verificato un errore durante l'eliminazione: " + error.message
        )
      })
  }

  // Associa l'evento del bottone di eliminazione
  deleteButton.addEventListener("click", function () {
    const productId = form.getAttribute("data-product-id")
    if (productId) {
      deleteProduct(productId)
    } else {
      alert("ID prodotto non trovato.")
    }
  })
}
