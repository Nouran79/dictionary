import {useState, createContext,useContext,useRef, useEffect} from "react";
import './App.css';
const WordContext = createContext();


function Search(){
const word=useRef("");
const [searchWord, setsearchWord]= useState("");
function handleWordWritten(){
    setsearchWord(word.current.value);
}
    return (
        <div className="myPage relative flex justify-center p-5 ">
            <nav className="fixed flex w-1/2 z-10 bg-grey-100">
              <svg id="bookIcon" xmlns="http://www.w3.org/2000/svg" width="34" height="38" viewBox="0 0 34 38"><g fill="none" fill-rule="evenodd" stroke="#838383" stroke-linecap="round" stroke-width="1.5"><path d="M1 33V5a4 4 0 0 1 4-4h26.8A1.2 1.2 0 0 1 33 2.2v26.228M5 29h28M5 37h28"/><path stroke-linejoin="round" d="M5 37a4 4 0 1 1 0-8"/><path d="M11 9h12"/></g></svg>
              <button> </button>
              <svg className="Moon absolute right-0 top-2"id="ThemeIcon" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"><path fill="none" stroke="#838383" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M1 10.449a10.544 10.544 0 0 0 19.993 4.686C11.544 15.135 6.858 10.448 6.858 1A10.545 10.545 0 0 0 1 10.449Z"/></svg>
            </nav>
            <div className="SearchField  relative m-16 mt-20 border-2 rounded-xl bg-stone-200 w-1/2 flex justify-center"> 
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
    const wordSearched = useContext(WordContext);
    const body= document.querySelector(".body");
    useEffect(
        ()=>{
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordSearched}`)
                .then(response => response.json())
                .then(data => {displayData(data)})
                .catch(error => console.error('Error:', error));
        }
    )
    
    function displayData(data){
        let count =0;
        const wordData=` 
        <div class="word-and-sound flex w-full  border-b-2  border-grey-300  h-1/5"> 
           <div class="right-side ">
            <h1 class="text-5xl bold mx-6"> ${data[0].word}</h1> 
            <h2 class="text-xl mx-1 text-fuchsia-500 mt-2 mb-6 mx-7">  ${data[0].phonetic}</h2>
            </div>
           
            ${data[0].phonetics.map(phon => {
                if(count!==1){
                    if (phon.audio !== "") {
                    count =1;
                    return ` <div class="AUDIO-part absolute right-0">
                                <svg id="playSound" onClick="new Audio('${phon.audio}').play();"
                                    xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75">
                                    <g fill="#A445ED" fill-rule="evenodd">
                                    <circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/>
                                    <path d="M29 27v21l21-10.5z"/>
                                    </g>
                                </svg>
                          </div>
                            `;
                    }
                }
                return '';
            }).join('')}

   

        </div>
        <div class="absolute left-0 top-32">

            ${ data[0].meanings.map((meaning)=>{
                return `
                <div class="">
                <p> ${meaning.partOfSpeech}</p>  
                <div>
                <ul class="list-disc ml-5">
                ${meaning.definitions.map(def => {
            return `
              <li> ${def.definition}</li>
               <ul class="list-disc ml-5">
              ${def.example ? `<li>${def.example}</li>` : ''}
              ${def.synonyms.length ? `<li>Synonyms: ${def.synonyms.join(', ')}</li>` : ''}
              ${def.antonyms.length ? `<li>Antonyms: ${def.antonyms.join(', ')}</li>` : ''}
              </ul>
            `;
          }).join('')}
             </ul>
          <ul class="list-disc ml-5">
          ${meaning.synonyms.length ? `<li>Synonyms: ${meaning.synonyms.join(', ')}</li>` : ''}
          </ul>
            <ul class="list-disc ml-5">
          ${meaning.antonyms.length ? `<li>Antonyms: ${meaning.antonyms.join(', ')}</li>` : ''}
           </ul>
                `
                   
        })
            }  
            </div>
`

        body.innerHTML+=wordData;
        // data[0].phonetics.map(phon=>{
        //         if(phon.audio!=""){
        //             console.log(phon.text);
        //             console.log(phon.audio);
        //             return;
        //         }
        //     }
        // )

        
        return;
    }
return (
    <div className="body absolute flex w-1/2 mt-44 h-fit ">
         {/* <div className="word-and-sound flex w-full  border-b-2  border-grey-300  h-1/5"> 
           <div className="right-side ">
            <h1 className="text-5xl bold mx-6"> Keyboard</h1> 
            <h2 className="text-xl mx-1 text-fuchsia-500 mt-2 mb-6 mx-7"> phonetics</h2>
            </div>
            <div className="AUDIO-part absolute right-0">
                 <svg id="playSound" 
                    onClick={()=>{ new Audio("https://api.dictionaryapi.dev/media/pronunciations/en/bad-uk.mp3").play();}}
                    xmlns="http://www.w3.org/2000/svg" width="75" height="75" viewBox="0 0 75 75"><g fill="#A445ED" fill-rule="evenodd"><circle cx="37.5" cy="37.5" r="37.5" opacity=".25"/><path d="M29 27v21l21-10.5z"/></g>
                 </svg>

</div> */}
 {/* style comments
 bg-stone-200
 border-2 border-teal-950
 border-2 border-teal-950
 */}

            {/* </div> */}
     {/* <div className="relative w-12 left-0 border-2 border-teal-950">
                {/* <h1 className=" w-12 border-2 border-teal-950">dds</h1> */}
                {/* <p className=" w-1/3 border-teal-950" > verv</p> 
            </div> */}
            {/* <div className="relative w-24 right-0 border-2 border-teal-950">
                <p>rgrtg</p>
               <audio controls>
                <source src="" type="audio/mpeg" />
                </audio>  `; 
            </div> */}
    </div>
)
}
export default Search;

