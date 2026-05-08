import {
  Facebook,
  Instagram,
  Twitter,
  MapPin,
  Phone,
  Mail,
  UtensilsCrossed,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-gray-950 via-gray-900 to-black text-gray-300 overflow-hidden">
      
      {/* Blur Background */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />

      <div className="absolute bottom-0 right-0 w-72 h-72 bg-orange/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        
        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* LOGO & DESC */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              
              <div className="w-12 h-12 rounded-2xl bg-orange flex items-center justify-center shadow-lg">
                <UtensilsCrossed className="w-6 h-6 text-white" />
              </div>

              <h1 className="text-2xl font-extrabold text-white">
                YushingEats
              </h1>
            </div>

            <p className="text-gray-400 leading-relaxed">
              Delicious food delivered fast to your doorstep. 
              Enjoy your favorite meals anytime & anywhere 🍔
            </p>

            {/* Social */}
            <div className="flex items-center gap-4 mt-6">
              
              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange transition-all duration-300 flex items-center justify-center cursor-pointer">
                <Facebook className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange transition-all duration-300 flex items-center justify-center cursor-pointer">
                <Instagram className="w-5 h-5" />
              </div>

              <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-orange transition-all duration-300 flex items-center justify-center cursor-pointer">
                <Twitter className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5">
              Quick Links
            </h2>

            <ul className="space-y-3">
              <li className="hover:text-orange transition-colors cursor-pointer">
                Home
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Restaurants
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Cart
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Profile
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5">
              Support
            </h2>

            <ul className="space-y-3">
              <li className="hover:text-orange transition-colors cursor-pointer">
                Help Center
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Privacy Policy
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Terms & Conditions
              </li>

              <li className="hover:text-orange transition-colors cursor-pointer">
                Contact Us
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h2 className="text-xl font-bold text-white mb-5">
              Contact
            </h2>

            <div className="space-y-4">
              
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-orange mt-1" />

                <p className="text-gray-400">
                  Hanoi, Vietnam
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-orange mt-1" />

                <p className="text-gray-400">
                  +84 123 456 789
                </p>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-orange mt-1" />

                <p className="text-gray-400">
                  support@yushingeats.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          
          <p className="text-sm text-gray-500 text-center md:text-left">
            © 2026 YushingEats. All rights reserved.
          </p>

          <p className="text-sm text-gray-500">
            Made with ❤️ by Yushing Dev
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;