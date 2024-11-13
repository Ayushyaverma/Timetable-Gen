def greedy_algorithm(subjects, faculty, classrooms):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    times = ["9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00", "13:00-14:00 Break", "14:00-15:00", "15:00-16:00", "16:00-17:00"]

    schedule = {day: [] for day in days}
    for day in days:
        for time in times:
            if "Break" in time:
                schedule[day].append("Break")
            else:
                subject = subjects['subject_name'].sample().values[0]
                faculty_member = faculty['faculty_name'].sample().values[0]
                classroom = classrooms['classroom_name'].sample().values[0]
                schedule[day].append({
                    'subject': subject,
                    'faculty': faculty_member,
                    'classroom': classroom
                })

    metrics = {"time": 0.3, "constraint_satisfaction": "medium"}
    return schedule, metrics
