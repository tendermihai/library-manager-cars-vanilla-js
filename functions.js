function createHome() {
  let container = document.querySelector(".container");

  container.innerHTML = `



  <div class="container">
  <h1 class="cards-manager">Cards Manager</h1>
  <button class="new-card-btn">Create New Card</button>
  
  <section class="cards"></section>


    
    `;

  let cardsContainer = document.querySelector(".cards");
  persons.forEach((person) => cardsContainer.appendChild(createCard(person)));

  let btnNewCard = document.querySelector(".new-card-btn");
  let updBtn = document.querySelector(".updBtn");
  btnNewCard.addEventListener("click", () => {
    createNewCard();
  });

  container.addEventListener("click", (e) => {
    let obj = e.target;
    if (obj.classList.contains("card")) {
      let card = obj.textContent;
      updateCard(persons[persons.findIndex((p) => p.name == card.trim())]);
    }
  });

  updBtn.addEventListener;
}

function createNewCard() {
  let container = document.querySelector(".container");
  container.innerHTML = `
  <h1>Create a new Card</h1>
  <div class="container">
        <section class="card-name">
            <label for="name"><b>Name: </b> </label>
            <input type="text" name="name" class="inptName">
        </section>

        <section class="card-email">
            <label for="email"><b>E-mail: </b> </label>
            <input type="email" name="email" class="inptEmail">
        </section>

        <section class="card-date">
            <label for="date"><b>Date: </b> </label>
            <input type="text" name="date" class="inptDate">
        </section>


        <section class="new-card-btns">
            <button class="new-card">Create New Card</button>
            <button class="cancel">Cancel</button>
        </section>
    </div>
  `;
  let newCardBtn = document.querySelector(".new-card");
  let cancel = document.querySelector(".cancel");
  let nameInpt = document.querySelector(".inptName");
  let emailnpt = document.querySelector(".inptEmail");
  let dateInpt = document.querySelector(".inptDate");

  newCardBtn.addEventListener("click", () => {
    let person = {
      name: nameInpt.value,
      email: emailnpt.value,
      date: dateInpt.value,
    };

    // createCard(person);
    persons.push(person);
    createHome();
  });

  cancel.addEventListener("click", () => {
    createHome();
  });
}

//functie care updateaza cardul cand se face click pe cardul respectiv

function updateCard(person) {
  let container = document.querySelector(".container");
  container.innerHTML = `
  <h1>Update or delete this card</h1>
  <div class="container">
      <section class="card-name">
          <label for="name"><b>Name: </b> </label>
          <input type="text" name="name" class="updName">
      </section>

      <section class="card-email">
          <label for="email"><b>E-mail: </b> </label>
          <input type="email" name="email" class="updEmail">
      </section>

      <section class="card-date">
          <label for="date"><b>Date: </b> </label>
          <input type="text" name="date" class="updDate">
      </section>


      <section class="new-card-btns">
          <button class="update-card">Update Card</button>
          <button class="delete-card">Delete</button>
          <button class="cancel-update">Cancel</button>
      </section>
  </div>
  `;

  let card = document.querySelector(".cards");
  let nameInpt = document.querySelector(".updName");
  let emailInpt = document.querySelector(".updEmail");
  let dataInpt = document.querySelector(".updDate");

  let updBtn = document.querySelector(".update-card");
  let delBtn = document.querySelector(".delete-card");
  let cancelUpd = document.querySelector(".cancel-update");

  cancelUpd.addEventListener("click", () => {
    createHome();
  });

  updBtn.addEventListener("click", () => {
    let person = {};

    person.name = nameInpt.value;
    person.email = emailInpt.value;
    person.date = dataInpt.value;

    updatePerson(card);
    createHome();
  });
}

function updatePerson(cards) {
  let card = document.querySelector(".cards");

  let nameInput = document.querySelector('input[name="name"]');
  let emailInput = document.querySelector('input[name="email"]');
  let dateInput = document.querySelector('input[name="date"]');

  let name = nameInput.value;
  let email = emailInput.value;
  let date = dateInput.value;

  // card.querySelector(".card-name").textContent = name;
  // card.querySelector(".card-email").textContent = email;
  // card.querySelector(".card-date").textContent = date;
}

function createCard(person) {
  let section = document.createElement("section");
  section.classList.add("card");

  let p1 = document.createElement("p");
  p1.classList.add("name");
  p1.textContent = person.name;
  section.appendChild(p1);

  let p2 = document.createElement("p");
  p2.classList.add("email");
  p2.textContent = person.email;
  section.appendChild(p2);

  let p3 = document.createElement("p");
  p3.classList.add("data");
  p3.textContent = person.date; // asa e proprietatea obiectului
  section.appendChild(p3);

  let updBtn = document.createElement("button");
  updBtn.classList.add("updBtn");
  updBtn.textContent = "Update";
  section.appendChild(updBtn);

  return section;
}

//functie care sterge cardurile dupa nume

function deleteByName(arr, name) {
  let filter = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name !== name) {
      filter.push(arr[i]);
    }
  }

  return filter;
}

//functie ce primeste ca parametru un array de persoane si ataseaza carduriel

function attachCard(arr) {
  let container = document.querySelector(".container");
  container.innerHTML = "";
  for (let i = 0; i < arr.length; i++) {
    container.appendChild(createCard(arr[i]));
  }
}

//functie ce returneaza toate persoanele ce sunt selectate

function selectCheck(arr) {
  let filter = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].isSelected == true) {
      filter.push(arr[i]);
    }
  }

  return filter;
}

//functie care returneaza numele cardului

function returnName(arr, name) {
  let newArray = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].name == name) {
      newArray.push(arr[i]);
    }
  }
  return newArray;
}
