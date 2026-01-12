

# Timetable-Gen

**Timetable-Gen** is a Flask-based Python web application that automates the generation of academic timetables. It is designed to reduce the manual effort involved in scheduling classes by producing structured weekly timetables through a simple web interface.

The project focuses on clarity, simplicity, and extensibility, making it suitable for academic demonstrations, small institutions, and further research or optimization work.

---

## Features
- **Web-based generation:** Interactive interface using Flask.
- **Simple UI:** Clean and intuitive user design.
- **Automation:** Automatic creation of weekly schedules.
- **Modular Backend:** Python logic separated for easy maintenance.
- **Extensible:** Easy to add additional constraints or logic.

---

## Live Demo
Check out the live application here:
[https://timetable-gen-three.vercel.app](https://timetable-gen-three.vercel.app)

---

## Technology Stack
- **Language:** Python
- **Framework:** Flask
- **Frontend:** HTML / CSS
- **Templating:** Jinja2

---

## Project Structure


Timetable-Gen/
│
├── app.py                # Flask application entry point
├── requirements.txt      # Project dependencies
├── templates/            # HTML templates
├── static/               # Static assets (CSS, etc.)
├── images/               # Screenshots or assets
└── README.md             # Project documentation

## Setup Instructions
### Prerequisites

    Python 3.8 or higher

    pip package manager

### Installation

    Clone the repository
    Bash

git clone [https://github.com/Ayushyaverma/Timetable-Gen.git](https://github.com/Ayushyaverma/Timetable-Gen.git)
cd Timetable-Gen

(Optional) Create a virtual environment
Bash

python -m venv venv

### Linux / macOS
source venv/bin/activate

### Windows
venv\Scripts\activate

### Install dependencies
Bash

pip install -r requirements.txt

### Run the application
Bash

    python app.py

    Access the App Open your browser and visit: http://127.0.0.1:5000

### Application Flow

    Input: User provides timetable-related inputs through the web interface.

    Process: Backend logic processes the inputs.

    Generation: A timetable is generated without basic conflicts.

    Output: The result is rendered dynamically using HTML templates.

### Use Cases

    Academic timetable generation.

    Flask-based project demonstrations.

    Learning resource for Python web development.

    Base project for optimization or scheduling research.

## Future Scope

    Advanced constraint handling.

    Database integration.

    Export timetable as PDF or Excel.

    Authentication and role-based access.

    Improved scheduling algorithms.

## Contributing

### Contributions are welcome!

    Fork the repository.

    Create a new branch.

    Commit your changes.

    Submit a pull request.

## License

#### This project is licensed under the MIT License.
## Author

### Ayushya Verma GitHub: https://github.com/Ayushyaverma
