import React, { useEffect, useState } from "react";
import { ChartData, ScatterDataPoint } from "chart.js";
import LineChart from "./LineChart";
import moment from "moment";
import { randomData } from "../../utils/common-helper";
import axios from "axios";
import { CropApi } from "../../Apis/crop.api";
import { CreateHistory } from "../../Model/history";
import { StatApi } from "../../Apis/stat.api";
import { Stat } from "../../Model/stat";
import { Crop } from "../../Model/crop";
import ShrimpButton from "./ShrimpButton";

export interface Props {
  statId: string;
  crop: Crop;
}

export default function StatComponent({ statId, crop }: Props) {
  const [stat, setStat] = useState<Stat[]>();
  const [labels, setLabels] = useState<any[]>([]);
  const [datas, setDatas] = useState<number[]>([]);
  const [borderColor, setBorderColor] = useState<string[]>([]);
  const [currentStat, setCurrentStat] = useState<number>(0.0);
  const [period, setPeriod] = useState<number>(3000);
  const [checkPeriod, setCheckPeriod] = useState<number>(3000);

  useEffect(() => {
    StatApi.getStatById(statId).then((data) => {
      data.length && setStat(data);
    });
  }, [statId]);

  useEffect(() => {
    const intervalPH = setInterval(() => {
      if (Array.isArray(stat) && stat.length > 0) {
        const chartData: number[] = [...datas];
        const timeData: any[] = [...labels];
        const colorData: string[] = [...borderColor];

        if (chartData.length > 8) {
          chartData.shift();
          timeData.shift();
          colorData.shift();
        }
        var time = moment().format("LT");
        var datapH: number = parseFloat(
          randomData(stat[0].from_stat - 2, stat[0].to_stat + 2, currentStat)
        );
        setCurrentStat(datapH);

        if (datapH < stat[0].from_stat || datapH > stat[0].to_stat) {
          colorData.push("#FF0000");
        } else {
          colorData.push("#1BFF00");
        }
        setBorderColor(colorData);

        chartData.push(datapH);
        setDatas(chartData);

        timeData.push(time);
        setLabels(timeData);
      } else {
        clearInterval(intervalPH);
      }
    }, period);

    return () => {
      clearInterval(intervalPH);
    };
  }, [datas, labels, borderColor, stat, period]);

  useEffect(() => {
    const min = stat?.length && stat[0]?.from_stat;
    const max = stat?.length && stat[0]?.to_stat;
    let description = "";
    if (min && max) {
      if (currentStat < min) {
        description +=
          "Your pH is lower than the normal! Please check your soil or the weather!";
      } else if (currentStat > max) {
        description +=
          "Your pH is higher than the normal! Please check your enviroment!";
      }

      if (currentStat < min || currentStat > max) {
        const history: CreateHistory = {
          cropId: crop.id,
          statId: statId,
          isDanger: true,
          num_stat: currentStat,
          description: description,
        };

        CropApi.createCropHistory(history);
      }
    }
  }, [datas]);

  const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> =
    {
      labels: labels,
      datasets: [
        {
          label: "pH: ",
          data: datas,
          backgroundColor: borderColor,
          borderColor: "#3e95cd",
          pointRadius: 5,
        },
      ],
    };

  const options: any = {
    scales: {
      x: {
        title: {
          color: "black",
          display: true,
          text: "Time (Hours)",
          font: {
            size: 16,
          },
        },
      },
      y: {
        title: {
          color: "black",
          display: true,
          text: stat?.length && stat[0]?.name,
          font: {
            size: 16,
          },
        },
      },
    },
  };

  return (
    <div className="stat-container">
      <div className="stat__name">
        {stat?.length && stat[0]?.name}: Current: {datas[datas.length - 1]}
      </div>
      <div className="periodField">
        <div className="shrimpInput">
          <div className="input__title">Period (s):</div>
          <input
            type="text"
            value={checkPeriod / 1000}
            onChange={(e) => setCheckPeriod(parseInt(e.target.value) * 1000)}
          />
        </div>
        <ShrimpButton title="Accept" onClick={() => setPeriod(checkPeriod)} />
      </div>
      <div className="stat-chart">
        <LineChart data={data} options={options} />
      </div>
    </div>
  );
}
