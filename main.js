

/* Cambio numero cantidad de articulos*/

let menosBtn = document.querySelector('.input__menos');
let masBtn = document.querySelector('.input__mas');
let userInput = document.querySelector('.input__number');

let userInputNumber = 0;

masBtn.addEventListener('click', ()=>{
    userInputNumber++;
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

menosBtn.addEventListener('click', ()=>{
    userInputNumber--;
    if(userInputNumber <=0){
        userInputNumber = 0;
    }
    userInput.value = userInputNumber;
    console.log(userInputNumber);
});

// Agregar total de productos al carrito, boton comprar //

const addToCartBtn = document.querySelector('.detalles__button');
let cartNotification = document.querySelector('.header__carrito--notify');
let lastValue = parseInt(cartNotification.innerText);

addToCartBtn.addEventListener('click' , ()=>{
    lastValue = lastValue + userInputNumber;

    cartNotification.innerText = lastValue;
    cartNotification.style.display = 'block';
    dibujarProductInModal();
    

    
});

// Mostrar modal con detalle carrito

const cartIconBtn = document.querySelector('.header__carrito');
const cartModal = document.querySelector('.cart-modal');
//let precioModal = document.querySelector('.cart-modal__precio');
const productContainer = document.querySelector('.cart-modal__chekout-container');

cartIconBtn.addEventListener('click' , ()=>{
    //cartModal.style.display = 'block';
    cartModal.classList.toggle('show');

    if(lastValue == 0){
        productContainer.innerHTML = '<p class="cart-empty">Carrito Vacio</p>';
        }else{
            dibujarProductInModal();
        }
    });

//Borrar contenido del carrito
function deleteProduct (){
    const deleteProductoBtn = document.querySelector('.cart-modal__delete');

    deleteProductoBtn.addEventListener('click', ()=>{
        productContainer.innerHTML = '<p class="cart-empty">Carrito Vacio</p>';
        lastValue = 0;
        cartNotification.innerText = lastValue;
});
}


//Cambiar imagenes botones flecha
const imageContainer = document.querySelector('.galeria__image-container');
const previoGalleryBtn = document.querySelector('.galeria__image-previo');
const nextGalleryBtn = document.querySelector('.galeria__image-next');
let imgIndex = 1;

/* const imagesUrls = [
    '../images/jordan1-grande.jpg',
    '../images/jordan2-grande.jpg',
    '../images/jordan3-grande.jpg',
    '../images/jordan4-grande.jpg'
] */


nextGalleryBtn.addEventListener('click', ()=>{
    changeNextImage(imageContainer);
});

previoGalleryBtn.addEventListener('click', ()=>{
    changePrevioImage(imageContainer);
});


// Mostrar el modal de imagenes desktop

const imagesModal = document.querySelector('.modal-galeria__bg');
const closeModalBtn = document.querySelector('.modal-galeria__close');

imageContainer.addEventListener('click', ()=>{
    imagesModal.style.display = 'grid';
});

closeModalBtn.addEventListener('click', ()=>{
    imagesModal.style.display = 'none';
})

//Cambio imagenes principales...miniaturas

let miniaturas = document.querySelectorAll('.galeria__miniatura')
miniaturas = [...miniaturas]

miniaturas.forEach(miniatura => {
    miniatura.addEventListener('click', event=>{
        console.log(event.target.id)
        imageContainer.style.backgroundImage = `url('../images/jordan${event.target.id}-grande.jpg')`
    });
});

//Cambio imagenes principales...miniaturas MODAL

let modalMiniaturas = document.querySelectorAll('.modal-galeria__miniatura')
const modalImageContainer = document.querySelector('.modal-galeria__image-container')
modalMiniaturas = [...modalMiniaturas]

modalMiniaturas.forEach(modalMiniatura =>{
    modalMiniatura.addEventListener('click', (event)=>{
        console.log(event.target.id.slice(-1))
        modalImageContainer.style.backgroundImage = `url('../images/jordan${event.target.id.slice(-1)}-grande.jpg')`

    })
})

//Cambiar imagen principal modal, desde las flechas

const  previoModalBtn = document.querySelector('.modal-galeria__image-previo');
const  nextModalBtn = document.querySelector('.modal-galeria__image-next');

nextModalBtn.addEventListener('click', ()=>{
    changeNextImage(modalImageContainer);
});

previoModalBtn.addEventListener('click', ()=>{
    changePrevioImage(modalImageContainer);
});

//Mostrar menu hamburguesa




//Funciones

function dibujarProductInModal(){
    productContainer.innerHTML = `
        <div class="cart-modal__detalle-container">
            <img class="cart-modal__image" src="./images/jordan2.jpg" alt="">
            <div>
            <p class="cart-modal__producto">Air Jordan 1 Mid SE..</p>
            <p class="cart-modal__precio">$2,500 x3 <span>$7,500</span> </p>
            </div>
            <img class="cart-modal__delete" src="./images/icon-delete.svg" alt="">
        </div>
        <button class="cart-modal__finalizar">Finalizar</button>`
    deleteProduct()  
    let precioModal = document.querySelector('.cart-modal__precio');
    precioModal.innerHTML = `$2,500 x${lastValue} <span>$${lastValue*2500} </span>`;  
}



function changeNextImage(imgContainer){
    if(imgIndex == 4){
        imgIndex = 1;
    }else{
        imgIndex++;
    }  
    imgContainer.style.backgroundImage = `url('../images/jordan${imgIndex}-grande.jpg')`
}

function changePrevioImage(imgContainer){
    if(imgIndex == 1){
        imgIndex = 4;
    }else{
        imgIndex--;
    }
    imgContainer.style.backgroundImage = `url('../images/jordan${imgIndex}-grande.jpg')`    
}


document.addEventListener('click',(e) =>{
    if(e.target.matches('.cart-modal__finalizar')){
        console.log('Delegacion de eventos');
        Swal.fire(
            'Muchas Gracias!',
            'Procesaremos tu compra!',
            'success'
          );
    }
})

/* let finalizar = document.getElementsByClassName('cart-modal__finalizar');


finalizar[0].addEventListener('click', () => { 
    console.log(finalizar);
   Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      );
});   */

/* let finalizar = document.getElementById('boton');

finalizar.addEventListener('click', ()=>{
    Swal.fire(
        'Muchas Gracias!',
        'Procesaremos tu pago!',
        'success'
      );
}); */
/* 
let divisas = document.getElementById('divisas');

fetch('https://api.coinlore.net/api/global/')
    .then(response => response.json())
    .then(data => {
        data.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = `
                <h2>ID: ${item.id}</h2>
                <h3>Symbol: ${item.symbol}</h3>
                <p>Name: ${item.name}</p>
            `;
            divisas.append(li)
        });
    });
 */



    //code, symbol, rate, description, rate_float//



function personajes(done){

    const results = fetch("https://rickandmortyapi.com/api/character");

    results
        .then(response => response.json())
        .then(data=> {
            done(data)
        });
} 

personajes(data => {

    data.results.forEach(personaje => {
        
        const article = document.createRange().createContextualFragment(`
        
        <article>

            <div class="image-container">
            <img src="${personaje.image}" alt="">
            </div>
        
            <h3>${personaje.name}</h3>
            <span>${personaje.status}</span>
        
        </article>
        
        `); 

        const footer = document.querySelector("footer");

        footer.append(article);
    });
});