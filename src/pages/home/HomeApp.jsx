import { useState, useEffect } from 'react';
import './home.scss'

export const HomeApp = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const hasSeenAnimation = localStorage.getItem('hasSeenAnimation');

        if (!hasSeenAnimation) {
            const timer = setTimeout(() => {
                setIsVisible(true);
                localStorage.setItem('hasSeenAnimation', 'true');
            }, 24000);

            return () => clearTimeout(timer);
        } else {
            setIsVisible(true);
        }
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }
    }, []);

    const handleBeforeUnload = () => {
        localStorage.removeItem('hasSeenAnimation');
    };

    return (
        <div className='overflow-hidden '>
            {!isVisible &&
                <section className="starWarsText text-[#FFC500] mx-auto text-center px-20 sm:px-44 lg:px-80 ">
                    <h2 className='pb-5 md:pb-10 lg:pb-20 text-xl md:text-2xl lg:text-6xl font-bold'>Star Wars App</h2>
                    <p className='text-base md:text-xl lg:text-2xl leading-relaxed mb-5 md:mb-10 lg:mb-20 text-pretty'>
                        It is a period of civil wars in the galaxy. A brave alliance of clandestine freedom fighters has challenged the tyranny and oppression of the formidable GALACTIC EMPIRE.
                    </p>
                    <p className='text-base md:text-xl lg:text-2xl leading-relaxed mb-5 md:mb-10 lg:mb-20 text-pretty'>
                        Striking from a hidden fortress among the billion stars of the galaxy, rebel spaceships have won their first victory in a battle with the powerful Imperial starfleet. The EMPIRE fears that another defeat could lead to a thousand more solar systems joining the rebellion, and Imperial control over the galaxy would be lost forever.
                    </p>
                    <p className='text-base md:text-xl lg:text-2xl leading-relaxed mb-5 md:mb-10 lg:mb-20 text-pretty'>
                        To crush the rebellion once and for all, the EMPIRE is building a new sinister battle station. Powerful enough to destroy an entire planet, its completion spells certain doom for the champions of freedom.
                    </p>
                </section >
            }
            {isVisible && <section className='text mx-auto flex flex-col justify-center items-center'>
                <h1 className='text-[#FFC500] text-xl md:text-5xl lg:text-6xl font-semibold'>Bienvenidos a la app de Star Wars</h1>
                <img src='../../../public/starWarIcon.svg' alt="" className='size-80' />
            </section>}
        </div>
    )
}
