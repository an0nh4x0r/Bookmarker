// Listen for form submit
document.getElementById('myForm').addEventListener('submit', function (e) {

    // get form values
    var siteName = document.getElementById('siteName').value,
        siteUrl = document.getElementById('siteUrl').value;

    if (!validateForm(siteName, siteUrl)) {
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    var bookmarks = [];

    if (localStorage.getItem('bookmarks') === null) {

        bookmarks.push(bookmark);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

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
            '<h3 class="col-sm-5 name_bookmark"><img class="favicon" src="' + bookmarks[i].url + '/favicon.ico' + '" alt="">' + bookmarks[i].name + '</h3>' +
            '<button class="btn btn-info col-sm-offset-4 name_view" onclick="openPage(\'' + bookmarks[i].url + '\')">' +
            'View' +
            '</button>' +
            '<button class="btn btn-danger name_delete" onclick="deleteBookmarks(\'' + bookmarks[i].name + '\')">' +
            'Delete' +
            '</button>' +
            '</div>';
    }

};

var deleteBookmarks = function (value) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for (var i = 0; i < bookmarks.length; ++i) {
        if (bookmarks[i].name === value) {
            bookmarks.splice(i, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
};

var openPage = function (url) {
    window.open(url, '_blank');
};

var validateForm = function (siteName, siteUrl) {

    if (!siteName || !siteUrl) {
        alert('Please submit the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (siteName.match(regex) === false) {
        alert('Please enter a valid URL');
        return false;
    }

    return true;
};