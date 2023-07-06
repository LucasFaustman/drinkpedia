import CocktailData from '../components/cocktailData';
import { faMartiniGlassCitrus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import './App.css'

function App() {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center">
        <h1>Drinkpedia</h1>
        <FontAwesomeIcon icon={faMartiniGlassCitrus} size="lg" className="ml-4" />
      </div>
      <CocktailData />
    </>
  )
}

export default App;
