module egret3d {
    export class BaseMaterialDefines implements IMaterialDefines {

        /**
        * @language zh_CN
        * 关键词
        * @default BaseMaterialDefines._keys
        * @version Egret 4.0
        * @platform Web,Native
        */
        protected _keys: string[];

        /**
        * @language zh_CN
        * 名称，该名称字运行时使用
        * @default BaseMaterialDefines._name
        * @version Egret 4.0
        * @platform Web,Native
        */
        protected _name: string = "";


        /**
        * @language zh_CN
        * 获取关键词
        * @default BaseMaterialDefines.keys
        * @version Egret 4.0
        * @platform Web,Native
        */
        public keys(): string[] {
            return this._keys;
        }

        /**
        * @language zh_CN
        * 属性变化更新
        * @default BaseMaterialDefines.change
        * @version Egret 4.0
        * @platform Web,Native
        */
        public isChange(): boolean {
            let _cName: string = this.cName();
            if (this._name != _cName) {
                this._name = _cName;
                return true;
            }
            return false;
        }

        /**
        * @language zh_CN
        * 获取名称
        * @default BaseMaterialDefines.toName
        * @version Egret 4.0
        * @platform Web,Native
        */
        public toName(): string {
            if (this._name == "") {
                this._name = this.cName();
            }
            return this._name;
        }

        private cName(): string {
            let _cName: string = "";
            let len: number = this._keys.length;
            for (let i: number = 0; i < len; i++) {
                if (this[this._keys[i]] == true) {
                    _cName += (this._keys[i] + "_");
                }
            }
            return _cName;
        }

        public dispose(): void {
            this._keys = null;
            this._name = null;
        }
    }
}