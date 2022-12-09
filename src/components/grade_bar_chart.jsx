import React, { Component } from "react";
import { ResponsiveBar } from "@nivo/bar";
import StatsNumericalLabel from "./stats_num_label";

export class GradeBarChart extends Component {
  constructor() {
    super();
    this.state = {
      grades: [],
      gradePrecentage: [],
      enrollees: null,
      showDataSuppressionNotice: false,
    };
  }

  componentDidMount() {
    this.aggregate_grades();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.resp !== this.props.resp ||
      prevProps.location !== this.props.location
    ) {
      this.aggregate_grades();
    }
  }

  render() {
    if (this.state.grades.length === 0) {
      return <div></div>;
    }
    const { grades, gradePrecentage, enrollees } = this.state;
    return (
      <div className="list-style">
        <ul>
          {Object.keys(grades)
            .slice(0, 3)
            .map((key, i) => (
              <li key={i}>
                <StatsNumericalLabel
                  label={`Students w/ ${key}`}
                  value={`${grades[key]}`}
                />
              </li>
            ))}
        </ul>

        <h3 style={{}}>
          Total Students: <b>{enrollees}</b>
        </h3>

        {enrollees === 0 ? (
          <div>
            <b style={{ color: "black" }}>Data Supression Notice: </b>
            <p style={{ color: "black", display: "inline" }}>
              {"Grade data is suppressed if the following criterias are met: "}
            </p>
            <p style={{ color: "black", display: "inline" }}>
              if the enrollment count is less than or equal to 10, if all
              students received the same grade, and if all but one student gets
              the same grade (i.e. 10 enrolled and 9 got a B).
            </p>
          </div>
        ) : null}

        <br />
        <div id="gradebarchart">
          <ResponsiveBar
            data={gradePrecentage}
            keys={["A", "B", "C", "D", "F", "O"]}
            indexBy="id"
            margin={{ top: 0, right: 60, bottom: 50, left: 50 }}
            padding={0.1}
            valueScale={{ type: "linear" }}
            indexScale={{ type: "band", round: true }}
            label={(d) => `${d.value}%`}
            colors={[
              "#41ab5d",
              "#7fc97f",
              "#f16913",
              "#ef3b2c",
              "#e41a1c",
              "#A9A9A9",
            ]}
            itemHeight={"120px"}
            tooltip={({ id, value, color }) => (
              <strong style={{ color }}>
                % of Students With {id}: {value}%
                <br /># of Students With {id}: {grades[id]}
              </strong>
            )}
            borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
            axisTop={null}
            axisRight={null}
            axisBottom={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Grade",
              legendPosition: "middle",
              legendOffset: 32,
            }}
            axisLeft={{
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "% of Students",
              legendPosition: "middle",
              legendOffset: -40,
              format: function (value) {
                return `${value}`;
              },
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{ from: "color", modifiers: [["darker", 5]] }}
            legends={[
              {
                dataFrom: "keys",
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: "left-to-right",
                itemOpacity: 0.85,
                symbolSize: 20,
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
            animate={true}
            motionStiffness={90}
            motionDamping={15}
          />
        </div>
      </div>
    );
  }

  aggregate_grades() {
    var data = { A: 0, B: 0, C: 0, D: 0, F: 0, O: 0, enrolled: 0 };
    for (var i = 0; i < this.props.resp.grades.length; i++) {
      let grade = this.props.resp.grades[i];
      for (var key in grade) {
        switch (key) {
          case "A":
            data["A"] += grade["A"];
            break;
          case "B":
            data["B"] += grade["B"];
            break;
          case "C":
            data["C"] += grade["C"];
            break;
          case "D":
            data["D"] += grade["D"];
            break;
          case "F":
            data["F"] += grade["F"];
            break;
          case "O":
            data["O"] += grade["O"];
            break;
          case "total_enrolled":
            data["enrolled"] += grade["total_enrolled"];
            break;
          default:
            break;
        }
      }
    }
    var res = [];
    for (key in data) {
      if (key === "enrolled") continue;
      var precentage;
      if (data["enrolled"] === 0) precentage = 0;
      else precentage = `${((data[key] / data["enrolled"]) * 100).toFixed(2)}`;
      res.push({ id: key, [key]: precentage });
    }

    this.setState({
      gradePrecentage: res,
      grades: data,
      enrollees: data["enrolled"],
    });
    this.forceUpdate();
  }
}

export default GradeBarChart;
