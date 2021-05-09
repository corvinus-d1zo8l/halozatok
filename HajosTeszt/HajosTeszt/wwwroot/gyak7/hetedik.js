var kerdesek;
//var sorszam = 0;
var leptetes = 1;
var osszesKerdesSzama;
var aktualisKerdes;
var hotList = [];
var questionsInHotList = 3; //Később felkonfiguráljuk 7-re.
var displayedQuestion; //A hotListből melyik kérdést mutajuk épp
var numberOfQuestions; //Kérdések száma a teljes adatbázisban -> erre van már nekem egy változóm
var nextQuestion = 1; //A következő kérdés száma a teljes listában.
var timeoutHandler;
var tarolo = window.localStorage;

window.onload = function () {
    letoltes();
    //kerdesBetoltes(leptetes);
    init();
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
    //kerdesMegjelenites(0)
};

//fetch('/questions/1')
//    .then(respons => respons.json())
//    .then(data => kerdesMegjelenites(data))

fetch('/questions/count')
    .then(response => response.json())
    .then(output => {
        var data = output
        osszesKerdesSzama = data
    }
    )

function kerdesMegjelenites() {
    let kerdes = hotList[displayedQuestion].question;
    console.log(kerdes);
    //aktualisKerdes = kerdes
    document.getElementById("kerdes_szoveg").innerHTML = kerdes.questionText
    document.getElementById("valasz1").innerHTML = kerdes.answer1
    document.getElementById("valasz2").innerHTML = kerdes.answer2
    document.getElementById("valasz3").innerHTML = kerdes.answer3
    document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image
};


//function kerdesMegjelenites(kerdes) {
//    console.log(kerdes);
//    aktualisKerdes = kerdes
//    document.getElementById("kerdes_szoveg").innerHTML = kerdes.questionText
//    document.getElementById("valasz1").innerHTML = kerdes.answer1
//    document.getElementById("valasz2").innerHTML = kerdes.answer2
//    document.getElementById("valasz3").innerHTML = kerdes.answer3
//    document.getElementById("kep1").src = "https://szoft1.comeback.hu/hajo/" + kerdes.image
//};

function kerdesBetoltes(questionNumber, destination) {
    fetch(`/questions/${questionNumber}`)
        .then(result => {
            if (!result.ok) {
                console.error(`Hibás letöltés: ${response.status}`)
            }
            else {
                return result.json()
            }
        })
        .then(
            q => {
                hotList[destination].question = q;
                hotList[destination].goodAnswers = 0;
                console.log(`A ${questionNumber}. kérdés letöltve a hot list ${destination}. helyére`);
                if (displayedQuestion == undefined && destination == 0) {
                    displayedQuestion = 0;
                    kerdesMegjelenites()
                }
            }
        )
}

function init() {
    if (tarolo.getItem('hotListBackup') != null) {
        var tempList = JSON.parse(tarolo.getItem('hotListBackup'));
        var tempDisplayed = JSON.parse(tarolo.getItem('displayedQuestionBackup'));
        var tempNext = JSON.parse(tarolo.getItem('nextQuestionBackup'));
        hotList = tempList;
        console.log("Backup betöltve.")
        displayedQuestion = tempDisplayed;
        nextQuestion = tempNext;
        kerdesMegjelenites();
    } else {
        for (var i = 0; i < questionsInHotList; i++) {
            let q = {
                question: {},
                goodAnswers: 0
            }
            hotList[i] = q;
        }

        for (var i = 0; i < questionsInHotList; i++) {
            kerdesBetoltes(nextQuestion, i);
            nextQuestion++;
        }
    }
}


//function kerdesBetoltes(id) {
//    fetch(`/questions/${id}`)
//        .then(response => {
//            if (!response.ok) {
//                console.error(`Hibás válasz: ${response.status}`)
//            }
//            else {
//                return response.json()
//            }