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
    const link = "https://www.nba.com/"
    div.setAttribute("href", link)
    div.setAttribute("class", "favorites-link")
    


    document.getElementById("favorites").addEventListener()
}

