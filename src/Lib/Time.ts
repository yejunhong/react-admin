import moment from 'moment';

class Time {

    /**
     * 获取时间戳
     * value 如不传入默认返回当前时间戳
     * @param value string 日期 2019-04-10
     * @return number
     */
    public Stamp(value?: string): number {
        let now = moment.now();
        if (value !== undefined) {
            now = moment(value, 'YYYY-MM-DD HH:mm:ss').valueOf();
        }
        return Math.ceil(now / 1000);
    }

    /**
     * 时间戳转换日期格式
     * @param value number 时间戳 1010101010
     * @param format string 日期格式化
     */
    public Format(value: number, format: string = 'YYYY-MM-DD HH:mm:ss'): any {
        return moment.unix(value).format(format);
    }

}

export default new Time();
