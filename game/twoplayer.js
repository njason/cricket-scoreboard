$(document).ready(function() {
    $("div.mark").addClass("userPositive");
    loadHits();
    $("div#undoToggle").click(function() {
        $("div#undoToggle").toggleClass("userNegative");
        $("div#undoToggle").toggleClass("userPositive");
        if ("UNDO" == $("div#undoToggle").text()) {
            $("div#undoToggle").text("DONE");
            if (null != endGame) {
                clearInterval(endGame);
                endGame = null;
                $("div.mark").removeAttr("style");
            }
        } else {
            $("div#undoToggle").text("UNDO");
            checkForEndGame();
        }
        $("div.mark").toggleClass("userNegative");
        $("div.mark").toggleClass("userPositive");
    });
    $("div.mark").click(function() {
        if ("UNDO" == $("div#undoToggle").text()) {
            if (null == endGame) {
                addHit(this);
            } else {
                reset();
            }
        } else {
            removeHit(this);
        }
    })
});
function reset() {
    $("div.mark").text("");
    $("div#teamOnePoints").text("0");
    $("div#teamTwoPoints").text("0");
    $("div#undoToggle").text("UNDO");
    $("div.mark").addClass("userPositive");
    $("div.mark").removeClass("userNegative");
    $("div#undoToggle").addClass("userNegative");
    $("div#undoToggle").removeClass("userPositive");
    $("div.mark").removeAttr("style");
    for (hit in t1MarkHits) {
        t1MarkHits[hit] = 0;
        t2MarkHits[hit] = 0;
    }
    if (null != endGame) {
        clearInterval(endGame);
        endGame = null;
    }
}
;
