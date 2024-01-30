import axios from "axios"
import { useContext, useState } from "react";
import '../home/home.scss'
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const ShipsApp = () => {
    const { ships, setShips } = useContext(StarWarsContext)
    const [numPage, setNumPage] = useState(1)

    const getNewPage = (url, n) => {
        setShips()
        axios
            .get(url)
            .then((res) => {
                setShips(res?.data)
                if (n === 1) {
                    setNumPage(numPage + 1)
                } else if (n === 0) {
                    setNumPage(numPage - 1)
                }
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="dimension max-w-[1400px] text-[#FFC500] mx-auto text-center py-5 px-10">
            {!ships && <Spinner color="warning" className="size-12" />}
            {ships && <>
                {(ships?.next !== null || ships?.previous !== null) &&
                    <div className="flex flex-row justify-center items-center pb-5 gap-x-6">
                        {ships?.previous && <button onClick={() => { getNewPage(ships?.previous, 0) }}><ArrowLeftIcon /></button>}
                        <p className="font-semibold">Page {numPage}</p>
                        {ships?.next && <button onClick={() => { getNewPage(ships?.next, 1) }}><ArrowRightIcon /></button>}
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