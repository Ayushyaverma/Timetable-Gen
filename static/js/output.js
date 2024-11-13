document.addEventListener('DOMContentLoaded', () => {
    const data = JSON.parse(localStorage.getItem('timetableData'));
    if (data) {
        displaySchedule(data.schedule);  // Ensure data.schedule is passed here
        displayMetrics(data.metrics);    // Optional: Only if you have metrics to display
    } else {
        console.error("No timetable data found in localStorage.");
    }
});

function displaySchedule(schedule) {
    const tbody = document.getElementById('timetable').querySelector('tbody');
    const daysOrder = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    daysOrder.forEach(day => {
        const row = document.createElement('tr');
        const dayCell = document.createElement('td');
        dayCell.textContent = day;
        row.appendChild(dayCell);

        if (day === "Saturday" || day === "Sunday") {
            const holidayCell = document.createElement('td');
            holidayCell.textContent = "Holiday";
            holidayCell.colSpan = 9;  // Span across all time slots
            holidayCell.classList.add('holiday');
            row.appendChild(holidayCell);
        } else {
            schedule[day].forEach(slot => {
                const cell = document.createElement('td');
                if (slot === "Break") {
                    cell.textContent = "Break";
                    cell.classList.add('special');
                } else if (slot === "Free Period") {
                    cell.textContent = "Free Period";
                } else {
                    cell.innerHTML = `
                        <strong>${slot.subject}</strong><br>
                        Faculty: ${slot.faculty}<br>
                        Classroom: ${slot.classroom}
                    `;
                }
                row.appendChild(cell);
            });
        }
        tbody.appendChild(row);
    });
}
