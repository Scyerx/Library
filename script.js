const closeBtn = document.getElementById("closeBtn");
const closeBtnEdit = document.getElementById("closeBtnEdit");
const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const pagesNumb = document.getElementById("pagesNumb")
const isRead = document.getElementById("isRead");
const editInfoBtn =document.getElementById("editInfoBtn");
const bookTitleEdit = document.getElementById("bookTitleEdit");
const bookAuthorEdit = document.getElementById("bookAuthorEdit")
const pagesNumbEdit = document.getElementById("pagesNumbEdit")
const isReadEdit = document.getElementById("isReadEdit");
const addBook = document.getElementById("addBook");


const collection = document.getElementById("collection");
const changeStatus=document.getElementsByClassName("changeStatus");
let myLibrary = [];

addInfoBtn.onclick = function () {
    addBookToLibrary();  
    clearCollection();
    render ();
    displayBooks();    
    clearForm();   
    document.getElementById("popup").style.display = "none";
}

addBook.addEventListener("click", function () {
    document.getElementById("popup").style.display = "flex";
})

closeBtn.addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";    
})

closeBtnEdit.addEventListener("click", function() {
    document.getElementById("popupEdit").style.display = "none";    
})

function openEdit () {
    document.getElementById("popupEdit").style.display = "flex";
    const bookIndex = this.parentElement.parentElement.getAttribute('index')
    bookTitleEdit.value = myLibrary[bookIndex].title
    bookAuthorEdit.value = myLibrary[bookIndex].author
    pagesNumbEdit.value = myLibrary[bookIndex].pages
    document.getElementById("popupEdit").setAttribute('index', bookIndex)    
}

editInfoBtn.addEventListener("click", function () {
    const bookIndex = this.parentElement.parentElement.getAttribute('index')
    if (bookTitleEdit.value !=='') {
        myLibrary[bookIndex].title = bookTitleEdit.value
    }
    if (bookAuthorEdit.value !=='') {
        myLibrary[bookIndex].author = bookAuthorEdit.value
    }
    if (pagesNumbEdit.value !=='') {
        myLibrary[bookIndex].pages = pagesNumbEdit.value
    }  
    clearCollection();
    render ();
    displayBooks();
    document.getElementById("popupEdit").style.display = "none";
})

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
    const bookIndex = this.parentElement.parentElement.getAttribute('index')
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
        changeButton.setAttribute('class', 'changeStatus');
        changeButton.textContent="Change Status";
        changeButton.addEventListener('click', statusChange);
        book.appendChild(changeButton);

        const editDelete = document.createElement('div');
        editDelete.setAttribute('class', 'editDelete');

        const editButtonDiv = document.createElement('div');
        editButtonDiv.setAttribute('class', 'editButtonDiv');
        const editButton = document.createElement('img');
        editButton.setAttribute("src", "images/pencil.png");
        editButton.setAttribute('class', 'editButton');
        editButtonDiv.addEventListener('click', openEdit)
        editButtonDiv.appendChild(editButton);
        editDelete.appendChild(editButtonDiv);
    
        
    
        const deleteButtonDiv = document.createElement('div');
        deleteButtonDiv.setAttribute('class', 'deleteButtonDiv');
        const deleteButton = document.createElement('img');
        deleteButton.setAttribute('src', 'images/delete-outline.png')
        deleteButton.setAttribute('class', 'deleteBtn');
        deleteButtonDiv.addEventListener('click', deleteBook);
        deleteButtonDiv.appendChild(deleteButton);
        editDelete.appendChild(deleteButtonDiv);

        book.appendChild(editDelete);
        collection.appendChild(book);
    }

    const addNewBook = document.createElement('div')
    addNewBook.setAttribute('class', 'content');
    addNewBook.setAttribute('id', 'addBook');
    addNewBook.addEventListener("click", function () {
        document.getElementById("popup").style.display = "flex";
    })
    const addImage = document.createElement('img');
    addImage.setAttribute('src', 'images/plus.png');
    addNewBook.appendChild(addImage);
    collection.appendChild(addNewBook);


}

