from flask import Flask, render_template, request, jsonify, redirect, url_for
import pandas as pd
from algorithms.genetic_algorithm_module import genetic_algorithm
from algorithms.dynamic_programming_module import dynamic_programming
from algorithms.greedy_algorithm_module import greedy_algorithm

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
    algorithm = data.get('algorithm', 'genetic')

    if algorithm == 'genetic':
        params = data.get('params', {})
        final_schedule, metrics = genetic_algorithm(subjects, faculty, classrooms, params)
    elif algorithm == 'dynamic':
        final_schedule, metrics = dynamic_programming(subjects, faculty, classrooms)
    elif algorithm == 'greedy':
        final_schedule, metrics = greedy_algorithm(subjects, faculty, classrooms)
    else:
        return jsonify({"error": "Invalid algorithm selected"}), 400

    return jsonify({"schedule": final_schedule, "metrics": metrics})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
