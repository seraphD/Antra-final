let onFocused = false;

const inputField = document.querySelector(".search-input");
const containder = document.querySelector(".main-album-container");
const resultEle = document.querySelector(".main-album-result");
const spinner = document.querySelector(".loader");
const warningInfo = document.querySelector(".empty-warning");

inputField.onfocus = () => {
    onFocused = true;
}

inputField.onblur = () => {
    onFocused = false;
    warningInfo.style.display = "none";
}

inputField.addEventListener("onfocusout", () => {
    onFocused = false;
    warningInfo.style.display = "none";
})

function renderImg(url) {
    const imgElement = document.createElement("img");
    imgElement.src = url;
    return imgElement;
}

function renderName(name) {
    const renderedName = document.createElement("div");
    renderedName.classList.add("album-name");
    renderedName.appendChild(document.createTextNode(name));
    return renderedName;
}

function renderAlbums(album) {
    const {artworkUrl100, collectionCensoredName} = album;

    const card = document.createElement("div");
    const img = renderImg(artworkUrl100);
    const name = renderName(collectionCensoredName);
    card.classList.add("album-card");
    card.appendChild(img);
    card.appendChild(name);
    containder.appendChild(card);
}

function initializeContainer() {
    containder.innerHTML = "";
}

document.addEventListener('keydown', (e) => {
    if (onFocused && e.code === "Enter") {
        if (inputField.value.length) {
            fetachData(inputField.value, initializeContainer, renderAlbums, resultEle, spinner);
        }
        else {
            // display warning info
            warningInfo.style.display = "block";
        }
    }
});