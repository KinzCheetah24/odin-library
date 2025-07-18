const myLibrary = [];

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

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(crypto.randomUUID() ,title, author, pages, read))
}

function showLibrary() {
    for ( let i = 0; i < myLibrary.length ; i++) {
        console.log(myLibrary[i].info());
    }
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Shadow Hunters", "Cassandra Clare", 500, true);

showLibrary();