module egret3d {

    /*
    * @private
    * @class egret3d.HashMap
    * @classdesc
    * 用来做数据存储使用 hash map 映射表
    * <p> 通用的hash map 映射表  key为键 value为任意类型的值 
    *
    */
    export class HashMap {
        private data: { [key: string]: any } = [];

        /**
        * @language zh_CN
        * 是否含有某个key为键的内容
        * @param key 指定的键
        * @returns boolean 返回布尔值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public isHas(key: string): boolean {
            if (this.data[key]) return true;
            return false;
        }

        /**
        * @language zh_CN
        * 根据输入的key，返回对应的value
        * @param key 指定的键
        * @returns any 返回该key对于的value
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getValue(key: string): any {
            return this.data[key];
        }


        /**
        * @language zh_CN
        * 加入一个键值对
        * @param key 键
        * @param value 值
        * @version Egret 3.0
        * @platform Web,Native
        */
        public add(key: string, value: any) {
            this.data[key] = value;
        }

        /**
        * @language zh_CN
        * 输入一个key，删除对应的键值对
        * @param key 键
        * @version Egret 3.0
        * @platform Web,Native
        */
        public remove(key: string) {
            delete this.data[key]; 
        }

        /**
        * @language zh_CN
        * 释放该对象
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose() {
            delete this.data;
        }
    }
} 