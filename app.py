from flask import Flask, render_template, request, jsonify, redirect, url_for
import pandas as pd
from algorithms.genetic_algorithm_module import genetic_algorithm

app = Flask(__name__)

@app.route('/')
def home():
    return redirect(url_for('input_page'))

@app.route('/input')
def input_page():
    return render_template('input.html')

@app.route('/output')
def output_page():
    return render_template('output.html')

@app.route('/generate_timetable', methods=['POST'])
def generate_timetable():
    data = request.get_json()

    subjects = pd.DataFrame(data['subjects'])
    faculty = pd.DataFrame(data['faculty'])
    classrooms = pd.DataFrame(data['classrooms'])

    # Create mappings and constraints
    faculty_subject_map = {entry['subject_name']: entry['faculty_name'] for entry in data['subjects']}
    max_lectures_per_faculty = {entry['faculty_name']: entry['max_lectures'] for entry in data['faculty']}
    
    # Empty params dictionary or specify parameters as needed
    params = {}

    # Generate the timetable using genetic algorithm
    final_schedule, metrics = genetic_algorithm(subjects, faculty, classrooms, faculty_subject_map, max_lectures_per_faculty, params)

    return jsonify({"schedule": final_schedule, "metrics": metrics})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
