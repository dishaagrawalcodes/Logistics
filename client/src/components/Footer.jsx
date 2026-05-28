import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const socialIcons = [
  {
    Icon: FaFacebookF,
    link: "https://www.facebook.com",
    hover: "hover:text-[#1877F2]",
  },
  {
    Icon: FaXTwitter,
    link: "https://x.com",
    hover: "hover:text-white",
  },
  {
    Icon: FaInstagram,
    link: "https://www.instagram.com",
    hover: "hover:text-pink-500",
  },
];

const Footer = () => {
  return (
    <footer className="bg-[#0b0d0c] text-gray-400">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10 flex flex-col md:flex-row justify-between gap-8">
        {/* BRAND */}
        <div>
          <img
            src="/logo.png"
            alt="LOGISTICS Express"
            className="h-12 invert mb-3"
          />
          <p className="text-sm text-white max-w-sm">
             Logistic Express is the best packers and movers company in
            Bhubaneswar
          </p>
        </div>

        {/* CONTACT QUICK */}
        <div className="text-sm md:text-right space-y-1">
          <p className="text-white font-medium"> <a href="tel:+919xxxxxxxx" className="hover:text-white">
              +91-9xxxxxxxxxx
            </a></p>
          <p>info@logistics.in</p>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-white/10" />

      {/* MAIN GRID */}
      <div className="max-w-7xl mx-auto px-6 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* CITY WISE */}
        <div>
          <h4 className="text-white font-medium mb-4">
            <span className="text-4xl pr-[1px]">C</span>ity Wise Packers and Movers
          </h4>
          <ul className="text-sm space-y-1">
            {[
              "Bhubaneswar",
              "Cuttack",
              "Ambala",
              "Faridabad",
              "Gurgaon",
              "Patna",
              "Ranchi",
              "Hyderabad",
              "Warangal",
              "Agra",
              "Chandigarh",
              "Dehradun",
              "Delhi",
              "Jaipur",
              "Noida",
            ].map((city) => (
              <li key={city}>
  <Link
    to={`/packers-movers/${city}`}
    className="hover:text-white"
  >
    Packers & Movers {city}
  </Link>
</li>
            ))}
          </ul>
        </div>

        {/* ODISHA */}
        <div>
          <h4 className="text-white font-medium mb-4">
             <span className="text-4xl pr-[0.5px] uppercase">p</span>ackers and Movers in Odisha
          </h4>
          <ul className="text-sm space-y-1">
            {[
              "Puri",
              "Angul",
              "Balangir",
              "Balasore",
              "Bhadrak",
              "Cuttack",
              "Ganjam",
              "Jagatsinghapur",
              "Jajpur",
              "Jharsuguda",
              "Keonjhar",
              "Khordha",
              "Nayagarh",
              "Sambalpur",
              "Sundargarh",
            ].map((city) => (
              <li key={city}>
  <Link
    to={`/packers-movers/${city}`}
    className="hover:text-white"
  >
    Packers & Movers {city}
  </Link>
</li>
            ))}
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-white font-medium mb-4"> <span className="text-4xl pr-[1px]">C</span>ontact</h4>

          <p className="text-sm text-white font-medium mb-2">
            Bhubaneswar Office
          </p>

          <p className="text-sm mb-4 leading-relaxed">
            Logistics Express <br />
            Plot No 654, Cuttack Road, Bhubaneswar, Odisha, India – 751006
          </p>

          <p className="text-sm mb-1">
            <span className="text-white font-medium">Phone:</span>{" "}
            <a href="tel:+919xxxxxxxxxx" className="hover:text-white">
              +91-9xxxxxxxxxx
            </a>
          </p>

          <p className="text-sm">
            <span className="text-white font-medium">Email:</span>{" "}
            <a
              href="mailto:info@logistics.in"
              className="hover:text-white"
            >
              info@logistics.in
            </a>
          </p>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="text-white font-medium mb-4"> <span className="text-4xl pr-[1px]">F</span>ollow Us</h4>
          <div className="flex gap-4 text-lg">
            {socialIcons.map(({ Icon, link, hover }, i) => (
              <a
                key={i}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition ${hover}`}
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t sm:mx-32 border-[#761aa8]" />

      {/* BOTTOM BAR */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row text-gray-300 justify-between text-sm">
        <p className="hover:text-white">Copyright © 2026. All rights reserved.</p>

        <div className="flex gap-6 mt-2 md:mt-0">
          <span className="hover:text-white cursor-pointer">Privacy</span>
          <span className="hover:text-white cursor-pointer">Terms</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
