const newProducts = [];
let card = document.getElementsByClassName("card");
for (let i = 0; i < card.length; i++) {
  let product = card[i].querySelectorAll("p");
  const name = product[0].textContent;
  const stars = product[1].textContent;
  const price = {
    priceString: product[2].textContent,
    priceNum: parseFloat(product[2].textContent),
  };
  let quantita = 1;
  const img = card[i].querySelector("img").getAttribute("src");
  const keyId = `${name}RsT3€°${price.priceString}%$??${img.split("/").at(-1)}`;
  const id = keyId;
  newProducts.push({
    id,
    name,
    stars,
    price,
    quantita,
    img,
  });
}

let addCartButton = document.getElementsByClassName("addCart");
for (let i = 0; i < addCartButton.length; i++) {
  //agginta di prodotti al carrello
  addCartButton[i].addEventListener("click", function () {
    let carrello = JSON.parse(localStorage.getItem("carrello")) || [];
    const product = newProducts[i];

    const prodottoEsistente = carrello.find((el) => el.id === product.id);
    if (prodottoEsistente) {
      prodottoEsistente.quantita++;
    } else {
      carrello.push({
        id: product.id,
        name: product.name,
        stars: product.stars,
        price: product.price,
        quantita: 1,
        img: product.img,
      });
    }

    localStorage.setItem("carrello", JSON.stringify(carrello));
    alert("Aggiunto al carrello con successo!");
  });
}

let dati = [];

function populateCart() {
  const datiStringa = localStorage.getItem("carrello");
  dati = JSON.parse(datiStringa);

  const cartList = document.getElementById("cartContainer");
  const titleCart = document.getElementById("title");
  //svuoto cartlist 
  while (cartList.firstChild) {
    cartList.removeChild(cartList.firstChild);
  }
  //controllo se il carrello è vuoto
  if (!dati || dati.length === 0) {
    titleCart.textContent = "Carrello vuoto";
    document.getElementById("totalText").textContent = "";
    return;
  }
  for (let i = 0; i < dati.length; i++) {
    //creazione card in modo dinamico
    const container = document.createElement("div");

    const image = document.createElement("img");
    image.setAttribute("src", dati[i].img);

    const pName = document.createElement("p");
    pName.textContent = dati[i].name;

    const pStars = document.createElement("p");
    pStars.textContent = dati[i].stars;

    const pPrice = document.createElement("p");
    pPrice.textContent = dati[i].price.priceString;

    const spanQuantity = document.createElement("span");
    spanQuantity.textContent = `quantità: ${dati[i].quantita}`;

    const addButton = document.createElement("button");
    addButton.classList.add("quantBtn");
    addButton.textContent = "+";

    const removeButton = document.createElement("button");
    removeButton.textContent = "-";
    removeButton.classList.add("quantBtn");

    container.append(
      image,
      pName,
      pStars,
      pPrice,
      spanQuantity,
      addButton,
      removeButton
    );
    cartList.append(container);
    totalCart(dati);
    //funzione del pulsante che aumenta di quantità il singolo prodotto
    addButton.addEventListener("click", function () {
      dati[i].quantita++;
      spanQuantity.textContent = `quantità: ${dati[i].quantita}`;
      totalCart(dati);
      localStorage.setItem("carrello", JSON.stringify(dati));
      buyBtnCart(dati);
    });
    
    //funzione del pulsante che diminuisce di quantitò il singolo prodotto
    removeButton.addEventListener("click", function () {
      dati[i].quantita--;

      if (dati[i].quantita == 0) {
        let answer = confirm(
          "sei sicuro di voler eliminare questo oggetto dal tuo carrello?"
        );
        if (answer) {
          dati.splice(i, 1);
          container.remove();
          localStorage.setItem("carrello", JSON.stringify(dati));
          populateCart();
          buyBtnCart(dati);
          return;
        } else {
          dati[i].quantita = 1;
        }
      }
      spanQuantity.textContent = `quantità: ${dati[i].quantita}`;

      totalCart(dati);
      localStorage.setItem("carrello", JSON.stringify(dati));
      buyBtnCart(dati);
    });
  }
}

//totale del prezzo del carrello
function totalCart(dati) {
  let total = 0;

  const totalText = document.getElementById("totalText");

  for (let i = 0; i < dati.length; i++) {
    total += dati[i].price.priceNum * dati[i].quantita;
  }
  totalText.textContent = `Totale: €${total}`;
  localStorage.setItem("carrello", JSON.stringify(dati));
}

//bottone di acquisto finale
function buyBtnCart() {
  console.log(dati)
  const buyBtn = document.getElementById("buyBtn");
  if (!dati || dati.length === 0) {
    buyBtn.disabled = true;
    buyBtn.onclick = null;
  } else {
    buyBtn.disabled = false;
    buyBtn.onclick = function () {
      alert("Acquisto effettuato con successo");
    };
  }
}
