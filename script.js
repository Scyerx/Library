const addInfoBtn = document.getElementById("addInfoBtn");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const pagesNumb = document.getElementById("pagesNumb")
const collection = document.getElementById("collection");
const isRead = document.getElementById("isRead");
const changeStatus=document.getElementsByClassName("changeStatus");
const deleteBtn=document.getElementsByClassName("deleteBtn")
let myLibrary = [];

addInfoBtn.onclick = function () {
    addBookToLibrary();  
    clearCollection();
    render ();
    displayBooks();    
    clearForm();   
}

function render() {
    for (var i = 0; i < myLibrary.length; i++) {
        myLibrary[i].index = i;
    }
}

function Book(title, author, pages, read) {
    this.title=title
    this.author=author
    this.pages=pages
    this.read=read;
}

function addBookToLibrary () {
    if (bookTitle.value.length === 0 || bookAuthor.value.length===0) {
        alert ("Please, fill all the fields");
        return
    }
    const newBook = new Book(bookTitle.value, bookAuthor.value, pagesNumb.value, isRead.checked);
    myLibrary.push(newBook);
}

function clearForm(){
    bookAuthor.value = "";
    bookTitle.value = "";
    pagesNumb.value = "";
    isRead.checked=false
}

function clearCollection () {
    while (collection.firstChild) {
        collection.firstChild.remove();
    }
}

function statusChange () {
    const readStatus = this.parentElement.getAttribute('status');
    const bookIndex = this.parentElement.getAttribute('index');
    if (readStatus === "true") {
    this.parentElement.setAttribute ("status", false);
    this.previousElementSibling.textContent = "Not Read";
    myLibrary[bookIndex].read = false;
    } else {
    this.parentElement.setAttribute ("status", true);
    this.previousElementSibling.textContent = "Already Read" 
    myLibrary[bookIndex].read = true; 
    } 
}

function deleteBook () {
    const bookIndex = this.parentElement.getAttribute('index')
    myLibrary.splice(bookIndex, 1) ;
    clearCollection();
    render ();
    displayBooks();
    

}

function displayBooks () {
    for (var i = 0; i<myLibrary.length; i++) {
        
        const book=document.createElement('div');
        book.setAttribute('class', 'content');
        book.setAttribute('index', myLibrary[i].index);

        const title = document.createElement('div');
        title.setAttribute('class', 'name');
        title.textContent=`Title: ${myLibrary[i].title}`
        book.appendChild(title);

        const author = document.createElement('div');
        author.setAttribute('class', 'author');
        author.textContent=`Author: ${myLibrary[i].author}`
        book.appendChild(author);

        const pages = document.createElement('div');
        pages.setAttribute('class', 'pages');
        pages.textContent=`Pages: ${myLibrary[i].pages}`
        book.appendChild(pages);

        if (myLibrary[i].read === true) {
            const isitread = document.createElement('div');
            isitread.setAttribute('class', 'read');
            isitread.textContent=`Already read`
            book.appendChild(isitread);
            book.setAttribute('status', true)
        } else {
            const isitread = document.createElement('div');
            isitread.setAttribute('class', 'read');
            isitread.textContent=`Not read`
            book.appendChild(isitread);
            book.setAttribute('status', false)
        }
    
        const changeButton = document.createElement('button');
        changeButton.setAttribute('class', 'changeStatus')
        changeButton.textContent="Change Button";
        changeButton.addEventListener('click', statusChange)
        book.appendChild(changeButton);
    
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'deleteBtn')
        deleteButton.textContent="Delete Button";
        deleteButton.addEventListener('click', deleteBook)
        book.appendChild(deleteButton)  
        collection.appendChild(book);
    }

}

