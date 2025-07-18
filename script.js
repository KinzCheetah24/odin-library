function Book(title, author, pages, read) {
    if (!new.target) {
        throw Error("You must use the 'new' operator to call the constructor");
    }

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

const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien", 295, true);

console.log(theHobbit.info());