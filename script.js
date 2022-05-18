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
      
    displayCollection();
    clearForm();   
}

for (var i=0; i<changeStatus.length; i++) {
    changeStatus[i].onclick = function () {
        const readStatus = this.parentElement.getAttribute('status');
        if (readStatus === "true") {
            this.parentElement.setAttribute ("status", false);
            this.previousElementSibling.textContent = "Not Read";
        } else {
            this.parentElement.setAttribute ("status", true);
            this.previousElementSibling.textContent = "Already Read"
            
        }        
    }
}

for (var i=0; i<deleteBtn.length; i++) {
    deleteBtn[i].onclick = function () {
        this.parentElement.remove();
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



function displayCollection () {
    const book=document.createElement('div');
    book.setAttribute('class', 'content');

    const title = document.createElement('div');
    title.setAttribute('class', 'name');
    title.textContent=`Title: ${bookTitle.value}`
    book.appendChild(title);

    const author = document.createElement('div');
    author.setAttribute('class', 'author');
    author.textContent=`Author: ${bookAuthor.value}`
    book.appendChild(author);

    const pages = document.createElement('div');
    pages.setAttribute('class', 'pages');
    pages.textContent=`Pages: ${pagesNumb.value}`
    book.appendChild(pages);

    if (isRead.checked == true) {
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
    changeButton.addEventListener('click', function () {
        const readStatus = this.parentElement.getAttribute('status');
        if (readStatus === "true") {
            this.parentElement.setAttribute ("status", false);
            this.previousElementSibling.textContent = "Not Read";
        } else {
            this.parentElement.setAttribute ("status", true);
            this.previousElementSibling.textContent = "Already Read"
            
        }         
    })
    book.appendChild(changeButton);

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'deleteBtn')
    deleteButton.textContent="Delete Button";
    deleteButton.addEventListener('click', function() {
        this.parentElement.remove();
    })
    book.appendChild(deleteButton)

    

    collection.appendChild(book);
}