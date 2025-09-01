📝 Online Test Platform – Full Stack

An Online Test Platform built with Spring Boot (Backend) and ReactJS (Frontend) that allows students to take online exams and administrators to manage subjects, tests, and questions with ease.

🚀 Features
🧑‍🎓 Student

Take MCQ-based tests

Get instant results & performance insights

Track progress over time

Compete on a leaderboard

🔑 Admin

Add/Edit/Delete Subjects & Tests

Import questions from PDF or add manually

Manage tests, questions, and results in one place

Search tests by title (case-insensitive)

🛠 Tech Stack
Backend (Spring Boot)

Spring Boot (REST API)

Spring Data JPA (Database operations)

MySQL/PostgreSQL (Database)

Lombok (Boilerplate reduction)

Apache PDFBox (PDF question import)

Frontend (ReactJS)

ReactJS (UI Framework)

Axios (API communication)

React Router (Navigation)

CSS (Styling)

📂 Project Structure
online-test-platform/
│── backend/                 # Spring Boot backend
│   ├── src/main/java/       # Controllers, Services, Entities
│   ├── src/main/resources/  # application.properties
│
│── frontend/                # ReactJS frontend
│   ├── src/components/      # Reusable UI components
│   ├── src/pages/           # Pages (Home, Test, Admin, Results)
│   ├── src/services/        # Axios API service
│   ├── src/styles/          # CSS files
│   └── App.js               # Root Component
⚡ Installation & Running
1️⃣ Backend (Spring Boot)
# Move to backend
cd backend

# Run Spring Boot app
mvn spring-boot:run

2️⃣ Frontend (ReactJS)
# Move to frontend
cd frontend

# Install dependencies
npm install

# Start React server
npm start

🌟 Future Enhancements


Randomized questions
Dark/Light mode UI
Export results to Excel/PDF
