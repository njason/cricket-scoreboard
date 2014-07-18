var compMarkStates = new Array();
var compAvgs = new Array();
var compStdDev = new Array();
$(document).ready(function() {
    if (!loadCompParams("default")) {
        defaultCompParams();
    }
    $("[id^=t1]").addClass("userPositive");
    $("[id^=t2]").addClass("automata");
    loadHits();
    $("div#undoToggle").click(function() {
        $("div#undoToggle").toggleClass("userNegative");
        $("div#undoToggle").toggleClass("userPositive");
        if ("UNDO" == $("div#undoToggle").text()) {
            $("div#undoToggle").text("DONE");
            if (null != endGame) {
                clearInterval(endGame);
                endGame = null;
                $("div.mark").removeAttr("style")
            }
        } else {
            $("div#undoToggle").text("UNDO");
            checkForEndGame();
        }
        $("[id^=t1]").toggleClass("userNegative");
        $("[id^=t1]").toggleClass("userPositive");
        $("[id^=t2]").toggleClass("userNegative");
        $("[id^=t2]").toggleClass("automata");
    });
    $("[id^=t1]").click(function() {
        if ("UNDO" == $("div#undoToggle").text()) {
            if (null == endGame) {
                addHit(this);
            } else {
                reset();
            }
        } else {
            removeHit(this);
        }
    });
    $("[id^=t2]").click(function() {
        if ("UNDO" == $("div#undoToggle").text()) {
            if (null == endGame) {
                addComputerMarkState();
                for (var i = 0; 3 > i; ++i) {
                    straightLogic();
                }
            } else {
                reset();
            }
        } else {
            restoreComputerMarkState();
        }
    })
});
function straightLogic() {
    var pointChoice;
    if (parseInt($("div#teamOnePoints").text()) >= parseInt($("div#teamTwoPoints").text())) {
        pointChoice = runPointLogic(t2MarkHits, t1MarkHits);
    } else {
        pointChoice = runCloseLogic(t2MarkHits, t1MarkHits);
    }
    if (0 != pointChoice) {
        var hits = numHits(0.5, 0.2, pointChoice);
        for (var i = 0; hits > i; ++i) {
            addHit(document.getElementById("t2" + pointChoice));
        }
    }
}
function addComputerMarkState() {
    var newState = new TeamState();
    newState.score = $("div#teamTwoPoints").text();
    newState.markHits = t2MarkHits.slice();
    compMarkStates.push(newState);
}
function restoreComputerMarkState() {
    if (0 < compMarkStates.length) {
        var state = compMarkStates.pop();
        $("div#teamTwoPoints").html(state.score);
        t2MarkHits = state.markHits;
        for (var number in t2MarkHits) {
            if (3 <= t2MarkHits[number]) {
                $("div#t2" + number).html("O");
            } else {
                if (2 == t2MarkHits[number]) {
                    $("div#t2" + number).html("X");
                } else {
                    if (1 == t2MarkHits[number]) {
                        $("div#t2" + number).html("/");
                    } else {
                        $("div#t2" + number).html("");
                    }
                }
            }
        }
    }
}
function defaultCompParams() {
    compAvgs["20"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs["19"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs["18"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs["17"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs["16"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs["15"] = parseFloat(DEFAULT_COMP_AVG);
    compAvgs.B = parseFloat(DEFAULT_COMP_AVG);
    compStdDev["20"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev["19"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev["18"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev["17"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev["16"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev["15"] = parseFloat(DEFAULT_COMP_STDDEV);
    compStdDev.B = parseFloat(DEFAULT_COMP_STDDEV);
}
function loadCompParams(label) {
    compAvgs["20"] = localStorage[label + "a20"];
    compAvgs["19"] = localStorage[label + "a19"];
    compAvgs["18"] = localStorage[label + "a18"];
    compAvgs["17"] = localStorage[label + "a17"];
    compAvgs["16"] = localStorage[label + "a16"];
    compAvgs["15"] = localStorage[label + "a15"];
    compAvgs.B = localStorage[label + "aB"];
    compStdDev["20"] = localStorage[label + "sd20"];
    compStdDev["19"] = localStorage[label + "sd19"];
    compStdDev["18"] = localStorage[label + "sd18"];
    compStdDev["17"] = localStorage[label + "sd17"];
    compStdDev["16"] = localStorage[label + "sd16"];
    compStdDev["15"] = localStorage[label + "sd15"];
    compStdDev.B = localStorage[label + "sdB"];
    for (num in compAvgs) {
        if (compAvgs[num] == null || compStdDev[num] == null) {
            return false;
        }
        compAvgs[num] = parseFloat(compAvgs[num]);
        compStdDev[num] = parseFloat(compStdDev[num]);
    }
    return true
}
function TeamState() {
    this.score = "0";
    this.markHits = new Array();
}
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
    compMarkStates = new Array();
    if (null != endGame) {
        clearInterval(endGame);
        endGame = null;
    }
}
;