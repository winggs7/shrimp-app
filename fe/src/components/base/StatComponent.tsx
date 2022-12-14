import React, { useEffect, useState } from 'react'
import { ChartData, ScatterDataPoint } from 'chart.js';
import LineChart from './LineChart';
import moment from 'moment';
import { randomData } from '../../services/MockDatapH';
import axios from 'axios';


export interface Props {
    name: string,
    id: string,
    cropID: string
}

export default function StatComponent({ name, id, cropID }: Props) {
    const [stat, setStat] = useState<any[]>([]);

    const [labels, setLabels] = useState<any[]>([]);
    const [datas, setDatas] = useState<number[]>([]);
    const [borderColor, setBorderColor] = useState<string[]>([]);
    const [currentStat, setCurrentStat] = useState<number>(0.0);

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
                const colorData: string[] = [...borderColor];

                if (chartData.length > 8) {
                    chartData.shift();
                    timeData.shift();
                    colorData.shift();
                }
                var time = moment().format('LT');
                var datapH: number = parseFloat(randomData(stat[0].from_stat - 2, stat[0].to_stat + 2));
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
        }, 3000);

        return () => {
            clearInterval(intervalPH);
        }
    }, [datas, labels, borderColor, stat])

    useEffect(() => {
        const min = stat[0]?.from_stat;
        const max = stat[0]?.to_stat;

        if (currentStat < min || currentStat > max) {
            const history = {
                cropID: cropID,
                statID: id,
                isDanger: true,
                num_stat: currentStat,
                description: ''
            }

            const saveHistory = async (history: any) => {
                await axios.post('http://localhost:7000/crop/history', history);
            }

            saveHistory(history);
        }

    }, [currentStat])

    const data: ChartData<"line", (number | ScatterDataPoint | null)[], unknown> = {
        labels: labels,
        datasets: [
            {
                label: 'pH: ',
                data: datas,
                backgroundColor: borderColor,
                borderColor: "#3e95cd",
                pointRadius: 5,
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
                {name}: Current: {datas[datas.length - 1]}
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
