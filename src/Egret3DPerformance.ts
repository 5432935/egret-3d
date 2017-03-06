module egret3d {
    /**
     * @private  
     */
    export class Egret3DPerformance {
        private _entities:any = {};

        public enable:boolean = false;

        public prefix:string = "";

        constructor() {

        }

        get entities():any {
            return this._entities;
        }

        public getFps():number {
            let entity = this.getEntity("fps");
            return (entity && entity.averageDelta) ? Math.floor(1000 / entity.averageDelta) : 0;
        }

        public updateFps():void {
            if(!this.enable) {
                return;
            }
            this.endCounter("fps");
            this.startCounter("fps", 60);
        }

        public getNow():number {
            if(window.performance) {
                return window.performance.now();
            }
            return new Date().getTime();
        }

        public getEntity(key:string):any {
            key = this.prefix + key;
            return this._entities[key];
        }

        public startCounter(key, averageRange):void {
            if(!this.enable) {
                return;
            }

            key = this.prefix + key;

            var entity = this._entities[key];
            if(!entity) {
                entity = {
                    start: 0,
                    end: 0,
                    delta: 0,
                    _cache: [],
                    averageRange: 1,
                    averageDelta: 0
                };
                this._entities[key] = entity;
            }
            entity.start = this.getNow();
            entity.averageRange = averageRange || 1;
        }

        public endCounter(key):void {
            if(!this.enable) {
                return;
            }

            key = this.prefix + key;

            var entity = this._entities[key];
            if(entity) {
                entity.end = this.getNow();
                entity.delta = entity.end - entity.start;

                if(entity.averageRange > 1) {
                    entity._cache.push(entity.delta);
                    var length = entity._cache.length;
                    if(length >= entity.averageRange) {
                        if(length > entity.averageRange) {
                            entity._cache.shift();
                            length--;
                        }
                        var sum = 0;
                        for(var i = 0; i < length; i++) {
                            sum += entity._cache[i];
                        }
                        entity.averageDelta = sum / length;
                    }
                }
            }
        }
    }
}