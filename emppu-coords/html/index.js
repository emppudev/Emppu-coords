SetDisplay = function (bool) {
    if (bool == true) {
        $('#container').removeClass('off').addClass('on');
    } else {
        $('#container').removeClass('on').addClass('off');
    }
};

Close = function () {
    SetDisplay(false);
    $.post('https://emppu-coords/close');
};

Copy = function (data) {
    let containerText;
    switch (data) {
        case "xyz": {
            containerText = document.querySelector('#xyz').textContent;
        };
            break;
        case "vector3": {
            containerText = document.querySelector('#vector3').textContent;
        };
            break;
        case "vector4": {
            containerText = document.querySelector('#vector4').textContent;
        };
            break;
        case "heading": {
            containerText = document.querySelector('#heading').textContent;
        };
            break;
    }
    const textArea = document.createElement('textarea');
    textArea.textContent = containerText;
    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
};

SetData = function (data) {
    document.querySelector('#xyz').textContent = data.xyz;
    document.querySelector('#vector3').textContent = data.vector3;
    document.querySelector('#vector4').textContent = data.vector4;
    document.querySelector('#heading').textContent = data.heading;
};

$(document).ready(function () {
    window.addEventListener("message", function (event) {
        var data = event.data;
        switch (data.type) {
            case "show": {
                SetDisplay(true);
                SetData(data.infoData);
            };
                break;
            case "hide": {
                Close();
            };
                break;
        };
    });
});

$(document).on("keydown", function (event) {
    switch (event.keyCode) {
        case 27: // ESC
            Close();
            break;
    }
});

$(document).on('click', '#copyXYZ', function (e) {
    e.preventDefault();
    Copy('xyz');
});

$(document).on('click', '#copyVector3', function (e) {
    e.preventDefault();
    Copy('vector3');
});

$(document).on('click', '#copyVector4', function (e) {
    e.preventDefault();
    Copy('vector4');
});

$(document).on('click', '#copyHeading', function (e) {
    e.preventDefault();
    Copy('heading');
});

$(document).on('click', '#close', function (e) {
    e.preventDefault();
    Close();
});