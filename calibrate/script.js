var hits = {"20": new Array(),"19": new Array(),"18": new Array(),"17": new Array(),"16": new Array(),"15": new Array(),B: new Array()};
var settingsName = "default";
var hitSequence = new Array();
$(function() {
    $("div.hits").click(function() {
        if (!this.classList.contains("hits")) {
            return
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
                break
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
                    break
            }
        }
    });
    $("div#done").click(function() {
        for (hit in hits) {
            if (0 == hits[hit].length) {
                return
            }
            var a = average(hits[hit]);
            localStorage[settingsName + "a" + hit] = a.mean / 3;
            localStorage[settingsName + "sd" + hit] = a.deviation
        }
        window.location = "../index.html"
    })
});
average = function(d) {
    var g = {mean: 0,variance: 0,deviation: 0}, e = d.length;
    for (var b, f = 0, c = e; c--; f += d[c]) {
    }
    for (b = g.mean = f / e, c = e, f = 0; c--; f += Math.pow(d[c] - b, 2)) {
    }
    return g.deviation = Math.sqrt(g.variance = f / e), g
};