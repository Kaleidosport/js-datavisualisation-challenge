
    let canvas = document.createElement('canvas');
    let ctx = canvas.getContext('2d');

    canvas.id='canvasCreate';
    canvas.className='canvas';
    canvas.style.width = '100%';
    //canvas.style.backgroundColor = 'black';

    document.getElementById("Homicides").append(canvas);

////////créer les tableaux pour insérer les datas////////////////

let table2 = document.getElementById("table2");
let tableData1 = [];
let tableData2 = [];
let tableData3 = [];
let tdTable = table2.querySelectorAll('td');

/////////insérer les data dans des classes///////////
for(i=0; i<tdTable.length; i++){
    tdTable[i].setAttribute('id', 'a' + i);
        if(i === 0 || i%3 === 0){
            tdTable[i].setAttribute('class', 'country2');
            tableData1.push(tdTable[i].innerText);
        };
        if(i === 1 || i%3 === 1){
            tableData2.push(tdTable[i].innerText);
        }
        if(i === 2 || i%3 === 2){
            tableData3.push(tdTable[i].innerText);
        }
};
console.log(tableData1);
console.log(tableData2);
console.log(tableData3);



const myChart = new Chart(ctx,{
    type: 'line',
    data:{
        labels : tableData1,
        datasets:[{
            label: '2007-2009',
            fill: true,
            data: tableData2,
            backgroundColor:'rgba(58,123,213,1)',
            borderColor: "rgba(0,0,0,0.1)",
        }],
    },
    options: {
        indexAxis: 'x',
        scales: {
            y: {
                beginAtZero: true
            },
        },
    },
});


