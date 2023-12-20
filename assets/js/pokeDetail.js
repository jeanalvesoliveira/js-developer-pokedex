const body = document.getElementsByTagName('body')[0]
//console.log(body)

function getId() {
    let urlAtual = window.location.href
    let urlClass = new URL(urlAtual)
    return urlClass.searchParams.get("id")
}

function convertHeight(height){
    const newHeight = 0
    const unit = ''
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
    const newWeight = 0
    const unit = ''
    if (weight < 10) {
        newWeight = weight * 100
        unit = 'g'
    } else {
        newWeight = weight / 10
        unit = 'kg'
    }
    return `${newWeight} ${unit}`
}


fetch(`https://pokeapi.co/api/v2/pokemon/${getId()}`)
    .then(response => response.json())
    .then(detalhes => console.log(detalhes))

// body.innerHTML = `
//     <header class="titulo">
//     <h1>Nome do pokemon</h1>
//     <h2>número</h2>
//     <ul>
//         <li>Tipo 1</li>
//         <li>Tipo 2</li>
//     </ul>
//     <img src="" alt="">
//     </header>
//     <main>

//     </main>
// `