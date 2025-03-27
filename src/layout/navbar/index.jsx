import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logof.avif";
import BarLogo from "../../assets/logof2.avif";
import Button from "../../components/button";
import { Link as ScrollLink } from 'react-scroll';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        AOS.init({
            duration: 800,
        });
         AOS.refresh();
    }, []);

    return (
        <div className="bg-[#EC0000] fixed top-0 right-0 shadow-2xl left-0 z-50 px-5 sm:px-[50px]">
            <div className="nav-in flex items-center justify-between py-2 sm:py-4">
                <div
                    data-aos='flip-down'
                    className="lg:hidden flex items-center gap-3">
                    <button onClick={() => setIsOpen(true)}>
                        <img src={BarLogo} alt="Menu Icon" className="w-[28px] h-[30px] sm:w-[45px] sm:h-[40px] lazyload" />
                    </button>
                </div>

                <Link to="/" className="hidden xl:flex">
                    <img
                        data-aos='flip-down'
                        src={Logo}
                        alt="Logo"
                        className="w-[180px] h-auto lazyload" />
                </Link>

                <Link to="/" className="hidden max-xl:flex max-lg:hidden">
                    <img
                        data-aos='flip-down'
                        src={BarLogo}
                        alt="Menu Icon"
                        className="w-[28px] h-[30px] sm:w-[45px] sm:h-[40px]" />
                </Link>

                <div className="hidden lg:flex flex-1 justify-center">

                    <ul
                        data-aos='flip-down'
                        className="flex items-center xl:text-xl gap-[30px] sm:gap-[20px]">
                        <li>
                            <ScrollLink
                                to="about"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire] ml-3"
                            >
                                Biz haqimizda
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="teachers"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire] "
                            >
                                O‘qituvchilarimiz
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="courses"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire]"
                            >
                                Kurslarimiz
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="books"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire]"
                            >
                                Kitoblarimiz
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="faq"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire]"
                            >
                                FAQ
                            </ScrollLink>
                        </li>
                        <li>
                            <ScrollLink
                                to="contact"
                                smooth={true}
                                duration={500}
                                offset={-70}
                                className="text-white uppercase font-[Aquire]"
                            >
                                Kontakt
                            </ScrollLink>
                        </li>
                    </ul>

                </div>

                <div
                    data-aos='flip-down'
                    className="login-btn flex items-center gap-3 ml-3 text-xl xl:text-2xl">
                    <Link to="/login">
                        <Button title="Kirish" background="bg-white" textColor="text-[#EC0000]" />
                    </Link>
                </div>
            </div>

            {isOpen && (
                <div
                    className="fixed inset-0 bg-gray-500 opacity-70 z-40"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            <div
                className={`mobile-menu flex flex-col justify-between items-start pr-6 lg:hidden fixed top-0 left-0 h-full font-[Aquire] w-[70%] min-[500px]:w-[60%] bg-white text-black shadow-lg transition-transform duration-300 ease-in-out z-50 ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>

                <div
                    className="py-6 px-5 ml-[85%]">
                    <button onClick={() => setIsOpen(false)} className="text-black text-2xl">
                        <i className="fa-solid fa-x"></i>
                    </button>
                </div>

                <ul
                    className="flex flex-col gap-6 px-6 text-[18px] min-[500px]:text-2xl">
                    <li>
                        <ScrollLink
                            to="about"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Biz haqimizda
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="teachers"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            O‘qituvchilarimiz
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="courses"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Kurslarimiz
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="books"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Kitoblarimiz
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="faq"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            FAQ
                        </ScrollLink>
                    </li>
                    <li>
                        <ScrollLink
                            to="contact"
                            smooth={true}
                            duration={500}
                            offset={-70}
                            className="uppercase font-semibold hover:underline cursor-pointer"
                            onClick={() => setIsOpen(false)}
                        >
                            Kontakt
                        </ScrollLink>
                    </li>
                </ul>


                <h1 className="textGrow font-[Andasia Personal Use] font-normal text-[26px] px-10 leading-[100%] tracking-normal">
                    We grow together!
                </h1>
            </div>
        </div>
    );
}

export default Navbar;
