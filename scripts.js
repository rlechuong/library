const Book = class {
  constructor(id, author, title, pages, read) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
  }

  changeRead() {
    if (this.read === true) {
      this.read = false;
    } else {
      this.read = true;
    }
  }
};

const Library = (function () {
  const books = [];

  const addBook = function (author, title, pages, read) {
    let newID = crypto.randomUUID();

    let newBook = new Book(newID, author, title, pages, read);

    books.push(newBook);
  };

  const getBooks = function () {
    return books;
  };

  return { addBook, getBooks };
})();

const displayController = (function () {
  const bookshelfBody = document.querySelector("#bookshelf-body");
  const dialog = document.querySelector("dialog");
  const submitBookButton = document.querySelector("#submit-book-button");
  const closeFormButton = document.querySelector("#close-form-button");
  const addBookButton = document.querySelector("#add-book-button");

  const displayBooks = () => {
    for (const book of Library.getBooks()) {
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
  };

  submitBookButton.addEventListener("click", (event) => {
    const form = document.querySelector("form");

    let formAuthorInput = document.querySelector("#author");
    let formTitleInput = document.querySelector("#title");
    let formPagesInput = document.querySelector("#pages");
    let formReadInput = document.querySelector("#read");

    const showError = function () {
      if (formAuthorInput.validity.valueMissing) {
        formAuthorInput.setCustomValidity("Please enter an author.");
        formAuthorInput.reportValidity();
      } else {
        formAuthorInput.setCustomValidity("");
      }

      if (formTitleInput.validity.valueMissing) {
        formTitleInput.setCustomValidity("Please enter a title.");
        formTitleInput.reportValidity();
      }
      else {
        formTitleInput.setCustomValidity("");
      }

      if (formPagesInput.validity.valueMissing) {
        formPagesInput.setCustomValidity("Please enter number of pages.");
        formPagesInput.reportValidity();
      }
      else {
        formPagesInput.setCustomValidity("");
      }
    };

    if (
      !formAuthorInput.validity.valid ||
      !formTitleInput.validity.valid ||
      !formPagesInput.validity.valid
    ) {
      showError();
      event.preventDefault();
    } else {
      event.preventDefault();

      Library.addBook(
        formAuthorInput.value,
        formTitleInput.value,
        formPagesInput.value,
        formReadInput.checked
      );

      formAuthorInput.value = "";
      formTitleInput.value = "";
      formPagesInput.value = "";
      formReadInput.checked = false;

      reloadTable();

      dialog.close();
    }
  });

  const readButtonEvents = function () {
    const readButtonList = document.querySelectorAll(".read-button");

    readButtonList.forEach(function (button) {
      button.addEventListener("click", () => {
        let bookID = button.getAttribute("data-id");

        let targetBookList = Library.getBooks().filter(function (book) {
          return book.id === bookID;
        });

        targetBookList[0].changeRead();

        reloadTable();
      });
    });
  };

  const removeButtonEvents = function () {
    const removeButtonList = document.querySelectorAll(".remove-button");

    removeButtonList.forEach(function (button) {
      button.addEventListener("click", () => {
        if (confirm("Remove Book Fo Sho?")) {
          let bookID = button.getAttribute("data-id");

          let targetBookList = Library.getBooks().filter(function (book) {
            return book.id === bookID;
          });

          let indexOfTargetBook = Library.getBooks().indexOf(targetBookList[0]);
          Library.getBooks().splice(indexOfTargetBook, 1);

          reloadTable();
        }
      });
    });
  };

  const reloadTable = function () {
    bookshelfBody.textContent = "";
    displayBooks();
  };

  closeFormButton.addEventListener("click", () => {
    dialog.close();
  });

  addBookButton.addEventListener("click", () => {
    dialog.showModal();
  });

  return { displayBooks };
})();

Library.addBook("Author 1", "Title 1", 1000, true);
Library.addBook("Author 2", "Title 2", 2000, false);
Library.addBook("Author 3", "Title 3", 3000, true);
Library.addBook("Author 4", "Title 4", 4000, false);

displayController.displayBooks();
