var city = ['Kyiv', 'Harkiv', 'Lviv', 'Odessa', 'Dnipro'];
var words = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
var distances = [
    [0,     480,   541,   474,   476],
    [480,   0,     1017,  719,   217],
    [541,   1017,  0,     823,   1011],
    [474,   719,   823,   0,     579],
    [476,   217,   1011,  579,   0]
  ];

var allTrains;

function getAllTrains(n){
  var Tolik = [n];
  for(var i = 0; i <= n; i++){
    Tolik[i] = getRandomTrain();
  }
  return Tolik;
}

function askUser(){
  var N = city.length;
  var maxNumb = 2*(N*(N-1)/2);
  var numb = Number(prompt('enter number of trains: '));
  if(numb <= maxNumb && numb > 0){
    allTrains = getAllTrains(numb);
  } else {
    askUser();
  }
}

askUser();

function getRandom(min, max) {
    return Math.floor( Math.random() * (max - min) + min ); 
  }

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  }

  function getRandomTrain(){
    var cityFrom = getRandom(0, city.length - 1);
    var cityTo;
    do {
      var cityTo = getRandom(0, city.length - 1);
    }while(cityFrom == cityTo);
    var trainId = getRandom(100, 999) + words.charAt(getRandom(0, words.length-1));
    var date = randomDate(new Date(), new Date(2019, 5, 30));
    var dist = distances[cityFrom][cityTo];
    var avrageSpeed = getRandom(80,120);
    var drivingTime = Math.round(dist/avrageSpeed);
    var ticketCost = (drivingTime * 40.251).toFixed(2) + ' grn';
    var toTime = new Date(date.getTime());
    toTime.setHours(toTime.getHours() + drivingTime);
    return new trainDetails(city[cityFrom], city[cityTo], trainId, date, drivingTime, ticketCost, toTime)
  }
  
function trainDetails(f, t, trainN, data, time, grn, arrivalTime) { // заготовочка для роботи з об*єктами
    this.citF = f;
    this.citT = t;
    this.train = trainN;
    this.ddata = data;
    this.timeD = time;
    this.cost = grn;
    this.arrTime = arrivalTime;
}

function downloadJSON(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {type: contentType});
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

for (var i = 0; i < allTrains.length - 1; i++){
  console.log(allTrains[i]);
  console.log();
  var userData = JSON.stringify(allTrains, null, 4);
}
downloadJSON(userData, 'tolik', 'JSON')