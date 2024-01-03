const body = document.getElementsByTagName('body')[0]
//console.log(body)

function getId() {
    let urlAtual = window.location.href
    let urlClass = new URL(urlAtual)
    return urlClass.searchParams.get("id")
}

function convertHeight(height){
    let newHeight = 0
    let unit = ''
    if (height < 10) {
        newHeight = height * 10
        unit = 'cm'
    } else {
        newHeight = height / 10
        unit = 'm'
    }
    return `${newHeight} ${unit}`
}

function convertWeight(weight){
    let newWeight = 0
    let unit = ''
    if (weight < 10) {
        newWeight = weight * 100
        unit = 'g'
    } else {
        newWeight = weight / 10
        unit = 'kg'
    }
    return `${newWeight} ${unit}`
}

function convertPokemonApiToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.numero = pokeDetail.id
    pokemon.nome = pokeDetail.name
    pokemon.altura = convertHeight(pokeDetail.height)
    pokemon.peso = convertWeight(pokeDetail.weight)
    pokemon.habilidades = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    pokemon.tipos = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    pokemon.status = pokeDetail.stats.map((statusValue) => [statusValue.stat.name, statusValue.base_stat])
    pokemon.imagem = pokeDetail.sprites.other.dream_world.front_default
    console.log(pokeDetail)
    console.log(pokemon)
    return pokemon
}


function convertPokemonToDetail(pokemon){
    return `
        <header class="titulo">
            <h1>${pokemon.nome}</h1>
            <h2>${pokemon.numero}</h2>
            <ul>
            ${pokemon.tipos.map(tipo => `<li>${tipo}</li>`).join('')}
            </ul>
            <img src="${pokemon.imagem}" alt="foto do pokemon">
        </header>
        <main>
            <section>
                <h1>Informações</h1>
                <h2>Dados Físicos</h2>
                <p>Altura: ${pokemon.altura}</p>
                <p>Peso: ${pokemon.peso}</p>
                <h2>Habilidades</h2>
                    <ul>
                        ${pokemon.habilidades.map(habil => `<li>${habil}</li>`).join('')}
                    </ul>
                <h2>Status Básicos</h2>
                <p>HP: ${pokemon.status[0][1]}</p>
                <p>Ataque: ${pokemon.status[1][1]}</p>
                <p>Defesa: ${pokemon.status[2][1]}</p>
                <p>Ataque Especial: ${pokemon.status[3][1]}</p>
                <p>Defesa Especial: ${pokemon.status[4][1]}</p>
                <p>Velocidade: ${pokemon.status[5][1]}</p>
            </section>
        </main>
        <footer>
            <a href="index.html">
                <button type="button">Voltar</button>
            </a>
        </footer>
    `
}


fetch(`https://pokeapi.co/api/v2/pokemon/${getId()}`)
    .then(response => response.json())
    .then(convertPokemonApiToPokemon)
    .then(pokemon => body.innerHTML = convertPokemonToDetail(pokemon))