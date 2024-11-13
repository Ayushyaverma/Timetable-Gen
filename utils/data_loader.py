import pandas as pd

def load_data():
    subjects = pd.read_csv('data/subjects.csv')
    faculty = pd.read_csv('data/faculty.csv')
    return subjects, faculty

def load_classrooms():
    classrooms = pd.read_csv('data/classrooms.csv')
    return classrooms
