import axios from "axios"
import { useContext, useState } from "react";
import '../home/home.scss'
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const PeopleApp = () => {
    const { people, setPeople } = useContext(StarWarsContext)
    const [numPage, setNumPage] = useState(1)

    const getNewPage = (url, n) => {
        setPeople()
        axios
            .get(url)
            .then((res) => {
                setPeople(res?.data)
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
            {!people &&
                <Spinner color="warning" className="size-12" />}
            {people && <>
                {(people?.next !== null || people?.previous !== null) && <div className="flex flex-row justify-center items-center pb-5 gap-x-6">
                    {people?.previous && <button onClick={() => { getNewPage(people?.previous, 0) }}><ArrowLeftIcon className="hover:scale-[110%]" /></button>}
                    <p className="font-semibold">Page {numPage}</p>
                    {people?.next && <button onClick={() => { getNewPage(people?.next, 1) }}><ArrowRightIcon className="hover:scale-[105%]" /></button>}
                </div>}
                <div className="flex flex-row flex-wrap justify-center items-center">
                    {people?.results.map((elem, idx) => (
                        <CardInfo key={idx} elem={elem} link='characters' />
                    ))}
                </div>
            </>}
        </section>
    )
}
