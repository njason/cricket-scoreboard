$(function() {
    $("div#on").click(function() {
        clearHits();
        window.location = "game/oneplayer.html"
    });
    $("div#oc").click(function() {
        window.location = "game/oneplayer.html"
    });
    $("div#tn").click(function() {
        clearHits();
        window.location = "game/twoplayer.html"
    });
    $("div#tc").click(function() {
        window.location = "game/twoplayer.html"
    });
    $("div#cal").click(function() {
        window.location = "calibrate/index.html"
    });
    $("div#stat").click(function() {
        window.location = "stats/index.html"
    })
});

function clearHits() {
    for (var i = 20; 15 <= i; --i) {
        localStorage["ht1" + i] = "0";
        localStorage["ht2" + i] = "0"
    }
    localStorage.ht1B = "0";
    localStorage.ht2B = "0"
}