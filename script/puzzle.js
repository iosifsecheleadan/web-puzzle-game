let imageDraggedSrc = null;
let imageOverSrc = null;

/**
 * Scramble images.
 */
$(document).ready(function () {
    let items = ["00", "01", "02", "03",
        "10", "11", "12", "13",
        "20", "21", "22", "23",
        "30", "31", "32", "33"];
    let namePrefix = "../img/unix-linux-penguin_";
    let nameSuffix = ".png";

    $(".puzzle > div > img").each(function () {
        let randomSource = items[random(0, items.length)];
        items.splice(items.indexOf(randomSource), 1);
        $(this).attr("src", namePrefix + randomSource + nameSuffix);
    });
});

/**
 * Return a random number between the two integers.
 */
function random(min, max) {
    return Math.floor((Math.random() * max) + min);
}

/**
 * Save last image that was dragged over.
 */
$(document).ready(function() {
    $(".puzzle > div > img").on("dragover", function (event) {
        event.preventDefault();
        imageOverSrc = $(this).attr("src");
    });
});

/**
 * Save image that is being dragged.
 * Change appearance of dragged element.
 */
$(document).ready(function() {
    $(".puzzle > div > img").on("dragstart", function() {
        $(this).attr("class", "dragging");
        imageDraggedSrc = $(this).attr("src");
    });
});

/**
 * Change appearance of dragged element.
 * Change source of dragged element with element that was dragged over.
 */
$(document).ready(function() {
    $(".puzzle > div > img").on("dragend", function () {
        $(this).attr("src", imageOverSrc);
        $(this).attr("class", "notDragging");
        if ( checkCorrect() ) {
            alert("Good Job!");
        }
    });
});

/**
 * Check if the puzzle has been solved.
 */
function checkCorrect() {
    let sourceEnd1 = "00.png";
    let sourceEnd2 = "03.png";
    let sourceEnd3 = "10.png";
    let rows = $("#puzzle").children().not();

    for(let i = 0; i < rows.length; i += 1) {
        let row = rows.eq(i).children().not();
        for(let j = 0; j < row.length; j += 1) {
            let item = row.eq(j);
            if (i === 0 && (j === 0 || j === 3) ||
                            (j === 0 && i === 1) ) {
                // where the image is allowed to be white
                if (! ( item.attr("src").endsWith(sourceEnd1) ||
                    item.attr("src").endsWith(sourceEnd2) ||
                    item.attr("src").endsWith(sourceEnd3) ) ) {
                    return false
                }
            } else {
                // everywhere else
                let sourceEnd = i.toString() + j.toString() + ".png";
                if (!item.attr("src").endsWith(sourceEnd)) {
                    return false;
                }
            }
        }
    }
    return true;
}

/**
 * Change source of element over which is dropped with dragging element.
 */
$(document).ready(function() {
    $(".puzzle > div > img").on("drop", function (event) {
        event.preventDefault();
        $(this).attr("src", imageDraggedSrc);
    });
});