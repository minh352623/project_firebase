window.addEventListener('load', function(){
    let infoUser= JSON.parse(window.localStorage.getItem('infoUser'))|| [];
    const navbarLog = document.querySelector('.navbar-log');
    const nameUser=document.querySelector('.name-user');
    const hello=document.querySelector('.hello');
    const exit=document.querySelector('.exit');
   const name=document.querySelector('.name')
   const nameEmail=document.querySelector('.name-email')
   const nameSdt=document.querySelector('.name-phone')
   const nameAdd=document.querySelector('.name-address')
   
    
    console.log(infoUser);
    if(infoUser.length>0){
        navbarLog?.classList.add('none');
        hello?.classList.remove('none');
        nameUser?nameUser.textContent=infoUser[0].name:null;
        name?name.textContent=infoUser[0].name:null;
        nameEmail?nameEmail.textContent=infoUser[0].email:null;
        nameSdt?nameSdt.textContent=infoUser[0].sdt:null;
        nameAdd?nameAdd.textContent=infoUser[0].address:null;


        }
    else{
        navbarLog?.classList.remove('none');
        hello?.classList.add('none');


    }
    exit?.addEventListener('click',function(){
        window.localStorage.setItem('infoUser',JSON.stringify([]))
        
    })

})