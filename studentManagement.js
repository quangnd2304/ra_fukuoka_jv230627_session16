// Khai báo mảng dữ liệu gồm nhiều đối tượng sinh viên
let arrStudents = [
    { "studentId": "SV001", "fullName": "Nguyễn Văn A", "email": "quangnd@rikkeisoft.com", "phone": "0355914029", "address": "Hà Nội", "sex": true },
    { "studentId": "SV002", "fullName": "Nguyễn Văn B", "email": "quangnd@rikkeisoft.com", "phone": "0355914029", "address": "Hà Nội", "sex": false },
    { "studentId": "SV003", "fullName": "Nguyễn Văn C", "email": "quangnd@rikkeisoft.com", "phone": "0355914029", "address": "Hà Nội", "sex": true }
];
//Biến toàn cục để biết lúc nào thêm mới học viên, cập nhật học viên
let action = "Create";
function readData() {
    //1. Truy cập vào tbody có id là listStudents
    let listStudents = document.getElementById("listStudents");
    //2. render dữ liệu từ arrStudents lên tbody có id là listStudents
    listStudents.innerHTML = "";
    for (let index = 0; index < arrStudents.length; index++) {
        listStudents.innerHTML += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${arrStudents[index].studentId}</td>
                    <td>${arrStudents[index].fullName}</td>
                    <td>${arrStudents[index].email}m</td>
                    <th>${arrStudents[index].phone}</th>
                    <th>${arrStudents[index].address}</th>
                    <th>${arrStudents[index].sex ? "Nam" : "Nữ"}</th>
                    <th>
                        <a href="javascript:initUpdate('${arrStudents[index].studentId}')">Cập nhật</a>
                        <a href="javascript:deleteStudent('${arrStudents[index].studentId}')">Xóa</a>
                    </th>
                </tr>
        `
    }
}
function createNewStudent() {
    //1. Lấy dữ liệu form -> newStudent Object
    let studentId = document.getElementById("studentId").value;
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = (document.querySelector("input[type='radio']:checked").value == "true") ? true : false;
    let newStudent = { studentId, fullName, email, phone, address, sex };
    //newStudent = {"studentID":studentId,"fullName":fullname...}
    //2. Thêm newStudent vào arrStudents
    arrStudents.push(newStudent);
    //3. render lại dữ liệu lên table
    readData();
    //4. reset dữ liệu trên form
    document.getElementById("studentId").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("male").checked = true;
}
let submit = document.getElementById("submit");
submit.addEventListener("click", function () {
    if (action == "Create") {
        createNewStudent();
    } else {
        //Cập nhật sinh viên
        updateStudent();
    }
})
//target: lấy được thông tin sinh viên cần cập nhật và hiển thị trên form
function initUpdate(studentId) {
    // 1. Lấy thông sinh viên theo mã sinh viên (chỉ số sinh viên trong mảng arrStudents)
    let indexUpdate = getIndexStudentById(studentId);//Chỉ số phần tử sinh viên cần cập nhật
    // 2. Hiển thị thông tin lên form để người dùng chỉnh sửa
    if (indexUpdate >= 0) {
        document.getElementById("studentId").value = arrStudents[indexUpdate].studentId;
        document.getElementById("fullName").value = arrStudents[indexUpdate].fullName;
        document.getElementById("email").value = arrStudents[indexUpdate].email;
        document.getElementById("phone").value = arrStudents[indexUpdate].phone;
        document.getElementById("address").value = arrStudents[indexUpdate].address;
        if (arrStudents[indexUpdate].sex) {
            document.getElementById("male").checked = true;
        } else {
            document.getElementById("female").checked = true;
        }
    }
    //3. Không cho phép sửa mã sinh viên trên form khi cập nhật - readonly
    document.getElementById("studentId").readOnly = true;
    //4. Chuyển action thành update
    action = "Update";
}
//target: cập nhật thông tin sinh viên và hiển thị lại trên table
function updateStudent() {
    // 1. Lấy thông tin sinh viên trên form
    let studentId = document.getElementById("studentId").value;
    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let sex = (document.querySelector("input[type='radio']:checked").value == "true") ? true : false;
    let studentUpdate = { studentId, fullName, email, phone, address, sex };
    // 2. Cập nhật thông tin sinh viên vào arrStudents
    let indexUpdate = getIndexStudentById(studentId);
    arrStudents[indexUpdate] = studentUpdate;
    // 3. render dữ liệu lại trên form
    readData();
    // 4. Xóa dữ liệu trên form
    document.getElementById("studentId").value = "";
    document.getElementById("fullName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("male").checked = true;
    // 5. Bật lại studentID với readonly = false;
    document.getElementById("studentId").readonly = false;
    // 6. Đặt lại action = Create
    action = "Create";
}

//Xóa sinh viên
function deleteStudent(studentId) {
    // 1. Xóa sinh viên trong arrStudent
    let indexDelete = getIndexStudentById(studentId);
    arrStudents.splice(indexDelete, 1);
    // 2. render lại dữ liệu trên table
    readData();
}

function getIndexStudentById(studentId) {
    //Duyệt các phần tử trong mảng arrStudents theo chỉ số index
    for (let index = 0; index < arrStudents.length; index++) {
        if (arrStudents[index].studentId == studentId) {
            //Trả về chỉ số phần tử sinh viên trong mảng
            return index;
        }
    }
    return -1;
}

//Khi trình duyệt load xong giao diện, lấy dữ liệu từ mảng arrStudents hiển thị trên table
window.onload = readData();