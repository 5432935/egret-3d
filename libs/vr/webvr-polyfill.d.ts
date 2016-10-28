//在使用这个类时，需要预先引用VR模块
//引用方式在 index.html 一开始就需要将 libs/vr/webvr-polyfill.js 加入引用库中
interface VRDisplay {

}

declare var VRDisplay: {
    prototype: VRDisplay;
    new (): VRDisplay;
}

interface PositionSensorVRDevice {
    getPose(): any;
    getState(): any;
    stageParameters(): any;
}

declare var PositionSensorVRDevice: {
    prototype: PositionSensorVRDevice;
    new (): PositionSensorVRDevice;
}
