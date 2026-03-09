# Omni-Trace-Universal-Sustainability-Tracker
🍃 Omni-Trace is a responsive, multi-phase sustainability tracker. It calculates your daily $CO_2e$ emissions and visualizes your environmental impact against national averages using vanilla JavaScript.
🌍 Omni-Trace: Universal Sustainability Tracker

🔗 **Live Website:**  [Click here to open Omni-Trace](https://vasanthkumar73.neocities.org/Omni-Trace/vasanth-index)

Publisher: Vasanth Kumar R

Omni-Trace is a high-fidelity interactive web application that helps users calculate, track, and visualize their daily carbon footprint.

Built with a modern Glassmorphism UI, the application simplifies environmental impact analysis into four easy phases, helping users understand how their daily activities affect the planet.

The system provides real-time analytics, historical tracking, and sustainability insights for better environmental awareness.

🚀 Features
🌱 Four-Phase Audit

A guided audit system that evaluates lifestyle emissions across:

Transport

Kitchen

Energy

Waste

📊 Real-Time Analytics

Interactive Doughnut and Bar Charts powered by Chart.js for visual footprint analysis.

🇮🇳 Bharat Baseline

Compares user emissions against:

India Average (2.1 tonnes CO₂/year)

Global Average (4.9 tonnes CO₂/year)

📜 Audit History

Uses LocalStorage to track the user’s previous carbon audits.

📱 Responsive Design

Optimized for desktop and mobile grid layouts.

💡 Formula Transparency

Users can view the exact formula used for each calculation phase.

📊 The Four Phases of Tracking

Omni-Trace calculates environmental impact based on four sustainability categories.

Phase 1: The Commute (Transport)

Tracks the carbon emissions generated from daily travel.

Variables

Transport mode (Petrol / Diesel / EV / Public Transport)

Distance traveled

Vehicle occupancy

Logic

Uses fuel efficiency and emission factors to calculate individual travel emissions.

Phase 2: The Kitchen (Food & Diet)

Evaluates the environmental footprint of food consumption.

Variables

Protein type (Plant-based → Beef)

Food sourcing (Local vs Imported)

Cooking method (LPG / PNG / Induction)

Online food delivery

Food waste

Logic

Considers methane emissions from protein sources and cooking energy usage.

Phase 3: The Plug (Home Energy)

Measures household electricity and digital consumption.

Variables

AC / Heater usage

Electric geyser usage

High-load appliances

Digital consumption (gaming / streaming)

Lighting type

Logic

Converts appliance runtime into kg CO₂ equivalent emissions.

Phase 4: The Bin (Waste Management)

Evaluates waste generation and disposal impact.

Variables

Number of trash bags

Laundry drying method

Logic

Estimates emissions from landfill waste and electric dryers.

🧮 Calculation Logic

Total daily emissions are calculated using:

Total Impact = Transport + Kitchen + Energy + Waste

Example Transport Formula:

Impact = ((Distance / Efficiency) × Fuel Factor) / Occupancy

This produces a personalized daily carbon footprint estimate.

🛠️ Tech Stack
Technology	Purpose
HTML5	Application structure
CSS3	Glassmorphism UI styling
JavaScript (ES6)	Core application logic
Chart.js	Data visualization
Google Fonts (Inter)	Typography
LocalStorage	Audit history storage

📸 Screenshots

🔐 Login Interface

The Login Interface serves as the entry point to the Omni-Trace application. It features a clean and modern Glassmorphism-style UI designed for simplicity and ease of access.

Users can log in using their username and password, or quickly access the system using the Google Sign-In option. Once authenticated, users are redirected to the dashboard where they can begin their sustainability audit.

Key Features

Username and password authentication

Google Sign-In option

Clean glassmorphism UI design

Responsive layout for multiple devices
<img width="1918" height="867" alt="image" src="https://github.com/user-attachments/assets/80200177-af62-48e7-9090-d711ef00b222" />


📊 User Dashboard

The Dashboard is the central hub of the Omni-Trace platform. After logging in, users are welcomed with an interactive interface that allows them to start their carbon footprint analysis.

The dashboard provides access to audit history, allowing users to view their previous sustainability scores stored using LocalStorage. A prominent action button enables users to begin the Daily Carbon Footprint Calculation.

Key Features

Welcome interface for users

Start carbon footprint audit button

Audit history tracking system

Logout functionality

Modern responsive layout
<img width="1024" height="464" alt="image" src="https://github.com/user-attachments/assets/a4de17b4-8780-41a5-8e10-9063f5d77798" />


📈 Results & Analytics

The Results Page presents the final carbon footprint analysis after completing all four phases.

Users receive a detailed overview of their daily and annual carbon emissions, along with graphical representations to make the data easy to understand.

The page also compares the user's emissions against national and global averages, helping users understand their environmental impact.

Key Features

Daily carbon footprint calculation

Annual carbon emission projection

Doughnut chart showing emission distribution

Bar chart comparing global and national benchmarks

Sustainability tips for reducing emissions
<img width="1023" height="461" alt="image" src="https://github.com/user-attachments/assets/5ed7c5ec-0f93-4d7a-8517-8f08e716c115" />



💡 Future Improvements

User authentication with backend

Cloud database integration

AI-based sustainability suggestions

Personalized eco-friendly recommendations

Mobile app version

🌎 Final Note

Omni-Trace helps people measure and understand their carbon footprint, encouraging small lifestyle changes that can contribute to a greener and more sustainable planet.

Developed with 🌱 for a better future.
