let token = localStorage.getItem('token');
if (token == null) {
    window.location.href = "admin.html";
}
let BASE_URL='http://localhost:8080/hms/';
let submit = document.getElementById("submit");


//setting user name at navbar
document.getElementById("userSpan").innerText = localStorage.getItem("username");



//back button
let backBtn = document.getElementById("back");
backBtn.onclick = () =>{
    window.location.href = "admin.html"
}


submit.onclick = async (e) =>{
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confirmPassword = document.getElementById("confirmPassword").value;

    if(name == "" || email=="" || password == "" || confirmPassword == "") {
        let header=document.getElementById("alert");
        header.classList.remove('d-none');
        header.innerHTML= `<h3 class="text-center text-danger">Feilds must not be empty</h3>`
        setTimeout(() => {
            header.classList.add("d-none");
          }, 3000)
        return;
    }    

    if(password !== confirmPassword) {
        let header=document.getElementById("alert");
        header.classList.remove('d-none');
        document.getElementById("password").value="";
        document.getElementById("confirmPassword").value="";
        header.innerHTML= `<h3 class="text-center text-danger">Password do not match</h3>`
        setTimeout(() => {
            header.classList.add("d-none");
          }, 3000)
        return;
    }

    user={
        fullName : name,
        email : email,
        password : password
    };

    let data = JSON.stringify(user);
    let options={
        method:'POST',
        headers:{
            'Authorization':token,
            'Content-Type': 'application/json',
          },
        body:data
    }

    let response = await fetch(`${BASE_URL}admin/add`,options);
    if(response.status==201){
        let res = await response.json();
        console.log(res);
        window.location.href="admin.html";
    }else{
        // window.location.href = "addAdmin.html";
        let res = await response.json();
            // let errorRes = JSON.stringify(res);
            let errorKeys = Object.keys(res);
            let errorMsg = "";
            for (let i=0;i<errorKeys.length;i++) {
                errorMsg+="<h6>"+errorKeys[i].toUpperCase() + " : "+ res[errorKeys[i]]+"\n"+"</h6>";
            }
            Swal.fire({
                title: `${errorMsg}`,
                // text: `Your room no. is ${res.roomNo}`,
                confirmButtonText: 'OK',
              }).then(() => {
                // window.location.href = "admin.html"
              })
    }
}

let logout = document.getElementById("logout")
logout.onclick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("data");
    localStorage.removeItem("adminData");
    window.location.href = "login.html"
}