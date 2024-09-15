import {useState, createContext,useContext,useRef} from "react";
import './App.css';
const WordContext = createContext();


function Search(){
const word=useRef("");
const [searchWord, setsearchWord]= useState("");
function handleWordWritten(){
    setsearchWord(word.current.value);
    console.log(word.current.value);
    console.log(searchWord);
}
    return (
        <div className="myPage relative flex justify-center p-5">
            <nav className="fixed flex w-2/3">
              <svg id="bookIcon" xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><g fill="none" fill-rule="evenodd" stroke="#838383" stroke-linecap="round" stroke-width="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg>
              <button> </button>
              <svg className="Moon absolute right-0 top-2"id="ThemeIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
        </nav>
            <div className="SearchField  relative m-16 mt-20 border-2 rounded-xl bg-stone-200 w-2/3 flex justify-center"> 
            <input className="SearchInput h-12 w-4/5 text-xs p-2 bg-stone-200" placeholder="Search for word" ref={word}></input>
            <svg id="searchIcon" className="absolute right-5 top-3 " onClick={handleWordWritten} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18"><path fill="none" stroke="#A445ED" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m12.663 12.663 3.887 3.887M1 7.664a6.665 6.665 0 1 0 13.33 0 6.665 6.665 0 0 0-13.33 0Z"/></svg>
            </div>

            <WordContext.Provider value={searchWord}>
             <DataFetching />
            </WordContext.Provider>
        </div>
        
    );
}

export function DataFetching(){
    let WordData=useRef([]);
   const [dataa, setData] = useState([]);
    const wordSearched = useContext(WordContext);
      fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearched}`)
     .then(response => response.json())
    .then(data => {displayData(data)})
    .catch(error => console.error('Error:', error));
    function displayData(data){
        console.log(data[0].word);
        setData(data);
        console.log(dataa[0].word);
    }
return (
    <div className="absolute flex justify-center pt-36">
        <h1>{}</h1>
    </div>
)
}
export default Search;

