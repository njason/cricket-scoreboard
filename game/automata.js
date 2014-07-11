var orderPreference = ["20", "19", "18", "17", "16", "15", "B"];
function runPointLogic(a, f) {
    var c = -1;
    var e = -1;
    var b = -1;
    for (var d = 0; 7 > d; ++d) {
        if (3 <= a[orderPreference[d]] && 3 > f[orderPreference[d]]) {
            b = d;
            break
        } else {
            if (3 > a[orderPreference[d]] && 3 > f[orderPreference[d]] && -1 == c) {
                c = d
            } else {
                if (3 > a[orderPreference[d]] && 3 <= f[orderPreference[d]] && -1 == e) {
                    e = d
                }
            }
        }
    }
    if (-1 != b) {
        return orderPreference[b]
    } else {
        if (-1 != c) {
            return orderPreference[c]
        } else {
            if (-1 != e) {
                return orderPreference[e]
            }
        }
    }
    return 0
}
function runCloseLogic(a, f) {
    var c = -1;
    var e = -1;
    var b = -1;
    for (var d = 0; 7 > d; ++d) {
        if (3 > a[orderPreference[d]]) {
            if (3 > f[orderPreference[d]]) {
                e = d;
                break
            } else {
                if (-1 == c) {
                    c = d
                }
            }
        } else {
            if (-1 == b && 3 <= f[orderPreference[d]]) {
                b = d
            }
        }
    }
    if (-1 != e) {
        return orderPreference[e]
    } else {
        if (-1 != c) {
            return orderPreference[c]
        } else {
            if (-1 != b) {
                return orderPreference[b]
            }
        }
    }
    return 0
}
function numHits(g, c, f) {
    var e = g + c * 2.5;
    var b = g - c * 2.5;
    var d = (Math.random() * (e - b)) * 100;
    var a;
    if (1 != d) {
        a = Math.round((Math.random() * (e - b)) + b)
    } else {
        var h = Math.random() * 2;
        if (0 == h) {
            a = 0
        } else {
            if ("B" == f) {
                a = 2
            } else {
                a = 3
            }
        }
    }
    if (0 > a) {
        a = 0
    }
    return a
}
;