const buttonsNav = document.querySelectorAll('.btn-nav')
let URL = "https://pokeapi.co/api/v2/pokemon/";
const containerListPokemon = document.getElementById('listPokemon');


//recorremos la URL 151 veces que son los pokemons que queremos
for(let i = 1; i <= 151; i++) {
    //hacemos el fetch y le concatenamos a la URL el indice
    fetch(URL + i)
    .then((res) => res.json())
    .then(data => showPokemon(data))
}

//creamos la card de cómo se van a mostrar los pokemon
function showPokemon(data, index) {
    //creamos un map de los tipos porque aveces hay uno y otras dos, pero siempre es un array
    let types = data.types.map((type) => `<p class='${type.type.name} type'>${type.type.name}</p>`);
    //el método .join() lo usamos para convertir el array a un string
    types = types.join('');

    //en el caso de que el id solo sea un número le añadiremos un 0
    let pokeId = data.id.toString();
    if (pokeId.length === 1) {
        pokeId = "00" + pokeId;
    } else if (pokeId.lenght === 2) {
        pokeId = "0" + pokeId;
    }

        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
            <p class='idBack'>#${pokeId}</p>
            <div class='containerImg'>
                <img src='${data.sprites.other['official-artwork'].front_default}' alt='${data.name}'>
            </div>
            <div class='infoPokemon'>
                <div class='containerName'>
                    <p class='idSmall'>#${pokeId}</p>
                    <h2 class='namePokemon'>${data.name}</h2>
                </div>
                <div class='typesPokemon'>
                    ${types}
                </div>
                <div class='statsPokemon'>
                    <p class='status'>${data.height}M</p>
                    <p class='status'>${data.weight}KG</p>
                </div>
            </div>
        `;
        containerListPokemon.append(card);
    }



//creamos los filtros del header
buttonsNav.forEach(button => button.addEventListener('click', (event) => {
    const buttonId = event.currentTarget.id;
    //tenemos que vaciar las llamadas de antes para que nos traiga únicamente ahora los del tipo que queremos
    listPokemon.innerHTML = "";

    //volvemos a crear el bucle for con el fetch para que nos devuelva otras cosas
    for(let i = 1; i <= 151; i++) {
        fetch(URL + i)
        .then((res) => res.json())
        .then(data => {
            //guardamos en la constante cada uno del array que nos devuelve
            const types = data.types.map(type => type.type.name);
            //buscamos si en cada uno de esos arrays que guardamos hay alguno que sea igual del boton del id que acabamos de apretar
            if (types.some(type => type.includes(buttonId))) {
                showPokemon(data);
            }
        })
    }
}))