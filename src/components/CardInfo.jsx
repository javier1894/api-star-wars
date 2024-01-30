/* eslint-disable react/prop-types */
import { useContext, useRef } from 'react';
import { getIdFromUrl, getCatFromUrl, remplazar_img } from '../utils/utils';
import { URL_IMG } from '../constants/constants';
import { Spinner } from 'flowbite-react';
import noImage from '../../public/no-img.jpg'
import { StarWarsContext } from '../context/StarWarsContextProvider';
import { useNavigate } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
export const CardInfo = ({ elem, link }) => {
    const { setOneInfo } = useContext(StarWarsContext)
    const imgRef = useRef()
    const navigate = useNavigate()

    const getId = () => {
        const id = getIdFromUrl(elem.url)
        const cat = getCatFromUrl(elem.url)
        if (cat === 'people' || cat === 'films') {
            setOneInfo(elem)
            navigate(`/${cat}/${id}`)
        }
    }

    return (
        <div
            className="w-56 h-80 m-5 flex flex-col items-center justify-between bg-gray-950 border-4 border-[#FFC500] rounded-lg hover:scale-[110%]"
            role='button'
            onClick={() => { getId() }}
        >
            {link !== 'films' ? <>
                {elem ? <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-t-md object-top  w-full h-56' src={`${URL_IMG}${link}/${getIdFromUrl(elem.url)}.jpg`} /> : <Spinner color="warning" className="size-6" />}
                <h5 className="text-2xl font-bold tracking-tight text-white px-2">
                    {elem?.name}
                </h5>
                <p className="font-normal pb-3 text-white">
                    {elem?.birth_year}
                </p>
            </> : <>{elem ? <img ref={imgRef} onError={() => { remplazar_img(imgRef, noImage) }} className='object-cover rounded-t-md object-top  w-full h-56' src={`${URL_IMG}${link}/${getIdFromUrl(elem.url)}.jpg`} /> : <Spinner color="warning" className="size-6" />}
                <h5 className="text-2xl font-bold tracking-tight text-white px-2">
                    {elem?.title}
                </h5>
                <p className="font-normal pb-3 text-white">
                    {elem?.birth_year}
                </p>
            </>}
        </div>
    )
}
