module egret3d {

    /*
    * @private
    * @class egret3d.HashMap
    * @classdesc
    * 用来做数据存储使用 hash map 映射表
    * <p> 通用的hash map 映射表  key为键 value为任意类型的值 
    * <p> 还可以通过开启开关使用双线列表能正常使用list带有顺序的存储方式
    *
    */
    export class HashMap {
        private data: { [key: string]: any } = [];
        private list: Array<any> = new Array<any>();

        /**
        * @language zh_CN
        * 构造函数
        * @param useOrderList 是否使用外部传入的自定义数据列
        * @version Egret 3.0
        * @platform Web,Native
        */
        constructor(useOrderList: boolean = false) {
            if (useOrderList) {
                this.list = new Array<any>();
            }
        }


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
        * 获取所有值的列表
        * @returns Array<any> 返回值的列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public getList(): Array<any> {
            return this.list;
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
            if (this.list){
                this.list.push(value);
            }
        }

        /**
        * @language zh_CN
        * 输入一个key，删除对应的键值对
        * @param key 键
        * @version Egret 3.0
        * @platform Web,Native
        */
        public remove(key: string) {
            if (this.list) {
                var index: number = this.list.indexOf(this.data[key]);
                if (index != -1) {
                    this.list.splice(index);
                }
            }
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
            delete this.list; 
        }
    }
} 