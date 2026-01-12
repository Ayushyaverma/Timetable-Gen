Timetable-Gen

Timetable-Gen is a lightweight, Python-based timetable generation web application built with Flask. It enables users to generate optimized class schedules based on provided inputs such as courses, instructors, days, and time slots.

This project aims to automate the manual process of creating academic timetables while respecting constraints such as no class overlaps and balanced distributions.

Features

Simple web interface powered by Flask

Generates weekly timetables automatically

User-provided inputs for courses, instructors, and availability

Modular Python backend for scheduling logic

Easily extensible for additional rules and constraints

Demo

You can view a live deployment here (if hosted):

https://timetable-gen-three.vercel.app

Screenshots

Place screenshots here if available (e.g., timetable output, input form, homepage)

Getting Started

Follow the instructions below to get the project running on your local machine.

Prerequisites

Ensure you have the following installed:

Python 3.8 or newer

pip package manager

(Optional) Virtual environment tool (venv, virtualenv, etc.)

Installation

Clone the repository

git clone https://github.com/Ayushyaverma/Timetable-Gen.git
cd Timetable-Gen


Create and activate a Python virtual environment

python3 -m venv venv
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows


Install dependencies

pip install -r requirements.txt

Configuration

If your app uses configuration (e.g., environment variables), document them here. For example:

export FLASK_APP=app.py
export FLASK_ENV=development


(Adjust variable names/values as appropriate.)

Running the App
flask run


By default, the app will be available at:

http://127.0.0.1:5000

How It Works

Timetable-Gen reads user input (courses, instructors, available slots, etc.) and runs a scheduling logic (Flask handler + Python scheduler code) to compute a timetable.
The output timetable is rendered in HTML, allowing users to view a weekly schedule.

(Provide a short description of your algorithm or approach here if you have one — e.g., greedy scheduler, constraint solver, etc.)

Project Structure

Here is an overview of the main directories and files:

.
├── app.py                  # Flask application entrypoint
├── requirements.txt        # Python dependencies
├── templates/              # HTML templates for rendering pages
├── static/                 # Static assets (CSS / JS)
├── utils/                  # Helper modules for scheduling logic
├── images/                 # Project images / screenshots
─ README.md

Dependencies

All Python dependencies are listed in requirements.txt. Typical packages include:

Flask
Flask-WTForms (if used)
Jinja2
… (add any specific scheduling libs here)


Install them via:

pip install -r requirements.txt

Usage Examples

(Optional — add example screenshots or sample inputs here)

Navigate to the home page.

Enter course details and availability.

Click “Generate Timetable”.

View the generated schedule.

Contributing

Contributions are welcome! To contribute:

Fork the project

Create your feature branch:

git checkout -b feature/awesome-feature


Commit your changes:

git commit -m "Add some awesome feature"


Push to the branch:

git push origin feature/awesome-feature


Open a Pull Request on GitHub

Please include clear descriptions of changes and reference any relevant issues.

License

This project is released under the MIT License. See LICENSE for details.

Acknowledgements

This project draws inspiration from other timetable generator projects and scheduling algorithms on GitHub. See related projects under the timetable-generator topic for ideas and implementation patterns.
