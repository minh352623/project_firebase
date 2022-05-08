window.addEventListener('load', function(){
    const formLogin=document.querySelector('.form-login')
    const errorEmail= document.querySelector('.error-email')
    const errorPwd= document.querySelector('.error-pwd')
    

    formLogin.addEventListener('submit', function(e){
        e.preventDefault();
        
        let valueemail= this.querySelector('.email').value 
        let valuepwd= this.querySelector('.pwd').value 
        let isEmail=false;
        let isPwd=false;

        const regexEmail=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
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

        const mess= document.querySelector('.mess')
        if( isEmail && isPwd ){
            mess.textContent='ĐĂNG NHẬP THÀNH CÔNG'
            mess.style.padding='8px';
            this.reset();
        }

    })

})