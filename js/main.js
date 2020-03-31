/****************************
 *     HTML UIS
 * **************************/
const todayPointUI = document.getElementById("todayValueId");
const showGraphBtnUI = document.getElementById("showGraphBtn");
const preloaderUI = document.getElementById("preloader");
const showGraphUI = document.getElementById("showGraph");
const todayTextUI = document.getElementById("today");

/****************************
 *       DEFAULT VALUES
 * **************************/
const DEFAULT_VALUE = 0;

/******************************
 *     DEPENDENT FUNCTIONS
 * ****************************/
const createChart = (myLabels, myData) => {
  let myChart = document.getElementById("myChart").getContext("2d");
  let massPopChart = new Chart(myChart, {
    type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
    data: {
      // labels: [
      //   "11/03",
      //   "12/03",
      //   "13/03",
      //   "14/03",
      //   "15/03",
      //   "16/03",
      //   "17/03",
      //   "18/03",
      //   "19/03",
      //   "20/03"
      // ],
      labels: myLabels,
      datasets: [
        {
          label: "Points",
          // data: [4, 5, 7, 3, 4, 10, 6, 2, 5, 3],
          data: myData,
          //backgroundColor:'green',
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(153, 102, 255, 0.6)",
            "rgba(255, 159, 64, 0.6)",
            "rgba(95, 39, 205,0.6)",
            "rgba(29, 209, 161,0.6)",
            "rgba(76, 209, 55,0.6)",
            "rgba(232, 65, 24,0.6)"
          ],
          borderWidth: 1,
          borderColor: "#777",
          hoverBorderWidth: 2,
          hoverBorderColor: "#000"
        }
      ]
    },
    options: {
      title: {
        display: true,
        text: "Your Daily Points",
        fontSize: 20
      },
      legend: {
        display: true,
        // position: "right",
        labels: {
          fontColor: "#000"
        }
      },
      // layout: {
      // 	padding: {
      // 		left: 50,
      // 		right: 0,
      // 		bottom: 0,
      // 		top: 0
      // 	}
      // },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [
          {
            display: true,
            ticks: {
              suggestedMin: 0, // minimum will be 0, unless there is a lower value.
              // OR //
              beginAtZero: true // minimum value will be 0.
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              offsetGridLines: true
            }
          }
        ]
      }
    }
  });
};

/*************************************
 *     MAIN CODE STARTS FROM HERE
 * ************************************/
const today = new Date();
const todayString =
  today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
console.log(todayString);
todayTextUI.innerHTML = todayString;
if (localStorage.getItem("data") === null) {
  let newData = [
    {
      date: todayString,
      point: DEFAULT_VALUE
    }
  ];
  localStorage.setItem("data", JSON.stringify(newData));
} else {
  console.log(JSON.parse(localStorage.getItem("data")));
  let newData = JSON.parse(localStorage.getItem("data"));
  let flag = false;
  let todayIndex = 0;
  for (let i = 0; i < newData.length; i++) {
    if (newData[i]["date"] === todayString) {
      flag = true;
      todayIndex = i;
      break;
    }
  }
  if (flag) {
    let todayPoint = parseInt(newData[todayIndex]["point"]);
    todayPointUI.value = todayPoint;
  } else {
    let oldData = JSON.parse(localStorage.getItem("data"));
    let newData = {
      date: todayString,
      point: DEFAULT_VALUE
    };
    oldData.push(newData);
    // print(oldData);
    localStorage.setItem("data", JSON.stringify(oldData));
  }
}

// should not be more than 10 days
let lsData = JSON.parse(localStorage.getItem("data"));
if (lsData.length > 10) {
  lsData.shift();
  localStorage.setItem("data", JSON.stringify(lsData));
}
// console.log(lsData);

/******************************
 *     EVENT LISTENERS
 * **************************/
todayPointUI.addEventListener("change", function() {
  let newPoint = parseInt(todayPointUI.value);
  let oldData = JSON.parse(localStorage.getItem("data"));
  oldData[oldData.length - 1]["point"] = newPoint;
  localStorage.setItem("data", JSON.stringify(oldData));
});

showGraphBtnUI.addEventListener("click", function() {
  // createChart('')
  let labels = [];
  let mydata = [];
  let Datas = JSON.parse(localStorage.getItem("data"));
  for (let i = 0; i < Datas.length; i++) {
    labels.push(Datas[i]["date"]);
    mydata.push(Datas[i]["point"]);
  }
  console.log(labels + "==>" + mydata);
  preloaderUI.style.display = "block";
  showGraphUI.style.display = "none";
  createChart(labels, mydata);
  setTimeout(function() {
    preloaderUI.style.display = "none";
    showGraphUI.style.display = "block";
    // console.log("hm");
  }, 2000);
});
