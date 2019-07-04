
class Utils {

    /**
     * 获取区间随机数
     * @param min number 0
     * @param max number 10
     * @return number
     */
    public Rand(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min)) + min;
    }

}

export default new Utils();
