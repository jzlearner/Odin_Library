// Constructor for making Book objects
// with properties title, author, pages, and whether it has been read
// has a info method that returns the text
// >> The title by author, [pages] pages, [read/not read yet]
function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;

    this.info = function() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead ? 'read' : 'not read yet'}`;
        // return this.title;
    }
};

// testing the Book constructor function
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien',295,true);
// console.log(theHobbit.info())

// To add a property or method to a constructor function
Book.prototype.newMethod = function() {
    console.log('hello');
}

// Prototype inheritance
// let's say there's a parent object Student
function Student() {
}
// you want to create an object that inherits Student
// first, create the new object
function CollegeStudent() {
}
// then, inherit the Student prototype
CollegeStudent.prototype = Object.create(Student.prototype);

// Add some more books
const wheelOfTime = new Book('The Wheel Of Time', 'Robert Jorden',300,false);
const lordOfTheRings = new Book('The Lord Of The Rings', 'J.R.R. Tolkien',305,true);
const gameOfThrones = new Book('A Game Of Thrones', 'George R.R. Martin',310,false);

// Create an array with all the books
const myLibrary = [];
function addBookToLibrary(book) {
    myLibrary.push(book);
}

addBookToLibrary(theHobbit);
addBookToLibrary(wheelOfTime);
addBookToLibrary(lordOfTheRings);
addBookToLibrary(gameOfThrones);

const gridContainer = document.querySelector('.grid-container-autofit');

myLibrary.forEach(book => {
    // gridContainer.append(bookDisplayElement(book));
    gridContainer.append(createBookElement(book));
})

function createBookElement(book) {
    // \r\n is for new line inside textContent
    // also need to add white-space: pre; to the element in css
    const element = document.createElement('div');
    element.classList.add('grid-item');

//     const pElement = document.createElement('p');
//     pElement.textContent = `Title: ${book.title}\r\n
// Author: ${book.author}\r\n
// Pages: ${book.pages}\r\n
// Read: ${book.isRead ? "Yes" : "No"}`;
    const titleElement = document.createElement('p');
    titleElement.textContent = `Title: ${book.title}`;
    const authorElement = document.createElement('p');
    authorElement.textContent = `Author: ${book.author}`;
    const pagesElement = document.createElement('p');
    pagesElement.textContent = `Pages: ${book.pages}`;
    const readElement = document.createElement('p');
    readElement.textContent = `Read: ${book.isRead ? "Yes" : "No"}`;

    const xElement = document.createElement('button');
    xElement.setAttribute('id','removeBookBtn');
    xElement.textContent = 'x';
    xElement.addEventListener('click',removeBook)

    const changeRead = document.createElement('button');
    changeRead.setAttribute('id','changeReadBtn');
    changeRead.textContent = book.isRead ? 'Haven\'t read it' : 'Already read it';
    changeRead.addEventListener('click',changeReadState);

    // element.append(pElement);
    element.append(titleElement);
    element.append(authorElement);
    element.append(pagesElement);
    element.append(readElement);

    element.append(changeRead);
    element.append(xElement);

    return element;
}

const addBookButton = document.querySelector('#addBookBtn');

const addBookForm = document.querySelector('.add-book-form');

function addBookClick(event) {
    // when the add book button is clicked, bring up a form
    // give the form a z axis so it displays on top
    // position it with absolute
    event.preventDefault();
    addBookForm.classList.remove('hideForm');
    addBookForm.classList.add('showForm');
}

addBookButton.addEventListener('click',addBookClick)

// actions on the form buttons
const submitBtn = document.querySelector('#submit-form');
const cancelBtn = document.querySelector('#close-form');
// cancel button
function closeForm(event) {
    addBookForm.classList.remove('showForm');
    addBookForm.classList.add('hideForm');
}

cancelBtn.addEventListener('click', closeForm);
//submit button
const title = document.querySelector('#form-title');
const author = document.querySelector('#form-author');
const pages = document.querySelector('#form-pages');
const isRead = document.querySelector('#form-read');

function addBookToArray(event) {
    const newBook = new Book(title.value, author.value, pages.value, isRead.checked);
    // addBookToLibrary(newBook);
    const newElement = createBookElement(newBook);
    gridContainer.append(newElement);
    addBookForm.classList.remove('showForm');
    addBookForm.classList.add('hideForm');
    resetForm();
}

function resetForm() {
    title.value = "";
    author.value = "";
    pages.value = "";
    isRead.checked = false;
}

submitBtn.addEventListener('click', addBookToArray);

function removeBook(event) {
    event.preventDefault();
    event.target.closest('div').remove();
}

function changeReadState(event) {
    event.preventDefault();
    const pElement = event.target.previousSibling;
    const currentState = pElement.textContent.includes('Read: Yes');
    if (currentState) {
        pElement.textContent = 'Read: No';
        event.target.textContent = 'Already read it';
    } else {
        pElement.textContent = 'Read: Yes';
        event.target.textContent = 'Haven\'t read it';
    }
}