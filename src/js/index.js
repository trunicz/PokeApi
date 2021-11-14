'use strict'

let id = 1;
let img = 0;

let cardContent = document.querySelector("#content-card");

document.getElementById('next').addEventListener("click", () => {
    if(id >= 0 || id < 898){
        id += 1;
        search(id);
    }
    if(id > 898){
        document.querySelector(".next").className = "placeholder";
    }
});
document.getElementById('back').addEventListener("click", () => {
    if(id >= 2){
        id -= 1;
        search(id);
    }
    if(id <= 0){
        document.querySelector(".back").className = "placeholder";
    }
});


document.addEventListener('keydown', function(e){
    if(e.which === 13){
        getid();
    }
}); 

const changebtn = () => {
    if(img === 1){
        img = 0;
    }else{
        img = 1;
    }
    typeCard();
}

const typeCard = () => {

    if(img === 1 && screen.width > 568){
        document.getElementById("btn-closes").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-fullscreen" viewBox="0 0 16 16">
        <path d="M1.5 1a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4A1.5 1.5 0 0 1 1.5 0h4a.5.5 0 0 1 0 1h-4zM10 .5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 16 1.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zM.5 10a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 0 14.5v-4a.5.5 0 0 1 .5-.5zm15 0a.5.5 0 0 1 .5.5v4a1.5 1.5 0 0 1-1.5 1.5h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5z"/>
        </svg>`;
        cardContent.className = "d-flex align-items-center";
    }else{
        document.getElementById("btn-closes").innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-fullscreen-exit" viewBox="0 0 16 16">
        <path d="M5.5 0a.5.5 0 0 1 .5.5v4A1.5 1.5 0 0 1 4.5 6h-4a.5.5 0 0 1 0-1h4a.5.5 0 0 0 .5-.5v-4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v4a.5.5 0 0 0 .5.5h4a.5.5 0 0 1 0 1h-4A1.5 1.5 0 0 1 10 4.5v-4a.5.5 0 0 1 .5-.5zM0 10.5a.5.5 0 0 1 .5-.5h4A1.5 1.5 0 0 1 6 11.5v4a.5.5 0 0 1-1 0v-4a.5.5 0 0 0-.5-.5h-4a.5.5 0 0 1-.5-.5zm10 1a1.5 1.5 0 0 1 1.5-1.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 0-.5.5v4a.5.5 0 0 1-1 0v-4z"/>
        </svg>`;
        cardContent.className = "d-flex flex-column align-items-center";
    }
};

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
    document.querySelector("#content-card").className = "visually-hidden";
    document.querySelector("#spinner").className = "spinner-border align-self-center fs-4";

    try {
        let info = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        let data = await info.json();

        
        console.log(data);

        const pokemon = {
            img: data.sprites.other.home.front_default,
            id_pokemon: data.id,
            nombre: data.name,
            experiencia: data.base_experience,
            hp: data.stats[0].base_stat,
            ataque: data.stats[1].base_stat,
            defensa: data.stats[2].base_stat,
        };

        mostrar(pokemon);
        setTimeout(() => {
            typeCard(img);
            document.querySelector("#spinner").className = "visually-hidden";
        }, 500);

    } catch (e) {
        console.log(e);
        alert('ERROR - NO SE ENCUENTRA EL POKEMON');
        id = 1;
        console.log(id);
        search(id);
        clear();
    }
};

const clear = () => {
    document.getElementById('pokemon').value = "";
}

const mostrar = (pokemon) => {
    document.querySelector("#img-pokemon").setAttribute("src", pokemon.img);
    document.querySelector("#card-title").innerHTML = `${pokemon.nombre}`;

    document.getElementById("card-id").innerHTML = `${pokemon.id_pokemon} <span class="badge bg-secondary">id</span>`;
    document.getElementById("hp").innerHTML = `${pokemon.hp} <span class="badge bg-success">hp</span>`;
    document.getElementById("exp").innerHTML = `${pokemon.experiencia} <span class="badge bg-primary">exp</span>`;
    document.getElementById("atq").innerHTML = `${pokemon.ataque} <span class="badge bg-danger">atq</span>`;
    document.getElementById("def").innerHTML = `${pokemon.defensa} <span class="badge bg-warning">def</span>`;

    document.getElementById("buscador").className += ' bg-danger';
};

search(id);