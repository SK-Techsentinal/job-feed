# 🚀 JobFlow — Full Stack Job Board Platform

> South Africa's modern job platform built with React + Django  
> Developed by **SK-TECHSENTINAL** | [fiverr.com/sktechsentinal](https://fiverr.com)

---

## 📸 Preview

```
💼 Job Listings  →  ⭐ Featured Carousel  →  📋 Job Detail  →  ✅ Apply
```

---

## 🧱 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React + Vite + JavaScript         |
| Backend    | Django + Django REST Framework    |
| Auth       | JWT (SimpleJWT)                   |
| Database   | SQLite (dev) / PostgreSQL (prod)  |
| Styling    | Custom CSS-in-JS (no Tailwind)    |
| API        | RESTful JSON API                  |

---

## ✨ Features

### Frontend
- 🔍 Live search by job title or company
- 🏷️ Category filter pills (Technology, Banking, Finance, etc.)
- 💼 Employment type filters (Full Time, Remote, Contract, etc.)
- ⭐ Featured jobs horizontal carousel
- 📋 Full job detail view with requirements
- 📝 Apply modal with full application form
- ★ Save/bookmark jobs locally
- 👤 Profile tab with application stats
- 📱 Mobile-first dark UI design

### Django Backend & Admin Dashboard
- 🔐 JWT authentication
- 📊 Admin dashboard at `/admin`
- ✅ Manage jobs (activate / feature with one click)
- 📬 Track applications (Pending → Shortlisted → Hired)
- 🏢 Company management with job count display
- 💰 Salary range display in green
- 🔎 Search and filter in admin panel
- 📈 Stats API endpoint (`/api/jobs/stats/`)

---

## 📁 Project Structure

```
jobflow/
├── frontend/                  ← React App
│   └── src/
│       ├── JobFlow.jsx        ← Main component
│       └── ...
│
├── backend/                   ← Django API
│   ├── jobflow/
│   │   ├── settings.py
│   │   └── urls.py
│   └── jobs/
│       ├── models.py          ← Job, Company, Application
│       ├── serializers.py
│       ├── views.py
│       ├── admin.py           ← Admin dashboard config
│       └── urls.py
│
└── README.md
```

---

## ⚙️ Setup — Backend (Django)

### 1. Install dependencies
```bash
pip install django djangorestframework django-cors-headers \
            djangorestframework-simplejwt Pillow python-decouple
```

### 2. Run migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 3. Create admin user
```bash
python manage.py createsuperuser
```

### 4. Start the server
```bash
python manage.py runserver
```

✅ API live at: `http://localhost:8000/api/`  
✅ Admin dashboard: `http://localhost:8000/admin/`

---

## ⚙️ Setup — Frontend (React)

### 1. Install dependencies
```bash
cd frontend
npm install
```

### 2. Start dev server
```bash
npm run dev
```

✅ App live at: `http://localhost:5173`

---

## 🌐 API Endpoints

| Method | Endpoint                  | Description              |
|--------|---------------------------|--------------------------|
| GET    | `/api/jobs/`              | List all active jobs     |
| GET    | `/api/jobs/{id}/`         | Get single job detail    |
| GET    | `/api/jobs/stats/`        | Platform stats           |
| GET    | `/api/jobs/?category=technology` | Filter by category |
| GET    | `/api/jobs/?featured=true` | Featured jobs only      |
| GET    | `/api/jobs/?search=react` | Search jobs              |
| POST   | `/api/applications/`      | Submit a job application |

---

## 🔐 Admin Dashboard

Access at `/admin/` after creating a superuser.

**What you can manage:**
- ✅ Activate or deactivate job listings
- ⭐ Mark jobs as featured
- 📬 Track applications and update their status
- 🏢 Add and manage companies
- 📊 View job view counts and application stats

---

## 📊 Application Status Flow

```
Pending → Reviewed → Shortlisted → Hired
                  ↘ Rejected
```

---

## 🛠️ Environment Variables

Create a `.env` file in the backend root:

```env
SECRET_KEY=your-secret-key-here
DEBUG=True
```

---

## 📦 Models Overview

### Job
- Title, Company, Location
- Employment Type, Experience Level, Category
- Salary Range (min/max)
- Description, Requirements, Benefits
- Featured flag, Active flag, View count
- Application deadline

### Company
- Name, Logo, Website, Description

### Application
- Applicant name, email, phone
- Cover letter, Resume upload
- Status tracking

---

## 👨‍💻 Developer

**Suleiman Kaldine (SK-TECHSENTINAL)**  
📍 Johannesburg, South Africa  
🎯 AI App Developer | Full Stack | Content Creator  
🔗 [Fiverr Profile](https://fiverr.com)  
🔗 [LinkedIn](https://linkedin.com/in/suleiman-kaldine-683368375)  
🔗 [Portfolio](https://sites.google.com/view/suleiman-kaldine/home)  
📺 YouTube: SK-TechSentinal  

---

## 📄 License

MIT License — free to use and modify.

---

*Built with ❤️ using React, Django & Claude AI*
