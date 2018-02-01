/*
 * Chart Demos for the dashboard views
 */
var createGraph = (selector, data1, data2, labels, colors, borderColor, bgColor) => {
    $("<div id='tooltip'></div>").css({
        position: "absolute",
        display: "none",
        border: "1px solid #fdd",
        padding: "2px",
        "background-color": "#fee",
        opacity: 0.80
    }).appendTo("body");
    $.plot($(selector), [{
        data: data1,
        label: labels[0],
        color: colors[0],
    }, {
        data: data2,
        label: labels[1],
        color: colors[1]
    }], {
        series: {
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.2
                    }, {
                        opacity: 0.9
                    }]
                }
            },
            points: {
                show: true
            },
            shadowSize: 0
        },
        legend: {
            position: 'nw'
        },
        grid: {
            hoverable: true,
            clickable: true,
            borderColor: '#fff',
            borderWidth: 0,
            labelMargin: 10,
            backgroundColor: '#fff'
        },
        yaxis: {
            min: 0,
            max: 15,
            color: 'rgba(0,0,0,0)'
        },
        xaxis: {
            color: 'rgba(0,0,0,0)'
        },
        tooltip: true,
        tooltipOpts: {
            content: '%s: Value of %x is %y',
            shifts: {
                x: -60,
                y: 25
            },
            defaultTheme: false
        }
    });
};
var dashboardWebStats = () => {
    var uploads = [];
    for (var i = 0; i <= 10; i += 1) {
        uploads.push([i,Math.random() * 13]);
    }
    var downloads = [];
    for (var i = 0; i <= 10; i += 1) {
        downloads.push([i,Math.random() * 13]);
    }
    var plabels = ["Unique", "Returning"];
    var pcolors = ['#2196F3', '#5867C3'];
    var borderColor = '#fff';
    var bgColor = '#fff';
    if ($('#website-stats').length > 0) {
        createGraph("#website-stats", uploads, downloads, plabels, pcolors, borderColor, bgColor);
    }
}
//
// Sparkline demo
//
var sparklineDashboard = () => {
	$("#sparkline1").sparkline([345,404,305,455,378,567,586,685,458,742,565], {
			type: 'line',
			width: '100%',
			height: '40',
			spotRadius: 4,
			lineWidth:1,
			lineColor:'#ffffff',
			fillColor: false,
			minSpotColor :false,
			maxSpotColor : false,
			highlightLineColor : '#ffffff',
			highlightSpotColor: '#ffffff',
			tooltipChartTitle: 'Page Views',
			spotColor:'#ffffff',
			valueSpots : {
					'0:': '#ffffff'
			}
	});
	var barEl = $("#sparkline2");
	var barValues = [40,32,65,53,62,55,24,67,45,70,45,56,34,67,76,32,65,53,62,55,24,67,45,70,45,56,70,45,56,34,67,76,32,65,53,62,55];
	var barValueCount = barValues.length;
	var barSpacing = 1;
	var salesSparkline = function(){
			 barEl.sparkline(barValues, {
					type: 'bar',
					height: 55,
					barWidth: Math.round((barEl.parent().width() - ( barValueCount - 1 ) * barSpacing ) / barValueCount),
					barSpacing: barSpacing,
					zeroAxis: false,
					tooltipChartTitle: 'Weekly Donations',
								tooltipPrefix :'$ ',
					barColor: 'rgba(255,255,255,.7)'
			});
	}


salesSparkline();
}
//
// Chartist
//
const chartistPathAnimationDashboard = () => {
    if ($('#ct-PathAnimation1 ').length > 0) {
        var chart = new Chartist.Line('#ct-PathAnimation1 .ct-chart', {
            labels: ['Jan', 'Feb', 'March '],
            series: [
                [1, 5, 2],
                [2, 3, 4],
                [5, 4, 3]
            ]
        }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        });
        chart.on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    }
    if ($('#ct-PathAnimation2 ').length > 0) {
        var chart = new Chartist.Line('#ct-PathAnimation2 .ct-chart', {
            labels: ['April', 'May', 'June'],
            series: [
                [3, 2, 2],
                [2, 3, 4],
                [1, 4, 0.5]
            ]
        }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        });
        chart.on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    }
    if ($('#ct-PathAnimation3 ').length > 0) {
        var chart = new Chartist.Line('#ct-PathAnimation3 .ct-chart', {
            labels: ['July', 'Aug', 'Sept'],
            series: [
                [2, 4, 3],
                [1, 5, 0.5],
                [2, 3, 2]
            ]
        }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        });
        chart.on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    }
    if ($('#ct-PathAnimation4').length > 0) {
        var chart = new Chartist.Line('#ct-PathAnimation4 .ct-chart', {
            labels: ['Oct', 'Nov', 'Dec'],
            series: [
                [0.5, 5,2],
                [6, 3, 4],
                [5, 8, 6]
            ]
        }, {
            low: 0,
            showArea: true,
            showPoint: false,
            fullWidth: true
        });
        chart.on('draw', function(data) {
            if (data.type === 'line' || data.type === 'area') {
                data.element.animate({
                    d: {
                        begin: 2000 * data.index,
                        dur: 2000,
                        from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
                        to: data.path.clone().stringify(),
                        easing: Chartist.Svg.Easing.easeOutQuint
                    }
                });
            }
        });
    }
}
const chartistLineDashboard = () => {
    if ($('#ct-LineChart1').length > 0) {
        new Chartist.Line('#ct-LineChart1 .ct-chart', {
            labels: [10, 20, 30, 40, 50, 60],
            series: [
                    [5, 3, 7, 5, 2, 7, 9]
            ]
        }, {
            low: 0,
            showArea: true
        });
    }
    if ($('#ct-LineChart2').length > 0) {
        new Chartist.Line('#ct-LineChart2 .ct-chart', {
            labels: [10, 20, 30, 40, 50, 60],
            series: [
                    [2, 3, 6, 8, 7, 5, 2]
            ]
        }, {
            low: 0,
            showArea: true
        });
    }
    if ($('#ct-LineChart3').length > 0) {
        new Chartist.Line('#ct-LineChart3 .ct-chart', {
            labels: [10, 20, 30, 40, 50, 60],
            series: [
                    [5, 3, 7, 5, 2, 4, 9]
            ]
        }, {
            low: 0,
            showArea: true
        });
    }
    if ($('#ct-LineChart4').length > 0) {
        new Chartist.Line('#ct-LineChart4 .ct-chart', {
            labels: [10, 20, 30, 40, 50, 60],
            series: [
                    [3, 4, 7, 8, 5, 3, 5]
            ]
        }, {
            low: 0,
            showArea: true
        });
    }
}
const chartistBarsDashboard = () => {
    if ($('#ct-BarChart1').length > 0) {
        new Chartist.Bar('#ct-BarChart1 .ct-chart', {
            labels: ['JAN', 'FEB', 'MARCH', 'APRIL'],
            series: [
                [800000, 1200000, 1400000, 1300000],
                [200000, 400000, 500000, 300000],
                [100000, 200000, 400000, 600000]
            ]
        }, {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            }
        }).on('draw', function(data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });
    }
    if ($('#ct-BarChart2').length > 0) {
        new Chartist.Bar('#ct-BarChart2 .ct-chart', {
            labels: ['MAY', 'JUNE', 'JULY', 'AUG'],
            series: [
                [200000, 800000, 900000, 1300000],
                [205000, 505000, 305000, 805000],
                [505000, 700000, 1000000, 1100000]
            ]
        }, {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            }
        }).on('draw', function(data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });
    }
    if ($('#ct-BarChart3').length > 0) {
        new Chartist.Bar('#ct-BarChart3 .ct-chart', {
            labels: ['Sept', 'OCT', 'NOV', 'DEC'],
            series: [
                [1000000, 1200000, 1400000, 1800000],
                [600000, 700000, 1000000, 1200000],
                [110000, 140000, 1600000, 1800000]
            ]
        }, {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            }
        }).on('draw', function(data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });
    }
    if ($('#ct-BarChart4').length > 0) {
        new Chartist.Bar('#ct-BarChart4 .ct-chart', {
            series: [
                [100000, 1200000, 1700000, 2000000],
                [200000, 500000, 900000, 3000000],
                [130000, 1600000, 1800000, 2000000]
            ]
        }, {
            stackBars: true,
            axisY: {
                labelInterpolationFnc: function(value) {
                    return (value / 1000) + 'k';
                }
            }
        }).on('draw', function(data) {
            if (data.type === 'bar') {
                data.element.attr({
                    style: 'stroke-width: 30px'
                });
            }
        });
    }
}
const chartistBiPolarChartDashboard = () => {
    if ($('#ct-BiPolarChart1').length > 0) {
        new Chartist.Line('#ct-BiPolarChart1 .ct-chart', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, 3, 1, -2, 0, 1, 0],
                [-2, -1, -2, -1, -2.5, -1, -2, -1],
                [0, 0, 0, 1, 2, 2.5, 2, 1],
                [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
            ]
        }, {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });
    }
    if ($('#ct-BiPolarChart2').length > 0) {
        new Chartist.Line('#ct-BiPolarChart2 .ct-chart', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5],
                [1, 2, 3, -1, -2, 0, 1, 4],
                [-2, 1, -2, -1, -2.5, -1.5, -2, -1],
                [0, 3, 0, 1, 2, 2.5, 2, 1]
            ]
        }, {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });
    }
    if ($('#ct-BiPolarChart3').length > 0) {
        new Chartist.Line('#ct-BiPolarChart3 .ct-chart', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, 1, 1, -2, 0.5, 1, 0],
                [-2, -1, -2, -1, 2.5, -1, -2, -1],
                [0, 0, 0, 1.5, 2, 2.5, 2, 1],
                [2.5, 2, 1.5, 0.5, 1, 5, -1, 2.5]
            ]
        }, {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });
    }
    if ($('#ct-BiPolarChart4').length > 0) {
        new Chartist.Line('#ct-BiPolarChart4 .ct-chart', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8],
            series: [
                [1, 2, -3, 1, 2, 0, 1, 0],
                [-2, -1, -2, 4, -2.5, -1, 2, -1],
                [3, 0, 0, 1, 2.5, 2.5, 2, 1],
                [2.5, 2, 1, 0.5, 1, 0.5, -1, -2.5]
            ]
        }, {
            high: 3,
            low: -3,
            showArea: true,
            showLine: false,
            showPoint: false,
            fullWidth: true,
            axisX: {
                showLabel: false,
                showGrid: false
            }
        });
    }
}
const drawSparkline = () => {
       var linePoints = [0, 1, 3, 6, 1, 1, 4, 1, 12, 7, 5, 2, 4, 1, 2, 6, 10, 4, 2, 0, 3, 1, 8, 4, 1, 0, 2, 3, 6, 3, 4];
       $('#sparkline-line').sparkline(linePoints, {
           type: 'line',
           width: 'calc(100% + 4px)',
           height: '45',
           chartRangeMax: 11,
           lineColor: 'rgba(34, 110, 125,0.5)',
           fillColor: 'rgba(34, 110, 125,0.4)',
           highlightLineColor: 'rgba(0,0,0,0)',
           highlightSpotColor: 'rgba(0,0,0,.2)',
           tooltip: true
       });
       var barParent = $('#sparkline-bar').parents('.card');
       var barPoints = [0, 1, 3, 4, 2, 7,11,2, 6, 3, 2, 4, 1, 1, 4, 1, 2, 0, 3, 1, 3, 4, 1, 10, 2, 3, 1, 2, 6, 12, 4];
       var barWidth = 5;
       $('#sparkline-bar').sparkline(barPoints, {
           type: 'bar',
           height: $('#sparkline-bar').height() + 'px',
           width: '100%',
           barWidth: barWidth,
           barSpacing: (barParent.width() - (barPoints.length * barWidth)) / barPoints.length,
           barColor: 'rgba(34, 110, 125,.6)',
           tooltipFormat: ' <span class="tooltip">&#9679;</span> {{value}}</span>'
       });
   };
	 
	 
	 
	 
	 const dashboardC3Donut = () => {
	   if ($('#dashboardC3Donut').length) {
	     var chart = c3.generate({
	       bindto: '#dashboardC3Donut',
	       data: {
	         columns: [
	           ['Overhead', 30],
	           ['Debugging', 120],
	         ],
	         type: 'donut',
	         onclick: function(d, i) {
	           //console.log("onclick", d, i);
	         },
	         onmouseover: function(d, i) {
	           //console.log("onmouseover", d, i);
	         },
	         onmouseout: function(d, i) {
	           //console.log("onmouseout", d, i);
	         }
	       },
	       donut: {
	         title: "Work Week"
	       },
	       color: {
	         pattern: [MaterialLab.APP_COLORS.info, MaterialLab.APP_COLORS.success, MaterialLab.APP_COLORS.primary, MaterialLab.APP_COLORS.mw_purple, MaterialLab.APP_COLORS.success]
	       }
	     });
	     setTimeout(function() {
	       chart.load({
	         columns: [
	           ["Problem Solving", 0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.3, 0.2, 0.2, 0.1, 0.2, 0.2, 0.1, 0.1, 0.2, 0.4, 0.4, 0.3, 0.3, 0.3, 0.2, 0.4, 0.2, 0.5, 0.2, 0.2, 0.4, 0.2, 0.2, 0.2, 0.2, 0.4, 0.1, 0.2, 0.2, 0.2, 0.2, 0.1, 0.2, 0.2, 0.3, 0.3, 0.2, 0.6, 0.4, 0.3, 0.2, 0.2, 0.2, 0.2],
	           ["Firefighting", 1.4, 1.5, 1.5, 1.3, 1.5, 1.3, 1.6, 1.0, 1.3, 1.4, 1.0, 1.5, 1.0, 1.4, 1.3, 1.4, 1.5, 1.0, 1.5, 1.1, 1.8, 1.3, 1.5, 1.2, 1.3, 1.4, 1.4, 1.7, 1.5, 1.0, 1.1, 1.0, 1.2, 1.6, 1.5, 1.6, 1.5, 1.3, 1.3, 1.3, 1.2, 1.4, 1.2, 1.0, 1.3, 1.2, 1.3, 1.3, 1.1, 1.3],
	           ["Writing Code", 2.5, 1.9, 2.1, 1.8, 2.2, 2.1, 1.7, 1.8, 1.8, 2.5, 2.0, 1.9, 2.1, 2.0, 2.4, 2.3, 1.8, 2.2, 2.3, 1.5, 2.3, 2.0, 2.0, 1.8, 2.1, 1.8, 1.8, 1.8, 2.1, 1.6, 1.9, 2.0, 2.2, 1.5, 1.4, 2.3, 2.4, 1.8, 1.8, 2.1, 2.4, 2.3, 1.9, 2.3, 2.5, 2.3, 1.9, 2.0, 2.3, 1.8],
	         ]
	       });
	     }, 1500);
	     setTimeout(function() {
	       chart.unload({
	         ids: 'data1'
	       });
	       chart.unload({
	         ids: 'data2'
	       });
	     }, 2500);
	   }
	 }
	 

export {
    dashboardWebStats,
    sparklineDashboard,
    chartistLineDashboard,
    chartistBarsDashboard,
    chartistBiPolarChartDashboard,
    chartistPathAnimationDashboard,
    drawSparkline,
		dashboardC3Donut
}
