// Listen for form submit
document.getElementById('myForm').addEventListener('submit', function (e) {

    // get form values
    var siteName = document.getElementById('siteName').value,
        siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    var bookmarks = [];

    if (localStorage.getItem('bookmarks') === null) {

        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    } else {

        bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    // // localStorage test
    // localStorage.setItem('test', 'This storing shit just works sometimes.');
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');
    // console.log(localStorage.getItem('test'));

    // Prevents form from submitting
    this.form.reset();
    e.preventDefault();
});

var fetchBookmarks = function () {

    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; ++i) {
        bookmarksResults.innerHTML += '<div class="well row">' +
                                        '<h3 class="col-sm-5" id="name_bookmark"><img id="favicon" src="' + bookmarks[i].url + '/favicon.ico' + '" alt="">' + bookmarks[i].name + '</h3>' +
                                        '<button class="btn btn-info col-sm-offset-4">' +
                                            'View' +
                                        '</button>' +
                                        '<button class="btn btn-danger" id="name_delete">' +
                                            'Delete' +
                                        '</button>' +
                                        '</div>';
    }

};