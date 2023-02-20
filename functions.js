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

    if (obj.classList.contains("updBtn") && obj.parentNode.parentNode) {
      let email = obj.parentNode.parentNode.querySelector(".email").textContent;
      console.log(obj.parentNode.parentNode);

      let card = getCardByEmail(email);

      if (obj.classList.contains("save") && card) {
        if (createErrorsUpdate().length > 0) {
          return;
        } else {
          makeNonEditable(card);
          isEditing = true;
        }
      } else if (card && isEditing) {
        makeEditable(card);
        isEditing = false;
      } else if (card && !isEditing) {
        makeNonEditable(card);
        isEditing = true;
      }
    }
  });
}

function createNewCard() {
  let container = document.querySelector(".container");
  container.innerHTML = `
  <h1>Create a new Card</h1>

  <div class="errors">

  </div>
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
            <input type="date" name="date" class="inptDate">
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
  p3.textContent = person.date;
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
  let containerErrors = document.querySelector(".errors");

  containerErrors.innerHTML = "";
  let errors = [];
  let name = document.querySelector(".inptName");
  let email = document.querySelector(".inptEmail");
  let date = document.querySelector(".inptDate");

  if (name.value == "") {
    containerErrors.appendChild(createParagraph("Please enter name."));

    errors.push("Please enter name.");
  }
  if (email.value == "") {
    containerErrors.appendChild(createParagraph("Please enter email."));

    errors.push("Please enter email.");
  }
  if (date.value == "") {
    containerErrors.appendChild(createParagraph("Please enter date."));
    errors.push("Please enter date.");
  }
  if (returnPerson(persons, email.value) !== null) {
    containerErrors.appendChild(
      createParagraph("This email is already in use.")
    );
    errors.push("This email is already in use.");
  }

  return errors;
}

function createErrorsUpdate() {
  let errors = [];
  let name = document.querySelector(".inpt-name");
  let email = document.querySelector(".updEmail");
  let date = document.querySelector(".inpt-date");
  let dateError = document.querySelector(".date-error");
  dateError.classList.add("hidden");
  console.log(name.value);
  console.log(date.value);

  if (name && name.value == "") {
    name.placeholder = "Please enter name";

    errors.push("Please enter name");
  }

  // if (email.value == "") {
  //   email.placeholder = "Please enter email";

  //   errors.push("Please enter email");
  // }

  if (date && date.value == "") {
    dateError.classList.remove("hidden");
    errors.push("Please enter date");
  }

  return errors;
}

function getCardByEmail(email) {
  let cards = document.querySelector(".cards").children;
  for (let i = 0; i < cards.length; i++) {
    let em = cards[i].querySelector(".email").textContent;
    if (em === email) {
      return cards[i];
    }
  }

  return null;
}

function makeEditable(card) {
  let nameInpt = card.querySelector(".name").textContent;
  let emailInpt = card.querySelector(".email").textContent;
  let dataInpt = card.querySelector(".data").textContent;

  console.log(nameInpt);

  card.innerHTML = `

  <section class="card" style="flex-direction: column-reverse;">
  <section class="cardBtns">
  <button class="updBtn save">save</button>
  <button class="delBtn">Delete</button></section>
  <span class="hidden date-error">Please add a date</span>
  <div class="input-container">
  
  <input type="text" class="inpt-name" >
  <input type="email" class="inpt-email email" disabled="" value="${emailInpt}">
  <input type="date" class="inpt-date" value="${dataInpt}"></div></section >
 
  
  `;

  let inpt = card.querySelector(".inpt-name");

  inpt.value = nameInpt;

  card.style.flexDirection = "column-reverse";
}

function makeNonEditable(card) {
  let nameInpt = card.querySelector(".inpt-name")?.value;
  let emailInpt = card.querySelector(".inpt-email")?.value;
  let dataInpt = card.querySelector(".inpt-date")?.value;
  let div = card.querySelector(".input-container")?.value;
  let btnUpdate = card.querySelector(".updBtn");

  btnUpdate.classList.remove("save");

  let pers = {
    name: nameInpt,
    email: emailInpt,
    date: dataInpt,
  };

  card.innerHTML = `
  <p class="name">${nameInpt}</p>
  <p class="email">${emailInpt}</p>
  <p class="data">${dataInpt}</p>
  <section class="cardBtns">
  <button class="updBtn">Update</button>
  <button class="delBtn">Delete</button>
  </section>
  
  `;

  update(persons, pers);
  card.style.flexDirection = "column";
}

//functie ce prieste ca parametru un vector si o persoana   si schimba valorile persoanei din vector

function update(arr, persoana) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email == persoana.email) {
      arr[i].name = persoana.name;
      arr[i].date = persoana.date;
    }
  }
}

//functie ce returneaza o persoana dupa email

function returnPerson(arr, email) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].email == email) {
      return arr[i];
    }
  }
  return null;
}

function createParagraph(text) {
  let p = document.createElement("p");

  p.textContent = text;

  return p;
}
