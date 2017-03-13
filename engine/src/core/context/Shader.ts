module egret3d{
    export class Shader{
        
        public type:number;

        public name:string;

        private _shader: WebGLShader;

        public constructor(shader: WebGLShader) {
            this._shader = shader;
        }


        /**
        * @language zh_CN
        * @private
        * WebGLShader 的引用
        */
        public get shader(): WebGLShader {
            return this._shader;
        }

        /**
        * @language zh_CN
        * 释放接口
        * @version Egret 3.0
        * @platform Web,Native
        */
        public dispose(): void {
            if (this._shader) {
                Context3DProxy.gl.deleteShader(this._shader);
                this._shader = null;
            }
        }
    }
}