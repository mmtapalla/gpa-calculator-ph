document.addEventListener("DOMContentLoaded", () => {
    addInitialRows(5);
});

function addInitialRows(numberOfRows) {
    const tableBody = document.getElementById("gpaTableBody");
    for (let i = 0; i < numberOfRows; i++) {
        addRow(tableBody);
    }
}

function addRow(tableBody) {
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
        <td><input type="text" name="course" placeholder="Input course" class="form-control" required></td>
        <td><input type="number" step="0.01" name="units" value="0" class="form-control" required></td>
        <td><input type="number" step="0.01" name="grade" value="0.00" class="form-control" required></td>
        <td class="us-grade text-center align-middle">---</td>
        <td class="grade-points text-center align-middle">---</td>
        <td><button type="button" onclick="deleteRow(this)" class="btn btn-light">✖</button></td>
    `;
    tableBody.appendChild(newRow);
}

function addRows() {
    const numberOfRows = parseInt(document.getElementById("rowsToAdd").value);
    if (isNaN(numberOfRows) || numberOfRows <= 0) return;

    const tableBody = document.getElementById("gpaTableBody");
    for (let i = 0; i < numberOfRows; i++) {
        addRow(tableBody);
    }
}

function deleteRow(button) {
    const tableBody = document.getElementById("gpaTableBody");
    if (tableBody.rows.length > 1) {
        button.closest("tr").remove();
    } else {
        alert("At least one row must remain.");
    }
}

function calculateGPA() {
    const tableBody = document.getElementById("gpaTableBody");
    let totalPoints = 0;
    let totalUnits = 0;

    for (let row of tableBody.rows) {
        const units = parseFloat(row.cells[1].firstElementChild.value);
        const grade = parseFloat(row.cells[2].firstElementChild.value);

        if (isNaN(units) || isNaN(grade) || units <= 0 || grade < 0) {
            alert("Please enter valid units and grades.");
            return;
        }

        const usGrade = convertToUSGrade(grade);
        const points = convertToPoints(usGrade);

        totalPoints += points * units;
        totalUnits += units;

        row.cells[3].innerText = usGrade;
        row.cells[4].innerText = points.toFixed(2);
    }

    const gpa = totalUnits > 0 ? (totalPoints / totalUnits).toFixed(2) : "0.00";
    const gpaResultDiv = document.getElementById("gpaResult");
    gpaResultDiv.innerHTML = `Cumulative GPA: <b>${gpa}</b>`;
    gpaResultDiv.classList.remove("d-none");
}

function convertToUSGrade(grade) {
    if (grade <= 1) return "A+";
    if (grade <= 1.25) return "A";
    if (grade <= 1.5) return "A-";
    if (grade <= 1.75) return "B+";
    if (grade <= 2) return "B";
    if (grade <= 2.25) return "B-";
    if (grade <= 2.5) return "C+";
    if (grade <= 2.75) return "C";
    if (grade <= 3) return "C-";
    if (grade <= 4) return "D";
    if (grade <= 5) return "F";
    return "F";
}

function convertToPoints(usGrade) {
    const gradePointsMap = {
        "A+": 4.0,
        A: 4.0,
        "A-": 3.7,
        "B+": 3.3,
        B: 3.0,
        "B-": 2.7,
        "C+": 2.3,
        C: 2.0,
        "C-": 1.7,
        D: 1.0,
        F: 0.0,
    };
    return gradePointsMap[usGrade] || 0.0;
}

function confirmClearAll() {
    if (confirm("Are you sure you want to clear all?")) {
        clearAll();
    }
}

function clearAll() {
    document.getElementById("gpaForm").reset();
    const tableBody = document.getElementById("gpaTableBody");
    tableBody.innerHTML = "";
    addInitialRows(5);
    document.getElementById("gpaResult").innerText = "";
    document.getElementById("gpaResult").classList.add("d-none");
}
