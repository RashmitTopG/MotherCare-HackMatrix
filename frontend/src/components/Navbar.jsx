import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import {
  Menu,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context"; // AuthContext

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth(); // Get user & logout function

  // Modal state for profile
  const [open, setOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Define routes where Navbar should be fixed
  const fixedRoutes = ["/dashboard", "/profile", "/pregnancyTips"];
  const currentPath = location.pathname.replace(/\/$/, "");
  const isFixed = fixedRoutes.includes(currentPath);

  if (currentPath === "/book-appointment") return null;

  return (
    <nav
      className={`flex items-center justify-between px-8 py-5 bg-pink-100 shadow-lg 
        ${isFixed ? "fixed top-0 w-full z-50" : ""}`}
    >
      {/* Logo */}
      <div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/background/logo.png" className="w-14 h-14 mr-4" alt="Logo" />
        <div className="text-3xl font-extrabold text-pink-700">MotherCare</div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-8 text-lg font-medium">
        <Link to="/pregnancyTips" className="text-gray-700 hover:text-pink-600">
          Pregnancy Tips
        </Link>
        <Link to="/doctors" className="text-gray-700 hover:text-pink-600">
          Doctors
        </Link>
        <Link to="/community" className="text-gray-700 hover:text-pink-600">
          Community
        </Link>
        <Link to="/cloudOcr" className="text-gray-700 hover:text-pink-600">
          Prescription Check
        </Link>
        <Link to="/drugCheck" className="text-gray-700 hover:text-pink-600">
          Drug Check
        </Link>
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center text-gray-700 hover:text-pink-600"
          >
            More Features <ChevronDown className="w-5 h-5 ml-2" />
          </button>
          {dropdownOpen && (
            <div className="absolute mt-2 w-48 bg-white shadow-md rounded-lg p-2 z-50">
              {" "}
              {/* Added z-50 */}
              <Link
                to="/audio-books"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Audio Books
              </Link>
              <Link
                to="/diet"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Nutrition Guide
              </Link>
              <Link
                to="/childShop"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Baby Essentials
              </Link>

              <Link
                to="/babyName"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Baby Name Suggestion
              </Link>

              <Link
                to="/exercise"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Exercise Plans
              </Link>

              <Link
                to="/expert"
                className="block px-4 py-2 hover:bg-pink-100"
                onClick={() => setDropdownOpen(false)}
              >
                Expert Advice
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Call to Action: My Health & Profile Modal */}
      <div className="flex items-center">
        <Button
          className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 mr-6 rounded-xl shadow-md"
          onClick={() => navigate("/welcome")}
        >
          My Health
        </Button>

        {user ? (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <User
                className="w-10 h-10 text-gray-700 cursor-pointer"
                onClick={() => {
                  setOpen(true);
                  setShowProfile(false);
                }}
              />
            </DialogTrigger>
            <DialogContent className="p-6 w-72 rounded-lg shadow-xl">
              <div className="text-xl font-bold text-pink-600">Profile</div>
              <div className="mt-3 space-y-4">
                <Button
                  className="w-full flex items-center gap-3 text-lg"
                  variant="outline"
                  onClick={() => navigate("/dashboard")}
                >
                  <LayoutDashboard className="w-6 h-6" /> Dashboard
                </Button>
                <Button
                  className="w-full flex items-center gap-3 text-lg"
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  <Settings className="w-6 h-6" /> Profile
                </Button>
                <Button
                  className="w-full flex items-center gap-3 text-lg"
                  variant="outline"
                  onClick={() => navigate("/add-to-cart")}
                >
                  <Settings className="w-6 h-6" /> View Cart
                </Button>
                <Button
                  className="w-full flex items-center gap-3 text-lg bg-red-500 text-white hover:bg-red-600"
                  onClick={() => {
                    logout();
                    setOpen(false);
                    navigate("/login");
                  }}
                >
                  <LogOut className="w-6 h-6" /> Logout
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        ) : (
          <Button
            className="bg-pink-500 hover:bg-pink-600 text-white text-lg px-6 py-3 rounded-xl shadow-md"
            onClick={() => navigate("/signup")}
          >
            Signup
          </Button>
        )}
      </div>
    </nav>
  );
}
