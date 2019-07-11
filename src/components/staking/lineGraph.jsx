import React, { Component } from 'react';
import { Line }  from "react-chartjs-2";
import { colors } from '../../theme';
import moment from "moment";

class LineGraph extends Component {
  state = {
    top: 0,
    left: 0,
    date: null,
    value: 0,
    showTooltip: false,
    offset: 0
  };

  _chartRef = React.createRef();
  _containerRef = React.createRef();

  setPositionAndData = (top, left, date, value, offset) => {
    this.setState({top, left, date, value, showTooltip: true, offset});
  };

  hide = () => {
    this.setState({showTooltip: false})
  };

  render() {

    let { labels, data, height, padding, hideY, thickness, marginTop } = this.props

    if(!data) {
      return null
    }

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
      animation: {
        duration: 0
      },
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
        custom: (tooltipModel) => {
          // if chart is not defined, return early
          let chart = this._chartRef.current;
          if (!chart) {
            return;
          }

          let container = this._containerRef.current
          let offset = container.getBoundingClientRect().x

          const position = chart.chartInstance.canvas.getBoundingClientRect();

          // assuming your tooltip is `position: fixed`
          // set position of tooltip
          const left = position.left + tooltipModel.caretX;
          const top = position.top + tooltipModel.caretY;

          // set values for display of data in the tooltip
          const date = tooltipModel.dataPoints[0].xLabel;
          const value = tooltipModel.dataPoints[0].yLabel;

          this.setPositionAndData(top, left, date, value, offset);
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
        }}
        onMouseLeave={this.hide}
        ref={this._containerRef}
      >
        { this.state.showTooltip && <div style={{ top: 0, left: this.state.left-this.state.offset-35, position: 'absolute' }}>
          <div style={{
              backgroundColor: '#000',
              color: '#fff',
              fontFamily: 'Montserrat-Medium',
              fontSize: '10px',
              padding:' 5px',
              borderRadius: '3px'
            }}>
            {this.state.date ? moment(this.state.date).format("MMM DD, YYYY") : ''}
          </div>
          <div style={{
            borderLeft: '2px solid #dedede',
            height: 380,
            marginLeft: 35
          }}>
          </div>
        </div>}
        <Line
          ref={this._chartRef}
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
