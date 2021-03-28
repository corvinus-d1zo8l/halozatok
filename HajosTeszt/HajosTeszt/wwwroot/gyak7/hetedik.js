var kerdesek;
var sorszam = 0;

window.onload = function () {
    letoltes();

};

function letoltes() {
    fetch('/questions.json')
        .then(response => response.json())
        .then(data => letoltesBefejezodott(data))
};

function letoltesBefejezodott(d) {
    console.log("Sikeres letöltés")
    console.log(d)
    kerdesek = d
    kerdesMegjelenites(0)
};

function kerdesMegjelenites(kerdes) {
    document.getElementById("kerdes_szoveg").innerHTML = kerdesek[kerdes].questionText
    document.getElementById("valasz1").innerHTML = kerdesek[kerdes].answer1
    document.getElementById("valasz2").innerHTML = kerdesek[kerdes].answer2
    document.getElementById("valasz3").innerHTML = kerdesek[kerdes].answer3
    document.getElementById("kep1").src = `https://szoft1.comeback.hu/hajo/${kerdesek[kerdes].image}`
};

function vissza() {
    if (sorszam != 0) {
        sorszam = sorszam - 1;
        kerdesMegjelenites(sorszam)
    } else {
        sorszam = 2; kerdesMegjelenites(sorszam)
    }
    torles()
};

function elore() {
    if (sorszam != 2) {
        sorszam = sorszam + 1;
        kerdesMegjelenites(sorszam);
    } else {
        sorszam = 0; kerdesMegjelenites(sorszam)
    }
    torles()
};

function klikk() {
    if (this.innerHTML == "Vissza") {
        if (sorszam != 0) {
            sorszam = sorszam - 1;
            kerdesMegjelenites(sorszam)
        } else {
            sorszam = 2; kerdesMegjelenites(sorszam)
        }
    } else {
        if (sorszam != 2) {
            sorszam = sorszam + 1;
            kerdesMegjelenites(sorszam);
        } else { sorszam = 0; kerdesMegjelenites(sorszam) };
    };
}
/*
function megoldas2(ki) {
    if (kerdesek[sorszam].correctAnswer == ki) {
        document.getElementById(`valasz${ki}`).classList.add("jo")
    } else {
        document.getElementById(`valasz${ki}`).classList.add("rossz")
        document.getElementById(`valasz${kerdesek[sorszam].correctAnswer}`).classList.add("jo")
    }
}
*/
function megoldas(ki) {
    if (kerdesek[sorszam].correctAnswer == ki) {
        document.getElementById(`valasz${ki}`).classList.add("jo")
    } else {
        for (var i = 1; i < kerdesek.length + 1; i++) {
            if (kerdesek[sorszam].correctAnswer == i) {
                document.getElementById(`valasz${kerdesek[sorszam].correctAnswer}`).classList.add("jo")
            } else {
                document.getElementById(`valasz${i}`).classList.add("rossz")
            }
        }
    }

}

function torles() {
    for (let i = 1; i < 4; i++) {
        document.getElementById(`valasz${i}`).classList.remove("rossz")
        document.getElementById(`valasz${i}`).classList.remove("jo")
    }
}