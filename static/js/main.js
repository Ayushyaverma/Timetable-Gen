// Functions to dynamically add faculty, subjects, and classrooms
function addFaculty() {
    const container = document.getElementById('faculty-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'faculty-entry';
    newEntry.innerHTML = '<input type="text" name="faculty_name" placeholder="Faculty Name" required>';
    container.appendChild(newEntry);
}

function addSubject() {
    const container = document.getElementById('subjects-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'subject-entry';
    newEntry.innerHTML = `
        <input type="text" name="subject_name" placeholder="Subject Name" required>
        <select name="faculty_for_subject">
            <option value="">Select Faculty</option>
        </select>
    `;
    container.appendChild(newEntry);
    populateFacultyOptions(); // Update faculty dropdown
}

function addClassroom() {
    const container = document.getElementById('classrooms-container');
    const newEntry = document.createElement('div');
    newEntry.className = 'classroom-entry';
    newEntry.innerHTML = '<input type="text" name="classroom_name" placeholder="Classroom Name" required>';
    container.appendChild(newEntry);
}

// Populate faculty options in the subject dropdowns
function populateFacultyOptions() {
    const facultyOptions = Array.from(document.querySelectorAll('#faculty-container input[name="faculty_name"]'))
        .map(input => input.value)
        .filter(name => name); // Filter out empty names

    document.querySelectorAll('select[name="faculty_for_subject"]').forEach(select => {
        select.innerHTML = '<option value="">Select Faculty</option>'; // Reset options
        facultyOptions.forEach(faculty => {
            const option = document.createElement('option');
            option.value = faculty;
            option.textContent = faculty;
            select.appendChild(option);
        });
    });
}

// Toggle visibility of Genetic Algorithm parameters based on selection
document.getElementById('algorithm').addEventListener('change', function() {
    const geneticParams = document.getElementById('genetic-params');
    if (this.value === 'genetic') {
        geneticParams.style.display = 'block';
    } else {
        geneticParams.style.display = 'none';
    }
});

// Collect form data and structure it as JSON
function getFormData() {
    const subjects = Array.from(document.querySelectorAll('.subject-entry')).map(entry => ({
        subject_name: entry.querySelector('input[name="subject_name"]').value,
        faculty_name: entry.querySelector('select[name="faculty_for_subject"]').value
    }));

    const faculty = Array.from(document.querySelectorAll('#faculty-container input[name="faculty_name"]'))
        .map(input => ({ faculty_name: input.value }))
        .filter(entry => entry.faculty_name);

    const classrooms = Array.from(document.querySelectorAll('#classrooms-container input[name="classroom_name"]'))
        .map(input => ({ classroom_name: input.value }))
        .filter(entry => entry.classroom_name);

    return { subjects, faculty, classrooms };
}

// Event listener for Generate Timetable button
document.getElementById('generate-btn').addEventListener('click', function() {
    const algorithm = document.getElementById('algorithm').value;
    const params = algorithm === 'genetic' ? {
        population_size: parseInt(document.getElementById('population_size').value) || 10,
        mutation_rate: parseFloat(document.getElementById('mutation_rate').value) || 0.01,
        generations: parseInt(document.getElementById('generations').value) || 100
    } : {};

    const formData = getFormData();
    formData.algorithm = algorithm;
    formData.params = params;

    // Send data to the backend
    fetch('/generate_timetable', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        // Store generated timetable in localStorage
        localStorage.setItem('timetableData', JSON.stringify(data));
        // Redirect to the output page
        window.location.href = "/output";
    })
    .catch(error => console.error('Error:', error));
});

// Update faculty dropdown options whenever a faculty is added
document.getElementById('faculty-container').addEventListener('input', populateFacultyOptions);
