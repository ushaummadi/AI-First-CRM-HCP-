# AI-First CRM HCP Module

An AI-powered Customer Relationship Management (CRM) application for Healthcare Professionals (HCPs). The system enables pharmaceutical sales representatives to manage HCP profiles, log interactions, analyze engagement, and use an AI assistant powered by LangGraph and Groq to improve field productivity.

---

# Features

## Authentication
- User Login
- User Registration
- Local authentication

## Dashboard
- Total HCPs
- Total Interactions
- Interaction Analytics
- Recent Activity
- AI Assistant

## Healthcare Professionals
- Add Doctor
- View Doctors
- Search Doctors
- Edit Doctor
- Delete Doctor

## Interaction Management
- Log Interaction
- Edit Interaction
- Delete Interaction
- View Interaction History
- Export CSV

## AI Assistant (LangGraph + Groq)

The AI assistant uses LangGraph to route user requests to the appropriate tool.

Supported tools:

- Search HCP
- Log Interaction
- Edit Interaction
- Generate Visit Summary
- Recommend Next Best Action

---

# Tech Stack

## Frontend

- React
- Redux Toolkit
- Material UI
- React Router
- Axios
- Chart.js

## Backend

- FastAPI
- SQLAlchemy
- MySQL
- LangGraph
- Groq LLM
- Pydantic

---

# Project Structure

```
ai-first-crm-hcp/

├── frontend/
│
│── src/
│   ├── components/
│   ├── pages/
│   ├── api/
│   ├── app/
│   └── App.jsx
│
└── backend/
    ├── app/
    │
    ├── agents/
    │   ├── graph.py
    │   ├── state.py
    │
    ├── routers/
    │
    ├── services/
    │
    ├── tools/
    │
    ├── models/
    │
    ├── schemas/
    │
    └── database/
```

---

# LangGraph Workflow

```
User

↓

AI Agent

↓

Intent Classification

↓

LangGraph Router

↓

Tool Selection

├── Search HCP

├── Log Interaction

├── Edit Interaction

├── Generate Summary

└── Recommend Follow-up

↓

Groq LLM / MySQL

↓

Response
```

---

# LangGraph Tools

## 1. Search HCP

Searches healthcare professionals from the database.

Returns:

- Doctor Name
- Hospital
- Speciality
- City

---

## 2. Log Interaction

Stores interaction details into MySQL.

Information captured:

- HCP
- Interaction Type
- Product
- Summary
- Sentiment
- Next Action

---

## 3. Edit Interaction

Allows modification of an existing interaction.

Updates:

- Summary
- Product
- Sentiment
- Next Action

---

## 4. Generate Summary

Uses Groq LLM to summarize the interaction.

Input:

Raw conversation

Output:

Professional visit summary

---

## 5. Recommend Next Best Action

Uses Groq LLM to suggest follow-up actions.

Example:

- Schedule follow-up visit
- Share clinical literature
- Arrange product demo

---

# API Endpoints

## Authentication

```
POST /login
POST /register
```

## HCP

```
GET /hcp
POST /hcp
PUT /hcp/{id}
DELETE /hcp/{id}
```

## Interactions

```
GET /interactions
POST /interactions
PUT /interactions/{id}
DELETE /interactions/{id}
GET /interactions/recent
GET /interactions/export
```

## AI Agent

```
POST /agent/chat
```

---

# Installation

## Backend

```bash
cd backend

python -m venv venv

venv\Scripts\activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

---

# Database

Configure MySQL connection inside:

```
app/database/database.py
```

Example

```python
DATABASE_URL="mysql+pymysql://username:password@localhost/ai_first_crm"
```

---

# Environment Variables

Create a `.env` file.

```
GROQ_API_KEY=YOUR_GROQ_API_KEY
DATABASE_URL=YOUR_DATABASE_URL
```

---

# Screenshots

Add screenshots of:

- Login
- Dashboard
- Doctors
- Interaction History
- AI Chat
- Analytics

---

# Assignment Requirements Covered

- React Frontend
- Redux State Management
- FastAPI Backend
- MySQL Database
- LangGraph AI Agent
- Groq LLM
- Log Interaction Screen
- Conversational AI
- Structured Form
- Search HCP Tool
- Log Interaction Tool
- Edit Interaction Tool
- Visit Summary Tool
- Follow-up Recommendation Tool
- CSV Export

---

# Future Enhancements

- Voice-based interaction logging
- Multi-user authentication with JWT
- Role-based access control
- Dashboard analytics
- Email reminders
- Calendar integration

---

# Author

**Ummadi Usharani**

AI Engineer | Python | FastAPI | LangGraph | RAG | React | Generative AI
