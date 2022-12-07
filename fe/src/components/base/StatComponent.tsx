import React, { useEffect, useState } from 'react'
import { ChartData, ScatterDataPoint } from 'chart.js';
import LineChart from './LineChart';
import moment from 'moment';
import { randomData } from '../../services/MockDatapH';
import axios from 'axios';


export interface Props {
    name: string,
    id: string
}

export default function StatComponent({ name, id }: Props) {
    const [stat, setStat] = useState<any[]>([]);

    const [labels, setLabels] = useState<any[]>([]);
    const [datas, setDatas] = useState<number[]>([]);

    useEffect(() => {
        const getStat = async () => {
            try {
                const response = await axios.get('http://localhost:7000/stat/' + id);
                response && setStat(response.data);
            } catch (error) {
                console.log(error)
            }
        }
        getStat();
    }, [id])

    useEffect(() => {
        const intervalPH = setInterval(() => {
            if (Array.isArray(stat) && stat.length > 0) {
                const chartData: number[] = [...datas];
                const timeData: any[] = [...labels];

                if (chartData.length > 8) {
                    chartData.shift();
                    timeData.shift();
                }
                var time = moment().format('LT');
                var datapH: number = parseFloat(randomData(stat[0].from_stat, stat[0].to_stat));

                chartData.push(datapH);
                setDatas(chartData);

                timeData.push(time);
                setLabels(timeData);
            } else {
                clearInterval(intervalPH);
            }
        }, 3000);

        return () => {
            clearInterval(intervalPH);
        }
    }, [datas, labels, stat])

    const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> = {
        labels: labels,
        datasets: [
            {
                label: 'pH: ',
                data: datas,
                borderColor: "#3e95cd",
            }
        ]
    }

    const options: any = {
        scales: {
            x: {
                title: {
                    color: 'black',
                    display: true,
                    text: 'Time (Hours)',
                    font: {
                        size: 16
                    }
                }
            },
            y: {
                title: {
                    color: 'black',
                    display: true,
                    text: name,
                    font: {
                        size: 16
                    }
                }
            },
        },
    }

    return (
        <div className="stat-container">
            <div className="stat__name">
                {name}
            </div>
            <div className="stat-chart">
                <LineChart
                    data={data}
                    options={options}
                />
            </div>
        </div>
    )
}
