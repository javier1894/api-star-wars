import { useContext, useEffect, useRef, useState } from "react"
import axios from "axios";
import './extendInfo.scss'
import '../pages/home/home.scss'
import { StarWarsContext } from "../context/StarWarsContextProvider"
import { Spinner } from 'flowbite-react';
import { getCatFromUrl, getIdFromUrl, remplazar_img } from '../utils/utils';
import { URL_IMG, URL_API } from '../constants/constants';
import { useParams, useNavigate } from "react-router-dom";
import noImage from '../../public/no-img.jpg'

export const ExtendInfo = () => {
    const { oneInfo, setOneInfo } = useContext(StarWarsContext)
    const imgRef = useRef()
    const { cat, id } = useParams()
    const navigate = useNavigate()
    const [species, setSpecies] = useState()
    const [vehicles, setVehicles] = useState()
    const [starships, setStarships] = useState()
    const [films, setFilms] = useState()
    const [characters, setCharacters] = useState()

    useEffect(() => {
        axios
            .get(`${URL_API}${cat}/${id}`)
            .then((res) => {
                setOneInfo(res?.data)
            })
            .catch((err) => console.log(err))
    }, [setOneInfo, cat, id])

    let category = cat
    if (cat === 'people') {
        category = 'characters'
    }

    useEffect(() => {
        axios
            .get(`${oneInfo?.species[0]}`)
            .then((res) => {
                setSpecies(res.data.name)
            })
            .catch((err) => console.log(err))
    }, [oneInfo?.species])

    useEffect(() => {
        const vehiclesList = []
        for (let i = 0; i < oneInfo?.vehicles?.length; i++) {
            axios
                .get(`${oneInfo?.vehicles[i]}`)
                .then((res) => { vehiclesList.push(res.data) })
                .catch((err) => console.log(err))
        }
        setVehicles(vehiclesList)
    }, [oneInfo?.vehicles])

    useEffect(() => {
        const starshipsList = []
        for (let i = 0; i < oneInfo?.starships?.length; i++) {
            axios
                .get(`${oneInfo?.starships[i]}`)
                .then((res) => { starshipsList.push(res.data) })
                .catch((err) => console.log(err))
        }
        setStarships(starshipsList)
    }, [oneInfo?.starships])

    useEffect(() => {
        const filmsList = []
        for (let i = 0; i < oneInfo?.films?.length; i++) {
            axios
                .get(`${oneInfo?.films[i]}`)
                .then((res) => { filmsList.push(res.data) })
                .catch((err) => console.log(err))
        }
        setFilms(filmsList)
    }, [oneInfo?.films])

    useEffect(() => {
        const charactersList = []
        for (let i = 0; i < oneInfo?.characters?.length; i++) {
            axios
                .get(`${oneInfo?.characters[i]}`)
                .then((res) => { charactersList.push(res.data) })
                .catch((err) => console.log(err))
        }
        setCharacters(charactersList)
    }, [oneInfo?.characters])

    return (
        <>
            {cat === 'people' && <section className="container grid dimension max-w-[1400px] text-[#FFC500] mx-auto text-center py-5 px-10 justify-center">
                <div className="info flex flex-col sm:flex-row bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                    {oneInfo ? <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-t-md sm:rounded-l-md sm:rounded-e-none object-top w-full h-56 sm:w-40 sm:h-full ' src={`${URL_IMG}${category}/${getIdFromUrl(oneInfo.url)}.jpg`} /> : <Spinner color="warning" className="size-6" />}
                    <div className="flex flex-col items-start justify-between p-5">
                        <h6 className="text-2xl font-bold tracking-tight text-white pb-3">
                            {oneInfo?.name}
                        </h6>
                        <p className="font-normal pb-3 text-white">
                            Birth year: <strong>{oneInfo?.birth_year}</strong>
                        </p>
                        <p className="font-normal pb-3 text-white">
                            height: <strong>{oneInfo?.height} cm</strong>
                        </p>
                        <p className="font-normal pb-3 text-white">
                            Mass: <strong>{oneInfo?.mass} kg</strong>
                        </p>
                        <p className="font-normal pb-3 text-white">
                            Skin color: <strong>{oneInfo?.skin_color}</strong>
                        </p>
                        <p className="font-normal pb-3 text-white">
                            Eye color: <strong>{oneInfo?.eye_color}</strong>
                        </p>
                        <p className="font-normal pb-3 text-white">
                            Gender: <strong>{oneInfo?.gender}</strong>
                        </p>
                        {species && <p className="font-normal pb-3 text-white">
                            Species: <strong>{species}</strong>
                        </p>}
                    </div>
                </div>

                {(vehicles && vehicles?.length > 0) &&
                    <div className="vehicles bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                        <div className="flex flex-col items-center justify-evenly h-full p-5">
                            <h6 className="text-2xl font-bold tracking-tight text-white pb-3">Vehicles</h6>
                            <div className="flex flex-col sm:flex-row gap-x-4">
                                {vehicles?.map((elem, idx) => (
                                    <div key={idx}>
                                        <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-full size-36 ' src={`${URL_IMG}${getCatFromUrl(elem.url)}/${getIdFromUrl(elem.url)}.jpg`} />
                                        <p className="text-white py-4 font-semibold">{elem.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}

                {(starships && starships?.length > 0) &&
                    <div className="starships bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                        <div className="flex flex-col items-center justify-evenly h-full p-5">
                            <h6 className="text-2xl font-bold tracking-tight text-white pb-3">Starships</h6>
                            <div className="flex flex-col sm:flex-row gap-x-4">
                                {starships?.map((elem, idx) => (
                                    <div key={idx} >
                                        {idx < 2 && <>
                                            <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-full size-36' src={`${URL_IMG}${getCatFromUrl(elem.url)}/${getIdFromUrl(elem.url)}.jpg`} />
                                            <p className="text-white py-4 font-semibold">{elem.name}</p></>

                                        }</div>
                                ))}
                            </div>
                        </div>
                    </div>}

                {(films && films?.length > 0) &&
                    <div className="films flex flex-wrap bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                        <div className="flex flex-col items-center justify-evenly w-full h-full p-5">
                            <h6 className="text-2xl font-bold tracking-tight text-white pb-3">Films</h6>
                            <div className="flex flex-row flex-wrap justify-center items-center gap-x-10">
                                {films?.map((elem, idx) => (
                                    <div role='button' onClick={() => { navigate(`/${getCatFromUrl(elem.url)}/${getIdFromUrl(elem.url)}`) }} key={idx} className="flex flex-col justify-center items-center pb-5">
                                        <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='h-48 ' src={`${URL_IMG}${getCatFromUrl(elem.url)}/${getIdFromUrl(elem.url)}.jpg`} />
                                        <p className="text-white pt-4 font-semibold">{elem.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}
            </section >}
            {cat === 'films' && <section className="container2 grid justify-center md:max-w-[800px] lg:max-w-[1000px] xl:max-w-[1300px] text-[#FFC500] mx-auto text-center py-5">
                <div className="info2 flex flex-col lg:flex-row bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                    {oneInfo ? <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-t-md sm:rounded-l-md object-top w-full h-[56] lg:w-80  ' src={`${URL_IMG}${category}/${getIdFromUrl(oneInfo.url)}.jpg`} /> : <Spinner color="warning" className="size-6" />}
                    <div className="flex flex-col items-start justify-between p-5">
                        <h6 className="text-2xl font-bold tracking-tight text-white pb-3">
                            {oneInfo?.title}
                        </h6>
                        <p className="text-start font-normal pb-3 text-white">
                            Director: <strong>{oneInfo?.director}</strong>
                        </p>
                        <p className="text-start font-normal pb-3 text-white">
                            Producer: <strong>{oneInfo?.producer}</strong>
                        </p>
                        <p className="text-start font-normal pb-3 text-white">
                            Release date: <strong>{oneInfo?.release_date}</strong>
                        </p>
                        <p className="text-start font-normal pb-3 text-white">
                            Episode: <strong>{oneInfo?.episode_id}</strong>
                        </p>
                        <p className="font-normal text-start pb-3 text-white">
                            Description: <strong>{oneInfo?.opening_crawl}</strong>
                        </p>
                    </div>
                </div>
                {characters?.length > 0 &&
                    <div className="characters flex flex-wrap bg-gray-950 border-4 border-[#FFC500] rounded-lg">
                        <div className="flex flex-col items-center justify-evenly h-full p-5">
                            <h6 className="text-2xl font-bold tracking-tight text-white pb-3">Characters</h6>
                            <div className="flex flex-row flex-wrap justify-center items-center gap-x-10">
                                {characters?.map((elem, idx) => (
                                    <div role='button' onClick={() => { navigate(`/${getCatFromUrl(elem.url)}/${getIdFromUrl(elem.url)}`) }} key={idx} className="flex flex-col justify-center items-center pb-5">
                                        <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='h-48 ' src={`${URL_IMG}characters/${getIdFromUrl(elem.url)}.jpg`} />
                                        <p className="text-white pt-4 font-semibold">{elem.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>}
            </section >
            }
        </>
    )
}
