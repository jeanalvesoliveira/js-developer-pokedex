const pokeLista = document.querySelector("#pokeLista")
const btnPaginacao = document.querySelector("#btnPaginacao")

const limit = 12
let offset = 0
const limitePokemons = 151


function convertPokemonToLi(pokemon){
    return `
    <li id="listaDetalhes" class="pokemon ${pokemon.tipoPrincipal}">
    <a id="link" href="poke-detail.html?id=${pokemon.numero}">
    <article>
            <header>
                <h1 class="poke-nome">${pokemon.nome}</h1>
                <h2 class="poke-numero">#${pokemon.numero}</h2>
            </header>
            <section>
                <ul class="poke-tipo">
                ${pokemon.tipos.map(tipo => `<li class="tipo ${tipo}">${tipo}</li>`).join('')}
                </ul>
                <img class="poke-imagem" src="${pokemon.imagem}" alt="${pokemon.name}">
            </section>            
        </article>
        </a>
    </li>
    `
}

function loadPokemonItens(offset, limit){
    // invocando o método getPokemons() do objeto pokeApi
    pokeApi.getPokemons(offset, limit).then((pokeList = []) => 
        pokeLista.innerHTML += pokeList.map(convertPokemonToLi).join(''))
}

loadPokemonItens(offset, limit)

btnPaginacao.addEventListener('click', ()=> {
    offset += limit

    const qtRecordNextPage = offset + limit

    if (qtRecordNextPage >= limitePokemons){
        const newLimit = limitePokemons - offset
        loadPokemonItens(offset, newLimit)
        
        btnPaginacao.parentElement.removeChild(btnPaginacao)

        return
    } else {
        loadPokemonItens(offset, limit)
    }
})