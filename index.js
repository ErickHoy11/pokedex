//html elements
searchbox = document.querySelector("input");
pokemonResults = document.querySelector("#results").children;
suggestions = document.querySelector("#suggestions").children;

//add onclick listeners to pokemon suggestions
for (const suggestion of suggestions){
    //when user clicks suggestion...
    suggestion.addEventListener("click", ()=>{
        //suggestion appears in searchbox
        searchbox.value = suggestion.textContent;
    })
}

//searches for a pokemon using PokeApi
async function search(){
    //pokemon = user entered text (all lowercase)
    const pokemon = searchbox.value.toLowerCase();

    try{
        //fetch the data from the api with user entered pokemon
        const pokemonPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        //if pokemon not found...
        if (!pokemonPromise.ok){
            //throw error
            throw new Error("could not load resources");
        }

        //pokemonJson = json for user entered pokemon
        const pokemonJson = await pokemonPromise.json();
        //update the pokemon display with pokemonJson
        updatePokemonDisplay(pokemonJson);
    }
    //error handling
    catch(error){
        console.error(error);
        //clear display contents
        clearPokemonDisplay();
    }
}

//update html pokemon display
function updatePokemonDisplay(pokemonJson){
    const pokemonName = pokemonJson.name.charAt(0).toUpperCase() + pokemonJson.name.slice(1);
    const pokemonImage = pokemonJson.sprites.front_default;
    const pokemonTypes = pokemonJson.types;

    //pokemon name html = pokemon name json
    pokemonResults[0].textContent = pokemonName;

    //pokemon image html = pokemon image json
    pokemonResults[1].src = pokemonImage;
    pokemonResults[1].style.visibility = "visible";

    //pokemon types html = pokemon type json
    pokemonResults[2].textContent = "";
    pokemonTypes.forEach(i => {pokemonResults[2].textContent += " " + (i.type.name)});
    pokemonResults[2].textContent = pokemonResults[2].textContent + " ";
}

//clear html pokemon display
function clearPokemonDisplay(){
    pokemonResults[0].textContent = "Not Found";
    pokemonResults[1].src = "";
    pokemonResults[1].style.visibility = "hidden";
    pokemonResults[2].textContent = "";
}