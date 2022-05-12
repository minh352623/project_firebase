
import {product, loadItem,formatMoney} from './data.js'



window.addEventListener('load' , function(){

   
    

    const mainProductItem= document.querySelectorAll('.main-product-item');
    console.log( mainProductItem);
    loadItem(product,mainProductItem);
   
    const productContainerBtn= document.querySelector('.product-container-btn');
    const productContainerBtnB= document.querySelector('.product-container-btn button');
    console.log(productContainerBtnB);
    console.log(productContainerBtn);
    
    const heightAuto= document.querySelector('.main-product')
    productContainerBtn?.addEventListener('click', function(){
        window.location.href='./product.html'
        
    });

    // active cart 

    const cart= document.querySelector('.cart');
    const modelCart=document.querySelector('.model-cart');
    const clear=document.querySelector('.clear i');
    const clearcontainer=document.querySelector('.clear');
    const cartContainer=document.querySelector('.cart-container');
    console.log(clear);
    cart?.addEventListener('click', function(e){
        modelCart.classList.add('active');
    })
    clearcontainer?.addEventListener('click', function(e){
        modelCart.classList.remove('active');
    })
    clear?.addEventListener('click', function(e){
        modelCart.classList.remove('active');

    })
    modelCart?.addEventListener('click', function(e){
        modelCart.classList.remove('active');

    })
    cartContainer?.addEventListener('click', function(e){
        e.stopPropagation();
    })

    // add cart
   
   let arrayItem=[];
    function handleAddCart(e){
        arrayItem=JSON.parse(window.localStorage.getItem('listItem')) || [];
        if(e.target.matches('.icon-cart' )  || e.target.matches('.icon-cart i')){
            let item = {
                id: +this.querySelector('.main-product-item-img').dataset.id,
                img: this.querySelector('.main-product-item-img img').src,
                name:this.querySelector('.main-product-item-name span').textContent,
                price: +this.querySelector('.main-product-item-price span:nth-child(1)').textContent.trim(),
                number: 1

            }
            let index =-1;
            if(arrayItem.length>0){
                index =  arrayItem.findIndex((value) => value.id === item.id );
            }
            
            
            if(index>-1){
               let newnumber = arrayItem[index].number+ item.number;
               arrayItem[index].number=newnumber;
            }else{
                if(index == -1 || arrayItem.length == 0){

                    arrayItem.push(item);
                }
            }

            window.localStorage.setItem('listItem', JSON.stringify(arrayItem))
            sumMoney();
        }
    }
    function createItem(item){
        let template=`
        <div class="cart-center-item "  >
        <div class="cart-center-item-img" >
          <img src="${item.img}" alt="">
        </div>
        <div class="cart-center-item-info">
          <div class="cart-center-info-name">
            <span class="cart-center-info-name-js">${item.name}</span>
            <span class="cart-center-info-name-clear " data-id=${item.id}><i class="fas fa-trash-alt"></i></span>
          </div>
          <div class="cart-center-info-qty">
            <span>QTY:</span>
            <span class="cart-center-info-qty-number"> ${item.number}</span>
        
          </div>
          <div class="cart-center-info-price">
            <span class="cart-center-info-prices">${item.price}</span>
            <span>đ</span>
          </div>
        </div>
      
      </div>`;
      return template;

    }

    const cartCenter = document.querySelector('.cart-center')
    const arrayEmpty= document.querySelector('.array-empty')

    function showCart(){
        arrayItem=JSON.parse(window.localStorage.getItem('listItem')) || []; // lấy dữ liệu từ local
        cartCenter?cartCenter.innerHTML='':null;// reset cart
        if(arrayItem.length>0){
            arrayItem.forEach((item, index)=>{
                cartCenter.insertAdjacentHTML('beforeend',createItem(item));
                
            })
            arrayEmpty?arrayEmpty.textContent='':null;

        }else{
            arrayEmpty?arrayEmpty.textContent='NO PRODUCTS':null;
        }

    }




    showCart();
    mainProductItem.forEach(function(item, index){
        item.addEventListener('click', handleAddCart)
        item.addEventListener('click', showCart)


    })
    
    cartCenter?.addEventListener('click',removeItemCart)
    function removeItemCart(e){
        arrayItem=JSON.parse(window.localStorage.getItem('listItem')) || []; // lấy dữ liệu từ local
        if(e.target.matches('.cart-center-info-name-clear i') ){
            let removeItem = e.target.parentNode.parentNode.parentNode.parentNode;
            this.removeChild(removeItem);
            let idItem=e.target.parentNode.dataset.id;
            let index= arrayItem.findIndex(value => value.id==idItem)
            arrayItem.splice(index,1)
            window.localStorage.setItem('listItem', JSON.stringify(arrayItem))
            sumMoney();
        }
        

    }
    const header= document.querySelector('.header');
    let heightHeader = header&&header.offsetHeight;
    console.log(heightHeader);
    window.addEventListener('scroll', function(e){

        let scrollY= window.pageYOffset;
         if(scrollY>heightHeader){
             header?header.style.position='fixed' : null;
             document.body.style.paddingTop=`${heightHeader}px`;
         }
         else{
            header?header.style.position='static':null;

            document.body.style.paddingTop="";

         }

    })
    const totalPrice =document.querySelector('.total-price');
    const quantityItem=document.querySelector('.quantity-item');
    const cartTopQuantity=document.querySelector('.cart-top-quantity')
    function sumMoney(){
        let sum = 0;
        let sumNumber=0;
        arrayItem=JSON.parse(window.localStorage.getItem('listItem')) || []; // lấy dữ liệu từ local
        arrayItem.forEach((item, index)=>{
            sum+= item.price*item.number;
            sumNumber+=item.number;
        })
        totalPrice?totalPrice.textContent=`${formatMoney(sum)} đ` : null;
        quantityItem?quantityItem.textContent=`${sumNumber}`: null;
        cartTopQuantity?cartTopQuantity.textContent=`${sumNumber}`: null;
    }
    sumMoney();

 
    //modile 
    const menu = document.querySelector('.icon-mobile-menu i');
    const navLink = document.querySelector('.navbar-link');
    const navList =document.querySelector('.navbar-link-list');
    navList?.addEventListener('click',function(e){
        e.stopPropagation();
    })
    navLink?.addEventListener('click',function(){
        this.classList.remove('active');
    })
    console.log(navLink);
    menu?.addEventListener('click',function(){
        console.log('abc')
        navLink.classList.add('active');
    })

});
