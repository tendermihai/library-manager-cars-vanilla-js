let isEditing = true;

function createHome() {
  let container = document.querySelector(".container");

  container.innerHTML = `
  <div class="container">
  <h1 class="cards-manager">Cards Manager</h1>
  <button class="new-card-btn">Create New Card</button>  
  <section class="cards"></section>`;

  let cardsContainer = document.querySelector(".cards");
  persons.forEach((person) => cardsContainer.appendChild(createCard(person)));

  let btnNewCard = document.querySelector(".new-card-btn");
  let sectionBtns = document.querySelector(".cardBtns");
  let delBtn = document.querySelector(".delBtn");
  btnNewCard.addEventListener("click", () => {
    createNewCard();
  });

  container.addEventListener("click", (e) => {
    let obj = e.target;

    if (obj.classList.contains("updBtn")) {
      let card = obj.textContent;
      updateCard(persons[persons.findIndex((p) => p.name == card.trim())]);
    }

    if (obj.classList.contains("delBtn")) {
      let email =
        obj.parentNode.parentNode.querySelector(".email")?.textContent;
      if (!email) {
        email =
          obj.parentNode.parentNode.querySelector(".inpt-email").textContent;
      }
      persons = deleteByEmail(persons, email);

      console.log(persons);
      attachCard(persons);
    }

    if (obj.classList.contains("updBtn")) {
      if (isEditing) {
        let email =
          obj.parentNode.parentNode.querySelector(".email")?.textContent;
        updateCard(makeEditable(getCardByEmail(email)));
        isEditing = false;
      } else {
        let email =
          obj.parentNode.parentNode.querySelector(".inpt-email")?.textContent;
        updateCard(makeNonEditable(getCardByEmail(email)));
        isEditing = true;
      }
    }
  });
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

    if (createErrors().length == 0) {
      persons.push(person);
      createHome();
    }
  });

  cancel.addEventListener("click", () => {
    createHome();
  });
}

//functie care updateaza cardul cand se face click pe cardul respectiv

function updateCard(person) {
  let card = document.querySelector(".cards");
  let nameInpt = document.querySelector(".name");
  let emailInpt = document.querySelector(".email");
  let dataInpt = document.querySelector(".data");

  let updBtn = document.querySelector(".updBtn");

  updBtn.addEventListener("click", (e) => {
    let obj = e.target;
    console.log("aici");
    if (obj.classList.contains(".updBtn")) {
      makeEditable(getCardByEmail(emailInpt));
    }
    // let person = {};

    // person.name = nameInpt.value;
    // person.email = emailInpt.value;
    // person.date = dataInpt.value;

    // console.log(person);
    // if (createErrorsUpdate().length == 0) {
    //   updatePerson(card);
    //   createHome();
    // }
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

  let delBtn = document.createElement("button");
  delBtn.classList.add("delBtn");
  delBtn.textContent = "Delete";
  section.appendChild(delBtn);

  sectionBtns = document.createElement("section");
  sectionBtns.classList.add("cardBtns");

  sectionBtns.appendChild(updBtn);
  sectionBtns.appendChild(delBtn);
  section.appendChild(sectionBtns);
  return section;
}

//functie care sterge cardurile dupa nume

function deleteByEmail(arr, email) {
  let filter = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email !== email) {
      filter.push(arr[i]);
    }
  }
  return filter;
}

//functie ce primeste ca parametru un array de persoane si ataseaza carduriel

function attachCard(arr) {
  let cardsContainer = document.querySelector(".cards");

  cardsContainer.innerHTML = "";
  arr.forEach((person) => cardsContainer.appendChild(createCard(person)));
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

function createErrors() {
  let errors = [];
  let name = document.querySelector(".inptName");
  let email = document.querySelector(".inptEmail");
  let date = document.querySelector(".inptDate");

  if (name.value == "") {
    name.value = "Please enter name";

    errors.push("Please enter name");
  }
  if (email.value == "") {
    email.value = "Please enter email";

    errors.push("Please enter email");
  }
  if (date.value == "") {
    date.value = "Please enter date";
    errors.push("Please enter date");
  }

  return errors;
}

function createErrorsUpdate() {
  let errors = [];
  let name = document.querySelector(".updName");
  let email = document.querySelector(".updEmail");
  let date = document.querySelector(".updDate");

  if (name.value == "") {
    name.value = "Please enter name";

    errors.push("Please enter name");
  }
  if (email.value == "") {
    email.value = "Please enter email";

    errors.push("Please enter email");
  }
  if (date.value == "") {
    date.value = "Please enter date";
    errors.push("Please enter date");
  }

  return errors;
}

function getCardByEmail(email) {
  let cards = document.querySelector(".cards").children;
  for (let i = 0; i < cards.length; i++) {
    let em = cards[i].querySelector(".email")?.textContent;
    if (!em) {
      em = cards[i].querySelector(".inpt-email")?.textContent;
    }
    if (em === email) {
      return cards[i];
    }
  }

  return null;
}

function makeEditable(card) {
  let nameInpt = card.querySelector(".name");
  let emailInpt = card.querySelector(".email");
  let dataInpt = card.querySelector(".data");

  let div = document.createElement("div");
  div.classList.add("input-container");

  let newName = document.createElement("input");
  newName.setAttribute("type", "text");
  newName.classList.add("inpt-name");
  newName.value = nameInpt.textContent;
  div.appendChild(newName);

  let newEmail = document.createElement("input");
  newEmail.setAttribute("type", "email");
  newEmail.classList.add("inpt-email");
  newEmail.value = emailInpt.textContent;
  div.appendChild(newEmail);

  let newDate = document.createElement("input");
  newDate.setAttribute("type", "date");
  newDate.classList.add("inpt-date");

  const date = new Date(dataInpt.textContent).toISOString().substring(0, 10);
  newDate.value = date;
  div.appendChild(newDate);

  card.removeChild(nameInpt);
  card.removeChild(emailInpt);
  card.removeChild(dataInpt);

  card.appendChild(div);

  card.style.flexDirection = "column-reverse";
}

function makeNonEditable(card) {
  let nameInpt = card.querySelector(".inpt-name");
  let emailInpt = card.querySelector(".inpt-email");
  let dataInpt = card.querySelector(".inpt-date");
  let div = card.querySelector(".input-container");

  let newDate = document.createElement("p");
  newDate.classList.add("data");
  newDate.innerText = dataInpt.value;
  card.appendChild(newDate);

  let newEmail = document.createElement("p");
  newEmail.classList.add("email");
  newEmail.innerText = emailInpt.value;
  card.appendChild(newEmail);

  let newName = document.createElement("p");
  newName.classList.add("name");
  newName.innerText = nameInpt.value;
  card.appendChild(newName);

  div.removeChild(nameInpt);
  div.removeChild(emailInpt);
  div.removeChild(dataInpt);

  card.removeChild(div);
}
