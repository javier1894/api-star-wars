import { useEffect, useState } from "react"
import { StarWarLogo } from "./icons/StarWarLogo"
import { Link } from "react-router-dom"
import { BurgerMenuIcon } from "./icons/BurgerMenuIcon"

export const NavbarApp = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth)
    const [showNavbar, setShowNavbar] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            const newWidth = window.innerWidth;
            setWindowWidth(newWidth);
        };

        // Añadir el event listener al montar el componente
        window.addEventListener('resize', handleResize);

        // Retirar el event listener al desmontar el componente
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (showNavbar && !event.target.closest('#modal') && !event.target.closest('#openModal')) {
                setShowNavbar(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [showNavbar]);


    return (
        <header className="flex flex-row sm:flex-col lg:flex-row justify-between items-center mx-auto px-10 md:px-20">
            <Link role="button" to={'/'}><StarWarLogo /></Link>

            {windowWidth >= 640 && <nav className="w-[550px] h-full rounded-full md:px-6 px-3 py-1 flex flex-wrap flex-row items-center justify-center gap-x-2">
                <Link className="text-[#FFC500] hover:bg-[#F2F2F2]/30 p-1 rounded-full px-2 sm:px-3 transition ease-in text-sm sm:text-lg capitalize" to="/people">people</Link>
                <Link className="text-[#FFC500] hover:bg-[#F2F2F2]/30 p-1 rounded-full px-2 sm:px-3 transition ease-in text-sm sm:text-lg capitalize" to="/films">Films</Link>
                <Link className="text-[#FFC500] hover:bg-[#F2F2F2]/30 p-1 rounded-full px-2 sm:px-3 transition ease-in text-sm sm:text-lg capitalize" to="/planets">Planets</Link>
                <Link className="text-[#FFC500] hover:bg-[#F2F2F2]/30 p-1 rounded-full px-2 sm:px-3 transition ease-in text-sm sm:text-lg capitalize" to="/vehicles">Vehicles</Link>
                <Link className="text-[#FFC500] hover:bg-[#F2F2F2]/30 p-1 rounded-full px-2 sm:px-3 transition ease-in text-sm sm:text-lg capitalize" to="/starships">Starships</Link>
            </nav>}

            {windowWidth < 640 && <a id="openModal" onClick={() => { setShowNavbar(!showNavbar) }}><BurgerMenuIcon /></a>}

            {showNavbar && <nav id="modal" className="absolute top-16 right-2 w-[200px] h-[300px] rounded md:px-6 px-3 py-1 flex flex-col items-center justify-evenly  bg-[#FFC500]/80 backdrop-blur-2xl">
                <Link className="text-lg" to='/people' >People</Link>
                <Link className="text-lg" to='/films' >Films</Link>
                <Link className="text-lg" to='/planets' >Planets</Link>
                <Link className="text-lg" to='/vehicles' >Vehicles</Link>
                <Link className="text-lg" to='/starships' >Starships</Link>
            </nav>}
        </header>
    )
}
