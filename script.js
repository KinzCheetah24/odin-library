const myLibrary = [];

const dialog = document.querySelector("dialog");
const showBtn = document.getElementById("showDialog");
const library = document.querySelector(".library");
const bookForm = document.querySelector(".bookForm");

function Book(id, title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        if(read) {
            return title + " by " + author + ", " + pages + " pages , read";
        } else {
            return title + " by " + author + ", " + pages + " pages , not read yet";
        }
    }
}

Book.prototype.toggleRead = function() {
    this.read = !this.read;
}

function addBookToLibrary(title, author, pages, read) {
    const book = new Book(crypto.randomUUID() ,title, author, pages, read);
    myLibrary.push(book);
    displayBook(book);
}

function showLibrary() {
    for ( let i = 0; i < myLibrary.length ; i++) {
        console.log(myLibrary[i].info());
    }
}

function displayBook(book) {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book");

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "X";

    const bookTitle = document.createElement("h2");
    bookTitle.textContent = "Title: " + book.title;

    const bookAuthor = document.createElement("h3");
    bookAuthor.textContent = "Author: " + book.author;

    const bookPages = document.createElement("p");
    bookPages.textContent = "Pages: " + book.pages;

    const bookRead = document.createElement("label");
    bookRead.textContent = "Read";

    const bookReadCheckBox = document.createElement("input");
    bookReadCheckBox.type = "checkbox";
    bookReadCheckBox.checked = book.read;

    bookDiv.appendChild(removeBtn);
    bookDiv.appendChild(bookTitle);
    bookDiv.appendChild(bookAuthor);
    bookDiv.appendChild(bookPages);
    bookDiv.appendChild(bookRead);
    bookDiv.appendChild(bookReadCheckBox);

    library.appendChild(bookDiv);

    removeBtn.addEventListener("click", () => removeBook(book.id, bookDiv));

    bookReadCheckBox.addEventListener("click", () => book.toggleRead());
}

function removeBook(bookId, bookDiv) {
    const index = myLibrary.findIndex(book => book.id === bookId);
    if(index !== -1) {
        myLibrary.splice(index, 1);
    }

    library.removeChild(bookDiv);
}

showBtn.addEventListener("click", () => { dialog.showModal(); });

bookForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value.trim();
    const pages = document.getElementById("pages").value;
    const read = document.getElementById("read").checked;

    addBookToLibrary(title, author, pages, read);

    showLibrary();

    dialog.close();
    bookForm.reset();
})

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Shadow Hunters", "Cassandra Clare", 500, true);