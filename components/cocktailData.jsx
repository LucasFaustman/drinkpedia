import { useState} from 'react'



export default function CocktailData() {

  const [language, setLanguage] = useState('en')
  const [cocktailData, setCocktailData] = useState([]);
  const [cocktailName, setCocktailName] = useState('')
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  async function fetchCocktailData (e) {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try{
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`,
    );
    const data = await response.json();
    // Check if language is set to Spanish
    // if (language === 'es') {
    //    data.drinks.forEach((cocktail) => {
    // translateText(cocktail.strInstructions);
    //   });
    // }

  setCocktailData(data.drinks);
   setIsLoading(false);
   if (!data.drinks) {
     setError('No drinks found!')
   }
  
}
  catch(error) {
    setIsLoading(false)
    setError('Error loading cocktails. Please try again later.')
  }
}


// async function translateText(instruction) {

//     try {
//       const res = await fetch("https://libretranslate.com/translate", {
//       method: "POST",
//       body: JSON.stringify({
//         q: instruction,
//         source: "en",
//         target: "es",
//       }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const data = await res.json();

//     setCocktailData((prevData) =>
//     prevData.map((cocktail) => {
//       if (cocktail.strInstructions === instruction) {
//         return {
//           ...cocktail,
//           strInstructions: data.translatedText,
//         };
//       }
//       return cocktail;
//     })
//   )
//   } catch(err) {
//     setError('Error translating text at this time. Please try again later.')
//   }

// }




  return (
    <>
    <button 
    aria-label="Change Language"
    onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}>
        Change Language to {language === 'en' ? 'Spanish' : 'English'}
      </button>
      <form>
        <div className="form-group">
          <label htmlFor="cocktail-input">Cocktail Name:</label>
          <input
            value={cocktailName}
            onChange={(e) => setCocktailName(e.target.value)}
            type="text"
            className="form-control"
            id="cocktail-input"
            placeholder="Search Cocktails by name..."
          />
        </div>
        <div className="form-group mt-3 mb-3">
          <button onClick={(e) => fetchCocktailData(e)} className="btn btn-primary">
            Search for Cocktails!
          </button>
        </div>
      </form>
    <div className='container'>
      <div className='row'>
          {cocktailData && cocktailData.map((cocktail) => (
            <div className='card col-md-4' key={cocktail.idDrink}>
                    <img className='card-img-top' src={cocktail.strDrinkThumb} alt={`${cocktail.strDrink} image`}></img>
                    <div className="card-body">

              <h4>{cocktail.strDrink}</h4>
              <h6>Instructions</h6>
              <p>{cocktail.strInstructions}</p>
            </div>
            </div>
          )
          )}
          {isLoading && <p>Loading...</p>}
          {error && <p>{error}</p>}
      </div>
    </div>
    </>
  )
}
