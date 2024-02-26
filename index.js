searchbox = document.querySelector("input");
pokemonResults = document.querySelector("#results").children;
suggestions = document.querySelector("#suggestions").children;
console.log(suggestions);

//searches for a pokemon using PokeApi
async function search(){
    const pokemon = searchbox.value.toLowerCase();

    try{
        const pokemonPromise = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);

        //if pokemon not found...
        if (!pokemonPromise.ok){
            throw new Error("could not load resources");
        }
        const pokemonJson = await pokemonPromise.json();
        //update the pokemon display
        updatePokemonDisplay(pokemonJson);
    }
    catch(error){
        console.error(error);
        clearPokemonDisplay();
    }
}

function updatePokemonDisplay(pokemonJson){
    const pokemonName = pokemonJson.name.charAt(0).toUpperCase() + pokemonJson.name.slice(1);
    const pokemonImage = pokemonJson.sprites.front_default;
    const pokemonTypes = pokemonJson.types;

    pokemonResults[0].textContent = pokemonName;

    pokemonResults[1].src = pokemonImage;
    pokemonResults[1].style.visibility = "visible";

    pokemonResults[2].textContent = "";
    pokemonTypes.forEach(i => {pokemonResults[2].textContent += " " + (i.type.name)});
    pokemonResults[2].textContent = pokemonResults[2].textContent + " ";
}

function clearPokemonDisplay(){
    pokemonResults[0].textContent = "Not Found";
    pokemonResults[1].src = "";
    pokemonResults[1].style.visibility = "hidden";
    pokemonResults[2].textContent = "";
}

for (const suggestion of suggestions){
    suggestion.addEventListener("click", ()=>{
        searchbox.value = suggestion.textContent;
    })
}
