import axios from "axios"
import { useContext } from "react";
import { Spinner } from 'flowbite-react';
import { CardInfo } from "../../components/CardInfo";
import { StarWarsContext } from "../../context/StarWarsContextProvider";
import { ArrowLeftIcon } from "../../components/icons/ArrowLeftIcon";
import { ArrowRightIcon } from "../../components/icons/ArrowRightIcon"

export const VehiclesApp = () => {
    const { vehicles, setVehicles } = useContext(StarWarsContext)

    const getNewPage = (url) => {
        setVehicles()
        axios
            .get(url)
            .then((res) => {
                setVehicles(res?.data)
            })
            .catch((err) => console.log(err))
    }

    return (
        <section className="md:max-w-[600px] lg:max-w-[1300px] h-[800px] text-[#FFC500] mx-auto text-center py-5 ">
            {!vehicles && <Spinner color="warning" className="size-12" />}
            {vehicles && <>
                {(vehicles?.next !== null || vehicles?.previous !== null) &&
                    <div className="flex flex-row justify-center pb-5 gap-x-6">
                        {vehicles?.previous && <button onClick={() => { getNewPage(vehicles?.previous) }}><ArrowLeftIcon /></button>}

                        {vehicles?.next && <button onClick={() => { getNewPage(vehicles?.next) }}><ArrowRightIcon /></button>}
                    </div>}
                <div className="flex flex-row flex-wrap justify-center items-center">
                    {vehicles?.results.map((elem, idx) => (
                        <CardInfo key={idx} elem={elem} link='vehicles' cat='vehicles' id={idx} />
                    ))}
                </div>

            </>}
        </section>
    )
}