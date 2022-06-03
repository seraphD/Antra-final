let onFocused = false;

const inputField = document.querySelector(".search-input");
const containder = document.querySelector(".main-album-container");
const resultEle = document.querySelector(".main-album-result");
const spinner = document.querySelector(".loader");
const warningInfo = document.querySelector(".empty-warning");
const searchIcon = document.querySelector(".search-icon");
const moreBtn = document.querySelector(".more-btn");
const data = [];
const loadedItemCnt = 10;
const initLoaded = 20;
let curInx = 0;
let ARTIST_NAME = "";

inputField.onfocus = () => {
    onFocused = true;
}

inputField.onblur = () => {
    onFocused = false;
    warningInfo.style.display = "none";
}

searchIcon.onclick = () => {
    if (inputField.value.length) {
        ARTIST_NAME = inputField.value;
        fetachData(inputField.value, initializeContainer, renderAlbums, resultEle, spinner);
    }
    else {
        // display warning info
        warningInfo.style.display = "block";
    }
}

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

moreBtn.onclick = () => {
    data.slice(curInx, curInx + loadedItemCnt).map(album => renderAlbums(album));
    curInx += loadedItemCnt;
    console.log(ARTIST_NAME);
    resultEle.innerHTML = `${Math.min(curInx, data.length)}/${data.length} results for "${ARTIST_NAME}"`;
    moreBtn.style.display = curInx < data.length ? "block" : "none";
}

document.addEventListener('keydown', async (e) => {
    if (onFocused && e.code === "Enter") {
        if (inputField.value.length) {
            ARTIST_NAME = inputField.value;
            curInx = initLoaded;
            const fetched = await fetachData(inputField.value, initializeContainer, renderAlbums, resultEle, spinner, initLoaded);
            // console.log(fetched);
            data.push(...fetched.results);
            moreBtn.style.display = curInx < data.length ? "block" : "none";
        }
        else {
            // display warning info
            warningInfo.style.display = "block";
        }
    }
});