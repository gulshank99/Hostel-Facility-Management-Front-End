let BASE_URL = 'http://localhost:8080/hms/';
let resetPassword=document.getElementById("resetPassword");
resetPassword.onclick = async (e) => {
    e.preventDefault();
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    let confirmPassword=document.getElementById("confirmPassword").value;

    if(email=="" || password == "" || confirmPassword == "") {
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
    let options = {
        method: 'PUT'
    }
    let encodedPassword = btoa(password);
    let encodedConfirmPassword = btoa(confirmPassword)
    console.log(encodedPassword +"  "+encodedConfirmPassword)
    let response = await fetch(`${BASE_URL}forgetPassword?email=${email}&password=${encodedPassword}&confirmPassword=${encodedConfirmPassword}`, options);
    let res = await response.json();
    if (response.status == 200) {
        console.log(res);
        window.location.href="login.html"
    } else {
        console.log(res.message)
        let header=document.getElementById("alert");
        header.classList.remove('d-none');
        document.getElementById("password").value="";
        confirmPassword=document.getElementById("confirmPassword").value="";
        header.innerHTML= `<h3 class="text-center text-danger">${res.message}</h3>`
        setTimeout(() => {
            header.classList.add("d-none");
          }, 3000)
    }
}