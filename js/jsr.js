

function clearList() {
    var ulElement = document.querySelector('.bilder ul');
    ulElement.innerHTML = '';
}

function createElement(bild) {
    var ulElement = document.querySelector('.bilder ul');
    var liElement = document.createElement('li');
    liElement.innerHTML = `
<article class="bild" aria-label="Bild">
<img class="bild-card-img" src="${bild.src}" alt="Bild">
<section class="bild-info">
<h2 aria-label="Bild title">${bild.title}</h2>
<section class="bild-details">
<div class="bild-name-and-upload">
  <a aria-label="Source: ${bild.owner}" href="https://${bild.owner}">${bild.owner}</a>
  <time aria-label="Upload Date: ${bild.added}" datetime="${bild.added}">${bild.added}</time>
</div>
<div class="bild-tags">
  <svg id="play-icon" class="svg-icon" viewBox="0 0 24 24">
    <title>Tag count icon</title>
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
  <span aria-label="Tag play count: ${bild.numOfTags}">${bild.numOfTags}</span>
</div>
</section>
</section>
<button class="options-btn" aria-label="More options">
<svg class="svg-icon" viewBox="0 0 24 24">
<title>More options</title>
<circle cx="12" cy="12" r="1" />
<circle cx="12" cy="5" r="1" />
<circle cx="12" cy="19" r="1" />
</svg>
</button>
</article>
`;
    ulElement.appendChild(liElement);
    return liElement;
}

function jsr() {
    return new Promise(function (resolve, reject) {
        clearList();

        var mode = "arg";

        var callbackfunction = function (textContent) {
            var jsonContent = JSON.parse(JSON.stringify(textContent));
            var bilderList = JSON.parse(jsonContent);

            bilderList.forEach(function (bild) {
                createElement(bild);
            });


            addAlerts();

            resolve();
        }

        const errormsg = "got error status accessing server-side data: ";

        if (mode == "promise") {
            xhr("GET", "data/listitems.json", null)
                .then(xhr => callbackfunction(xhr.responseText),
                    xhr => reject(errormsg + xhr.status));
        }
        else if (mode == "fetch") {
            dofetch("GET", "data/listitems.json")
                .then(response => response.text(),
                    response => reject(errormsg + response.status))
                .then(txt => {
                    if (txt) {
                        callbackfunction(txt);
                    }
                });
        }
        else {
            xhr("GET", "data/listitems.json", null,
                xhr => callbackfunction(xhr.responseText),
                xhr => reject(errormsg + xhr.status));
        }
    });
}
