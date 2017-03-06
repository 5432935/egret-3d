module egret3d {

    /**
    * @language zh_CN
    * @class egret3d.AnimationNode
    * @classdesc
    * 动画效果节点
    * @version Egret 3.0
    * @platform Web,Native
    */
    export class AnimationNode {
        
        /**
        * @language zh_CN
        * 效果节点名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public name: string; 
                
        /**
        * @language zh_CN
        * 顶点着色器文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public vertex_ShaderName: { [shaderPhase: number]: string[] } = {};
        
        /**
        * @language zh_CN
        * 片断着色器文件名
        * @version Egret 3.0
        * @platform Web,Native
        */
        public fragment_ShaderName: { [shaderPhase: number]: string[] } = {};
                        
                        
        /**
        * @language zh_CN
        * shader attribute 变量列表
        * @version Egret 3.0
        * @platform Web,Native
        */
        public attributes: Array<GLSL.VarRegister> = new Array<GLSL.VarRegister>();
                                
        /**
        * @language zh_CN
        * 动画状态
        * @version Egret 3.0
        * @platform Web,Native
        */
        public state: IAnimationState; 

        /**
        * @private
        * 构建结束后需要清理掉临时数据
        */
        public build(geometry: Geometry, count: number) {
        
        }

        /**
        * @private
        * 强制更新了时间之后，follow数据需要更新
        */
        public onAnimTimeChange(): void {
             
        }

        /**
        * @private
        * 导入需要用到的glsl
        */
        protected importShader(isVertex: boolean, phase:number, name: string): void {
            var shader: { [shaderPhase: number]: string[] } = isVertex ? this.vertex_ShaderName : this.fragment_ShaderName;
            var list: string[] = shader[phase] = shader[phase] || [];
            if (list.indexOf(name) == -1) {
                list.push(name);
            }
        }

        /**
        * @private
        */
        public afterBuild():void {

        }

        /**
        * @private
        */
        public initNode(data: ParticleDataNode, arg:any): void {

        }
        /**
        * @private
        */
        public update(animTime: number, delay: number, geometry:Geometry) {
        }

        /**
        * @private
        */
        public activeState(time: number, animTime: number, delay: number, animDelay: number, usage: PassUsage, geometry: SubGeometry, context3DProxy: Context3DProxy) {
        }

        /**
        * @private
        */
        public upload() {
        }

        /**
        * @private
        */
        public dispose(): void {
        }

    }
} 