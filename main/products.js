let iconMenu = document.querySelector(".iconNav")
let dropMenu = document.querySelector(".dropMenu")
let shadw = document.querySelector(".shadw")
let cart = document.querySelector (".cart")
let closeCart = document.querySelector (".close")
const cartHandels = document.querySelectorAll(".cartHandler")
let left = document.querySelector('.fa-solid fa-minus')
let right = document.querySelector('.fa-solid fa-plus')

// Initialize AOS
AOS.init();


var products = [
    {
        id:1 ,
        img:"./imges/1 (1).jpg" ,
        name:"Product one",
        price:30,
        quantity : 1

    },
    {
        id:2 ,
        img:"./imges/1 (2).jpg" ,
        name:"Product two",
        price:45,
        quantity : 1
    },
    {
        id:3 ,
        img:"./imges/1 (3).jpg" ,
        name:"Product three",
        price:28,
        quantity : 1
    },
    {
        id:4 ,
        img:"./imges/1 (4).jpg" ,
        name:"Product four",
        price:28,
        quantity : 1
    },
    {
        id:5 ,
        img:"./imges/1 (5).jpg" ,
        name:"Product five",
        price:50,
        quantity : 1
    },
    {
        id:6 ,
        img:"./imges/1 (6).jpg" ,
        name:"Product six",
        price:60,
        quantity : 1
    },
    
    {
        id:8 ,
        img:"./imges/1 (8).jpg" ,
        name:"Product eight",
        price:72,
        quantity : 1
    },
    {
        id:9 ,
        img:"./imges/1 (9).jpg" ,
        name:"Product nine",
        price:80,
        quantity : 1
    },
    
]

document.addEventListener("DOMContentLoaded" ,() => {
    let item = ""
    products.forEach( (val , index) =>{
        item += `

            <div class="card" >
                <div>
                    <img src="${ val.img}" alt="">
                </div>
                <b> ${ val.name} </b>
                <p> $${val.price} </p>
                <div class="btn" onclick = ' addToCart(${index})'>
                    <i class="fa-solid fa-cart-shopping"></i>
                    <p  > add to cart</p>
                </div>
            </div>
        
        `
    })
    setTimeout( ()=> {
        document.querySelector("  .conter").innerHTML = item
    },1500)
})

let cartItem
let x  = localStorage.getItem('cartData')
    if(x){
        cartItem = JSON.parse( x )
    }else{
        cartItem = []
    }
function addToCart(i){
    let pro = products[i]  
    cartItem.push(pro)
    succsesAddToCartBox(pro)
    displayProducts()
    // console.log(cartItem);
}

function displayProducts(){
    let cardInCart = cartItem.map(( value , index)=>`
        <div class="product">
                <div>
                    <img src="${value.img}" alt="">
                </div>
                <div class="name">
                    <b>  ${value.name} </b>
                    <p> $${value.price}</p>
                </div>
                <div class="counter">
                    <i class="fa-solid fa-minus" onclick="decrease(${index})"></i>
                    <span > ${value.quantity} </span>
                    <i class="fa-solid fa-plus" onclick="increase(${index})"></i>
                </div>
            </div>
    `).join(' ')

    if( cartItem.length > 0 ){
        document.querySelector(".cart .container").innerHTML = cardInCart
    }else{
        document.querySelector(".cart .container").innerHTML = 'Your Cart is Empty'
    }
    let totall = cartItem.reduce((a, b )=>{
        return a + b.price
    } ,0)
    document.querySelector('.totallCart').innerHTML = '$' + totall.toFixed( 2 )
    document.querySelector('.amount').innerHTML = cartItem.length
    localStorage.setItem("cartData" , JSON.stringify(cartItem))
    
}
displayProducts()
function minus(){
    console.log(true);
    
}
function succsesAddToCartBox(pro){
    let box = document.createElement('div')
        box.className = 'ckekedBox'
        console.log(box);
    
    let icon = document.createElement('i')
        icon.className = "fa-solid fa-check-double"

    let text = document.createElement('p')
        text.innerHTML = `succe add  product <br> <span>(${ pro.name })</span>
    `
    let div = document.createElement("div")
        let closeBox = document.createElement('button')
            closeBox.innerHTML = 'Close'
        let openBox = document.createElement('button')
            openBox.innerHTML = 'Cart Cart'
        
            div.append(closeBox)
            div.append(openBox)

            box.append(icon)
            box.append(text)
            box.append(div)

            document.body.append(box)
            setTimeout(()=>{
                shadw.classList.add('active')
                box.style.transform = 'translate(-50%, -50%) scaleY(1)'
            },100)
            let removeBox = ()=>{
                
                setTimeout(()=>{
                    box.style.transform = 'translate(-50%, -50%) scaleY(0)'
                    box.remove()
                } ,200)
            } 
            shadw.onclick = function(){
                box.style.transform = 'translate(-50%, -50%) scaleY(0)'
                box.remove()
            }
            closeBox.onclick = function(){
                removeBox()
                shadw.classList.remove('active')

            }
            shadw.onclick = function(){
                removeBox()
                this.classList.remove('active')
                cart.classList.remove('active')
            }
            openBox.onclick = function(){
                removeBox()
                cart.classList.add("active")
                cart.classList.add('active')

            }
    }


