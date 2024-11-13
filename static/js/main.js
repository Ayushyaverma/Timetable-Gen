document.addEventListener('DOMContentLoaded', () => {
    populateFacultyOptions();  // Populate faculty options immediately on page load
});

function addFaculty() {
    const facultyContainer = document.getElementById('faculty-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'faculty-entry';

    newEntry.innerHTML = `
        <input type="text" name="faculty_name" placeholder="Faculty Name" required>
        <input type="number" name="max_lectures" placeholder="Max Lectures" min="1" required>
    `;
    facultyContainer.insertBefore(newEntry, facultyContainer.querySelector('button'));
}

function addSubject() {
    const subjectContainer = document.getElementById('subjects-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'subject-entry';

    newEntry.innerHTML = `
        <input type="text" name="subject_name" placeholder="Subject Name" required>
        <select name="faculty_for_subject">
            <option value="">Select Faculty</option>
        </select>
    `;

    subjectContainer.insertBefore(newEntry, subjectContainer.querySelector('button'));
    populateFacultyOptions(); // Repopulate faculty options when adding a new subject
}

function addClassroom() {
    const classroomContainer = document.getElementById('classrooms-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'classroom-entry';

    newEntry.innerHTML = `<input type="text" name="classroom_name" placeholder="Classroom Name" required>`;
    classroomContainer.insertBefore(newEntry, classroomContainer.querySelector('button'));
}

function populateFacultyOptions() {
    const facultyOptions = Array.from(document.querySelectorAll('#faculty-container input[name="faculty_name"]'))
        .map(input => input.value)
        .filter(name => name);

    document.querySelectorAll('select[name="faculty_for_subject"]').forEach(select => {
        select.innerHTML = '<option value="">Select Faculty</option>';
        facultyOptions.forEach(faculty => {
            const option = document.createElement('option');
            option.value = faculty;
            option.textContent = faculty;
            select.appendChild(option);
        });
    });
}

document.getElementById('generate-btn').addEventListener('click', function() {
    const formData = getFormData();
    fetch('/generate_timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        localStorage.setItem('timetableData', JSON.stringify(data));
        window.location.href = "/output";  // Redirect to output page
    })
    .catch(error => console.error('Error:', error));
});

function getFormData() {
    const subjects = Array.from(document.querySelectorAll('.subject-entry')).map(entry => ({
        subject_name: entry.querySelector('input[name="subject_name"]').value,
        faculty_name: entry.querySelector('select[name="faculty_for_subject"]').value
    }));

    const faculty = Array.from(document.querySelectorAll('#faculty-container .faculty-entry')).map(entry => ({
        faculty_name: entry.querySelector('input[name="faculty_name"]').value,
        max_lectures: parseInt(entry.querySelector('input[name="max_lectures"]').value)
    }));

    const classrooms = Array.from(document.querySelectorAll('#classrooms-container .classroom-entry')).map(entry => ({
        classroom_name: entry.querySelector('input[name="classroom_name"]').value
    }));

    return { subjects, faculty, classrooms };
}
