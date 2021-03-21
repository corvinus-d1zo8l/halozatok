let hova = document.getElementById("ide");

function factorialize(num) {
    if (num < 0)
        return -1;
    else if (num == 0)
        return 1;
    else {
        return (num * factorialize(num - 1));
    }
};

for (let i = 0; i < 10; i++) {

    let sor = document.createElement("div");
    sor.classList.add("sor");

    hova.appendChild(sor);

    for (let y = 0; y < 10; y++) {
        if (i >= y) {
            let szam = document.createElement("div");
            szam.classList.add("doboz");

            szam.style.backgroundColor = `rgb(${255 / 10 * i},0,${255 / 10 * y})`;
            sor.appendChild(szam);
            szam.innerText = factorialize(i) / (factorialize(y) * factorialize(i - y));
        }
    }
}