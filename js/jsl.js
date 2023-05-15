
function changeStyleProperty(elementId, property, value) {
    var element = document.getElementById(elementId);
    if (element) {
        element.style[property] = value;
    } else {
        console.error("Element with ID '" + elementId + "' not found.");
    }
}

function toggleGrid() {
    var bilder = document.querySelector('.bilder ul');
    if (bilder.classList.contains('toggle')) {
        bilder.classList.remove('toggle');
        changeStyleProperty("gridi", "display", "inline")
        changeStyleProperty("listi", "display", "none")
    } else {
        bilder.classList.add('toggle');
        changeStyleProperty("listi", "display", "inline")
        changeStyleProperty("gridi", "display", "none")
    }
}

function addAlertToElem(element) {
    element.addEventListener('click', function (event) {
        if (!event.target.closest('.options-btn')) {
            var title = element.querySelector('h2[aria-label="Bild title"]').textContent;
            var href = element.querySelector('img').src;
            alert(title + "\n" + href);
        }
        if (event.target.closest('.options-btn')) {
            var title = element.querySelector('h2[aria-label="Bild title"]').textContent;
            var href = element.querySelector('img').src;
            if (confirm(title + "\n" + href + "\n\n DELETE ?!")) {
                element.parentNode.removeChild(element);
            }
        }
    });
    return element;
}

function addAlerts() {
    var listElements = document.querySelectorAll('.bilder ul li');
    listElements.forEach(function (element) {
        addAlertToElem(element);
    });
}

window.onload = function () {
    jsr().then(function () {

        toggleGrid();

        var gridi = document.getElementById('gridi');
        gridi.addEventListener('click', function () {
            var areas = document.querySelectorAll('.bilder ul, .bilder ul *');
            areas.forEach(function (area) {
                area.classList.remove('fadeIn');
                area.classList.add('fadeOut');
            });
            setTimeout(function () {
                toggleGrid();
                areas.forEach(function (area) {
                    area.classList.remove('fadeOut');
                    area.classList.add('fadeIn');
                });
            }, 2000);
        });

        var listi = document.getElementById('listi');
        listi.addEventListener('click', function () {
            var areas = document.querySelectorAll('.bilder ul, .bilder ul *');
            areas.forEach(function (area) {
                area.classList.remove('fadeIn');
                area.classList.add('fadeOut');
            });
            setTimeout(function () {
                toggleGrid();
                areas.forEach(function (area) {
                    area.classList.remove('fadeOut');
                    area.classList.add('fadeIn');
                });
            }, 2000);
        });

        var refresh = document.getElementById('refresh');
        refresh.addEventListener('click', jsr);

        var add = document.getElementById('add');
        add.addEventListener('click', function () {

            const currentDate = new Date();
            const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
            const formattedDate = currentDate
                .toLocaleDateString('en-GB', options)
                .replace(/\//g, '.');;

            var bild = {
                "title": "undsoweiter",
                "owner": "placekitten.com",
                "added": formattedDate,
                "numOfTags": 0,
                "src": "https://placekitten.com/200/300"
            }
            var element = createElement(bild);
            addAlertToElem(element);
        });

    }).catch(function (err) {
        console.error(err);
    });
}
