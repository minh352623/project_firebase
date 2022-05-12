import {product,loadItem} from './data.js';


window.addEventListener('load', function(){

    //phân trang
    const pagePro = this.document.querySelector('.page-product.active');
    const heightPage = pagePro.offsetHeight;
    const numberPage = document.querySelector('.number-page');
    numberPage.style.marginTop = `${heightPage+24}px`;

    const formProduct= document.querySelector('.form-product');
    const mainProductItem= document.querySelectorAll('.main-product-item');
    let inputSearch= document.querySelector('.form-product input');


    const page = document.querySelectorAll('.nunber-page-list');
    const pageActive = document.querySelectorAll('.page-product');
    for(let i = 0 ;i<page.length;i++){
        page[i].addEventListener('click',function(){
            window.location.href = "#";
            page.forEach(item=>{
                item.classList.remove('active');
            })
            this.classList.add('active');
            const pagePro = document.querySelectorAll('.page-product.active');
            pagePro.forEach(item=>{
                item.classList.remove('active');
            })
            pageActive[i].classList.add('active');

        })
    }

    //end phân trang


    inputSearch.addEventListener('keyup',function(e){
        let valueInput= e.target.value
        valueInput= valueInput.toLowerCase();
        let arraysearch=[];
        product.forEach((item,index) => {
          let itemName= item.name.toLowerCase();
           if(itemName.indexOf(valueInput)>-1){
            arraysearch.push(item)
           }

           
        })
        if(arraysearch.length>0){
            mainProductItem.forEach((item, index) => {
                item.innerHTML="";
            })
            loadItem(arraysearch, mainProductItem)
        }
    
    })
    formProduct.addEventListener('submit', function(e){
        e.preventDefault()
        let valueInput= this.querySelector('.form-product input').value
        valueInput= valueInput.toLowerCase();
        let arraysearch=[];
        product.forEach((item,index) => {
          let itemName= item.name.toLowerCase();
           if(itemName.indexOf(valueInput)>-1){
            arraysearch.push(item)
           }

           
        })
        if(arraysearch.length>0){
            mainProductItem.forEach((item, index) => {
                item.innerHTML="";
            })
            loadItem(arraysearch, mainProductItem)
        }
    
    })

})