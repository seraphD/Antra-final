function fetachData(ARTIST_NAME, initializeContainer, renderAlbum, resultEle, spinner, intialLoaded) {
    // hide result header and display spinner
    resultEle.innerHTML = "";
    spinner.style.display = "block";
    
    const URL = `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`
    return fetchJsonp(URL)
    .then(res => {
        // initialize container
        initializeContainer();
        return res.json()
    })
    .then(json => {
        const {resultCount, results} = json;

        // change result head and hide spinner
        spinner.style.display = "none";
        resultEle.innerHTML = `${intialLoaded > resultCount ? resultCount : intialLoaded}/${resultCount} results for "${ARTIST_NAME}"`;
        resultEle.style.display = "block";

        // render album cards
        results.slice(0, intialLoaded).map(album => renderAlbum(album));
        return json;
    })
    .then(data => {
        // console.log(data);
        return data;
    })
}