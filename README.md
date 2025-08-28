# Public Transportation Tracking System

A real-time bus tracking and passenger safety platform that connects **users**, **drivers**, and **transport companies**.  
The system uses GPS from the driver’s mobile device to provide live bus locations and additional features to enhance travel experience and safety.

---

## Features

### **For Users**
- **Live Bus Tracking:** View the exact location of buses once both user and driver share locations.
- **Route Visualization:** See bus routes similar to Google Maps.
- **Nearby Alerts:** Receive notifications when the bus is approaching the nearest station.
- **Bus Reviews & Favorites:** Mark buses as favorites and leave reviews.
- **Safety Alert Button:** Instantly alert the driver in case of sexual harassment, theft, or emergencies.

### **For Drivers**
- **One-Tap Tracking:** Start GPS tracking by pressing a button.
- **Route Fixing:** Location becomes visible to passengers once the route is confirmed.
- **Passenger Visibility:** View a list of users waiting for the bus along the route.

### **For Transport Companies**
- **Fleet Monitoring:** See all buses allocated under their company in real time.
- **Driver & Conductor Info:** View bus details along with assigned personnel.
- **Bus Time Gaps:** Analyze time difference between consecutive buses on the same route.

---

## System Architecture
- **Frontend:** Web & Mobile App (React Native / Expo or Flutter)
- **Backend:** Node.js / Express or Django REST Framework
- **Database:** PostgreSQL / MongoDB
- **Real-Time Tracking:** WebSockets / Firebase / MQTT
- **Maps & Navigation:** Google Maps API / OpenStreetMap
- **Push Notifications:** Firebase Cloud Messaging (FCM) or OneSignal

---

## Installation & Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/public-transport-tracker.git
