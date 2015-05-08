ns = {}

ns.loadData = function () {
    $.ajax({
        method: 'GET',
        url: 'http://jsonplaceholder.typicode.com/photos',
        success: ns.handleResponse,
    });
}

/*
 * Handles user search action
 */
ns.send = function () {
    if (ns.data.length) {
        var title = $('.search').val();

        var $gallery = $('.result');
        $gallery.empty();
        _.each(ns.data, function (image) {
            if (ns.performQuery(image, title)) {
                console.log('found');
                $gallery.append($('<div class="image"><img src="' + image.thumbnailUrl + '"></image></div>'));
            }
        });
    }
}

/*
 * @params {Object} - title, user input
 * @params {Object} - resp, json image info
 */
ns.handleResponse = function (resp) {
    ns.data = resp;
}

/*
 * @params {Object} - image, image in json format
 * @params {Object} - title, user search input
 * @returns {Boolean} - if the query matches
 */
ns.performQuery = function (image, title) {
    return image.title.indexOf(title) !== -1;
}

ns.selectImage = function () {
    $(this).css({opacity: 0.4});
}

ns.sendEmail = function () {
    $.ajax({
        method: 'POST',
        url: 'https://api.sendwithus.com/api/v1/send',
        data: {
            email_id: '',
            recipient: {
            },
            email_data: {
            },
        },
    })
}

ns.init = function () {
    ns.data = [];
    ns.loadData();

    $( document ).ready(function() {
        $('.button').click(ns.send);
        $('.result').on('click', 'img', ns.selectImage);
    });


}

ns.init()
