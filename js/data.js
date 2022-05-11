const product= [
    {
        id:1,
        name: 'Bag',
        price: 600000,
        img:'./assets/img/product/pro1.webp',

    },
    {
        id:2,
        name: 'Chain Bag',
        price: 700000,
        img:'./assets/img/product/pro2.webp',

    },
    {
        id:3,
        name: 'Crossbody Bag',
        price: 550000,
        img:'./assets/img/product/pro3.webp',

    },
    {
        id:4,
        name: 'Deviated Flap Bag',
        price: 600000,
        img:'./assets/img/product/pro4.webp',

    },
    {
        id:5,
        name: 'Double Flap Bag',
        price: 600000,
        img:'./assets/img/product/pro5.webp',

    },
    {
        id:6,
        name: 'Hand Bag',
        price: 550000,
        img:'./assets/img/product/pro6.webp',

    },
    {
        id:7,
        name: 'Hand Bag',
        price: 550000,
        img:'./assets/img/product/pro7.webp',

    },
    {
        id:8,
        name: 'Hand Bag',
        price: 600000,
        img:'./assets/img/product/pro8.webp',

    },
    {
        id:9,
        name: 'Large Bag',
        price: 660000,
        img:'./assets/img/product/pro9.png',

    },
    {
        id:10,
        name: 'Large Bag',
        price:700000,
        img:'./assets/img/product/pro10.png',

    },
    {
        id:11,
        name: 'Round Sole Bag',
        price: 550000,
        img:'./assets/img/product/pro11.png',

    },
    {
        id:12,
        name: 'Round Sole Bag',
        price: 550000,
        img:'./assets/img/product/pro12.webp',

    },
    {
        id:13,
        name: 'Ruffled Bag',
        price: 1000000,
        sale:550000,
        img:'./assets/img/product/pro12.webp',

    },
    {
        id:14,
        name: 'Twisted Bag',
        price: 500000,
        img:'./assets/img/product/pro14.png',

    },
    {
        id:15,
        name: 'Wrinkled Bag',
        price: 550000,
        img:'./assets/img/product/pro15.png',

    },
    {
        id:16,
        name: 'Large Bag',
        price: 600000,
        img:'./assets/img/product/pro10.png',

    },
];
function renderItem(item){
    let template=`
    <div class="main-product-item-img" data-id="${item.id}">
            <img src="${item.img}" alt="" />
            <div class="main-product-item-img-icon">
              <span class="icon-cart icon">
                <i class="fas fa-cart-plus"></i>
              </span>
              <span class="icon-search icon">
                <i class="fas fa-search"></i>
              </span>
              <span class="icon-heart icon">
                <i class="far fa-heart"></i>
              </span>
            </div>
    </div>
          <div class="main-product-item-name">
            <span>${item.name}</span>
          </div>
          <div class="main-product-item-price">
            <span>${item.price}</span>
            <span>đ</span>
          </div>
        
          
    `;
    return template;
}

function loadItem(arrayItem, itemCart){
    let array=0;
    if(arrayItem.length>itemCart.length){
        array= itemCart.length

    }
    else{
        array= arrayItem.length

    }
    for( let i =0; i<array; i++){
        let item= arrayItem[i];
        itemCart[i].insertAdjacentHTML('beforeend',renderItem(item));
    }
}

function formatMoney(num) {
    return Intl.NumberFormat("vi-VN").format(num);
  }

export {loadItem};
export {product};
export {formatMoney};
