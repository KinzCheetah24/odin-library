// const myLibrary = [];

// const dialog = document.querySelector("dialog");
// const showBtn = document.getElementById("showDialog");
// const library = document.querySelector(".library");
// const bookForm = document.querySelector(".bookForm");

// function Book(id, title, author, pages, read) {
//     if (!new.target) {
//         throw Error("You must use the 'new' operator to call the constructor");
//     }

//     this.id = id;
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.read = read;

//     this.info = function() {
//         if(read) {
//             return title + " by " + author + ", " + pages + " pages , read";
//         } else {
//             return title + " by " + author + ", " + pages + " pages , not read yet";
//         }
//     }
// }

// Book.prototype.toggleRead = function() {
//     this.read = !this.read;
// }

// function addBookToLibrary(title, author, pages, read) {
//     const book = new Book(crypto.randomUUID() ,title, author, pages, read);
//     myLibrary.push(book);
//     displayBook(book);
// }

// function showLibrary() {
//     for ( let i = 0; i < myLibrary.length ; i++) {
//         console.log(myLibrary[i].info());
//     }
// }

// function displayBook(book) {
//     const bookDiv = document.createElement("div");
//     bookDiv.classList.add("book");

//     const removeBtn = document.createElement("button");
//     removeBtn.textContent = "X";

//     const bookTitle = document.createElement("h2");
//     bookTitle.textContent = "Title: " + book.title;

//     const bookAuthor = document.createElement("h3");
//     bookAuthor.textContent = "Author: " + book.author;

//     const bookPages = document.createElement("p");
//     bookPages.textContent = "Pages: " + book.pages;

//     const bookRead = document.createElement("label");
//     bookRead.textContent = "Read";

//     const bookReadCheckBox = document.createElement("input");
//     bookReadCheckBox.type = "checkbox";
//     bookReadCheckBox.checked = book.read;

//     bookDiv.appendChild(removeBtn);
//     bookDiv.appendChild(bookTitle);
//     bookDiv.appendChild(bookAuthor);
//     bookDiv.appendChild(bookPages);
//     bookDiv.appendChild(bookRead);
//     bookDiv.appendChild(bookReadCheckBox);

//     library.appendChild(bookDiv);

//     removeBtn.addEventListener("click", () => removeBook(book.id, bookDiv));

//     bookReadCheckBox.addEventListener("click", () => book.toggleRead());
// }

// function removeBook(bookId, bookDiv) {
//     const index = myLibrary.findIndex(book => book.id === bookId);
//     if(index !== -1) {
//         myLibrary.splice(index, 1);
//     }

//     library.removeChild(bookDiv);
// }

// showBtn.addEventListener("click", () => { dialog.showModal(); });

// bookForm.addEventListener("submit", (e) => {
//     e.preventDefault();

//     const title = document.getElementById("title").value;
//     const author = document.getElementById("author").value.trim();
//     const pages = document.getElementById("pages").value;
//     const read = document.getElementById("read").checked;

//     addBookToLibrary(title, author, pages, read);

//     showLibrary();

//     dialog.close();
//     bookForm.reset();
// })

class DomDisplay {
    constructor() {
        this._myLibrary = new Library();
        this._dialog = document.querySelector("dialog");
        this._showBtn = document.getElementById("showDialog");
        this._library = document.querySelector(".library");
        this._bookForm = document.querySelector(".bookForm");

        this._showBtn.addEventListener("click", () => { this._dialog.showModal(); });

        this._bookForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const title = document.getElementById("title").value;
            const author = document.getElementById("author").value.trim();
            const pages = document.getElementById("pages").value;
            const read = document.getElementById("read").checked;

            this.displayBook(this._myLibrary.addBookToLibrary(title, author, pages, read));

            this._myLibrary.showLibrary();

            this._dialog.close();
            this._bookForm.reset();
        })

        this.displayBook(this._myLibrary.addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false));
        this.displayBook(this._myLibrary.addBookToLibrary("Shadow Hunters", "Cassandra Clare", 500, true));
    }

    displayBook(book) {
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

        this._library.appendChild(bookDiv);

        removeBtn.addEventListener("click", () => this.removeBook(book.id, bookDiv));

        bookReadCheckBox.addEventListener("click", () => book.toggleRead());
    }

    removeBook(bookId, bookDiv) {
        let auxLibrary = this._myLibrary.myLibrary;
        const index = auxLibrary.findIndex(book => book.id === bookId);
        if(index !== -1) {
            auxLibrary.splice(index, 1);
            this._myLibrary.myLibrary = auxLibrary;
        }

        this._library.removeChild(bookDiv);
    }
}

class Library {
    constructor() {
        this._myLibrary = [];
    }

    addBookToLibrary(title, author, pages, read) {
        const book = new Book(crypto.randomUUID() ,title, author, pages, read);
        this._myLibrary.push(book);

        return book;
    }

    showLibrary() {
        for (let i = 0; i < this._myLibrary.length ; i++) {
            console.log(this._myLibrary[i].showInfo());
        }
    }

    get myLibrary() {
        return this._myLibrary;
    }

    set myLibrary(library) {
        this._myLibrary = library;
    }
};

class Book {
    constructor(id, title, author, pages, read) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = read;
    }

    showInfo() {
        if(this._read) {
            return this._title + " by " + this._author + ", " + this._pages + " pages , read";
        } else {
            return this._title + " by " + this._author + ", " + this._pages + " pages , not read yet";
        }
    }

    toggleRead() {
        this._read = !this._read;
    }

    get id() {
        return this._id;
    }

    get title() {
        return this._title;
    }

    get author() {
        return this._author;
    }

    get pages() {
        return this._pages;
    }

    get read() {
        return this._read;
    }
}

const dom = new DomDisplay();