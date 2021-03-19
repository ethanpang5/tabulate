function openAllClasses() {
    let links = document.getElementsByClassName("classes-link")
    for (let i=0; i < links.length; i++) {
        window.open(links[i].getAttribute("href"), "_blank")
    }
}

function openAllFavorites() {
    let links = document.getElementsByClassName("favorites-link")
    for (let i=0; i < links.length; i++) {
        window.open(links[i].getAttribute("href"), "_blank")
    }
}

function addElement() {
    /** incomplete  */
    let div = document.createElement('div');
    let a = document.createElement("a")
    const link = "https://www.nba.com/"
    a.setAttribute("href", link)
    a.innerText = "NBA"
    div.setAttribute("class", "favorites-link")
    div.appendChild(a)
    document.getElementById("favorites").appendChild(div)
}

