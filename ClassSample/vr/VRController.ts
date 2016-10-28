module egret3d {
    export class VRController {
        private vrInput: PositionSensorVRDevice;
         
        private _camera: Camera3D; 
        private standing: boolean  = true ;
        private standingMatrix = new Matrix4_4();
        constructor( camera:Camera3D ) {
            this._camera = camera; 
            this.initVRDevices();
        } 

        private gotVRDevices(devices) {
            for (var i = 0; i < devices.length; i++) {
                if (('VRDisplay' in window && devices[i] instanceof VRDisplay ) || ('PositionSensorVRDevice' in window && devices[i] instanceof PositionSensorVRDevice)) {
                    this.vrInput = devices[i];  
                    break;  
                }
            } 
            if (!this.vrInput) {
                onerror('VR input not available.');
            } 
        }

        public initVRDevices() {
            if (navigator["getVRDisplays"]) {
                navigator["getVRDisplays"]().then((d) => this.gotVRDevices(d));
            } else if (navigator["getVRDisplays"]) {
                navigator["getVRDisplays"].then((d) => this.gotVRDevices(d));
            }
        }

        private q1: Quaternion = new Quaternion() ;
        public update() {
            if (this.vrInput) {
                if (this.vrInput.getPose) {
                    var pose = this.vrInput.getPose();
                    if (pose.orientation !== null) {
                        this.q1.fromArray(pose.orientation);
                        this._camera.orientation = this.q1 ;
                    }
                    //位置信息
                    if (pose.position !== null) {
                        this._camera.x = pose.position[0];
                        this._camera.y = pose.position[1];
                        this._camera.z = pose.position[2];

                    } else {
                        this._camera.x = 0; 
                        this._camera.y = 0; 
                        this._camera.z = 0; 
                    }

                } else {
                    // Deprecated API.
                    var state = this.vrInput.getState();
                    if (state.orientation !== null) {
                       // object.quaternion.copy(state.orientation);
                        this.q1.fromArray(state.orientation);
                        this._camera.orientation = this.q1;
                    }
                    if (state.position !== null) {
                        //object.position.copy(state.position);
                        this._camera.position = pose.position;

                    } else {
                        this._camera.x = pose.x;
                        this._camera.y = pose.y;
                        this._camera.z = pose.z;
                    }
                }
            }
        }

    }
}