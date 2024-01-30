import axios from "axios"
import { useContext } from "react";
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const MoviesApp = () => {
    const { films, setFilms } = useContext(StarWarsContext)

    const getNewPage = (url) => {
        setFilms()
        axios
            .get(url)
            .then((res) => {
                setFilms(res?.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="md:max-w-[600px] lg:max-w-[1300px] h-[800px] text-[#FFC500] mx-auto text-center py-5 ">
            {!films && <Spinner color="warning" className="size-12" />}
            {films && <>
                {(films?.next !== null || films?.previous !== null) && <div className="flex flex-row justify-center pb-8 gap-x-6">
                    {films?.previous && <button onClick={() => { getNewPage(films?.previous) }}><ArrowLeftIcon /></button>}

                    {films?.next && <button onClick={() => { getNewPage(films?.next) }}><ArrowRightIcon /></button>}
                </div>}

                <div className="flex flex-row flex-wrap justify-center items-center">
                    {films?.results.map((elem, idx) => (
                        <CardInfo key={idx} elem={elem} link='films' cat='films' id={idx} />
                    ))}
                </div>

            </>}
        </section>
    )
}
