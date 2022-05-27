function fetachData(ARTIST_NAME, initializeContainer, renderAlbum) {
    const URL = `https://itunes.apple.com/search?term=${ARTIST_NAME}&media=music&entity=album&attribute=artistTerm&limit=200`
    fetchJsonp(URL)
    .then(res => {
        // display spinner
        initializeContainer();
        return res.json()
    })
    .then(json => json.results.map(album => renderAlbum(album)));
}