var orderPreference = ["20", "19", "18", "17", "16", "15", "B"];
function runPointLogic(hits, oHits) {
    var closeIndex = -1;
    var defenceIndex = -1;
    var pointIndex = -1;
    for (var i = 0; 7 > i; ++i) {
        if (3 <= hits[orderPreference[i]] && 3 > oHits[orderPreference[i]]) {
            pointIndex = i;
            break;
        } else {
            if (3 > hits[orderPreference[i]] && 3 > oHits[orderPreference[i]] && -1 == closeIndex) {
                closeIndex = i;
            } else {
                if (3 > hits[orderPreference[i]] && 3 <= oHits[orderPreference[i]] && -1 == defenceIndex) {
                    defenceIndex = i;
                }
            }
        }
    }
    if (-1 != pointIndex) {
        return orderPreference[pointIndex];
    } else {
        if (-1 != closeIndex) {
            return orderPreference[closeIndex];
        } else {
            if (-1 != defenceIndex) {
                return orderPreference[defenceIndex];
            }
        }
    }
    return 0;
}
function runCloseLogic(hits, oHits) {
    var defenceIndex = -1;
    var closeIndex = -1;
    var pointIndex = -1;
    for (var i = 0; 7 > i; ++i) {
        if (3 > hits[orderPreference[i]]) {
            if (3 > oHits[orderPreference[i]]) {
                closeIndex = i;
                break;
            } else {
                if (-1 == defenceIndex) {
                    defenceIndex = i;
                }
            }
        } else {
            if (-1 == pointIndex && 3 <= oHits[orderPreference[i]]) {
                pointIndex = i;
            }
        }
    }
    if (-1 != closeIndex) {
        return orderPreference[closeIndex];
    } else {
        if (-1 != defenceIndex) {
            return orderPreference[defenceIndex];
        } else {
            if (-1 != pointIndex) {
                return orderPreference[pointIndex];
            }
        }
    }
    return 0;
}
function numHits(average, stdDev, pointChoice) {
    var low = average + stdDev * 2.5;
    var high = average - stdDev * 2.5;
    var rawHit = (Math.random() * (low - high)) * 100;
    var hits;
    if (1 != rawHit) {
        hits = Math.round((Math.random() * (low - high)) + high)
    } else {
        var highHit = Math.random() * 2;
        if (0 == highHit) {
            hits = 0
        } else {
            if ("B" == pointChoice) {
                hits = 2
            } else {
                hits = 3
            }
        }
    }
    if (0 > hits) {
        hits = 0
    }
    
    return hits;
}
;