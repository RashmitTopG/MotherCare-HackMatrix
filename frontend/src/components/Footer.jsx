import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-pink-100 text-pink-800 py-8">
      <div className="max-w-6xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left items-start">
          {/* Logo & About Section */}
          <div className="flex flex-col items-center md:items-start space-y-3">
            <img src="/background/logo.png" alt="Mother Care Logo" className="w-28 h-28" />
            <p className="text-md text-pink-700 font-medium leading-relaxed">
              Mother Care is dedicated to providing essential health tips, expert advice, and community support for expecting mothers.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-pink-700 mb-3">Quick Links</h3>
            <ul className="text-md space-y-2">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Pregnancy Tips</a></li>
              <li><a href="#" className="hover:underline">Doctor Consultation</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
            </ul>
          </div>

          {/* Contact & Socials */}
          <div>
            <h3 className="text-lg font-bold text-pink-700 mb-3">Contact</h3>
            <p className="text-md flex items-center justify-center md:justify-start gap-2">
              <Mail className="w-5 h-5 text-pink-600" /> support@mothercare.com
            </p>
            <p className="text-md mt-2 flex items-center justify-center md:justify-start gap-2">
              <Phone className="w-5 h-5 text-pink-600" /> +1 234 567 890
            </p>
            <div className="flex justify-center md:justify-start space-x-5 mt-4">
              <a href="#" className="text-pink-600 hover:text-pink-800"><Facebook className="w-7 h-7" /></a>
              <a href="#" className="text-pink-600 hover:text-pink-800"><Instagram className="w-7 h-7" /></a>
              <a href="#" className="text-pink-600 hover:text-pink-800"><Twitter className="w-7 h-7" /></a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-pink-300 pt-4 text-center text-md font-medium">
          &copy; 2025 Mother Care. All rights reserved.
        </div>
      </div>
    </footer>
  );
}