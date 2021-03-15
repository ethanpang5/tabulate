function openAllClasses() {
    let links = document.getElementsByClassName("classes-link")
    for (let i=0; i < links.length; i++) {
        window.open(links[i].getAttribute("href"), "_blank")
    }
}