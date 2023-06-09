let token = localStorage.getItem("token");
let user = document.getElementById("user");
let flag=false;
if(!token){
    user.innerText = "Login";
}else{
    user.innerText = localStorage.getItem("username");
    document.getElementById("logout").classList.remove("d-none");
    flag = true;
}
user.onclick = () =>{
    if(flag){
        window.location.href = "admin.html";
    }else{
        window.location.href = "login.html";
    }
}
let logout = document.getElementById("logout")
logout.onclick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("data");
    localStorage.removeItem("adminData");
    logout.classList.add("d-none");
    user.innerText="Login";
}