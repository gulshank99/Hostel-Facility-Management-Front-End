let token = localStorage.getItem('token');
if (token == null) {
    window.location.href = "admin.html";
}

//setting user name at navbar
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
//.............................................................


let BASE_URL = 'http://localhost:8080/hms/';

function loadData(status) {

  //getting data from local Storage
  let student = localStorage.getItem("data");
  // localStorage.removeItem("data");
  let obj = JSON.parse(student);
  let r = obj.length;
  console.log(r)


  //creating dynamic table body
  let tblBody = document.getElementById("tableBody");

  for (let i = 0; i < r; i++) {
    if(obj[i].isActive == status){
      let tr = document.createElement("tr");
      let cols = "";
      cols += `<td>${obj[i].id}</td>`;
      cols += `<td>${obj[i].roll}</td>`;
      cols += `<td>${obj[i].roomNo}</td>`;
      cols += `<td>${obj[i].isActive=='1'?"Active":"Inactive"}</td> `;
      cols += `<td>${obj[i].firstName}</td>`;
      cols += `<td>${obj[i].middleName}</td>`;
      cols += `<td>${obj[i].lastName}</td>`;
      cols += `<td>${obj[i].aadhaar}</td>`;
      cols += `<td>${obj[i].mobile}</td>`;
      cols += `<td>${obj[i].email}</td>`;
      cols += `<td>${obj[i].course}</td>`;
      cols += `<td>${obj[i].gender}</td>`;
      cols += `<td>${obj[i].street}</td>`;
      cols += `<td>${obj[i].city}</td>`;
      cols += `<td>${obj[i].state}</td>`;
      cols += `<td>${obj[i].department}</td>`;
      cols += `<td>${obj[i].year}</td>`;
      
      if(obj[i].isActive != 0){
        cols += `<td><a id="button" type="button" class="fs-4" onclick="update(this)" data-bs-toggle="modal" data-bs-target="#exampleModalUpdate"><i class="bi bi-pencil-square"></i></a></td>`;
        cols += `<td><a id="delete" type="button" class="text-danger fs-4" onclick="deleteStudent(this)" data-bs-toggle="modal" data-bs-target="#exampleModalDelete"><i class="bi bi-trash"></i></a></td>`; 
      }else{
        cols += `<td> - - </td>`;
        cols += `<td> - - </td>`;
      }
      tr.innerHTML = cols;
      tblBody.appendChild(tr);
    }
  }
}

//loading the table
loadData(1);
let toggle = document.getElementById("switch");
toggle.onclick = () =>{
  if(toggle.innerText == "Click for inactive"){
    toggle.innerText = "Click for active";
    let tblBody = document.getElementById("tableBody");
    while (tblBody.firstChild) {
      tblBody.removeChild(tblBody.firstChild);
    }
    loadData(0);
    
  }else{
    toggle.innerText = "Click for inactive";
    let tblBody = document.getElementById("tableBody");
    while (tblBody.firstChild) {
      tblBody.removeChild(tblBody.firstChild);
    }
    loadData(1);
  }
}


//delete student.....................................................................
let deleteId;
async function deleteStudent(student) {
  let tableRow = student.parentElement.parentElement;
  deleteId = tableRow.cells[0].innerText;
}

let deleteYes = document.getElementById("deleteYes");
deleteYes.onclick = async(e)=>{
  e.preventDefault();
  let options = {
    method: 'DELETE',
    headers: {
      'Authorization': token
    },
  }

  let response = await fetch(`${BASE_URL}student/${deleteId}`, options);
  let res = await response.json();
  console.log(res);

  //finding the id to be deleted in local Storage
  let localStorageArray = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i].id == deleteId) {
      // localStorageArray.splice(i, 1);
      localStorageArray[i].isActive = 0;
      break;
    }
  }

  //replacing the old object with new object in local Storage
  localStorage.setItem("data", JSON.stringify(localStorageArray));

  //remove child(tr from table body)
  let tblBody = document.getElementById("tableBody");
  while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
  }

  //loading the new data after update
  loadData(1);

}
//delete ends here....................................................................


//update student........................................................
let id;
let isActive;
let roomNo;

function update(obj) {
  console.log(obj.parentElement.parentElement);
  let table = obj.parentElement.parentElement;
  id = table.cells[0].innerText;

  document.getElementById("roll").value = table.cells[1].innerText;
  document.getElementById("firstName").value = table.cells[4].innerText;
  document.getElementById("middleName").value = table.cells[5].innerText;
  document.getElementById("lastName").value = table.cells[6].innerText;
  document.getElementById("contact").value = table.cells[8].innerText;
  document.getElementById("aadhaarno").value = table.cells[7].innerText;
  document.getElementById("email").value = table.cells[9].innerText;
  document.getElementById("course").value = table.cells[10].innerText;
  document.getElementById("gender").value = table.cells[11].innerText;
  document.getElementById("street").value = table.cells[12].innerText;
  document.getElementById("city").value = table.cells[13].innerText;
  document.getElementById("state").value = table.cells[14].innerText;
  document.getElementById("department").value = table.cells[15].innerText;
  document.getElementById("year").value = table.cells[16].innerText;
  isActive = table.cells[3].innerText=="Active"?1:0;
  roomNo = table.cells[2].innerText;

}

//reflecting changes in db and client
let edit = document.getElementById("edit");
edit.onclick = async (e) => {
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
    year: year

  };
  user1 = {
    id: id,
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
    year: year,
    isActive: isActive,
    roomNo : roomNo
  };

  //finding the id to be updated in local Storage
  let localStorageArray = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < localStorageArray.length; i++) {
    if (localStorageArray[i].id == id) {
      localStorageArray[i] = user1;
      break;
    }
  }

  //replacing the old object with new object in local Storage
  localStorage.setItem("data", JSON.stringify(localStorageArray));

  //remove child(tr from table body)
  let tblBody = document.getElementById("tableBody");
  while (tblBody.firstChild) {
    tblBody.removeChild(tblBody.firstChild);
  }

  //loading the new data after update
  loadData(1);

  let data = JSON.stringify(user);
  let options = {
    method: 'PUT',
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
    body: data
  }

  let response = await fetch(`${BASE_URL}student/update/${id}`, options);

  if (response.status == 200) {
    let res = await response.json();
    console.log(res);

    // window.location.href="admin.html"
  } else {
    let res = await response.json();
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
    console.log(res);
  }
}
// update ends here.............................................

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

//back button
let backBtn = document.getElementById("back");
backBtn.onclick = () =>{
  localStorage.removeItem("data");
  window.location.href="admin.html";
}

