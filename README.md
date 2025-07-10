# 🚀 Cebu Anti-Human Trafficking Dashboard

## 💡 Note

This dashboard is a prototype, but it can already help visualize and organize anti-trafficking efforts. Every improvement you make brings us closer to a safer Cebu.

## 🆕 Recent Updates

### Interactive Heatmap Implementation
- **✅ Functional Map Integration**: Replaced placeholder text with fully interactive Leaflet.js heatmap
- **✅ Real Cebu City Coordinates**: Using verified coordinates from OpenStreetMap and official sources
- **✅ Production-Ready Accuracy**: All locations verified for anti-trafficking operational use
- **✅ Responsive Design**: Optimized for both dashboard preview and full-page views

### Verified Location Data
- **Carbon Market** (High Risk): `10.2914°N, 123.8989°E` - Major commercial hub
- **Fuente Osmeña Circle** (Medium Risk): `10.3098°N, 123.8931°E` - Central traffic intersection  
- **IT Park - Apas** (Low Risk): `10.3304°N, 123.9074°E` - Secure business district

## 🎯 Project Overview

The **Cebu Anti-Human Trafficking Dashboard** is a React-based web application designed to help visualize, monitor, and organize anti-trafficking efforts in Cebu, Philippines. This prototype dashboard provides tools for tracking case reports, monitoring suspicious keywords across social media platforms, and visualizing high-risk locations through an interactive heatmap.

## 🛠️ Technology Stack

### Core Technologies
- **React 19.1.0** - Frontend framework
- **Vite 7.0.3** - Build tool and development server
- **React Router DOM 7.6.3** - Client-side routing
- **TailwindCSS 4.1.11** - Utility-first CSS framework

