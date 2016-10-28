    interface  VRDisplay {

    }

    declare var VRDisplay: {
        prototype: VRDisplay;
        new (): VRDisplay;
    }

    interface  PositionSensorVRDevice {
        getPose(): any;
        getState(): any;
        stageParameters(): any;
    }

    declare var PositionSensorVRDevice: {
        prototype: PositionSensorVRDevice;
        new (): PositionSensorVRDevice;
    }
