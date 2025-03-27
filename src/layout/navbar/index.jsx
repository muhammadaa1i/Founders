import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, scroller } from "react-scroll";
import Logo from "../../assets/logof.avif";
import BarLogo from "../../assets/logof2.avif";
import Button from "../../components/button";
import AOS from "aos";
import "aos/dist/aos.css";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const isHomePage = location.pathname === "/";

    useEffect(() => {
        AOS.init({ duration: 800 });
        AOS.refresh();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleNavigation = (section) => {
        if (isHomePage) {
            // If already on home, scroll directly
            scroller.scrollTo(section, { smooth: true, duration: 500, offset: -70 });
        } else {
            // Navigate to home first, then scroll after page loads
            navigate(`/#${section}`);
            setTimeout(() => {
                scroller.scrollTo(section, { smooth: true, duration: 500, offset: -70 });
            }, 500); // Delay to ensure navigation completes
        }
        setIsOpen(false); // Close mobile menu
    };

    const menuItems = [
        { name: "Biz haqimizda", to: "about" },
        { name: "O‘qituvchilarimiz", to: "teachers" },
        { name: "Kurslarimiz", to: "courses" },
        { name: "Kitoblarimiz", to: "books" },
        { name: "FAQ", to: "faq" },
        { name: "Kontakt", to: "contact" },
    ];

    return (
        <div className={`fixed top-0 right-0 left-0 z-50 px-5 sm:px-[50px] transition-all duration-300 ${isScrolled ? "bg-[#c00000] shadow-md py-2" : "bg-[#EC0000] py-4"}`}>
            <div className="nav-in flex items-center justify-between">
                {/* Mobile Menu Button */}
                <div data-aos="flip-down" className="lg:hidden flex items-center gap-3">
                    <button onClick={() => setIsOpen(true)}>
                        <img src={BarLogo} alt="Menu Icon" className="w-[28px] h-[30px] sm:w-[45px] sm:h-[40px] lazyload" />
                    </button>
                </div>

                {/* Desktop Logo */}
                <Link to="/" className="hidden 2xl:flex">
                    <img data-aos="flip-down" src={Logo} alt="Logo" className="w-[180px] h-auto lazyload" />
                </Link>

                <Link to="/" className="hidden max-2xl:flex max-lg:hidden">
                    <img data-aos="flip-down" src={BarLogo} alt="Menu Icon" className="w-[28px] h-[30px] sm:w-[45px] sm:h-[40px]" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <ul data-aos="flip-down" className="flex items-center xl:text-xl gap-[30px] sm:gap-[20px]">
                        {menuItems.map((item, index) => (
                            <li key={index}>
                                <button className="text-white uppercase font-[Aquire] ml-3 cursor-pointer" onClick={() => handleNavigation(item.to)}>
                                    {item.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Login Button */}
                <div data-aos="flip-down" className="login-btn flex items-center gap-3 ml-3 text-xl xl:text-2xl">
                    <Link to="/login">
                        <Button title="Kirish" background="bg-white" textColor="text-[#EC0000]" />
                    </Link>
                </div>
            </div>

            {/* Overlay (when mobile menu is open) */}
            {isOpen && <div className="fixed inset-0 bg-gray-500 opacity-70 z-40" onClick={() => setIsOpen(false)}></div>}

            {/* Mobile Menu */}
            <div className={`mobile-menu flex flex-col justify-between items-start pr-6 lg:hidden fixed top-0 left-0 h-full font-[Aquire] w-[70%] min-[500px]:w-[60%] bg-white text-black shadow-lg transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="py-6 px-5 ml-[85%]">
                    <button onClick={() => setIsOpen(false)} className="text-black text-2xl">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>

                <ul className="flex flex-col gap-6 px-6 text-[18px] min-[500px]:text-2xl">
                    {menuItems.map((item, index) => (
                        <li key={index}>
                            <button className="uppercase font-semibold hover:underline cursor-pointer" onClick={() => handleNavigation(item.to)}>
                                {item.name}
                            </button>
                        </li>
                    ))}
                </ul>

                <h1 className="textGrow font-[Andasia Personal Use] font-normal text-[26px] px-10 leading-[100%] tracking-normal">
                    We grow together!
                </h1>
            </div>
        </div>
    );
}

export default Navbar;
