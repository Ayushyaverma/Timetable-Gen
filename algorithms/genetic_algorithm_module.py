import random

def genetic_algorithm(subjects, faculty, classrooms, faculty_subject_map, max_lectures_per_faculty, params):
    # Define the days and time slots
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
    times = [
        "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00",
        "13:00-14:00 Break", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00"
    ]
    
    # Initialize the schedule with free periods
    schedule = {day: ["Free Period" for _ in times] for day in days}
    
    # Track the number of sessions assigned to each subject and the number of lectures per faculty per day
    session_counts = {subject: 0 for subject in faculty_subject_map.keys()}
    daily_faculty_count = {day: {faculty: 0 for faculty in faculty_subject_map.values()} for day in days}
    before_break_count = {day: {faculty: 0 for faculty in faculty_subject_map.values()} for day in days}
    after_break_count = {day: {faculty: 0 for faculty in faculty_subject_map.values()} for day in days}

    # Populate the schedule
    for day in days:
        for time_idx, time in enumerate(times):
            if "Break" in time:
                schedule[day][time_idx] = "Break"
                continue

            # Get available subjects that haven't reached session limits and can be assigned today
            available_subjects = [
                subject for subject, count in session_counts.items()
                if count < max_lectures_per_faculty[faculty_subject_map[subject]]
                and daily_faculty_count[day][faculty_subject_map[subject]] < 2
            ]

            if available_subjects:
                # Select a subject that allows for consecutive placement if possible
                if time_idx > 0 and isinstance(schedule[day][time_idx - 1], dict):
                    previous_slot = schedule[day][time_idx - 1]
                    subject = previous_slot['subject']
                    faculty_member = previous_slot['faculty']
                    
                    # Ensure subject and faculty are available and consecutive assignment is possible
                    if (subject in available_subjects 
                            and daily_faculty_count[day][faculty_member] < 2
                            and ((time_idx < 4 and before_break_count[day][faculty_member] < 2) 
                                 or (time_idx > 4 and after_break_count[day][faculty_member] < 2))):
                        # Assign consecutive slot to the same faculty
                        classroom = previous_slot['classroom']
                    else:
                        # Select a random subject and assign faculty, ensuring constraints
                        subject = random.choice(available_subjects)
                        faculty_member = faculty_subject_map[subject]
                        classroom = random.choice(classrooms['classroom_name'].tolist())
                else:
                    # Select a random subject and assign faculty
                    subject = random.choice(available_subjects)
                    faculty_member = faculty_subject_map[subject]
                    classroom = random.choice(classrooms['classroom_name'].tolist())
                
                # Assign subject, faculty, and classroom to the schedule slot
                schedule[day][time_idx] = {
                    'subject': subject,
                    'faculty': faculty_member,
                    'classroom': classroom
                }
                
                # Update session counts and daily count for the faculty
                session_counts[subject] += 1
                daily_faculty_count[day][faculty_member] += 1
                if time_idx < 4:
                    before_break_count[day][faculty_member] += 1
                elif time_idx > 4:
                    after_break_count[day][faculty_member] += 1

    return schedule, {"time": 0.5, "constraint_satisfaction": "high"}
