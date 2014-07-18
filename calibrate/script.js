var hits = {"20": new Array(),"19": new Array(),"18": new Array(),"17": new Array(),"16": new Array(),"15": new Array(),B: new Array()};
var settingsName = "default";
var hitSequence = new Array();
$(function() {
    $("div.hits").click(function() {
        if (!this.classList.contains("hits")) {
            return;
        }
        hits[$("div#number").text()].push(parseInt(this.innerText));
        hitSequence.push($("div#number").text());
        switch ($("div#number").text()) {
            case "20":
                $("div#number").html("19");
                break;
            case "19":
                $("div#number").html("18");
                break;
            case "18":
                $("div#number").html("17");
                break;
            case "17":
                $("div#number").html("16");
                break;
            case "16":
                $("div#number").html("15");
                break;
            case "15":
                $("div#number").html("B");
                $("div.nobull").toggleClass("hits");
                break;
            case "B":
                $("div#number").html("20");
                $("div.nobull").toggleClass("hits");
                break;
        }
    });
    $("div#undo").click(function() {
        if (0 < hitSequence.length) {
            hits[hitSequence.pop()].pop();
            switch ($("div#number").text()) {
                case "20":
                    $("div#number").html("B");
                    $("div.nobull").toggleClass("hits");
                    break;
                case "19":
                    $("div#number").html("20");
                    break;
                case "18":
                    $("div#number").html("19");
                    break;
                case "17":
                    $("div#number").html("18");
                    break;
                case "16":
                    $("div#number").html("17");
                    break;
                case "15":
                    $("div#number").html("16");
                    break;
                case "B":
                    $("div#number").html("15");
                    $("div.nobull").toggleClass("hits");
                    break;
            }
        }
    });
    $("div#done").click(function() {
        for (hit in hits) {
            if (0 == hits[hit].length) {
                return;
            }
            var avg = average(hits[hit]);
            localStorage[settingsName + "a" + hit] = avg.mean / 3;
            localStorage[settingsName + "sd" + hit] = avg.deviation;
        }
        window.location = "../index.html";
    })
});
average = function(pointHits) {
    var avg = {mean: 0, variance: 0, deviation: 0}
    var numHits = pointHits.length;
    for (var i, totalHits = 0, hitIndex = numHits; hitIndex--; totalHits += pointHits[hitIndex]);
    for (i = g.mean = totalHits / numHits, hitIndex = numHits, totalHits = 0; hitIndex--; totalHits += Math.pow(pointHits[hitIndex] - i, 2));
    avg.deviation = Math.sqrt(avg.variance = totalHits / numHits);
    return avg;
};
