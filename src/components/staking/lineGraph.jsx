import React, { Component } from 'react';
import { Line }  from "react-chartjs-2";
import { colors } from '../../theme';

class LineGraph extends Component {

  render() {

    let { labels, data, height, padding, hideY, thickness, marginTop } = this.props

    const chartData =  {
      labels: labels,
      datasets: [
        {
          borderColor: colors.lightBlue,
          borderWidth: thickness,
          fill: false,
          data: data,
          tension: 0,
          pointHitRadius: 10
        }
      ]
    }

    const chartOptions = {
      elements: { point: { radius: 0 } },
      maintainAspectRatio: false,
      scales: {
        yAxes: [
          {
            gridLines: {
              color: '#dedede',
              borderDash: [3, 5],
            },
            display: !hideY,
            ticks: {
              display: false
            }
          }
        ],
        xAxes: [
          {
            gridLines: {
              color: '#aaa',
              borderDash: [5, 5],
            },
            display: false
          },
        ],
      },
      tooltips: {
        callbacks: {
          title: function() {
            return "SICK POINT BRO";
          },
          label: function(item, data) {
            var datasetLabel = data.datasets[item.datasetIndex].label || "";
            var dataPoint = item.yLabel;
            return datasetLabel + ": " + dataPoint + "";
          }
        }
      }
    }

    return (
      <div style={{
          height: height,
          marginTop: marginTop,
          width: '100%',
          position: 'relative',
          padding: padding
        }}>
        <Line
          data={chartData}
          options={chartOptions}
          height={height}
          legend={false}
          bezierCurve={false}
        />
      </div>
    )
  }
}

export default LineGraph;
