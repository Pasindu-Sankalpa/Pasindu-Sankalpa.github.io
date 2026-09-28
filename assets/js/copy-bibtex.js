var bibtexDatabase = {};

$(document).ready(function () {

    // Load BibTeX database
    fetch("../assets/publications.bib")
        .then(function (response) {
            if (!response.ok) {
                throw new Error("Could not load publications.bib");
            }

            return response.text();
        })
        .then(function (data) {

            bibtexDatabase = parseBibtex(data);

            // Load BibTeX for each article
            $("li[data-bibtex]").each(function () {

                var key = $(this).data("bibtex");
                var bibtex = bibtexDatabase[key];

                if (bibtex) {
                    $(this)
                        .find(".bibtex-card-text")
                        .text(bibtex);
                } else {
                    console.error("BibTeX key not found: " + key);
                }

            });

        })
        .catch(function (error) {
            console.error("Failed to load BibTeX:", error);
        });


        $(document).on("click", ".bibtex-toggle", function () {

            var paper = $(this).closest("li");
            var bibtexCard = paper.find(".bibtex-card");

            bibtexCard.collapse("toggle");

        });

});


/* Parse BibTeX file */
function parseBibtex(data) {

    var database = {};

    var entries = data.match(
        /@\w+\s*\{\s*[^,]+,[\s\S]*?\n\s*\}/g
    );

    if (!entries) {
        return database;
    }

    entries.forEach(function (entry) {

        var match = entry.match(
            /@\w+\s*\{\s*([^,]+),/
        );

        if (!match) {
            return;
        }

        var key = match[1].trim();

        // Keep formatting exactly as it appears in the .bib file
        database[key] = entry.trim();

    });

    return database;
}


/* Copy BibTeX */
function copyBibtex(button) {

    var bibtexCard = $(button).closest(".bibtex-card");
    var bibtexElement = bibtexCard.find(".bibtex-card-text")[0];

    if (!bibtexElement) {
        console.error("BibTeX element not found.");
        return;
    }

    var bibtex = $(bibtexElement).text();

    navigator.clipboard.writeText(bibtex)
        .then(function () {

            var originalIcon = $(button).html();

            $(button).html(
                '<i class="fa-solid fa-check"></i>'
            );

            setTimeout(function () {
                $(button).html(originalIcon);
            }, 1500);

        })
        .catch(function (error) {
            console.error("Failed to copy BibTeX:", error);
        });
}