module egret3d {
    /**
    * @public
    * @class egret3d.IMaterialDefines
    * @classdesc
    * MaterialDefines类接口
    * @version Egret 3.0
    * @platform Web,Native
    */
    export interface IMaterialDefines {
        isChange(): boolean;
        keys(): string[];
        toName(): string;
        dispose(): void;
    }
}