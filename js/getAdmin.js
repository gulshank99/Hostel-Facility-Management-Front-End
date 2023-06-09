let token = localStorage.getItem('token');
if (token == null) {
    window.location.href = "admin.html";
}


//Base url
let BASE_URL = 'http://localhost:8080/hms/';

//setting user name
document.getElementById("userSpan").innerText = localStorage.getItem("username");

// student doesnot exist check................................
const nameList = document.getElementById('myTable');
const nameSearch = document.getElementById('searchBox');
const search = document.getElementById('search');


nameSearch.addEventListener('keyup', (e) => {
    e.preventDefault();
    const query = nameSearch.value.toLowerCase();
    const names = nameList.getElementsByTagName('tr');
    let flag = false;
  
    for (let i = 0; i < names.length; i++) {
      const name = names[i].textContent.toLowerCase();
      if (name.includes(query)) {
        console.log("inside if")
        names[0].style.display = '';
        names[i].style.display = '';
        res.classList.add("d-none");
        // res.innerText="";
        flag = true;
      } else {
        console.log("inside else")
  
        names[i].style.display = 'none';
      }
    }
    if (!flag) {
      res.classList.remove("d-none")
      res.innerText = "Student Doesn't Exists";
      res.classList.add("p-3");
    }
  });

search.addEventListener('click', (e) => {
    e.preventDefault();
    const query = nameSearch.value.toLowerCase();
    const names = nameList.getElementsByTagName('tr');
    let flag = false;

    for (let i = 0; i < names.length; i++) {
        const name = names[i].textContent.toLowerCase();
        if (name.includes(query)) {
            console.log("inside if")
            names[0].style.display = '';
            names[i].style.display = '';
            res.classList.add("d-none");
            flag = true;
        } else {
            console.log("inside else")
            names[i].style.display = 'none';
        }
    }
    if (!flag) {
        res.classList.remove("d-none")
        res.innerText = "Student Doesn't Exists";
        res.classList.add("p-3");
    }
});
//.............................................................


function loadData() {

    //getting data from local Storage
    let adminList = localStorage.getItem("adminData");
    let obj = JSON.parse(adminList);
    let r = obj.length;

    //creating dynamic table body
    let tblBody = document.getElementById("tableBody");

    for (let i = 0; i < r; i++) {
        let tr = document.createElement("tr");
        let cols = "";
        cols += `<td>${obj[i].id}</td>`;
        cols += `<td>${obj[i].fullName}</td>`;
        cols += `<td>${obj[i].email}</td>`;
        cols += `<td><a id="button" type="button" class="fs-4" onclick="update(this)" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate"><i class="bi bi-pencil-square"></i></a></td>`;
        cols += `<td><a id="delete" type="button" class="text-danger fs-4" onclick="deleteStudent(this)" data-bs-toggle="modal" data-bs-target="#exampleModalDelete"><i class="bi bi-trash"></i></a></td>`;
        tr.innerHTML = cols;
        tblBody.appendChild(tr);
    }
}

//loading the table
loadData();


//update student........................................................
let id;
function update(obj) {
    console.log(obj.parentElement.parentElement);
    let table = obj.parentElement.parentElement;
    id = table.cells[0].innerText;
    document.getElementById("name").value = table.cells[1].innerText;
    document.getElementById("email").value = table.cells[2].innerText;
}

//reflecting changes in db and client
let edit = document.getElementById("edit");
edit.onclick = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let alertBox = document.getElementById("alert");
    if(email=="" || name == ""){
        alertBox.innerText = "Email and Name must not be empty";
        alertBox.classList.remove("d-none");
        setTimeout(()=>{
            alertBox.classList.add("d-none");
        },3000);
    } else {

        user = {
            fullName: name,
            email: email
        };
        user1 = {
            id: id,
            fullName: name,
            email: email
        };
    
        //finding the id to be updated in local Storage
        let localStorageArray = JSON.parse(localStorage.getItem("adminData"));
        for (let i = 0; i < localStorageArray.length; i++) {
            if (localStorageArray[i].id == id) {
                localStorageArray[i] = user1;
                break;
            }
        }
    
        //replacing the old object with new object in local Storage
        localStorage.setItem("adminData", JSON.stringify(localStorageArray));
    
        //remove child(tr from table body)
        let tblBody = document.getElementById("tableBody");
        while (tblBody.firstChild) {
            tblBody.removeChild(tblBody.firstChild);
        }
    
        //loading the new data after update
        loadData();
    
        let data = JSON.stringify(user);
        let options = {
            method: 'PUT',
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json',
            },
            body: data
        }
    
        let response = await fetch(`${BASE_URL}admin/update/${id}`, options);
    
        if (response.status == 200) {
            let res = await response.json();
            console.log(res);
    
            // window.location.href="admin.html"
        } else {
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
}
// update ends here.............................................

//delete admin..................................................
let deleteId;
async function deleteStudent(admin) {
    let tableRow = admin.parentElement.parentElement;
    deleteId = tableRow.cells[0].innerText;
}

let deleteYes = document.getElementById("deleteYes");
deleteYes.onclick = async (e) => {
    e.preventDefault();

    let options = {
        method: 'DELETE',
        headers: {
            'Authorization': token
        },
    }

    let response = await fetch(`${BASE_URL}admin/delete/${deleteId}`, options);
    if (response.status == 200) {
        let res = await response.json();
        console.log(res);
        Swal.fire({
            title: `${res.message}`,
            confirmButtonText: 'OK',
          }).then(() => {
            
          })
    } else {
        let res = await response.json();
        console.log(res);
        Swal.fire({
            title: `${res.message}`,
            confirmButtonText: 'OK',
          }).then(() => {
            
          })
    }
    let id=localStorage.getItem("user_id");
    //finding the id to be deleted in local Storage
    let localStorageArray = JSON.parse(localStorage.getItem("adminData"));
    for (let i = 0; i < localStorageArray.length; i++) {
        if (localStorageArray[i].id == deleteId && deleteId!=id) {
            localStorageArray.splice(i, 1);
            break;
        }
    }

    //replacing the old object with new object in local Storage
    localStorage.setItem("adminData", JSON.stringify(localStorageArray));

    //remove child(tr from table body)
    let tblBody = document.getElementById("tableBody");
    while (tblBody.firstChild) {
        tblBody.removeChild(tblBody.firstChild);
    }

    //loading the new data after update
    loadData();

}
//delete ends here....................................................................


//logout
let logout = document.getElementById("logout")
logout.onclick = async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("data");
    localStorage.removeItem("adminData");
    window.location.href = "login.html"
}

//back button
let backBtn = document.getElementById("back");
backBtn.onclick = () =>{
  localStorage.removeItem("adminData");
  window.location.href="admin.html";
}



