var DEFAULT_COMP_AVG = 0.5;
var DEFAULT_COMP_STDDEV = 0.5;
var t1MarkHits = new Array();
t1MarkHits["20"] = 0;
t1MarkHits["19"] = 0;
t1MarkHits["18"] = 0;
t1MarkHits["17"] = 0;
t1MarkHits["16"] = 0;
t1MarkHits["15"] = 0;
t1MarkHits.B = 0;
var t2MarkHits = new Array();
t2MarkHits["20"] = 0;
t2MarkHits["19"] = 0;
t2MarkHits["18"] = 0;
t2MarkHits["17"] = 0;
t2MarkHits["16"] = 0;
t2MarkHits["15"] = 0;
t2MarkHits.B = 0;
var endGame = null;
function addHit(a) {
    var b = a.id.substr(2, 2);
    if ("1" == a.id.substr(1, 1)) {
        switch ($(a).text()) {
            case "O":
                if ("O" != $("#t2" + b).text()) {
                    if ("B" == b) {
                        score = 25
                    } else {
                        score = parseInt(b)
                    }
                    ++t1MarkHits[b];
                    localStorage["ht1" + b] = t1MarkHits[b];
                    $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) + score)
                }
                break;
            case "X":
                $(a).text("O");
                t1MarkHits[b] = 3;
                localStorage["ht1" + b] = 3;
                break;
            case "/":
                $(a).text("X");
                t1MarkHits[b] = 2;
                localStorage["ht1" + b] = 2;
                break;
            default:
                $(a).text("/");
                t1MarkHits[b] = 1;
                localStorage["ht1" + b] = 1;
                break
        }
    } else {
        switch ($(a).text()) {
            case "O":
                if ("O" != $("#t1" + b).text()) {
                    if ("B" == b) {
                        score = 25
                    } else {
                        score = parseInt(b)
                    }
                    ++t2MarkHits[b];
                    localStorage["ht2" + b] = t2MarkHits[b];
                    $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) + score)
                }
                break;
            case "X":
                $(a).text("O");
                t2MarkHits[b] = 3;
                localStorage["ht2" + b] = 3;
                break;
            case "/":
                $(a).text("X");
                t2MarkHits[b] = 2;
                localStorage["ht2" + b] = 2;
                break;
            default:
                $(a).text("/");
                t2MarkHits[b] = 1;
                localStorage["ht2" + b] = 1;
                break
        }
    }
    checkForEndGame()
}
function checkForEndGame() {
    switch (getGameStatus()) {
        case 1:
            clearHits();
            randomBackground("t1");
            endGame = setInterval(function() {
                randomBackground("t1")
            }, 400);
            break;
        case 2:
            clearHits();
            randomBackground("t2");
            endGame = setInterval(function() {
                randomBackground("t2")
            }, 400);
            break;
        case 3:
            clearHits();
            break
    }
}
function removeHit(a) {
    var b = a.id.substr(2, 2);
    if ("1" == a.id.substr(1, 1)) {
        switch ($(a).text()) {
            case "O":
                if (3 < t1MarkHits[b]) {
                    if ("B" == b) {
                        score = 25
                    } else {
                        score = parseInt(b)
                    }
                    --t1MarkHits[b];
                    localStorage["ht1" + b] = t1MarkHits[b];
                    $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) - score)
                } else {
                    $(a).text("X");
                    t1MarkHits[b] = 2;
                    localStorage["ht1" + b] = 2
                }
                break;
            case "X":
                $(a).text("/");
                t1MarkHits[b] = 1;
                localStorage["ht1" + b] = 1;
                break;
            case "/":
                $(a).text("");
                t1MarkHits[b] = 0;
                localStorage["ht1" + b] = 0;
                break
        }
    } else {
        switch ($(a).text()) {
            case "O":
                if (3 < t2MarkHits[b]) {
                    if ("B" == b) {
                        score = 25
                    } else {
                        score = parseInt(b)
                    }
                    --t2MarkHits[b];
                    localStorage["ht2" + b] = t2MarkHits[b];
                    $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) - score)
                } else {
                    $(a).text("X");
                    t2MarkHits[b] = 2;
                    localStorage["ht2" + b] = 2
                }
                break;
            case "X":
                $(a).text("/");
                t2MarkHits[b] = 1;
                localStorage["ht2" + b] = 1;
                break;
            case "/":
                $(a).text("");
                t2MarkHits[b] = 0;
                localStorage["ht2" + b] = 0;
                break
        }
    }
}
function getGameStatus() {
    var c = true;
    var a = true;
    if ("O" == $("#t1B").text()) {
        for (var b = 20; 15 <= b; --b) {
            if ("O" != $("#t1" + b).text()) {
                c = false;
                break
            }
        }
    } else {
        c = false
    }
    if (c && parseInt($("#teamOnePoints").text()) > parseInt($("#teamTwoPoints").text())) {
        return 1
    }
    if ("O" == $("#t2B").text()) {
        for (var b = 20; 15 <= b; --b) {
            if ("O" != $("#t2" + b).text()) {
                a = false;
                break
            }
        }
    } else {
        a = false
    }
    if (a && parseInt($("#teamOnePoints").text()) < parseInt($("#teamTwoPoints").text())) {
        return 2
    }
    if (c && a && parseInt($("#teamOnePoints").text()) == parseInt($("#teamTwoPoints").text())) {
        return 3
    }
    return 0
}
function randomBackground(b) {
    var a = "rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ")";
    $("[id^=" + b + "]").css({backgroundColor: a})
}
function loadHits() {
    t1MarkHits["20"] = parseInt(localStorage.ht120) || 0;
    t1MarkHits["19"] = parseInt(localStorage.ht119) || 0;
    t1MarkHits["18"] = parseInt(localStorage.ht118) || 0;
    t1MarkHits["17"] = parseInt(localStorage.ht117) || 0;
    t1MarkHits["16"] = parseInt(localStorage.ht116) || 0;
    t1MarkHits["15"] = parseInt(localStorage.ht115) || 0;
    t1MarkHits.B = parseInt(localStorage.ht1B) || 0;
    t2MarkHits["20"] = parseInt(localStorage.ht220) || 0;
    t2MarkHits["19"] = parseInt(localStorage.ht219) || 0;
    t2MarkHits["18"] = parseInt(localStorage.ht218) || 0;
    t2MarkHits["17"] = parseInt(localStorage.ht217) || 0;
    t2MarkHits["16"] = parseInt(localStorage.ht216) || 0;
    t2MarkHits["15"] = parseInt(localStorage.ht215) || 0;
    t2MarkHits.B = parseInt(localStorage.ht2B) || 0;
    for (var a = 20; 15 <= a; --a) {
        switch (t1MarkHits[a.toString()]) {
            case 0:
                break;
            case 1:
                $("div#t1" + a).text("/");
                break;
            case 2:
                $("div#t1" + a).text("X");
                break;
            case 3:
                $("div#t1" + a).text("O");
                break;
            default:
                $("div#t1" + a).text("O");
                $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) + ((parseInt(t1MarkHits[a.toString()]) - 3) * a));
                break
        }
        switch (t2MarkHits[a.toString()]) {
            case 0:
                break;
            case 1:
                $("div#t2" + a).text("/");
                break;
            case 2:
                $("div#t2" + a).text("X");
                break;
            case 3:
                $("div#t2" + a).text("O");
                break;
            default:
                $("div#t2" + a).text("O");
                $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) + ((parseInt(t2MarkHits[a.toString()]) - 3) * a));
                break
        }
    }
    switch (t1MarkHits.B) {
        case 0:
            break;
        case 1:
            $("div#t1B").text("/");
            break;
        case 2:
            $("div#t1B").text("X");
            break;
        case 3:
            $("div#t1B").text("O");
            break;
        default:
            $("div#t1B").text("O");
            $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) + ((parseInt(t1MarkHits.B) - 3) * 25));
            break
    }
    switch (t2MarkHits.B) {
        case 0:
            break;
        case 1:
            $("div#t2B").text("/");
            break;
        case 2:
            $("div#t2B").text("X");
            break;
        case 3:
            $("div#t2B").text("O");
            break;
        default:
            $("div#t2B").text("O");
            $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) + ((parseInt(t2MarkHits.B) - 3) * 25));
            break
    }
    checkForEndGame()
}
function clearHits() {
    for (var a = 20; 15 <= a; --a) {
        localStorage["ht1" + a] = "0";
        localStorage["ht2" + a] = "0"
    }
    localStorage.ht1B = "0";
    localStorage.ht2B = "0"
}
;