
function init() {
    renderBooks();
}

function renderBooks() {
   let contentRef = document.getElementById('container');
    contentRef.innerHTML = '';

    for (let iBooks = 0; iBooks < books.length; iBooks++) {
        contentRef.innerHTML += getBookTemplate(iBooks);
    }
}

function getBookTemplate(iBooks) {
    const book = books[iBooks];
    return `
            <section class="book">
            <h3 id="Title">${book.name}</h3>
            <div class="devider"></div>
            <div>
                <img class="BookCover" src="./imgs/book.png">
            </div>
            <div class="devider"></div>
            <div class="BookInfo">
                <div class="Price-Likes">
                    <div class="price">${book.price.toFixed(2)}€</div>     
                    ${getLikedTemplate(iBooks)}
                    <div class="likes">${book.likes}</div>
                </div>
                <div class="info">
                    <p><b>Author:</b> ${book.author}</p>
                    <p><b>Erscheinungsjahr:</b> ${book.publishedYear}</p>
                    <p><b>Genre:</b> ${book.genre}</p>
                </div>
            </div>
            <div class="devider"></div>
            <h4>Kommentare:</h4>
            <section class="commentarySection">
            ${getCommentarytemplate(iBooks)}
            </section>
            <section class="commentaryInput">
                <input type="text" id="comment${iBooks}" placeholder="Schreibe einen Kommentar ..." /><i onclick="addCommentary(${iBooks})" class="fa-regular fa-paper-plane custom"></i>
            </section>    
        </section>
            `
}

function getCommentarytemplate(iBooks) {
    const book = books[iBooks];
    if (!book.comments || book.comments.length === 0) {
        return '';
    }
    let commentary = '';
    for (let iComment = 0; iComment < book.comments.length; iComment++) {
        commentary += getCommentary(iBooks, iComment);
    }
    return commentary;
}

function getCommentary(iBooks, iComment) {
    const book = books[iBooks];
    return `
    <div class="commentary">
        <div class="commentary-User">[${book.comments[iComment].name}]:</div>
        <div class="commentary-Text">${book.comments[iComment].comment}</div>
    </div>
    `;
}

function getLikedTemplate(iBooks) {
    const book = books[iBooks];
    if (book.liked) {
        return `<div><i onclick="changeClass(event, ${iBooks})" class="fa-solid fa-heart fa-2xl" aria-hidden="true" style="color: #ff0000;"></i></div>`;
    }
    return `<div><i onclick="changeClass(event, ${iBooks})" class="fa-regular fa-heart fa-2xl" aria-hidden="true" style="color: #ff1a1a;"></i></div>`;
}

function changeClass(event, iBooks) {
    const book = books[iBooks];
    const element = event.target;
    const likesElement = document.getElementsByClassName('likes')[iBooks];
    if (element.classList.contains('fa-regular')) {
        element.classList.remove('fa-regular');
        element.classList.add('fa-solid');
        book.likes++;
    } else if (element.classList.contains('fa-solid')) {
        element.classList.remove('fa-solid');
        element.classList.add('fa-regular');
        book.likes--;
    }
    likesElement.innerHTML = book.likes;
}

function addCommentary(iBooks) {
    const book = books[iBooks];
    const input = document.getElementById(`comment${iBooks}`).value;
    if (input.trim() !== '') {
        book.comments.push({ name: 'H.P. Dotter', comment: input });
        renderBooks();
    } else {
        alert('Bitte geben Sie einen Kommentar ein.');
    }

    document.getElementById(`comment${iBooks}`).value = '';
}