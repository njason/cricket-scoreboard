var compMarkStates = new Array();
var compAvgs = new Array();
var compStdDev = new Array();
$(document).ready(function() {
    if (!loadCompParams("default")) {
        defaultCompParams()
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
            checkForEndGame()
        }
        $("[id^=t1]").toggleClass("userNegative");
        $("[id^=t1]").toggleClass("userPositive");
        $("[id^=t2]").toggleClass("userNegative");
        $("[id^=t2]").toggleClass("automata")
    });
    $("[id^=t1]").click(function() {
        if ("UNDO" == $("div#undoToggle").text()) {
            if (null == endGame) {
                addHit(this)
            } else {
                reset()
            }
        } else {
            removeHit(this)
        }
    });
    $("[id^=t2]").click(function() {
        if ("UNDO" == $("div#undoToggle").text()) {
            if (null == endGame) {
                addComputerMarkState();
                for (var a = 0; 3 > a; ++a) {
                    straightLogic()
                }
            } else {
                reset()
            }
        } else {
            restoreComputerMarkState()
        }
    })
});
function straightLogic() {
    var b;
    if (parseInt($("div#teamOnePoints").text()) >= parseInt($("div#teamTwoPoints").text())) {
        b = runPointLogic(t2MarkHits, t1MarkHits)
    } else {
        b = runCloseLogic(t2MarkHits, t1MarkHits)
    }
    if (0 != b) {
        var a = numHits(0.5, 0.2, b);
        for (var c = 0; a > c; ++c) {
            addHit(document.getElementById("t2" + b))
        }
    }
}
function addComputerMarkState() {
    var a = new TeamState();
    a.score = $("div#teamTwoPoints").text();
    a.markHits = t2MarkHits.slice();
    compMarkStates.push(a)
}
function restoreComputerMarkState() {
    if (0 < compMarkStates.length) {
        var a = compMarkStates.pop();
        $("div#teamTwoPoints").html(a.score);
        t2MarkHits = a.markHits;
        for (var b in t2MarkHits) {
            if (3 <= t2MarkHits[b]) {
                $("div#t2" + b).html("O")
            } else {
                if (2 == t2MarkHits[b]) {
                    $("div#t2" + b).html("X")
                } else {
                    if (1 == t2MarkHits[b]) {
                        $("div#t2" + b).html("/")
                    } else {
                        $("div#t2" + b).html("")
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
    compStdDev.B = parseFloat(DEFAULT_COMP_STDDEV)
}
function loadCompParams(a) {
    compAvgs["20"] = localStorage[a + "a20"];
    compAvgs["19"] = localStorage[a + "a19"];
    compAvgs["18"] = localStorage[a + "a18"];
    compAvgs["17"] = localStorage[a + "a17"];
    compAvgs["16"] = localStorage[a + "a16"];
    compAvgs["15"] = localStorage[a + "a15"];
    compAvgs.B = localStorage[a + "aB"];
    compStdDev["20"] = localStorage[a + "sd20"];
    compStdDev["19"] = localStorage[a + "sd19"];
    compStdDev["18"] = localStorage[a + "sd18"];
    compStdDev["17"] = localStorage[a + "sd17"];
    compStdDev["16"] = localStorage[a + "sd16"];
    compStdDev["15"] = localStorage[a + "sd15"];
    compStdDev.B = localStorage[a + "sdB"];
    for (num in compAvgs) {
        if (compAvgs[num] == null || compStdDev[num] == null) {
            return false
        }
        compAvgs[num] = parseFloat(compAvgs[num]);
        compStdDev[num] = parseFloat(compStdDev[num])
    }
    return true
}
function TeamState() {
    this.score = "0";
    this.markHits = new Array()
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
        t2MarkHits[hit] = 0
    }
    compMarkStates = new Array();
    if (null != endGame) {
        clearInterval(endGame);
        endGame = null
    }
}
;