
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardCard from './components/DashboardCard';
import KeywordLogTable from './components/KeywordLogTable';
import HeatmapMap from './components/HeatmapMap';
import CasesTable from './components/CasesTable';
import CasesPage from './pages/CasesPage';
import HeatmapPage from './pages/HeatmapPage';
import KeywordPage from './pages/KeywordPage';
import stats from './data/dashboardStats.json';
import CategoriesPage from "./pages/CategoriesPage";
import { AlertCircle, Facebook, Flag, MapPin } from 'lucide-react';


export default function App() {
  const cards = [
    { title: 'Total Reports Detected', value: stats.totalReports, icon: AlertCircle, color: 'bg-red-600' },
    { title: 'Facebook Pages Monitored', value: stats.facebookPages, icon: Facebook, color: 'bg-blue-600' },
    { title: 'Cases Flagged by Keywords', value: stats.casesFlagged, icon: Flag, color: 'bg-yellow-500' },
    { title: 'High-Risk Locations', value: stats.highRiskLocations, icon: MapPin, color: 'bg-green-600' },
  ];

  return (
    <Router>
      <div className="flex min-h-screen bg-slate-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-8 bg-slate-900 overflow-y-auto">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      {cards.map((card, idx) => (
                        <DashboardCard key={idx} {...card} />
                      ))}
                    </div>
                    {/* Category Stat Cards and Table moved to /categories page */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <KeywordLogTable />
                        <CasesTable />
                      </div>
                      <HeatmapMap />
                    </div>
                  </>
                }
              />
              <Route path="/cases" element={<CasesPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/heatmap" element={<HeatmapPage />} />
              <Route path="/keywords" element={<KeywordPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}