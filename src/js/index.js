'use strict'

let id = 1;

const getid = () => {
    id = document.getElementById('pokemon').value;

    if (typeof id === 'string') {
        id = id.toLowerCase();
    };

    if (id === '' || id <= 0) {
        console.log("Error - no se ingreso ningun valor");
        alert('Ingresa un valor');
    } else {
        console.log(id);
        search(id);
    }
};
const search = async (id) => {
    try {
        console.log(id);

        let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await info.json();

        console.log(data);
        console.log(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`);

        const pokemon = {
            img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${data.id}.png`,
            imgJuego: data.sprites.front_default,
            imgCvg: data.sprites.other.home.front_default,
            id_pokemon: data.id,
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
        };

        mostrar(pokemon);
    } catch (e) {
        console.log(e);
        alert('ERROR - NO SE ENCUENTRA EL POKEMON');
    }
};

const mostrar = (pokemon) => {
    document.querySelector("#img-pokemon").setAttribute("src", pokemon.imgCvg);
    document.querySelector("#card-title").innerHTML = `${pokemon.nombre}`;

    document.getElementById("card-id").innerHTML = `${pokemon.id_pokemon} <span class="badge bg-primary">id</span>`;
    document.getElementById("hp").innerHTML = `${pokemon.hp} <span class="badge bg-primary">hp</span>`;
    document.getElementById("exp").innerHTML = `${pokemon.experiencia} <span class="badge bg-primary">exp</span>`;
    document.getElementById("atq").innerHTML = `${pokemon.ataque} <span class="badge bg-primary">atq</span>`;
    document.getElementById("def").innerHTML = `${pokemon.defensa} <span class="badge bg-primary">def</span>`;

    document.getElementById("buscador").className += ' bg-danger';
};

search(id);