### Key Dependencies
- **Leaflet 1.9.4** & **React-Leaflet 5.0.0** - Interactive maps and heatmap visualization
- **Lucide React 0.525.0** - Icon library
- **Chart.js 0.3.24** - Data visualization (future implementation)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CasesTable.jsx      # Case reports table
│   ├── DashboardCard.jsx   # Statistics cards
│   ├── Header.jsx          # Top navigation bar
│   ├── HeatmapMap.jsx      # Interactive map component ⭐ NEW
│   ├── KeywordLogTable.jsx # Keyword monitoring table
│   └── Sidebar.jsx         # Side navigation
├── pages/               # Full page components
│   ├── CasesPage.jsx       # Case management interface
│   ├── HeatmapPage.jsx     # Interactive map page ⭐ UPDATED
│   └── KeywordPage.jsx     # Keyword monitoring interface
├── data/               # Static data files
│   ├── caseReports.json    # Case report records ⭐ UPDATED
│   ├── dashboardStats.json # Dashboard statistics
│   └── keywordLogs.json    # Keyword detection logs ⭐ UPDATED
├── App.jsx             # Main application component
└── main.jsx           # Application entry point
```

## 🌟 Features

### 1. Dashboard Overview (`/`)
- **Key Statistics**: Displays 4 main metrics:
  - Total Reports Detected: 120
  - Facebook Pages Monitored: 15
  - Cases Flagged by Keywords: 34
  - High-Risk Locations: 7
- **Interactive Heatmap**: ⭐ **NEW** - Live map showing risk areas with clickable markers
- **Quick Tables**: Overview of recent case reports and keyword detections

### 2. Case Management (`/cases`)
- **Case Tracking**: Monitor trafficking-related cases with details:
  - Date of report
  - Location (now using real Cebu locations)
  - Type of case (e.g., "Online Recruitment", "Suspicious Activity")
  - Current status ("Investigating", "Flagged")
  - Reporter information
- **Search Functionality**: Filter cases by location, type, status, or reporter
- **Add New Cases**: Form-based case entry system

### 3. Interactive Heatmap (`/heatmap`) ⭐ **ENHANCED**
- **Cebu Map Visualization**: OpenStreetMap integration showing accurate Cebu City locations
- **Verified Risk Points**: Color-coded markers with real coordinates:
  - 🔴 **High Risk**: Carbon Market (major commercial hub)
  - 🟡 **Medium Risk**: Fuente Osmeña Circle (central intersection)
  - 🟢 **Low Risk**: IT Park - Apas (secure business district)
- **Interactive Features**: Click markers for location details and risk level information

### 4. Keyword Monitoring (`/keywords`)
- **Social Media Monitoring**: Track suspicious keywords across Facebook pages
- **Detection Logs**: Record of flagged content with real location references
- **Search and Filter**: Find specific logs by text, page, keyword, or status
- **Manual Entry**: Add new keyword detections manually

## 📊 Data Structure

### Case Reports (`caseReports.json`) ⭐ **UPDATED**
```json
{
  "date": "2025-07-08",
  "location": "Carbon Market",
  "type": "Online Recruitment",
  "status": "Investigating",
  "reportedBy": "Barangay Official"
}
```

### Keyword Logs (`keywordLogs.json`) ⭐ **UPDATED**
```json
{
  "date": "2025-07-08",
  "text": "Help needed near Carbon Market.",
  "page": "Cebu Watch",
  "keyword": "help",
  "status": "Flagged"
}
```

### Dashboard Statistics (`dashboardStats.json`)
```json
{
  "totalReports": 120,
  "facebookPages": 15,
  "casesFlagged": 34,
  "highRiskLocations": 7
}
```

## 🎨 User Interface

### Design System
- **Dark Theme**: Professional monitoring interface with slate backgrounds
- **Status Indicators**: 
  - 🔴 Red badges for flagged/high-risk items
  - 🟡 Yellow badges for investigating/medium-risk items
  - 🟢 Green indicators for low-risk areas
- **Interactive Maps**: Smooth zoom, pan, and marker interactions
- **Responsive Layout**: Optimized for desktop and mobile viewing

### Navigation
- **Sidebar Navigation**: Fixed left sidebar with main sections
- **Header**: Application title with notification and user profile icons
- **Map Controls**: Zoom, layer selection, and location search

## 🚀 Development Setup

### Prerequisites
- Node.js 18+ (compatible with React 19)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone [repository-url]
cd HackathonDashboard

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

### Development Scripts
- `npm run dev` - Start Vite development server (typically on http://localhost:5173)
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🗺️ Geographic Accuracy

### Data Sources
All coordinates verified from:
- **OpenStreetMap** official data
- **Wikipedia** geographic coordinates  
- **Google Maps** Plus Codes
- **Philippine government mapping sources**

### Location Verification
- ✅ **Carbon Market**: Major commercial center in Ermita barangay
- ✅ **Fuente Osmeña Circle**: Central roundabout and transportation hub
- ✅ **IT Park - Apas**: Business district in Lahug area (corrected from initial placement)

## 🔄 Recent Changes Log

### Version 2.0 Updates
1. **Heatmap Component Overhaul**
   - Replaced static placeholder with Leaflet.js integration
   - Added interactive markers with tooltips
   - Implemented responsive zoom and pan controls

2. **Coordinate Accuracy Project**
   - Researched and verified all location coordinates
   - Updated from placeholder data to production-ready coordinates
   - Fixed IT Park location from incorrect Lahug placement to accurate Apas coordinates

3. **Data Consistency Updates**
   - Updated case reports to reference real locations
   - Modified keyword logs to mention accurate places
   - Ensured all data files align with verified coordinates

4. **User Experience Improvements**
   - Added smooth map interactions
   - Implemented informative tooltips
   - Enhanced visual design with proper risk color coding

## 🎯 Current Limitations & Future Enhancements

### Current State
- **Prototype Status**: Functional prototype with static data
- **Data Persistence**: Changes not saved between sessions
- **Authentication**: No user authentication system implemented
- **Real-time Updates**: No live data integration

### Planned Enhancements
- **Backend Integration**: Connect to real database and API
- **Real-time Monitoring**: Live keyword detection from social media APIs
- **User Authentication**: Secure login system for authorized personnel
- **Advanced Analytics**: Chart.js integration for trend analysis
- **Mobile App**: React Native companion app
- **Export Features**: PDF/Excel export for reports
- **Notification System**: Real-time alerts for high-priority cases
- **Multi-language Support**: Cebuano and Filipino language options

## 🤝 Contributing

This dashboard serves as a foundation for anti-trafficking efforts in Cebu. The codebase is structured to support easy expansion and integration with real data sources. 

### Key Areas for Contribution
1. **Backend Integration**: Connecting to databases and APIs
2. **Real-time Features**: Live monitoring and notifications
3. **Data Visualization**: Advanced charts and analytics
4. **Mobile Experience**: Responsive design improvements
5. **Security Features**: Authentication and authorization
6. **Accessibility**: WCAG compliance and screen reader support

### Development Guidelines
- Follow React best practices and hooks patterns
- Use TypeScript for new features (migration in progress)
- Implement comprehensive error handling
- Write unit tests for critical functionality
- Document all new features and API changes

## 🌍 Impact Statement

This dashboard prototype demonstrates how technology can support anti-trafficking efforts by:

- **📍 Centralizing Information**: Bringing together case data, monitoring logs, and geographic information
- **⚡ Enabling Quick Response**: Easy search and filtering for rapid case assessment
- **📈 Visualizing Patterns**: Geographic and temporal pattern recognition through interactive heatmaps
- **🤝 Supporting Coordination**: Shared platform for multiple stakeholders including law enforcement, NGOs, and government agencies
- **🎯 Focusing Resources**: Data-driven allocation of anti-trafficking resources to high-risk areas

Every improvement to this system contributes to making Cebu safer by enhancing the ability to detect, track, and respond to human trafficking activities.

## 📜 License

This project is developed for humanitarian purposes to support anti-trafficking efforts in Cebu, Philippines.

## 📞 Support

For technical support or questions about contributing to this anti-trafficking initiative, please contact the development team.

---

**Made with ❤️ for a safer Cebu** | **Last Updated**: January 2025
