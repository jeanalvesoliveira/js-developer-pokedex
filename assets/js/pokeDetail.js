function getId() {
    let urlAtual = window.location.href
    let urlClass = new URL(urlAtual)
    return urlClass.searchParams.get("id")
}


fetch(`https://pokeapi.co/api/v2/pokemon/${getId()}`)
    .then(response => response.json())
    .then(detalhes => console.log(detalhes))