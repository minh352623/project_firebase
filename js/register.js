window.addEventListener('load', function(){
    const formRegister=document.querySelector('.form-register')
    console.log()
    const errorName= document.querySelector('.error-name')
    const errorEmail= document.querySelector('.error-email')
    console.log(errorEmail)
    const errorPwd= document.querySelector('.error-pwd')
    const errorConfirmpwd= document.querySelector('.error-confirmpwd')
    

    formRegister.addEventListener('submit', function(e){
        e.preventDefault();
        let valuename= this.querySelector('.name').value 
        let valueemail= this.querySelector('.email').value 
        let valuepwd= this.querySelector('.pwd').value 
        let valueconfirm= this.querySelector('.confirm-password').value 
        let isName=false;
        let isEmail=false;
        let isPwd=false;
        let isconfirmpwwd=false;

        const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        ///name
        if(valuename==''){
            errorName.textContent='Họ tên không được rỗng'
            isName=false;
        }
        else if(valuename.length<4){
            errorName.textContent='Họ tên phải lớn hơn 4 ký tự'
            isName=false;
        }
        else{
            errorName.textContent=''
            isName=true;
        }
        //email
        if(valueemail==''){
            errorEmail.textContent='Email không được rỗng';
            isEmail=false;
        }
        else if(!regexEmail.test(valueemail)){
            errorEmail.textContent='Không đúng định dạng email'
            isEmail=false;
        }
        else{
            errorEmail.textContent=''
            isEmail=true;
        }
        //passs
        if(valuepwd==''){
            errorPwd.textContent='Mật khẩu không được rỗng'
            isPwd=false;
        }
        else if(valuepwd.length<8){
            errorPwd.textContent='Mật khẩu phải lớn hơn hoặc bằng 8 ký tự'
            isPwd=false;
        }
        else{
            errorPwd.textContent=''
            isPwd=true;
        }

        //confirm pass
        if(valueconfirm==''){
            errorConfirmpwd.textContent='Mật khẩu không được rỗng'
            isconfirmpwwd=false;
        }
        else if(valueconfirm!=valuepwd ){
            errorConfirmpwd.textContent='Mật khẩu nhập lại không khớp '
            isconfirmpwwd=false;
        }
        else{
            errorConfirmpwd.textContent=''
            isconfirmpwwd=true;
        }
        const mess= document.querySelector('.mess')
        if(isName && isEmail && isPwd && isconfirmpwwd){
            mess.textContent='ĐĂNG KÝ THÀNH CÔNG'
            mess.style.padding='8px';
            this.reset();
        }

    })

})