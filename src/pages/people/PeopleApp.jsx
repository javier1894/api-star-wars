import axios from "axios"
import { useContext } from "react";
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"


export const PeopleApp = () => {
    const { people, setPeople } = useContext(StarWarsContext)

    const getNewPage = (url) => {
        setPeople()
        axios
            .get(url)
            .then((res) => {
                setPeople(res?.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="md:max-w-[600px] lg:max-w-[1300px] h-[800px] text-[#FFC500] mx-auto text-center py-5 ">
            {!people && <Spinner color="warning" className="size-12" />}
            {people && <>
                {(people?.next !== null || people?.previous !== null) && <div className="flex flex-row justify-center pb-5 gap-x-6">
                    {people?.previous && <button onClick={() => { getNewPage(people?.previous) }}><ArrowLeftIcon /></button>}

                    {people?.next && <button onClick={() => { getNewPage(people?.next) }}><ArrowRightIcon /></button>}
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
