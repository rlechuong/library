const myLibrary = [];
const bookshelfBody = document.querySelector("#bookshelf-body");
const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeFormButton = document.querySelector("#close-form-button");
const submitBookButton = document.querySelector("#submit-book-button");

function Book(id, author, title, pages, read) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor.");
  }
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
}

Book.prototype.changeRead = function () {
  if (this.read === true) {
    this.read = false;
  } else {
    this.read = true;
  }
};

function addBookToLibrary(author, title, pages, read) {
  let newID = crypto.randomUUID();

  let newBook = new Book(newID, author, title, pages, read);

  myLibrary.push(newBook);
}

function displayBooks() {
  for (const book of myLibrary) {
    const newRow = document.createElement("tr");

    for (let key in book) {
      if (
        key === "author" ||
        key === "title" ||
        key === "pages" ||
        key === "read"
      ) {
        const newCell = document.createElement("td");
        newCell.setAttribute("data-id", book["id"]);
        newCell.textContent = book[key];
        newRow.appendChild(newCell);
      }
    }

    const readButton = document.createElement("button");
    readButton.setAttribute("data-id", book["id"]);
    readButton.setAttribute("class", "read-button");
    if (book["read"] === true) {
      readButton.textContent = "Unread";
    } else if (book["read"] === false) {
      readButton.textContent = "Read";
    }
    newRow.appendChild(readButton);

    const removeButton = document.createElement("button");
    removeButton.setAttribute("data-id", book["id"]);
    removeButton.setAttribute("class", "remove-button");
    removeButton.textContent = "X";
    newRow.appendChild(removeButton);

    bookshelfBody.appendChild(newRow);
  }

  readButtonEvents();
  removeButtonEvents();
}

addBookButton.addEventListener("click", () => {
  dialog.showModal();
});

closeFormButton.addEventListener("click", () => {
  dialog.close();
});

submitBookButton.addEventListener("click", (event) => {
  let form = document.querySelector("form");

  if (form.checkValidity()) {
    event.preventDefault();

    let formAuthor = document.querySelector("#author");
    let formTitle = document.querySelector("#title");
    let formPages = document.querySelector("#pages");
    let formRead = document.querySelector("#read");

    addBookToLibrary(
      formAuthor.value,
      formTitle.value,
      formPages.value,
      formRead.checked
    );

    formAuthor.value = "";
    formTitle.value = "";
    formPages.value = "";
    formRead.checked = false;

    reloadTable();

    dialog.close();
  } else {
  }
});

function removeButtonEvents() {
  const removeButtonList = document.querySelectorAll(".remove-button");

  removeButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      if (confirm("Remove Book Fo Sho?")) {
        let bookID = button.getAttribute("data-id");

        let targetBook = myLibrary.filter(function (book) {
          return book.id === bookID;
        });

        let indexOfTargetBook = myLibrary.indexOf(targetBook[0]);
        myLibrary.splice(indexOfTargetBook, 1);

        reloadTable();
      }
    });
  });
}

function readButtonEvents() {
  const readButtonList = document.querySelectorAll(".read-button");

  readButtonList.forEach(function (button) {
    button.addEventListener("click", () => {
      let bookID = button.getAttribute("data-id");

      let targetBook = myLibrary.filter(function (book) {
        return book.id === bookID;
      });

      targetBook[0].changeRead();

      reloadTable();
    });
  });
}

function reloadTable() {
  bookshelfBody.textContent = "";
  displayBooks();
}

addBookToLibrary("Author 1", "Title 1", 1000, true);
addBookToLibrary("Author 2", "Title 2", 2000, false);
addBookToLibrary("Author 3", "Title 3", 3000, true);
addBookToLibrary("Author 4", "Title 4", 4000, false);

displayBooks();
