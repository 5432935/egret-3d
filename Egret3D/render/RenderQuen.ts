module egret3d {
    /*
    * @private
    */
    export class RenderQuen {
        public mainRender: RenderBase;

        public renderDictionary: RenderBase[];
        private renderArray: RenderBase[];
        constructor() {

            this.renderDictionary = [];
            this.renderArray = [];

            var defaultRender: RenderBase = new MultiRender(PassType.diffusePass);

            this.setMainRender(defaultRender);
        }

        public setMainRender(render: RenderBase) {
            this.mainRender = render ;
        }

        public addRender(render: RenderBase,index:number=-1) {
            var index: number = this.renderArray.indexOf(render);
            this.renderDictionary[render.name] = render;
            if (index == -1) {
                if (index == -1) {
                    this.renderArray.push(render);
                } else{
                    this.renderArray.splice(index, -1, render);
                }
            }
        }

        public removeRender(render: RenderBase) {
            var index: number = this.renderArray.indexOf(render);
            if (this.renderDictionary[render.name])
                delete this.renderDictionary[render.name];

            if (index != -1) {
                this.renderArray.splice(index, 1, render);
            }
        }

        public draw(time: number, delay: number, context3D: Context3DProxy, collect: CollectBase, backViewPort: Rectangle, posList: any = null) {
            var i: number;
            for (i = 0; i < this.renderArray.length; i++) { 
                if (this.renderArray[i].enabled)
                    this.renderArray[i].draw(time, delay, context3D, collect, backViewPort, this, posList);
            }
            if (this.mainRender) {
                if (this.mainRender.enabled) {
                    if (Egret3DCanvas.Performance_Enable) {
                        var time: number = this.curDate;
                        this.mainRender.draw(time, delay, context3D, collect, backViewPort, this, posList);
                        Egret3DCanvas.Performance_GPU += this.curDate - time;
                    } else {
                        this.mainRender.draw(time, delay, context3D, collect, backViewPort, this, posList);
                    }
                }
            }
        }



        private get curDate(): number {
            return new Date().getTime();
        }


    }
}