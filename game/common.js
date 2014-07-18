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
function addHit(point) {
    var pointIndex = point.id.substr(2, 2);
    if ("1" == point.id.substr(1, 1)) {
        switch ($(point).text()) {
            case "O":
                if ("O" != $("#t2" + pointIndex).text()) {
                    if ("B" == pointIndex) {
                        score = 25;
                    } else {
                        score = parseInt(pointIndex);
                    }
                    ++t1MarkHits[pointIndex];
                    localStorage["ht1" + pointIndex] = t1MarkHits[pointIndex];
                    $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) + score);
                }
                break;
            case "X":
                $(point).text("O");
                t1MarkHits[pointIndex] = 3;
                localStorage["ht1" + pointIndex] = 3;
                break;
            case "/":
                $(point).text("X");
                t1MarkHits[pointIndex] = 2;
                localStorage["ht1" + pointIndex] = 2;
                break;
            default:
                $(point).text("/");
                t1MarkHits[pointIndex] = 1;
                localStorage["ht1" + pointIndex] = 1;
                break;
        }
    } else {
        switch ($(point).text()) {
            case "O":
                if ("O" != $("#t1" + pointIndex).text()) {
                    if ("B" == pointIndex) {
                        score = 25;
                    } else {
                        score = parseInt(pointIndex);
                    }
                    ++t2MarkHits[pointIndex];
                    localStorage["ht2" + pointIndex] = t2MarkHits[pointIndex];
                    $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) + score);
                }
                break;
            case "X":
                $(point).text("O");
                t2MarkHits[pointIndex] = 3;
                localStorage["ht2" + pointIndex] = 3;
                break;
            case "/":
                $(point).text("X");
                t2MarkHits[pointIndex] = 2;
                localStorage["ht2" + pointIndex] = 2;
                break;
            default:
                $(point).text("/");
                t2MarkHits[pointIndex] = 1;
                localStorage["ht2" + pointIndex] = 1;
                break;
        }
    }
    checkForEndGame();
}
function checkForEndGame() {
    switch (getGameStatus()) {
        case 1:
            clearHits();
            randomBackground("t1");
            endGame = setInterval(function() {
                randomBackground("t1");
            }, 400);
            break;
        case 2:
            clearHits();
            randomBackground("t2");
            endGame = setInterval(function() {
                randomBackground("t2");
            }, 400);
            break;
        case 3:
            clearHits();
            break;
    }
}
function removeHit(point) {
    var pointIndex = point.id.substr(2, 2);
    if ("1" == point.id.substr(1, 1)) {
        switch ($(point).text()) {
            case "O":
                if (3 < t1MarkHits[pointIndex]) {
                    if ("B" == pointIndex) {
                        score = 25;
                    } else {
                        score = parseInt(pointIndex);
                    }
                    --t1MarkHits[pointIndex];
                    localStorage["ht1" + pointIndex] = t1MarkHits[pointIndex];
                    $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) - score);
                } else {
                    $(point).text("X");
                    t1MarkHits[pointIndex] = 2;
                    localStorage["ht1" + pointIndex] = 2
                }
                break;
            case "X":
                $(point).text("/");
                t1MarkHits[pointIndex] = 1;
                localStorage["ht1" + pointIndex] = 1;
                break;
            case "/":
                $(point).text("");
                t1MarkHits[pointIndex] = 0;
                localStorage["ht1" + pointIndex] = 0;
                break;
        }
    } else {
        switch ($(point).text()) {
            case "O":
                if (3 < t2MarkHits[pointIndex]) {
                    if ("B" == pointIndex) {
                        score = 25
                    } else {
                        score = parseInt(pointIndex)
                    }
                    --t2MarkHits[pointIndex];
                    localStorage["ht2" + pointIndex] = t2MarkHits[pointIndex];
                    $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) - score)
                } else {
                    $(point).text("X");
                    t2MarkHits[pointIndex] = 2;
                    localStorage["ht2" + pointIndex] = 2
                }
                break;
            case "X":
                $(point).text("/");
                t2MarkHits[pointIndex] = 1;
                localStorage["ht2" + pointIndex] = 1;
                break;
            case "/":
                $(point).text("");
                t2MarkHits[pointIndex] = 0;
                localStorage["ht2" + pointIndex] = 0;
                break;
        }
    }
}
function getGameStatus() {
    var p1Closed = true;
    var p2Closed = true;
    if ("O" == $("#t1B").text()) {
        for (var i = 20; 15 <= i; --i) {
            if ("O" != $("#t1" + i).text()) {
                p1Closed = false;
                break;
            }
        }
    } else {
        p1Closed = false;
    }
    if (p1Closed && parseInt($("#teamOnePoints").text()) > parseInt($("#teamTwoPoints").text())) {
        return 1;
    }
    if ("O" == $("#t2B").text()) {
        for (var i = 20; 15 <= i; --i) {
            if ("O" != $("#t2" + i).text()) {
                p2Closed = false;
                break;
            }
        }
    } else {
        p2Closed = false;
    }
    if (p2Closed && parseInt($("#teamOnePoints").text()) < parseInt($("#teamTwoPoints").text())) {
        return 2;
    }
    if (p1Closed && p2Closed && parseInt($("#teamOnePoints").text()) == parseInt($("#teamTwoPoints").text())) {
        return 3;
    }
    return 0;
}
function randomBackground(player) {
    var color = "rgb(" + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + "," + (Math.floor(Math.random() * 256)) + ")";
    $("[id^=" + player + "]").css({backgroundColor: color});
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
    for (var i = 20; 15 <= i; --i) {
        switch (t1MarkHits[i.toString()]) {
            case 0:
                break;
            case 1:
                $("div#t1" + i).text("/");
                break;
            case 2:
                $("div#t1" + i).text("X");
                break;
            case 3:
                $("div#t1" + i).text("O");
                break;
            default:
                $("div#t1" + i).text("O");
                $("#teamOnePoints").text(parseInt($("#teamOnePoints").text()) + ((parseInt(t1MarkHits[i.toString()]) - 3) * i));
                break
        }
        switch (t2MarkHits[i.toString()]) {
            case 0:
                break;
            case 1:
                $("div#t2" + i).text("/");
                break;
            case 2:
                $("div#t2" + i).text("X");
                break;
            case 3:
                $("div#t2" + i).text("O");
                break;
            default:
                $("div#t2" + i).text("O");
                $("#teamTwoPoints").text(parseInt($("#teamTwoPoints").text()) + ((parseInt(t2MarkHits[i.toString()]) - 3) * i));
                break;
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
            break;
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
            break;
    }
    checkForEndGame()
}
function clearHits() {
    for (var i = 20; 15 <= i; --i) {
        localStorage["ht1" + i] = "0";
        localStorage["ht2" + i] = "0";
    }
    localStorage.ht1B = "0";
    localStorage.ht2B = "0";
}
;