let token = localStorage.getItem('token');
if (token == null) {
    window.location.href = "admin.html";
}
else {
    let BASE_URL = 'http://localhost:8080/hms/';

    //setting user name at navbar
    document.getElementById("userSpan").innerText = localStorage.getItem("username");

    let submit = document.getElementById("submit");
    submit.onclick = async (e) => {
        e.preventDefault();
        let roll = document.getElementById("roll").value;
        let firstName = document.getElementById("firstName").value;
        let middleName = document.getElementById("middleName").value;
        let lastName = document.getElementById("lastName").value;
        let contact = document.getElementById("contact").value;
        let aadhaarno = document.getElementById("aadhaarno").value;
        let gender = document.getElementById("gender").value;
        let course = document.getElementById("course").value;
        let email = document.getElementById("email").value;
        let street = document.getElementById("street").value;
        let city = document.getElementById("city").value;
        let state = document.getElementById("state").value;
        let department = document.getElementById("department").value;
        let year = document.getElementById("year").value;

        user = {
            firstName: firstName,
            middleName: middleName,
            roll: roll,
            lastName: lastName,
            mobile: contact,
            aadhaar: aadhaarno,
            gender: gender,
            course: course,
            email: email,
            street: street,
            city: city,
            state: state,
            department: department,
            year:year 
        };

        let data = JSON.stringify(user);
        let options = {
            method: 'POST',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: data
        }
        let response = await fetch(`${BASE_URL}student/register`, options);
        if (response.status == 201) {
            let res = await response.json();
            console.log(res);
            Swal.fire({
                title: `Details of roll : ${res.roll}`,
                text: `Your room no. is ${res.roomNo}`,
                confirmButtonText: 'OK',
              }).then(() => {
                window.location.href = "admin.html"
              })
        }
        else{
            let res = await response.json();
            // let errorRes = JSON.stringify(res);
            let errorKeys = Object.keys(res);
            let errorMsg = "";
            for (let i=0;i<errorKeys.length;i++) {
                errorMsg+="<h5>"+errorKeys[i].toUpperCase() + " : "+ res[errorKeys[i]]+"\n"+"</h5>";
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
}


//logout
let logout = document.getElementById("logout")
logout.onclick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("adminData");
    localStorage.removeItem("data");
    window.location.href = "login.html"
}

let backBtn = document.getElementById("back");
backBtn.onclick = () =>{
    window.location.href="admin.html";
}