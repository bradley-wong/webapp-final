var searchBox = document.getElementById("searchBox");

searchBox.addEventListener('keypress', function(e) {
    if (e.which == 13) {
        var search = searchBox.value;
        console.log(search)
    }
})