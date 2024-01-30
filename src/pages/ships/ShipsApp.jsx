import axios from "axios"
import { useContext } from "react";
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const ShipsApp = () => {
    const { ships, setShips } = useContext(StarWarsContext)

    const getNewPage = (url) => {
        setShips()
        axios
            .get(url)
            .then((res) => {
                setShips(res?.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="md:max-w-[600px] lg:max-w-[1300px] h-[800px] text-[#FFC500] mx-auto text-center py-5 ">
            {!ships && <Spinner color="warning" className="size-12" />}
            {ships && <>
                {(ships?.next !== null || ships?.previous !== null) &&
                    <div className="flex flex-row justify-center pb-5 gap-x-6">
                        {ships?.previous && <button onClick={() => { getNewPage(ships?.previous) }}><ArrowLeftIcon /></button>}

                        {ships?.next && <button onClick={() => { getNewPage(ships?.next) }}><ArrowRightIcon /></button>}
                    </div>}
                <div className="flex flex-row flex-wrap justify-center items-center">
                    {ships?.results.map((elem, idx) => (
                        <CardInfo key={idx} elem={elem} link='starships' cat='starships' id={idx} />
                    ))}
                </div>

            </>}
        </section>
    )
}