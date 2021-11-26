
let allContainerCart=document.querySelector('.products');
let containerBuycard=document.querySelector('.card-items')
let priceTotal= document.querySelector('.price-total');
let buyThings=[];
let totalCard= 0;

loadEventListenrs();
function loadEventListenrs(){
    allContainerCart.addEventListener('click', addProduct);
    containerBuycard.addEventListener('click', deleteproduct);
   
}

function addProduct(e){
    e.preventDefault();
    if (e.target.classList.contains('btn-add-cart')) {  
        const selectProduct = e.target.parentElement; 
        readTheContent(selectProduct);
    }
}

function deleteproduct(e) {
    if (e.target.classList.contains('delete-product')) {
        const deleteId= e.target.getAttribute('data-id');
        buyThings.forEach(value =>{
            if (value.id == deleteId){
                let priceReduce = parseFloat(value.price)*parseFloat(value.amount);
                totalCard = totalCard- priceReduce;
                totalCard =totalCard.toFixed(2);
            }
        })
        buyThings= buyThings.filter(product=>product.id !== deleteId);

   }
   loadHtml();
}



function readTheContent(product){
    const infoProduct = {
        image: product.querySelector('div img').src,
        title: product.querySelector('.title').textContent,
        price: product.querySelector('div p span').textContent,
        id: product.querySelector('a').getAttribute('data-id'),
        amount: 1
    }
   totalCard=parseFloat(totalCard) + parseFloat(infoProduct.price); 
   totalCard=totalCard.toFixed(2);
   
    const exist = buyThings.some(product => product.id === infoProduct.id);
    if(exist){
        const pro= buyThings.map(product=>{
           if(product.id===infoProduct.id){
               product.amount++;
               return product;
           }else{
              return product;
           }

        });
        buyThings = [...pro];
    }else{
    buyThings=[...buyThings, infoProduct];
    }
    

    loadHtml();

    
}

function loadHtml() {
    clearHtml();
      buyThings.forEach(product => {
          const{image,title,price,amount,id}=product
          const row=document.createElement('div');
          row.classList.add('item');
          row.innerHTML= `
          <img src="${image}" alt="">
          <div class="item-content">
              <h5>${title}</h5>
              <h5 class="cart-price">${price}$</h5>
              <h6>Amount: ${amount}</h6>
          </div>
          <span class="delete-product" data-id="${id}">X</span>
 |         `;
          containerBuycard.appendChild(row);
          priceTotal.innerHTML = totalCard;
     }); 
 }
 function clearHtml(){
    containerBuycard.innerHTML = '';
 }