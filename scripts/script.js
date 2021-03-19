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

function addElement(name, url) {
    /** incomplete  */
    let div = document.createElement('div');
    let a = document.createElement("a")
    // const link = "https://www.nba.com/"
    a.setAttribute("href", url)
    a.setAttribute("target", "_blank")
    a.innerText = name
    div.setAttribute("class", "favorites-link")
    div.appendChild(a)
    document.getElementById("favorites").appendChild(div)
}

function addWebsite() {
    let name = document.getElementById("website-name").value
    let url = document.getElementById("website-url").value
    addElement(name, url)
}