/**
 * Created by Administrator on 14-9-26.
 */

function loadPieChart(div, cur, title) {
    if (cur[0][1] <= 0) return;
    $(div).highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
        },
        colors: ['#90ed7d', '#7cb5ec'],
        title: {
            text: title
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f}%<br/> {point.y}G'
                }
            }
        },
        series: [
            {
                type: 'pie',
                name: title,
                data: cur
            }
        ]
    });
}
