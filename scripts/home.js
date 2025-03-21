const dateInFooter = function () {
  const footerSpan = document.getElementById("year")
  footerSpan.innerText = new Date().getFullYear()
}

dateInFooter()

const videogameURL = "https://striveschool-api.herokuapp.com/api/product/"
const apiKey =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMzBmMTM4MzRiZjAwMTUwMDA3MGIiLCJpYXQiOjE3NDI1NDkyMzMsImV4cCI6MTc0Mzc1ODgzM30.jSrzA0q4QuukJv1TLhiSkvAYFXil29ITeH1lZumZ7yc"

const getVideogames = function () {
  const spinner = document.getElementById("loading-spinner")
  spinner.style.display = "inline-block"
  fetch(videogameURL, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const row = document.getElementById("videogames-row")
      row.innerHTML = ""

      data.forEach((videogame) => {
        const col = document.createElement("div")
        col.className = "col col-12 col-lg-3 col-md-4 col-sm-6"
        col.innerHTML = `
          <div class="card">
            <img src="${
              videogame.imageUrl || "https://via.placeholder.com/150"
            }" class="card-img-top" alt="${videogame.name}" />
            <div class="card-body">
              <h5 class="card-title">${videogame.name}</h5>
              <p class="card-text">${videogame.description}</p>
              <p class="card-text">${videogame.price}€</p>
              <a href="./dettagli.html?id=${
                videogame._id
              }" class="btn btn-primary">Vai ai dettagli</a>
              <button class="btn btn-danger " onclick="deleteProduct('${
                videogame._id
              }')">Elimina</button>
              <button class="btn btn-warning mt-2" onclick="editProduct('${
                videogame._id
              }')">Modifica</button> 
            </div>
          </div>
        `
        col.querySelector(".card").addEventListener("mouseenter", function () {
          this.style.transform = "scale(1.1)"
        })
        col.querySelector(".card").addEventListener("mouseleave", function () {
          this.style.transform = "scale(1)"
        })
        row.appendChild(col)
      })
      spinner.style.display = "none"
    })
    .catch((error) => {
      console.log("Si è verificato un errore", error)
    })
}

// Funzione per eliminare un prodotto
const deleteProduct = function (productId) {
  if (confirm("Sei sicuro di voler eliminare questo prodotto?")) {
    fetch(videogameURL + productId, {
      method: "DELETE",
      headers: {
        Authorization: apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        alert("Prodotto eliminato con successo!")
        getVideogames()
      })
      .catch((error) => {
        console.log("Si è verificato un errore", error)
      })
  }
}

const editProduct = function (productId) {
  fetch(videogameURL + productId, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((response) => response.json())
    .then((product) => {
      document.getElementById("name").value = product.name
      document.getElementById("description").value = product.description
      document.getElementById("price").value = product.price
      document.getElementById("brand").value = product.brand
      document.getElementById("imageUrl").value = product.imageUrl

      const submitButton = document.querySelector('button[type="submit"]')
      submitButton.textContent = "Modifica"
      submitButton.onclick = function (e) {
        e.preventDefault()

        const updatedProduct = {
          name: document.getElementById("name").value,
          description: document.getElementById("description").value,
          price: parseFloat(document.getElementById("price").value),
          imageUrl: document.getElementById("imageUrl").value,
          brand: document.getElementById("brand").value,
        }

        fetch(videogameURL + productId, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: apiKey,
          },
          body: JSON.stringify(updatedProduct),
        })
          .then((response) => response.json())
          .then((data) => {
            alert("Prodotto modificato con successo!")
            getVideogames()
            document.getElementById("event-form").reset()
            submitButton.textContent = "Crea!"
            submitButton.onclick = createProduct
          })
          .catch((error) => {
            console.log("Errore nella modifica del prodotto", error)
            alert("Si è verificato un errore durante la modifica.")
          })
      }
    })
    .catch((error) => {
      console.log("Si è verificato un errore nel recupero del prodotto", error)
    })
}

const createProduct = function (e) {
  e.preventDefault()

  const name = document.getElementById("name").value
  const description = document.getElementById("description").value
  const brand = document.getElementById("brand").value
  const price = parseFloat(document.getElementById("price").value)
  const imageUrl = document.getElementById("imageUrl").value

  const productData = {
    name,
    description,
    brand,
    price,
    imageUrl,
  }

  fetch(videogameURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: apiKey,
    },
    body: JSON.stringify(productData),
  })
    .then((response) => response.json())
    .then((data) => {
      alert("Prodotto creato con successo!")
      getVideogames()
      document.getElementById("event-form").reset()
    })
    .catch((error) => {
      console.log("Errore nella creazione del prodotto", error)
    })
}

window.addEventListener("DOMContentLoaded", getVideogames)
