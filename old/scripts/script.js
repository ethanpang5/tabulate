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
    let b = document.createElement("button")
    b.setAttribute("class", "btn btn-dark delete-button")
    b.setAttribute("type", "button");
    b.setAttribute("onclick", "deleteElement(this)");
    // const link = "https://www.nba.com/"
    a.setAttribute("href", url)
    a.setAttribute("target", "_blank")
    a.innerText = name
    div.setAttribute("class", "favorites-link")
    div.appendChild(a)
    div.appendChild(b)
    document.getElementById("favorites").appendChild(div)
}


function addFavorite() {
    let name = document.getElementById("website-name").value
    let url = document.getElementById("website-url").value
    addElement(name, url)
}

let userEmail = "charlesming2002%40gmail.com" //change later to get from user; keep in mind must change @ to %40
const calendarFrame = document.createElement("iframe");
calendarFrame.setAttribute("src", "https://www.google.com/calendar/embed?src=" + userEmail + "&ctz=America%2FLos_Angeles")
calendarFrame.setAttribute("width", "100%")
calendarFrame.setAttribute("height", "400")
calendarFrame.setAttribute("frameborder", "0")
calendarFrame.setAttribute("scrolling", "no")
document.getElementById("calendar").appendChild(calendarFrame)

function deleteElement(e) {
    e.parentElement.remove();
}