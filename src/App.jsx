import { useState } from "react";
import Header from "./components/Header";
import DashboardCard from "./components/DashboardCard";
import CategoryLineGraph from "./components/CategoryLineGraph";
import CategorySection from "./components/CategorySection";
import KeywordLogTable from "./components/KeywordLogTable";
import HeatmapMap from "./components/HeatmapMap";
import CasesTable from "./components/CasesTable";
import stats from "./data/dashboardStats.json";
import categoryStats from "./data/categoryStats.json";
import casesData from "./data/caseReports.json";
import logsData from "./data/keywordLogs.json";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Facebook,
  Flag,
  MapPin,
  Search,
  Plus,
  BarChart3,
  FileText,
  Map,
  Eye,
  Menu,
  X,
} from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

// Risk points for heatmap
const riskPoints = [
  { lat: 10.2914, lng: 123.8989, risk: "high", label: "Carbon Market" },
  {
    lat: 10.3098,
    lng: 123.8931,
    risk: "medium",
    label: "Fuente Osmeña Circle",
  },
  { lat: 10.3304, lng: 123.9074, risk: "low", label: "IT Park - Apas" },
];

const riskColor = {
  high: "red",
  medium: "yellow",
  low: "green",
};

export default function App() {
  const [cases, setCases] = useState(casesData);
  const [logs, setLogs] = useState(logsData);
  const [searchCases, setSearchCases] = useState("");
  const [searchLogs, setSearchLogs] = useState("");
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [caseForm, setCaseForm] = useState({
    date: "",
    location: "",
    type: "",
    status: "",
    reportedBy: "",
  });
  const [logForm, setLogForm] = useState({
    date: "",
    text: "",
    page: "",
    keyword: "",
    status: "",
  });

  const cards = [
    {
      title: "Total Reports Detected",
      value: stats.totalReports,
      icon: AlertCircle,
      color: "bg-red-600",
    },
    {
      title: "Facebook Pages Monitored",
      value: stats.facebookPages,
      icon: Facebook,
      color: "bg-blue-600",
    },
    {
      title: "Cases Flagged by Keywords",
      value: stats.casesFlagged,
      icon: Flag,
      color: "bg-yellow-500",
    },
    {
      title: "High-Risk Locations",
      value: stats.highRiskLocations,
      icon: MapPin,
      color: "bg-green-600",
    },
  ];

  const filteredCases = cases.filter(
    (c) =>
      c.location.toLowerCase().includes(searchCases.toLowerCase()) ||
      c.type.toLowerCase().includes(searchCases.toLowerCase()) ||
      c.status.toLowerCase().includes(searchCases.toLowerCase()) ||
      c.reportedBy.toLowerCase().includes(searchCases.toLowerCase())
  );

  const filteredLogs = logs.filter(
    (log) =>
      log.text.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.page.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.keyword.toLowerCase().includes(searchLogs.toLowerCase()) ||
      log.status.toLowerCase().includes(searchLogs.toLowerCase())
  );

  function handleAddCase(e) {
    e.preventDefault();
    setCases([{ ...caseForm }, ...cases]);
    setCaseForm({
      date: "",
      location: "",
      type: "",
      status: "",
      reportedBy: "",
    });
    setShowCaseForm(false);
  }

  function handleAddLog(e) {
    e.preventDefault();
    setLogs([{ ...logForm }, ...logs]);
    setLogForm({ date: "", text: "", page: "", keyword: "", status: "" });
    setShowLogForm(false);
  }

  const navigationItems = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "categories", label: "Categories", icon: BarChart3 },
    { id: "cases", label: "Cases", icon: FileText },
    { id: "heatmap", label: "Heatmap", icon: Map },
    { id: "keywords", label: "Keywords", icon: Search },
  ];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <Header />
      {/* Floating Navigation */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileHover={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.2 }}
          className="fixed cursor-pointer h-screen top-0 sm:right-6 lg:right-0 z-50 opacity-0 hover:opacity-100 duration-100"
        >
          <div className="h-full bg-slate-900/40 backdrop-blur-md border border-slate-700 rounded shadow-2xl p-2">
            <div className="flex flex-col gap-1">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="flex cursor-pointer items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 text-slate-300 hover:text-slate-100 hover:bg-slate-800/50 rounded-lg transition-colors group touch-manipulation"
                  title={item.label}
                >
                  <item.icon size={16} className="sm:hidden flex-shrink-0" />
                  <item.icon
                    size={18}
                    className="hidden sm:block lg:hidden flex-shrink-0"
                  />
                  <item.icon
                    size={20}
                    className="hidden lg:block flex-shrink-0"
                  />
                  <span className="hidden sm:block text-xs sm:text-sm font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <main className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12 lg:space-y-16">
        {/* Dashboard Overview Section */}
        <section
          id="overview"
          className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
              Anti Trafficking Dashboard
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Comprehensive monitoring and case management system
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-10">
            {cards.map((card, idx) => (
              <DashboardCard key={idx} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <KeywordLogTable />
            </div>
            <div className="bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <CasesTable />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
              Case Categories Analysis
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Statistical breakdown and trends across different case types
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8 mb-6 sm:mb-8 lg:mb-10">
            <div className="xl:col-span-2 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <CategoryLineGraph stats={categoryStats} />
            </div>
            <div className="xl:col-span-1 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6 h-full">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 text-center">
                  Quick Statistics
                </h3>
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Total Categories
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                      {categoryStats.length}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Total Cases
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">
                      {categoryStats.reduce((sum, cat) => sum + cat.count, 0)}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Highest Category
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {Math.max(...categoryStats.map((cat) => cat.count))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-100 mb-6 sm:mb-8 text-center">
              Category Breakdown
            </h3>
            <CategorySection stats={categoryStats} />
          </div>
        </section>

        {/* Cases Management Section */}
        <section
          id="cases"
          className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
              Case Reports Management
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Track and manage all case reports in the system
            </p>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => setShowCaseForm(true)}
              className="flex items-center gap-2 sm:gap-3 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-colors font-medium text-sm sm:text-base lg:text-lg shadow-lg touch-manipulation"
            >
              <Plus size={18} className="sm:hidden" />
              <Plus size={20} className="hidden sm:block lg:hidden" />
              <Plus size={24} className="hidden lg:block" />
              <span className="hidden sm:inline">Add New Case</span>
              <span className="sm:hidden">Add Case</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center">
                  <Search size={18} className="text-slate-400 sm:hidden" />
                  <Search size={20} className="hidden sm:block" />
                  <input
                    type="text"
                    placeholder="Search cases..."
                    className="bg-slate-800 border border-slate-600 rounded-lg px-4 sm:px-6 py-3 sm:py-4 w-full sm:max-w-md lg:max-w-2xl text-slate-100 placeholder:text-slate-400 text-center text-sm sm:text-base"
                    value={searchCases}
                    onChange={(e) => setSearchCases(e.target.value)}
                  />
                </div>

                <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-800 border-b border-slate-600">
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Date
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Location
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Type
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Status
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Reporter
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCases.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="text-center py-8 sm:py-16 text-slate-400 text-sm sm:text-lg"
                            >
                              No cases found.
                            </td>
                          </tr>
                        ) : (
                          filteredCases.map((c, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                            >
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center">
                                {c.date}
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-24 sm:max-w-none"
                                title={c.location}
                              >
                                {c.location}
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-20 sm:max-w-none"
                                title={c.type}
                              >
                                {c.type}
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                <span
                                  className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium ${
                                    c.status === "Flagged"
                                      ? "bg-red-600/20 text-red-400 border border-red-600/30"
                                      : "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                                  }`}
                                >
                                  {c.status}
                                </span>
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-24 sm:max-w-none"
                                title={c.reportedBy}
                              >
                                {c.reportedBy}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 text-center">
                  Case Summary
                </h3>
                <div className="space-y-3 sm:space-y-6">
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Total Cases
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-400">
                      {cases.length}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Flagged Cases
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-red-400">
                      {cases.filter((c) => c.status === "Flagged").length}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Under Investigation
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {cases.filter((c) => c.status === "Investigation").length}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heatmap Section */}
        <section
          id="heatmap"
          className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
              Geographic Risk Analysis
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Interactive heatmap showing trafficking risk levels across Cebu
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 sm:gap-8">
            <div className="xl:col-span-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
                <div className="w-full h-64 sm:h-80 lg:h-[500px] rounded-lg overflow-hidden mb-4 sm:mb-6">
                  <MapContainer
                    center={[10.3, 123.895]}
                    zoom={13}
                    style={{ height: "100%", width: "100%" }}
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution="&copy; OpenStreetMap contributors"
                    />
                    {riskPoints.map((point, idx) => (
                      <CircleMarker
                        key={idx}
                        center={[point.lat, point.lng]}
                        radius={20}
                        pathOptions={{
                          color: riskColor[point.risk],
                          fillColor: riskColor[point.risk],
                          fillOpacity: 0.5,
                        }}
                      >
                        <Tooltip>
                          {point.label} (
                          {point.risk.charAt(0).toUpperCase() +
                            point.risk.slice(1)}{" "}
                          Risk)
                        </Tooltip>
                      </CircleMarker>
                    ))}
                  </MapContainer>
                </div>
                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-8 items-center">
                  <span className="flex items-center gap-2 sm:gap-3">
                    <span className="w-3 sm:w-4 h-3 sm:h-4 bg-red-600 rounded-full"></span>
                    <span className="text-slate-300 font-medium text-sm sm:text-base">
                      High Risk
                    </span>
                  </span>
                  <span className="flex items-center gap-2 sm:gap-3">
                    <span className="w-3 sm:w-4 h-3 sm:h-4 bg-yellow-400 rounded-full"></span>
                    <span className="text-slate-300 font-medium text-sm sm:text-base">
                      Medium Risk
                    </span>
                  </span>
                  <span className="flex items-center gap-2 sm:gap-3">
                    <span className="w-3 sm:w-4 h-3 sm:h-4 bg-green-500 rounded-full"></span>
                    <span className="text-slate-300 font-medium text-sm sm:text-base">
                      Low Risk
                    </span>
                  </span>
                </div>
              </div>
            </div>

            <div className="xl:col-span-1 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 text-center">
                  Risk Locations
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  {riskPoints.map((point, idx) => (
                    <div
                      key={idx}
                      className="p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600"
                    >
                      <div className="text-center">
                        <div className="text-slate-100 text-sm sm:text-base font-medium mb-2">
                          {point.label}
                        </div>
                        <span
                          className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${
                            point.risk === "high"
                              ? "bg-red-600/20 text-red-400 border border-red-600/30"
                              : point.risk === "medium"
                              ? "bg-yellow-600/20 text-yellow-400 border border-yellow-600/30"
                              : "bg-green-600/20 text-green-400 border border-green-600/30"
                          }`}
                        >
                          {point.risk.charAt(0).toUpperCase() +
                            point.risk.slice(1)}{" "}
                          Risk
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Keywords Section */}
        <section
          id="keywords"
          className="bg-slate-900/50 rounded-xl sm:rounded-2xl border border-slate-800 p-4 sm:p-6 lg:p-8 shadow-xl"
        >
          <div className="text-center mb-6 sm:mb-8 lg:mb-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-100 mb-2 sm:mb-3">
              Keyword Detection System
            </h2>
            <p className="text-slate-400 text-sm sm:text-base lg:text-lg">
              Monitor and analyze keyword detections across platforms
            </p>
          </div>

          <div className="flex justify-center mb-6 sm:mb-8">
            <button
              onClick={() => setShowLogForm(true)}
              className="flex items-center gap-2 sm:gap-3 bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-slate-900 px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-lg sm:rounded-xl transition-colors font-medium text-sm sm:text-base lg:text-lg shadow-lg touch-manipulation"
            >
              <Plus size={18} className="sm:hidden" />
              <Plus size={20} className="hidden sm:block lg:hidden" />
              <Plus size={24} className="hidden lg:block" />
              <span className="hidden sm:inline">Add Detection Log</span>
              <span className="sm:hidden">Add Log</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="lg:col-span-3 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="space-y-4 sm:space-y-6">
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 justify-center">
                  <Search size={18} className="text-slate-400 sm:hidden" />
                  <Search size={20} className="hidden sm:block" />
                  <input
                    type="text"
                    placeholder="Search keywords..."
                    className="bg-slate-800 border border-slate-600 rounded-lg px-4 sm:px-6 py-3 sm:py-4 w-full sm:max-w-md lg:max-w-2xl text-slate-100 placeholder:text-slate-400 text-center text-sm sm:text-base"
                    value={searchLogs}
                    onChange={(e) => setSearchLogs(e.target.value)}
                  />
                </div>

                <div className="bg-slate-900 rounded-lg border border-slate-700 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs sm:text-sm">
                      <thead>
                        <tr className="bg-slate-800 border-b border-slate-600">
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Date
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Text
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Page
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Keyword
                          </th>
                          <th className="px-3 sm:px-6 py-3 sm:py-4 text-center text-slate-300 font-semibold">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredLogs.length === 0 ? (
                          <tr>
                            <td
                              colSpan={5}
                              className="text-center py-8 sm:py-16 text-slate-400 text-sm sm:text-lg"
                            >
                              No detection logs found.
                            </td>
                          </tr>
                        ) : (
                          filteredLogs.map((log, idx) => (
                            <tr
                              key={idx}
                              className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors"
                            >
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center">
                                {log.date}
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-24 sm:max-w-none"
                                title={log.text}
                              >
                                {log.text}
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-20 sm:max-w-none"
                                title={log.page}
                              >
                                {log.page}
                              </td>
                              <td
                                className="px-3 sm:px-6 py-3 sm:py-4 text-slate-100 text-center truncate max-w-20 sm:max-w-none"
                                title={log.keyword}
                              >
                                {log.keyword}
                              </td>
                              <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                                <span className="px-2 sm:px-4 py-1 sm:py-2 rounded-full bg-red-600/20 text-red-400 border border-red-600/30 text-xs sm:text-sm font-medium">
                                  {log.status}
                                </span>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1 bg-slate-800/50 rounded-lg sm:rounded-xl border border-slate-700 p-4 sm:p-6">
              <div className="bg-slate-900 rounded-lg border border-slate-700 p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-100 mb-4 sm:mb-6 text-center">
                  Detection Stats
                </h3>
                <div className="space-y-3 sm:space-y-6">
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Total Detections
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                      {logs.length}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Flagged Items
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-red-400">
                      {logs.filter((l) => l.status === "Flagged").length}
                    </div>
                  </div>
                  <div className="text-center p-3 sm:p-4 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="text-slate-300 text-xs sm:text-sm mb-1">
                      Monitored Pages
                    </div>
                    <div className="text-2xl sm:text-3xl font-bold text-green-400">
                      {new Set(logs.map((l) => l.page)).size}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Case Form Modal - Responsive */}
      {showCaseForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleAddCase}
            className="bg-slate-900 border border-slate-700 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-100 mb-4 sm:mb-6 text-center">
              Add New Case
            </h3>
            <div className="space-y-3 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base"
                  value={caseForm.date}
                  onChange={(e) =>
                    setCaseForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Location
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter location"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={caseForm.location}
                  onChange={(e) =>
                    setCaseForm((f) => ({ ...f, location: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Type
                </label>
                <input
                  type="text"
                  required
                  placeholder="Case type"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={caseForm.type}
                  onChange={(e) =>
                    setCaseForm((f) => ({ ...f, type: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Status
                </label>
                <input
                  type="text"
                  required
                  placeholder="Status"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={caseForm.status}
                  onChange={(e) =>
                    setCaseForm((f) => ({ ...f, status: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Reported By
                </label>
                <input
                  type="text"
                  required
                  placeholder="Reporter name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={caseForm.reportedBy}
                  onChange={(e) =>
                    setCaseForm((f) => ({ ...f, reportedBy: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setShowCaseForm(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 active:bg-slate-500 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium transition-colors text-sm sm:text-base touch-manipulation"
              >
                Add Case
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Log Form Modal - Responsive */}
      {showLogForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <form
            onSubmit={handleAddLog}
            className="bg-slate-900 border border-slate-700 p-4 sm:p-6 lg:p-8 rounded-lg sm:rounded-xl shadow-2xl w-full max-w-xs sm:max-w-md"
          >
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-slate-100 mb-4 sm:mb-6 text-center">
              Add Keyword Log
            </h3>
            <div className="space-y-3 sm:space-y-5">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base"
                  value={logForm.date}
                  onChange={(e) =>
                    setLogForm((f) => ({ ...f, date: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Detected Text
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter detected text"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={logForm.text}
                  onChange={(e) =>
                    setLogForm((f) => ({ ...f, text: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Page Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="Page name"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={logForm.page}
                  onChange={(e) =>
                    setLogForm((f) => ({ ...f, page: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Risky Keyword
                </label>
                <input
                  type="text"
                  required
                  placeholder="Keyword"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={logForm.keyword}
                  onChange={(e) =>
                    setLogForm((f) => ({ ...f, keyword: e.target.value }))
                  }
                />
              </div>
              <div>
                <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-1 sm:mb-2 text-center">
                  Status
                </label>
                <input
                  type="text"
                  required
                  placeholder="Status"
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-800 border border-slate-700 text-slate-100 text-center text-sm sm:text-base placeholder:text-slate-500"
                  value={logForm.status}
                  onChange={(e) =>
                    setLogForm((f) => ({ ...f, status: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-6 sm:mt-8">
              <button
                type="button"
                onClick={() => setShowLogForm(false)}
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg bg-slate-700 text-slate-200 hover:bg-slate-600 active:bg-slate-500 transition-colors font-medium text-sm sm:text-base touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 sm:px-6 py-2 sm:py-3 rounded-md sm:rounded-lg bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700 text-slate-900 font-medium transition-colors text-sm sm:text-base touch-manipulation"
              >
                Add Log
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
