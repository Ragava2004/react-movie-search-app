import { useState } from "react";
function App() {
  const[searchTerm, setSearchTerm] = useState("");
  const[movies, setMovies] = useState([]);
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const search = async () => {
    if(!searchTerm.trim()) {
      alert("Please enter the movie name");
      return;
    }
    const url = `http://www.omdbapi.com/?i=tt3896198&apikey=cc3f2308&s=${searchTerm}`
    setLoading(true);
    const response = await fetch(url);
    const data = await response.json();
    setLoading(false);
    if(data.Response === "False") {
      setError(data.Error);
      setMovies([]);
      setLoading(false);
      return;
    }
    setSearchTerm("");
    setMovies(data.Search);
    setError("");
    setMovie(data.Search);
    

  }
  
  return(
    <div className="app">
      <div className="header">
        <h1>Movie Search App</h1>
      </div>
      <div className="search-container">
        <input className="input" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}
          placeholder="Ex. Avengers"
          onKeyDown={
          (e)=>{
            if(e.key === "Enter") search();
          }   
        }
        />
        <button onClick={search}>Search</button>
      </div>
      
        
      
    
      <div className="Movies">
        {(error || loading || movies.length > 0) && (
          <div className="Movies">
            {error && <h2 className="error">{error}</h2>}
            {loading && <h2>Loading...</h2>}

            {movies.map((e, index) => (
              <div key={index} className="Movie-list">
                <img src={e.Poster !== "N/A" ? e.Poster : "https://via.placeholder.com/300x450?text=No+Image" } alt={e.Title} />
                <h3>{e.Title}</h3>
                <p>Year: {e.Year}</p>
                <p>Type: {e.Type}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
  );
}
export default App;