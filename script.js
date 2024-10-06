const myLibrary = [];

const cards = document.querySelector('.cards');
const bookDialog = document.querySelector('#bookDialog');
const openDialogButton = document.querySelector('#openDialogButton');
const closeDialogBtn = document.querySelector('#closeDialogButton');
const addBookButton = document.querySelector('#addBookButton');

// Book constructor
function Book(title, author, year, description) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.description = description;
  this.isRead = false;
}

// Add a new book to the library
function addBookToLibrary(title, author, year, description) {
  const newBook = new Book(title, author, year, description);
  myLibrary.push(newBook);
  return newBook; // Return the new book REFERENCE
}

// Create and add a book card to the DOM
function addBookCard(book) {
  const card = document.createElement('div');
  card.classList.add('card');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'isRead';
  checkbox.checked = book.isRead;
  checkbox.addEventListener('change', () => {
    book.isRead = checkbox.checked;
  });

  const title = document.createElement('h3');
  title.textContent = book.title;

  const author = document.createElement('p');
  author.textContent = `Author: ${book.author}`;

  const year = document.createElement('p');
  year.textContent = `Year: ${book.year}`;

  const description = document.createElement('p');
  description.textContent = book.description;

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'Delete';
  // book and card are in the same closure
  deleteButton.addEventListener('click', () => {
    myLibrary.splice(myLibrary.indexOf(book), 1); // book has the reference to the book object
    cards.removeChild(card); // card has the reference to the card DOM element
  });

  card.append(checkbox, title, author, year, description, deleteButton);
  cards.appendChild(card);
}

// Open the dialog to add a new book
openDialogButton.addEventListener('click', () => {
  bookDialog.showModal();
});

// Close the dialog
closeDialogBtn.addEventListener('click', () => {
  bookDialog.close();
});

// Add a new book from the dialog form
addBookButton.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  const bookTitle = document.querySelector('#bookTitle').value;
  const bookAuthor = document.querySelector('#bookAuthor').value;
  const publishingYear = document.querySelector('#publishingYear').value;
  const bookDescription = document.querySelector('#bookDescription').value;

  const newBook = addBookToLibrary(
    bookTitle,
    bookAuthor,
    publishingYear,
    bookDescription
  );
  addBookCard(newBook);

  // Clear the form
  document.querySelector('#bookTitle').value = '';
  document.querySelector('#bookAuthor').value = '';
  document.querySelector('#publishingYear').value = '';
  document.querySelector('#bookDescription').value = '';
  bookDialog.close();
});

// Add initial books to the library
const initialBooks = [
  {
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    year: 1937,
    description:
      'The Hobbit is a tale of high adventure, undertaken by a company of dwarves in search of dragon-guarded gold.',
  },
  {
    title: 'The Lord of the Rings',
    author: 'J.R.R. Tolkien',
    year: 1954,
    description:
      'The Lord of the Rings is an epic high-fantasy novel written by English author and scholar J. R. R. Tolkien.',
  },
  {
    title: 'The Silmarillion',
    author: 'J.R.R. Tolkien',
    year: 1977,
    description:
      'The Silmarillion is a collection of mythopoeic works by English writer J. R. R. Tolkien, edited and published posthumously by his son, Christopher Tolkien, in 1977.',
  },
  {
    title: 'The Children of Húrin',
    author: 'J.R.R. Tolkien',
    year: 2007,
    description:
      'The Children of Húrin is an epic fantasy novel which forms the completion of a tale by J. R. R. Tolkien.',
  },
  {
    title: 'The Fall of Gondolin',
    author: 'J.R.R. Tolkien',
    year: 2018,
    description:
      'The Fall of Gondolin is, in the writings of J.R.R. Tolkien, one of the original Lost Tales which formed the basis for a section in his later work, The Silmarillion.',
  },
];

initialBooks.forEach((book) => {
  const newBook = addBookToLibrary(
    book.title,
    book.author,
    book.year,
    book.description
  );
  addBookCard(newBook);
});
