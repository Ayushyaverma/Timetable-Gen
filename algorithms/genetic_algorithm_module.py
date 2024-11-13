import random, time

def generate_initial_population(subjects, faculty, classrooms, population_size):
    days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
    times = [
        "9:00-10:00", "10:00-11:00", "11:00-12:00", "12:00-13:00",
        "13:00-14:00 Break", "14:00-15:00", "15:00-16:00", "16:00-17:00", "17:00-18:00"
    ]

    population = []
    for _ in range(population_size):
        weekly_schedule = {day: [] for day in days}
        for day in days:
            if day in ["Saturday", "Sunday"]:
                weekly_schedule[day] = ["Holiday" for _ in times]
            else:
                for time in times:
                    if "Break" in time:
                        weekly_schedule[day].append("Break")
                    else:
                        subject = random.choice(subjects['subject_name'].tolist())
                        faculty_member = random.choice(faculty['faculty_name'].tolist())
                        classroom = random.choice(classrooms['classroom_name'].tolist())
                        weekly_schedule[day].append({
                            'subject': subject,
                            'faculty': faculty_member,
                            'classroom': classroom
                        })
        population.append(weekly_schedule)
    return population

def calculate_fitness(schedule):
    fitness_score = 0
    for day, slots in schedule.items():
        for slot in slots:
            if isinstance(slot, dict):
                fitness_score += 1
    return fitness_score

def genetic_algorithm(subjects, faculty, classrooms, params):
    start_time = time.time()
    population_size = params.get('population_size', 10)
    mutation_rate = params.get('mutation_rate', 0.01)
    generations = params.get('generations', 100)

    population = generate_initial_population(subjects, faculty, classrooms, population_size)
    best_schedule = max(population, key=calculate_fitness)

    for generation in range(generations):
        new_population = []
        for _ in range(population_size):
            child = best_schedule
            if random.random() < mutation_rate:
                day = random.choice(list(child.keys()))
                time_index = random.choice(range(len(child[day])))
                if isinstance(child[day][time_index], dict):
                    child[day][time_index]['faculty'] = random.choice(faculty['faculty_name'].tolist())
            new_population.append(child)

        best_schedule = max(new_population, key=calculate_fitness)

    end_time = time.time()
    return best_schedule, {"time": end_time - start_time, "generations": generations}
