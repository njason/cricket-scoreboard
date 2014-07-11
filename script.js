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
    for (var a = 20; 15 <= a; --a) {
        localStorage["ht1" + a] = "0";
        localStorage["ht2" + a] = "0"
    }
    localStorage.ht1B = "0";
    localStorage.ht2B = "0"
}