// localStorage（本地存储）和sessionStorage（会话存储）
import Time from './Time';

interface CacheInterface {
    /**
     * 设置缓存
     * @param key string 缓存键
     * @param value any 缓存值 string | {} | []
     * @param exp number 过期时间 默认0永久有效
     */
    Set(key: string, value: any, exp: number): void;

    /**
     * 获取缓存信息
     * @param key string
     * @return any {} | string | []
     */
    Get(key: string): any;

    /**
     * 删除指定key
     * @param key string 需要删除的键
     */
    Remove(key: string): void;

    /**
     * 清除所有缓存
     */
    Clear(): void;
}

class Caches<T> implements CacheInterface {

    private cache: any;

    public constructor(stroage: T) {
        this.cache = stroage;
    }

    /**
     * 设置缓存
     * @param key string 缓存键
     * @param value any 缓存值 string | {} | []
     * @param exp number 过期时间 默认0永久有效
     */
    public Set(key: string, value: any, exp: number = 0): void {
        if (exp > 0) {
            exp = Time.Stamp() + exp;
        }
        const item = {val: value, exp, iat: Time.Stamp()};
        this.cache.setItem(key, JSON.stringify(item));
    }

    /**
     * 获取缓存信息
     * @param key string
     * @return any {} | string | []
     */
    public Get(key: string): any {
        // 获取当前时间戳
        const time: number = Time.Stamp();
        // 根据key获取val
        const cacheJson: string = this.cache.getItem(key);

        if (cacheJson == null) { // key是否存在
            return '';
        }

        // 转换 json
        const cacheObj: any = JSON.parse(cacheJson);
        if (time > cacheObj.exp && cacheObj.exp > 0) { // 有效期是否已过期
            return '';
        }
        return cacheObj.val;
    }

    /**
     * 删除指定key
     * @param key string 需要删除的键
     */
    public Remove(key: string): void {
        this.cache.removeItem(key);
    }

    /**
     * 清除所有缓存
     */
    public Clear(): void {
        this.cache.clear();
    }

}

const Cache = new Caches<Storage>(localStorage);
const Session = new Caches<Storage>(sessionStorage);

export {
    Cache,
    Session,
};
