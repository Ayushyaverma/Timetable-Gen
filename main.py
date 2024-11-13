from utils.data_loader import load_data
from algorithms.greedy_algorithm_module import greedy_schedule
from algorithms.dynamic_programming_module import optimize_schedule_with_dp
from algorithms.genetic_algorithm import genetic_algorithm

def main():
    subjects, faculty = load_data()
    
    # Step 1: Greedy allocation
    initial_schedule = greedy_schedule(subjects, faculty)
    
    # Step 2: Dynamic Programming optimization
    optimized_schedule = optimize_schedule_with_dp(initial_schedule)
    
    # Step 3: Genetic Algorithm optimization
    final_schedule = genetic_algorithm(subjects, faculty)
    
    print("Generated Timetable:", final_schedule)

if __name__ == "__main__":
    main()
