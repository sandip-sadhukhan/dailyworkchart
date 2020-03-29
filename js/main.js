let myChart = document.getElementById("myChart").getContext("2d");

// Global Options
// Chart.defaults.global.defaultFontFamily = "Roboto";
// Chart.defaults.global.defaultFontSize = 18;
// Chart.defaults.global.defaultFontColor = "#777";

let massPopChart = new Chart(myChart, {
	type: "bar", // bar, horizontalBar, pie, line, doughnut, radar, polarArea
	data: {
		labels: [
			"11/03",
			"12/03",
			"13/03",
			"14/03",
			"15/03",
			"16/03",
			"17/03",
			"18/03",
			"19/03",
			"20/03"
		],
		datasets: [
			{
				label: "Points",
				data: [4, 5, 7, 3, 4, 10, 6, 2, 5, 3],
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
