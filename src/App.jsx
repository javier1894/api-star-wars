import { RoutesApp } from './routes/RoutesApp'
import { StarWarsContextProvider } from './context/StarWarsContextProvider'
import bgVideo from '../public/backgroundGalaxy.mp4'

function App() {

  return (
    <div className='h-[100%] text-white'>
      <div className="relative max-w-[100%] h-[100%]">
        <video autoPlay loop muted className="fixed top-0 left-0 max-w-[100vw] min-h-[100%] -z-10 object-cover">
          <source src={bgVideo} type="video/mp4" />
        </video>
      </div>
      <StarWarsContextProvider>
        <RoutesApp />
      </StarWarsContextProvider>

    </div>
  )
}

export default App
