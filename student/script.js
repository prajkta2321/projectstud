// script.js

// Load students from localStorage or return empty array
function getStudents() {
  return JSON.parse(localStorage.getItem('students')) || [];
}

// Save students array to localStorage
function saveStudents(students) {
  localStorage.setItem('students', JSON.stringify(students));
}

// Add student from registration form
function registerStudent(event) {
  event.preventDefault();

  const student = {
    id: document.getElementById('studentId').value,
    name: document.getElementById('fullName').value,
    email: document.getElementById('email').value,
    dob: document.getElementById('dob').value,
    course: document.getElementById('course').value,
    year: document.getElementById('year').value,
    address: document.getElementById('address').value,
    phone: document.getElementById('phone').value,
  };

  const students = getStudents();
  students.push(student);
  saveStudents(students);
  alert("Student registered successfully!");
  event.target.reset();
}

// Show student list in index.html
function showStudentList() {
  const students = getStudents();
  const tbody = document.querySelector("#studentTableBody");

  if (!tbody) return;

  tbody.innerHTML = '';

  students.forEach((student, index) => {
    const row = `
      <tr>
        <td>${student.name}</td>
        <td>${student.email}</td>
        <td>${student.course}</td>
        <td>${student.year}</td>
        <td class="action-btns">
          <a href="viewstud.html?id=${student.id}" class="btn">View</a>
          <a href="deletestudent.html?id=${student.id}" class="btn danger">Delete</a>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Populate dropdown in deletestudent.html
function populateDeleteDropdown() {
  const students = getStudents();
  const select = document.getElementById('student');

  if (!select) return;

  students.forEach(student => {
    const option = document.createElement('option');
    option.value = student.id;
    option.textContent = `${student.name} - ${student.course}`;
    select.appendChild(option);
  });
}

// Delete selected student
function deleteStudent(event) {
  event.preventDefault();
  const id = document.getElementById('student').value;
  let students = getStudents();
  students = students.filter(s => s.id !== id);
  saveStudents(students);
  alert("Student deleted successfully.");
  location.reload();
}

// Display one student in viewstud.html
function viewStudentDetails() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const students = getStudents();
  const student = students.find(s => s.id === id);

  if (!student) return;

  document.getElementById('studentId').value = student.id;
  document.getElementById('fullName').value = student.name;
  document.getElementById('email').value = student.email;
  document.getElementById('dob').value = student.dob;
  document.getElementById('course').value = student.course;
  document.getElementById('year').value = student.year;
  document.getElementById('address').value = student.address;
  document.getElementById('phone').value = student.phone;
}
