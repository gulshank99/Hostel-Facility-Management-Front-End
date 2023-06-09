let BASE_URL='http://localhost:8080/hms/';
let login=document.getElementById("login")
let token = localStorage.getItem("token");
if(token){
    window.location.href = "admin.html";
}else{
    login.onclick = async (e) => {
        e.preventDefault();
        let email=document.getElementById("email").value;
        let password=document.getElementById("password").value;
        let alertBox = document.getElementById("alert-box");
        if(email=="" || password == ""){
            alertBox.innerText = "Email and password must not be empty";
            alertBox.classList.remove("d-none");
            setTimeout(()=>{
                alertBox.classList.add("d-none");
            },3000);
        }
        else{

            user = {
                username:email,
                password:password
            }
            let data=JSON.stringify(user);
            let options={
                method:'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body:data
            }
            let response= await fetch(`${BASE_URL}login`,options);
            if(response.status==200){
                console.log("inside response")
                let res= await response.json();
                console.log(res.token)
                console.log(res.user)
                localStorage.setItem("token","Bearer "+res.token);
                localStorage.setItem("username",res.user.fullName);
                localStorage.setItem("user_id",res.user.id);
                window.location.href="admin.html"
                // localStorage.removeItem("token");
            }
            else{
                let alertBox = document.getElementById("alert-box");
                console.log("Inside else");
                let res = await response.json();
                let key = Object.keys(res);
                let errMsg="";
                key.forEach((i)=>{
                    if(res[i]!==false){
                        errMsg+=`${res[i]}\n`
                    }
                })
                alertBox.innerText = errMsg;
                alertBox.classList.remove("d-none");
                setTimeout(()=>{
                    alertBox.classList.add("d-none");
                },3000);
                console.log(errMsg);
            }
            console.log("leaving page")
        }
        
    }
}