import moment from "moment"

export const randomData = (min: number, max: number) => {
    var data = Math.random() * (max - min) + min;
    return data.toFixed(2);
}

export const mockDatapH = () => {
    const times: any[] = [];
    const datas: any[] = [];

    if (times.length > 8) {
        times.shift();
        datas.shift();
    }
    var time = moment().format('LT');

    datas.push(randomData(3, 5));
    times.push(time);
}