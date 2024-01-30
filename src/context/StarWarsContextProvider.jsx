import { useState, useEffect, createContext } from 'react'
import axios from 'axios'
export const StarWarsContext = createContext()

// eslint-disable-next-line react/prop-types
export const StarWarsContextProvider = ({ children }) => {
    const [people, setPeople] = useState()
    const [planets, setPlanets] = useState()
    const [films, setFilms] = useState()
    const [vehicles, setVehicles] = useState()
    const [ships, setShips] = useState()
    const [oneInfo, setOneInfo] = useState()

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/people")
            .then((res) => {
                setPeople(res?.data)
            })
            .catch((err) => console.log(err))
    }, [oneInfo])

    useEffect(() => {

        axios
            .get("https://swapi.dev/api/planets")
            .then((res) => {
                setPlanets(res?.data)
            })
            .catch((err) => console.log(err))
    }, [oneInfo])

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/films")
            .then((res) => {
                setFilms(res?.data)
            })
            .catch((err) => console.log(err))
    }, [oneInfo])

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/vehicles")
            .then((res) => {
                setVehicles(res?.data)
            })
            .catch((err) => console.log(err))
    }, [oneInfo])

    useEffect(() => {
        axios
            .get("https://swapi.dev/api/starships")
            .then((res) => {
                setShips(res?.data)
            })
            .catch((err) => console.log(err))
    }, [oneInfo])

    return (
        <>
            <StarWarsContext.Provider
                value={{
                    people,
                    setPeople,
                    planets,
                    setPlanets,
                    films,
                    setFilms,
                    vehicles,
                    setVehicles,
                    ships,
                    setShips,
                    oneInfo,
                    setOneInfo
                }}
            >
                {children}
            </StarWarsContext.Provider>
        </>
    )
}
