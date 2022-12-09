import React, { Component } from "react";
import { ResponsiveRadar } from "@nivo/radar";

export class EvaluationRadarChart extends Component {
  constructor() {
    super();
    this.state = {
      evaluations: [],
    };
  }

  componentDidMount() {
    this.aggregate_evaluations();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.resp !== this.props.resp) {
      this.aggregate_evaluations();
    }
  }

  render() {
    if (this.state.evaluations.length === 0) {
      return <div></div>;
    }
    const { OverallRating, InvitedCount, RespondentCount } = this.state;
    return (
      <div id="gradebarchart">
        <p>
          Invited: <b> {InvitedCount}</b>
        </p>
        <p>
          Responded: <b> {RespondentCount}</b>
        </p>
        <br />
        <p>
          Course Evaluation Overall Rating:{" "}
          <b> {`${isNaN(OverallRating) ? "-" : OverallRating.toFixed(2)}`}</b> |
          5
        </p>
        <ResponsiveRadar
          data={this.state.evaluations}
          keys={["value"]}
          indexBy="id"
          maxValue="auto"
          margin={{ top: 70, right: 80, bottom: 40, left: 80 }}
          curve="linearClosed"
          borderWidth={2}
          borderColor={{ from: "color" }}
          gridLevels={5}
          gridShape="circular"
          gridLabelOffset={20}
          enableDots={true}
          dotSize={10}
          dotColor={{ theme: "background" }}
          dotBorderWidth={1}
          dotBorderColor={{ from: "color" }}
          enableDotLabel={false}
          dotLabel="value"
          dotLabelYOffset={16}
          colors={{ scheme: "dark2" }}
          fillOpacity={0.25}
          blendMode="multiply"
          animate={true}
          motionConfig="wobbly"
          isInteractive={false}
        />
      </div>
    );
  }

  aggregate_evaluations() {
    var data = {
      Learning: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      Enthusiasm: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      Organization: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      "Group Interaction": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      "Individual Rapport": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      Breadth: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      // Assignments: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      "Overall Rating": { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      InvitedCount: 0,
      RespondentCount: 0,
    };
    if (
      this.props.resp.evaluations === undefined ||
      this.props.resp.evaluations.length === 0
    )
      return;
    for (var i = 0; i < this.props.resp.evaluations.length; i++) {
      let evaluation = this.props.resp.evaluations[i];
      for (let key in evaluation) {
        switch (key) {
          case "Q1":
          case "Q2":
          case "Q3":
          case "Q4":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Learning"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q5":
          case "Q6":
          case "Q7":
          case "Q8":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Enthusiasm"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q9":
          case "Q10":
          case "Q11":
          case "Q12":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Organization"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q13":
          case "Q14":
          case "Q15":
          case "Q16":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Group Interaction"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q17":
          case "Q18":
          case "Q19":
          case "Q20":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Individual Rapport"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q21":
          case "Q22":
          case "Q23":
          case "Q24":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Breadth"][q] += evaluation[key][q] * q;
            }
            break;
          case "Q32":
            for (let q in evaluation[key]) {
              if (isNaN(q)) continue;
              data["Overall Rating"][q] += evaluation[key][q] * q;
            }
            break;
          case "respondent_count":
            data["RespondentCount"] += evaluation[key];
            break;
          case "invited_count":
            data["InvitedCount"] += evaluation[key];
            break;
          default:
            break;
        }
      }
    }
    var res = [];
    for (var key in data) {
      if (
        key === "InvitedCount" ||
        key === "RespondentCount" ||
        key === "Overall Rating"
      )
        continue;
      var item = { id: key, value: 0 };
      for (var k in data[key]) {
        item["value"] += data[key][k];
      }
      res.push(item);
    }

    // Calcuate Average rating
    var sum = 0;
    var num_total = 0;
    for (k in data["Overall Rating"]) {
      sum += data["Overall Rating"][k] * k;
      num_total += data["Overall Rating"][k];
    }
    let rating = sum / num_total;
    this.setState({
      evaluations: res,
      RespondentCount: data["RespondentCount"],
      InvitedCount: data["InvitedCount"],
      OverallRating: rating,
    });
  }
}

export default EvaluationRadarChart;
