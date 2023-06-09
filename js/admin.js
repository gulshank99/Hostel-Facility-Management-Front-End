let token = localStorage.getItem("token");
console.log(token)

if(token==null){
    window.location.href = "login.html";
}

let BASE_URL = 'http://localhost:8080/hms/';

//setting user name at navbar
document.getElementById("userSpan").innerText = localStorage.getItem("username")

//fetch student fom db and set it in local Storage
let btn = document.getElementById("getStudent")
let res;
btn.onclick = async () => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    }
    let response = await fetch(`${BASE_URL}student/`, options);
    if (response.status == 200) {
        res = await response.json();
        console.log(res);
    } else {
        res = await response.json();
        console.log(res.message)
    }
    console.log(res)
    // localStorage.setItem("data",JSON.stringify(res));
    localStorage.setItem("data", JSON.stringify(res));
    window.location.href = "getStudent.html";
}



//fetch admin fom db and set it in local Storage
let getAdmin = document.getElementById("getAdmin")
getAdmin.onclick = async () => {
    let options = {
        method: 'GET',
        headers: {
            'Authorization': token,
        }
    }
    let response = await fetch(`${BASE_URL}admin/`, options);
    let res;
    if (response.status == 200) {
        res = await response.json();
        console.log(res);
    } else {
        res = await response.json();
        console.log(res.message)
    }
    console.log(res);
    localStorage.setItem("adminData", JSON.stringify(res));
    window.location.href = "getAdmin.html";
}



console.log("outside")
let logout = document.getElementById("logout")
logout.onclick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("data");
    localStorage.removeItem("adminData");
    window.location.href = "login.html"
}

