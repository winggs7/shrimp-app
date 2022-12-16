import moment from "moment"

export const randomData = (min: number, max: number, current: number) => {
    var curData = current === 0 ? (max + min) / 2 : current;
    var range = (max - min) / 10;
    var random = Math.random();

    if (curData >= max) {
        curData -= range;
    } else if (curData <= min) {
        curData += range;
    } else if (random < 0.5) {
        if (random < 0.25) {
            curData += range;
        } else {
            curData += range / 2;
        }
    } else if (random >= 0.5) {
        if (random > 0.75) {
            curData -= range;
        } else {
            curData -= range / 2;
        }
    }

    return curData.toFixed(2);
}

export const mockDatapH = () => {
    const times: any[] = [];
    const datas: any[] = [];

    if (times.length > 8) {
        times.shift();
        datas.shift();
    }
    var time = moment().format('LT');

    // datas.push(randomData(3, 5));
    times.push(time);
}