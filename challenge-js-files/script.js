/////////// Creating the needed canvas areas throughout the document ////////////
class CreateCharts {
    constructor(parentNode, referenceNode, nodeId) {
        this.parentNode = document.querySelector(parentNode)
        this.referenceNode = document.querySelector(referenceNode)
        this.nodeId = nodeId
        const SETCANVAS = document.createElement("canvas")
        SETCANVAS.setAttribute("id", this.nodeId)
        SETCANVAS.style.width = "100%"
        this.parentNode.insertBefore(SETCANVAS, this.referenceNode)
    }
}

let homicidesChart = new CreateCharts(".mw-content-ltr", "#table2", "HomicidesChart")
let crimesChart = new CreateCharts(".mw-content-ltr", "#table1", "CrimesChart")
document.querySelector("dl").setAttribute("id", "datapointsReference")
let datapointsChart = new CreateCharts(".mw-content-ltr", "#datapointsReference", "DatapointsChart")

//////// Generating the homicide chart ////////////////////////////
//////// Creating tables prior to inserting datas ////////////////
let table2 = document.getElementById("table2");
let tableData1 = [];
let tableData2 = [];
let tableData3 = [];
let tdTable = table2.querySelectorAll("td");

////////////// Inserting datas with their own attributes inside specific arrays ///////////
for (i = 0; i < tdTable.length; i++) {
    tdTable[i].setAttribute("id", "a" + i);
        if (i === 0 || i % 3 === 0) {
            tdTable[i].setAttribute("class", "country2");
            tableData1.push(tdTable[i].innerText);
        };
        if(i === 1 || i % 3 === 1) {
            tableData2.push(tdTable[i].innerText);
        }
        if(i === 2 || i % 3 === 2) {
            tableData3.push(tdTable[i].innerText);
        }
};
console.log(tableData1);
console.log(tableData2);
console.log(tableData3);


let ctx = document.getElementById("HomicidesChart").getContext("2d")
const myChart = new Chart(ctx, {
    type: "bar",
    data:{
        labels : tableData1,
        datasets:[{
            label: "2007-2009",
            fill: true,
            data: tableData2,
            backgroundColor: "rgba(58,123,213,1)",
            borderColor: "rgba(0,0,0,0.1)",
        }, {
            label: "2010-2012",
            fill: true,
            data: tableData3,
            backgroundColor: "cyan",
            borderColor: "black"
        }
        ],
    },
    options: {
        indexAxis: "x",
        scales: {
            y: {
                beginAtZero: true
            },
        },
    },
});

////////////////////// Generating the crimes chart ////////////////////////

let table1 = document.getElementById("table1")
let thTable1 = table1.querySelectorAll("th")

let randomHex = () => {
    const COLORIZE = Math.floor(Math.random() * 16777215).toString(16);
    return `#${COLORIZE}`
}

let yearsFromTable1 = []
for (i = 5; i < thTable1.length - 35; i++) {
    yearsFromTable1.push(thTable1[i].textContent)
}
console.log(yearsFromTable1)

let crimesData= []
for (i = 2; i < table1.rows.length; i++) {
    let countryFromTable1 = table1.rows[i].cells[1].textContent
    let crimesByCountry = []

    for (j = 2; j < table1.rows[i].cells.length; j++) {
        crimesByCountry.push(parseInt(table1.rows[i].cells[j].textContent))
    }

    let entry = {
        label: countryFromTable1,
        data: crimesByCountry,
        backgroundColor: "#6B".concat(randomHex().split("#").pop()),
        borderColor: randomHex(),
        pointStyle: "rectRounded",
        spanGaps: true,
        fill: false,
        tension: 0.1
    }

    crimesData.push(entry)
}
console.log(crimesData)

let ctx2 = document.getElementById("CrimesChart")
ctx2.style.height = "700px" // ****** Note for Sara: feel free to edit the height or even remove it if u prefer ******
const myChart2 = new Chart(ctx2, {
    type: "line",
    data: {
        labels: yearsFromTable1,
        datasets: crimesData
    },
    options: {
    },
})

///////////////////// Creating the datapoints chart /////////////////////
let labelsArray = []
let datapointsArray = []
let ctx3 = document.getElementById("DatapointsChart").getContext("2d")

fetch("https://canvasjs.com/services/data/datapoints.php?xstart=0&ystart=10&length=10&type=json")
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            datapointsArray.push({x: data[i][0], y: data[i][1]})
            labelsArray.push(i)
        }

        MYCHART3 = new Chart(ctx3, {
            type: "line",
            data : {
                labels: labelsArray,
                datasets: [{
                    label: "Crime and criminal justice in the EU",
                    data: datapointsArray,
                    fill: true,
                    tension: 0.3,
                    pointStyle: "circle",
                    borderColor: randomHex(),
                    // backgroundColor: randomHex()
                }]
            }, 
                options: {
                }
        })
        liveUpdate()
        MYCHART3.render()
    })

let liveUpdate = () => {
    fetch(`https://canvasjs.com/services/data/datapoints.php?xstart= + ${datapointsArray.length + 1} + &ystart= + ${datapointsArray[datapointsArray.length - 1].y} + &length=1&type=json`)
    .then(response => response.json())
    .then(data => {
        for (let i = 0; i < data.length; i++) {
            datapointsArray.push({x: data[i][0], y: data[i][1]})
            labelsArray.push(labelsArray.length)
        }
    })
    MYCHART3.update()
    setTimeout(() => {liveUpdate()}, 3000)
}