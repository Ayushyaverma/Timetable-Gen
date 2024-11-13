document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('timetableData'));
    displaySchedule(data.schedule);
    displayMetrics(data.metrics);
});

function displaySchedule(schedule) {
    const tbody = document.getElementById('timetable').querySelector('tbody');
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    daysOrder.forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day;
        row.appendChild(dayCell);

        if (schedule[day]) {
            schedule[day].forEach(slot => {
                const cell = document.createElement('td');
                if (slot === "Holiday" || slot === "Break") {
                    cell.textContent = slot;
                    cell.classList.add('special');
                } else {
                    cell.innerHTML = `
                        <strong>${slot.subject}</strong><br>
                        ${slot.faculty}<br>
                        ${slot.classroom}
                    `;
                }
                row.appendChild(cell);
            });
        }
        tbody.appendChild(row);
    });
}

function displayMetrics(metrics) {
    document.getElementById('metrics').innerHTML = `
        <p>Time taken: ${metrics.time} seconds</p>
        <p>Generations: ${metrics.generations || 'N/A'}</p>
        <p>Constraint Satisfaction: ${metrics.constraint_satisfaction || 'N/A'}</p>
    `;
}
