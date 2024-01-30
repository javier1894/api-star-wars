import axios from "axios"
import { useContext } from "react";
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const PlanetsApp = () => {
    const { planets, setPlanets } = useContext(StarWarsContext)

    const getNewPage = (url) => {
        setPlanets()
        axios
            .get(url)
            .then((res) => {
                setPlanets(res?.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="md:max-w-[600px] lg:max-w-[1300px] h-[800px] text-[#FFC500] mx-auto text-center py-5 ">
            {!planets && <Spinner color="warning" className="size-12" />}
            {planets && <>
                {(planets?.next !== null || planets?.previous !== null) &&
                    <div className="flex flex-row justify-center pb-5 gap-x-6">
                        {planets?.previous && <button onClick={() => { getNewPage(planets?.previous) }}><ArrowLeftIcon /></button>}

                        {planets?.next && <button onClick={() => { getNewPage(planets?.next) }}><ArrowRightIcon /></button>}
                    </div>}
                <div className="flex flex-row flex-wrap justify-center items-center">
                    {planets?.results.map((elem, idx) => (
                        <CardInfo key={idx} elem={elem} link='planets' cat='planets' id={idx} />
                    ))}
                </div>

            </>}
        </section>
    )
}