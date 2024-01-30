import { BrowserRouter, Route, Routes } from "react-router-dom"
import { NavbarApp } from "../components/NavbarApp"
import { HomeApp } from "../pages/home/HomeApp"
import { PeopleApp } from "../pages/people/PeopleApp"
import { MoviesApp } from "../pages/movies/MoviesApp"
import { PlanetsApp } from "../pages/planets/PlanetsApp"
import { VehiclesApp } from "../pages/vehicles/VehiclesApp"
import { ShipsApp } from "../pages/ships/ShipsApp"
import { ExtendInfo } from "../components/ExtendInfo"


export const RoutesApp = () => {
    return (
        <BrowserRouter>
            <NavbarApp />
            <Routes>
                <Route path="/" element={<HomeApp />} />
                <Route path="/people" element={<PeopleApp />} ></Route>
                <Route path="/films" element={<MoviesApp />} />
                <Route path="/planets" element={<PlanetsApp />} />
                <Route path="/vehicles" element={<VehiclesApp />} />
                <Route path="/starships" element={<ShipsApp />} />
                <Route path="/:cat/:id" element={<ExtendInfo />} />
            </Routes>
        </BrowserRouter>
    )
}