function updateCartSummary() {
    let total = cartItem.reduce((acc, item) => acc + (item.price * (item.quantity || 1)), 0);
    const totalEl = document.querySelector('.totallCart');
    const amountEl = document.querySelector('.amount');
    if (totalEl) totalEl.innerHTML = '$' + total.toFixed(2);
    if (amountEl) amountEl.innerHTML = cartItem.length;
    localStorage.setItem('cartData', JSON.stringify(cartItem));
}

function increase(index) {
    if (!cartItem || !cartItem[index]) return;
    cartItem[index].quantity = (cartItem[index].quantity || 1) + 1;

    const spans = document.querySelectorAll(".cart .product .counter span");
    if (spans && spans[index]) spans[index].innerText = cartItem[index].quantity;

    updateCartSummary();
}

function decrease(index) {
    if (!cartItem || !cartItem[index]) return;

    if ((cartItem[index].quantity || 1) > 1) {
        cartItem[index].quantity--;
        const spans = document.querySelectorAll(".cart .product .counter span");
        if (spans && spans[index]) spans[index].innerText = cartItem[index].quantity;
        updateCartSummary();
    } else {
        cartItem.splice(index, 1);
        updateCartSummary();
        if (typeof displayProducts === 'function') displayProducts();
    }
}
function addToCart(i) {
    let pro = products[i];

    let existing = cartItem.find(item => item.id === pro.id);

    if (existing) {
        existing.quantity++;
    } else {
        cartItem.push({ ...pro });
    }

    updateCartSummary();

    succsesAddToCartBox(pro);

    displayProducts();
}




let toUp = document.querySelector(".fa-jet-fighter-up")
window.addEventListener("scroll" ,()=>{
    if(this.scrollY >= 500){
        toUp.style.opacity ="1"
        toUp.style.visibility ="visible"
        toUp.style.bottom = "30px"
    }else{
        toUp.style.opacity ="0"
        toUp.style.visibility ="hidden"
        toUp.style.bottom = "100%"
    }
        
})

cartHandels.forEach( (ele) => {
    // console.log(ele);
    ele.onclick =function(){
        if(this.className.includes("openCart")){
            shadw.classList.add("active")
            cart.classList.add("active")
        }else{
            shadw.classList.remove("active")
            cart.classList.remove("active")
        }

    }
})

iconMenu.onclick = function(){
    this.classList.toggle("open")
    dropMenu.classList.toggle("open")
    iconMenu.classList.toggle("open")
    shadw.classList.toggle("active")
}


shadw.onclick = function() {
    this.classList.remove("active");
    dropMenu.classList.remove("open");
    iconMenu.classList.remove("open");
    cart.classList.remove("active");
};