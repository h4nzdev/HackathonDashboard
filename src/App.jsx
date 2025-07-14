import { useEffect, useState } from "react";
import Header from "./components/Header";
import FloatingNavigation from "./components/FloatingNavigation";
import DashboardOverview from "./components/DashboardOverview";
import CategoriesSection from "./components/CategoriesSection";
import CasesManagement from "./components/CasesManagement";
import HeatmapSection from "./components/HeatmapSection";
import KeywordsSection from "./components/KeywordsSection";
import CaseFormModal from "./components/CaseFormModal";
import LogFormModal from "./components/LogFormModal";
import stats from "./data/dashboardStats.json";
import categoryStats from "./data/categoryStats.json";
import casesData from "./data/caseReports.json";
import logsData from "./data/keywordLogs.json";
import { motion, AnimatePresence } from "framer-motion";
import JuvoIcon from "./assets/juvo.svg";
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

export default function App() {
  // State and data
  const [cases, setCases] = useState(casesData);
  const [logs, setLogs] = useState(logsData);
  const [searchCases, setSearchCases] = useState("");
  const [searchLogs, setSearchLogs] = useState("");
  const [showCaseForm, setShowCaseForm] = useState(false);
  const [showLogForm, setShowLogForm] = useState(false);
  const [loader, setLoader] = useState(true);
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

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoader(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Navigation items
  const navigationItems = [
    { id: "overview", label: "Overview", icon: Eye },
    { id: "categories", label: "Categories", icon: BarChart3 },
    { id: "cases", label: "Cases", icon: FileText },
    { id: "heatmap", label: "Heatmap", icon: Map },
    { id: "keywords", label: "Keywords", icon: Search },
  ];

  // Scroll to section
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Cards for dashboard
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

  // Filtering logic
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

  // Handlers
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

  return (
    <AnimatePresence mode="wait">
      {loader ? (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center h-screen w-full flex-col"
        >
          <img src={JuvoIcon} className="w-50 h-50 animate-spin" />
        </motion.div>
      ) : (
        <motion.div
          key="dashboard"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen bg-slate-950"
        >
          <Header />
          <FloatingNavigation
            navigationItems={navigationItems}
            scrollToSection={scrollToSection}
          />
          <main className="p-4 sm:p-6 lg:p-8 space-y-8 sm:space-y-12 lg:space-y-16">
            <DashboardOverview cards={cards} />
            <CategoriesSection categoryStats={categoryStats} />
            <CasesManagement
              filteredCases={filteredCases}
              searchCases={searchCases}
              setSearchCases={setSearchCases}
              setShowCaseForm={setShowCaseForm}
              cases={cases}
            />
            <HeatmapSection riskPoints={riskPoints} riskColor={riskColor} />
            <KeywordsSection
              filteredLogs={filteredLogs}
              searchLogs={searchLogs}
              setSearchLogs={setSearchLogs}
              setShowLogForm={setShowLogForm}
              logs={logs}
            />
          </main>
          <CaseFormModal
            showCaseForm={showCaseForm}
            handleAddCase={handleAddCase}
            caseForm={caseForm}
            setCaseForm={setCaseForm}
            setShowCaseForm={setShowCaseForm}
          />
          <LogFormModal
            showLogForm={showLogForm}
            handleAddLog={handleAddLog}
            logForm={logForm}
            setLogForm={setLogForm}
            setShowLogForm={setShowLogForm}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
