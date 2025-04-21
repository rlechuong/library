const myLibrary = [];

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

function addBookToLibrary(author, title, pages, read) {
  let newID = crypto.randomUUID();

  let newBook = new Book(newID, author, title, pages, read);

  myLibrary.push(newBook);
}

const bookshelf = document.querySelector("#bookshelf");

function displayBooks() {
  for (const book of myLibrary) {
    const newRow = document.createElement("tr");

    for (let key in book) {
      if (key === "author" || key === "title" || key === "pages" || key === "read") {
        const newCell = document.createElement("td");
        newCell.setAttribute("data-id", book["id"]);
        newCell.textContent = book[key];
        newRow.appendChild(newCell);
      }
    }

    bookshelf.appendChild(newRow);
  }
}

const dialog = document.querySelector("dialog");
const addBookButton = document.querySelector("#add-book-button");
const closeFormButton = document.querySelector("#close-form-button");
const submitBookButton = document.querySelector("#submit-book-button");

addBookButton.addEventListener("click", () => {
  dialog.showModal();
})

closeFormButton.addEventListener("click", () => {
  dialog.close();
})

submitBookButton.addEventListener("click", (event) => {
  event.preventDefault();
  
  let formAuthor = document.querySelector("#author");
  let formTitle = document.querySelector("#title");
  let formPages = document.querySelector("#pages");
  let formRead = document.querySelector("#read");

  addBookToLibrary(formAuthor.value, formTitle.value, formPages.value, formRead.checked);

  console.log(myLibrary);

  bookshelf.textContent = "";
  displayBooks();
})

addBookToLibrary("testAuthor", "testTitle", "testPages", "testRead");
addBookToLibrary("testAuthor2", "testTitle2", "testPages2", "testRead2");
console.table(myLibrary);

displayBooks();