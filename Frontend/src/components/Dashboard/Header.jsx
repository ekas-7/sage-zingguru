import { Home, Cpu, Notebook, Briefcase, PlaySquare, Menu, X, Milestone, KeyboardMusic } from "lucide-react";
import { HeaderIcon } from "./HeaderIcon";
import { UserProfile } from "./UserProfile";
import { useState } from "react";
import logo from "../../assets/logo.png";
import DarkModeToggle from "../ui/DarkModeToggle";
import { Medal, Shield, Star, Gem } from "lucide-react";


import { useSelector } from "react-redux";

const badgeTiers = {
  gold: { color: "bg-yellow-500", icon: <Medal className="text-yellow-300" /> },
  silver: { color: "bg-gray-400", icon: <Shield className="text-gray-200" /> },
  iron: { color: "bg-gray-600", icon: <Star className="text-gray-400" /> },
  wood: { color: "bg-orange-700", icon: <Gem className="text-orange-500" /> },
};
export const Header = ({ onNavItemClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState('home'); // Add state for active page
  const badge = badgeTiers.gold;
  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "ai-assistant", icon: Cpu, label: "AI Assistant" },
    { id: "notion", icon: Notebook, label: "Notion" },
    { id: "career-path", icon: Briefcase, label: "Career Path" },
    { id: "video-summarizer", icon: PlaySquare, label: "Video Summarizer" },
    { id: "milestones", icon: Milestone, label: "Milestones" },
    { id: "studio", icon: KeyboardMusic, label: "Studio" },
  ];

  const handleNavItemClick = (id) => {
    setActivePage(id); // Update active page when clicking
    onNavItemClick(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-black dark:bg-gray-900 text-white px-6 py-4">
      <nav className="flex items-center justify-between max-w-7xl mx-auto">
        <img
          src={logo}
          className="w-24 hover:scale-110 transition-transform duration-300 ease-in-out cursor-pointer"
          alt="Logo"
        />

        {/* Desktop Menu */}
        <div className="hidden md:flex flex-1 items-center justify-center space-x-8">
          {navItems.map(({ id, icon: Icon, label }) => (
            <HeaderIcon
              key={id}
              onClick={() => handleNavItemClick(id)}
              className={`cursor-pointer transition-all duration-300 ease-in-out ${
                activePage === id
                  ? "bg-[#ADFF00] font-bold text-black px-4 py-2 rounded-lg"
                  : ""
              }`}
            >
              <Icon className="w-5 h-5" />
              {activePage === id && <span className="text-sm ml-2">{label}</span>}
            </HeaderIcon>
          ))}
        </div>

        {/* Mobile Menu Button and Dark Mode Toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white transition-transform duration-300 ease-in-out"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className="pr-5 flex justify-center items-center">
            <DarkModeToggle />
          </div>
        </div>
        
        <div className={`flex items-center gap-2 p-2 rounded-lg ${badge.color}`}> 
      {badge.icon}
      <span className="text-white font-bold capitalize">Gold</span>
    </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-full px-4 left-0 right-0 pb-4 rounded-b-4xl bg-black dark:bg-gray-900 shadow-lg md:hidden">
            <div className="p-4 space-y-4">
              <HeaderIcon
                onClick={() => setIsMobileMenuOpen(false)}
                className="cursor-pointer w-full transition-all pb-3 duration-300 ease-in-out text-white"
              >
                <UserProfile />
              </HeaderIcon>
              {navItems.map(({ id, icon: Icon, label }) => (
                <HeaderIcon
                  key={id}
                  onClick={() => handleNavItemClick(id)}
                  className={`cursor-pointer w-full transition-all duration-300 ease-in-out ${
                    activePage === id ? "text-[#ADFF00]" : "text-white"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-sm ml-2">{label}</span>
                </HeaderIcon>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Profile */}
        <div className="hidden md:flex">
          <UserProfile />
        </div>
      </nav>
    </header>
  );
};