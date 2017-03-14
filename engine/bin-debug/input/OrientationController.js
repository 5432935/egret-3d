var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @language zh_CN
    * @class egret3D.OrientationControler
    * @classdesc
    * 陀螺仪控制器
    * 当前控制器使用后直接控制 view3D.camera3D 的本地旋转
    * @see egret3d.View3D
    * @see egret3d.Camera3D
    * @includeExample input/OrientationControler.ts
    * @version Egret 3.0
    * @platform Web,Native
    */
    var OrientationController = (function () {
        /**
        * @language zh_CN
        * 构造函数，构建一个陀螺仪控制器
        * @version Egret 3.0
        * @platform Web,Native
        */
        function OrientationController() {
            this.orientation = new egret3d.Vector3();
            this.screenOrientation = 0;
            this.openDebug = false;
            /**
            * @language zh_CN
            * 偏移旋转
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.offsetRotation = new egret3d.Vector3();
            /**
            * @private
            * @language zh_CN
            * 陀螺仪当前旋转角度
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.fixOritation = new egret3d.Vector3();
            this.state = -1;
            this.degtorad = Math.PI / 180; // Degree-to-Radian conversion
            this.q = new egret3d.Quaternion();
            this.q1 = new egret3d.Quaternion();
            this.outQ = new egret3d.Quaternion();
            this.fix = new egret3d.Vector3();
            this.fixinterpolate = new egret3d.Vector3();
            this.fixAxis = new egret3d.Vector3();
            this.caheFixAxis = new egret3d.Vector3();
            this.steps = 3.001;
            this.interpolate = true;
            if (this.openDebug) {
                this.accDiv = document.createElement("div");
                this.accGravityDiv = document.createElement("div");
                this.rotationRateDiv = document.createElement("div");
                this.orientationRateDiv = document.createElement("div");
                this.stateDiv = document.createElement("div");
                this.accDiv.style.color = "red";
                this.accGravityDiv.style.color = "red";
                this.rotationRateDiv.style.color = "red";
                this.orientationRateDiv.style.color = "red";
                this.stateDiv.style.color = "red";
                this.stateDiv.style.fontSize = "52";
                document.body.appendChild(this.accDiv);
                document.body.appendChild(this.accGravityDiv);
                document.body.appendChild(this.rotationRateDiv);
                document.body.appendChild(this.orientationRateDiv);
                document.body.appendChild(this.stateDiv);
            }
        }
        /**
        * @language zh_CN
        * 开始陀螺仪控制
        * @version Egret 3.0
        * @platform Web,Native
        */
        OrientationController.prototype.start = function () {
            var _this = this;
            this.orientationchangeHandler();
            window.addEventListener("orientationchange", function () { return _this.orientationchangeHandler(); });
            window.addEventListener("devicemotion", function (e) { return _this.motionHandler(e); });
            window.addEventListener("deviceorientation", function (e) { return _this.orientationHandler(e); });
        };
        /**
        * @language zh_CN
        * 释放陀螺仪控制
        * @version Egret 3.0
        * @platform Web,Native
        */
        OrientationController.prototype.stop = function () {
            var _this = this;
            window.removeEventListener("orientationchange", function () { return _this.orientationchangeHandler(); });
            window.removeEventListener("devicemotion", function (e) { return _this.motionHandler(e); });
            window.removeEventListener("deviceorientation", function (e) { return _this.orientationHandler(e); });
        };
        /**
        * @language zh_CN
        */
        OrientationController.prototype.orientationchangeHandler = function () {
            if (window.orientation != undefined)
                this.screenOrientation = window.orientation;
            //.this.state = window.orientation;
        };
        /**
        * @language zh_CN
        *
        * @param event
        */
        OrientationController.prototype.motionHandler = function (event) {
            this.acc = event.acceleration;
            this.accGravity = event.accelerationIncludingGravity;
            this.rotationRate = event.rotationRate;
        };
        /**
        * @language zh_CN
        *
        * @param event
        * @returns
        */
        OrientationController.prototype.orientationHandler = function (event) {
            this.orientation.x = event.alpha;
            this.orientation.y = event.beta;
            this.orientation.z = event.gamma;
            if (this.openDebug)
                this.debug();
        };
        OrientationController.prototype.debug = function () {
            //this.accDiv.innerHTML = "<br><br><br> acc-x:" + this.acc.x + "<br>acc-y:" + this.acc.y + "<br>acc-z:" + this.acc.z ;
            this.accGravityDiv.innerHTML = "<br><br> Gravity-x:" + this.orientation.x * egret3d.MathUtil.RADIANS_TO_DEGREES + "<br>Gravity-y:" + this.orientation.y + "<br>Gravity-z:" + this.orientation.z;
            //this.rotationRateDiv.innerHTML = "<br> Rate-x:" + this.rotationRate.alpha + "<br>Rate-y:" + this.rotationRate.gamma + "<br>Rate-z:" + this.rotationRate.beta;
            this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x + "<br>orientation-y:" + this.fixOritation.y + "<br>orientation-z:" + this.fixOritation.z;
            //this.orientationRateDiv.innerHTML = "<br> orientation-x:" + this.fixOritation.x * MathUtil.RADIANS_TO_DEGREES + "<br>orientation-y:" + this.fixOritation.y * MathUtil.RADIANS_TO_DEGREES + "<br>orientation-z:" + this.fixOritation.z * MathUtil.RADIANS_TO_DEGREES;
            this.stateDiv.innerHTML = "<br> state: " + this.state;
        };
        /**
        * @private
        * @language zh_CN
        *
        * @returns number
        * @version Egret 3.0
        * @platform Web,Native
        */
        OrientationController.prototype.getOrientation = function () {
            switch (window.screen.msOrientation) {
                case 'landscape-primary':
                    return -90;
                case 'landscape-secondary':
                    return 90;
                case 'portrait-secondary':
                    return 180;
                case 'portrait-primary':
                    return 0;
            }
            // this returns 90 if width is greater then height 
            // and window orientation is undefined OR 0
            // if (!window.orientation && window.innerWidth > window.innerHeight)
            //   return 90;
            return 270;
        };
        /**
        * @private
        * @language zh_CN
        * 由陀螺仪的角度值计算出旋转四元数
        * @param alpha
        * @param beta
        * @param gamma
        * @returns 旋转四元数
        * @version Egret 3.0
        * @platform Web,Native
        */
        OrientationController.prototype.getQuaternion = function (alpha, beta, gamma) {
            var _x = beta ? beta * this.degtorad : 0; // beta value
            var _y = gamma ? gamma * this.degtorad : 0; // gamma value
            var _z = alpha ? alpha * this.degtorad : 0; // alpha value
            _x = Math.floor(_x * 100) / 100;
            _y = Math.floor(_y * 100) / 100;
            var orient = -this.getOrientation() * this.degtorad; // this.getOrientation()) * this.degtorad ; // O
            this.state = this.getOrientation();
            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);
            //this.q1.fromAxisAngle(Vector3.Y_AXIS, alpha * this.degtorad);
            //
            // ZXY quaternion construction.
            //
            this.q.w = cX * cY * cZ - sX * sY * sZ;
            this.q.x = sX * cY * cZ - cX * sY * sZ;
            this.q.y = cX * sY * cZ + sX * cY * sZ;
            this.q.z = cX * cY * sZ + sX * sY * cZ;
            var zee = new egret3d.Vector3(0, 0, 1);
            var q0 = new egret3d.Quaternion();
            q0.fromAxisAngle(zee, orient);
            this.q.multiply(this.q, q0); // camera looks out the back of the device, not the top
            zee.setTo(-1, 0, 0);
            q0.fromAxisAngle(zee, 90 * this.degtorad);
            this.q.multiply(this.q, q0);
            return this.q;
        };
        /**
        * @language zh_CN
        * 数据更新
        * 陀螺仪会直接控制view3D.camera3D的旋转
        * @param view3D 当前控制view3D
        * @version Egret 3.0
        * @platform Web,Native
        */
        OrientationController.prototype.update = function (view3D) {
            this.getBaseQuaternion(this.orientation.x, this.orientation.y, this.orientation.z);
            this.q.toEulerAngles(this.fixOritation);
            if (this.interpolate) {
                this.fixinterpolate.x = (this.fixOritation.x - this.fix.x);
                this.fixinterpolate.y = (this.fixOritation.y - this.fix.y);
                this.fixinterpolate.z = (this.fixOritation.z - this.fix.z);
                this.caheFixAxis.x = this.fixOritation.x / Math.abs(this.fixOritation.x);
                this.caheFixAxis.y = this.fixOritation.y / Math.abs(this.fixOritation.y);
                this.caheFixAxis.z = this.fixOritation.z / Math.abs(this.fixOritation.z);
                if (Math.abs(this.fixinterpolate.x) > 150 || Math.abs(this.fixinterpolate.y) > 150 || Math.abs(this.fixinterpolate.z) > 150) {
                    this.fix.x = this.fixOritation.x;
                    this.fix.y = this.fixOritation.y;
                    this.fix.z = this.fixOritation.z;
                }
                else {
                    this.fix.x += this.fixinterpolate.x / (this.steps);
                    this.fix.y += this.fixinterpolate.y / (this.steps);
                    this.fix.z += this.fixinterpolate.z / (this.steps);
                }
                view3D.camera3D.rotationX = -this.fix.x;
                view3D.camera3D.rotationY = -this.fix.y;
                view3D.camera3D.rotationZ = this.fix.z;
            }
            else {
                view3D.camera3D.rotationX = -this.fixOritation.x;
                view3D.camera3D.rotationY = -this.fixOritation.y;
                view3D.camera3D.rotationZ = this.fixOritation.z;
            }
            //view3D.scene.rotationX = -90;
        };
        OrientationController.prototype.getBaseQuaternion = function (alpha, beta, gamma) {
            var _x = beta ? beta * this.degtorad : 0; // beta value
            var _y = gamma ? gamma * this.degtorad : 0; // gamma value
            var _z = alpha ? alpha * this.degtorad : 0; // alpha value
            var cX = Math.cos(_x / 2);
            var cY = Math.cos(_y / 2);
            var cZ = Math.cos(_z / 2);
            var sX = Math.sin(_x / 2);
            var sY = Math.sin(_y / 2);
            var sZ = Math.sin(_z / 2);
            //
            // ZXY quaternion construction.
            //
            var w = cX * cY * cZ - sX * sY * sZ;
            var x = sX * cY * cZ - cX * sY * sZ;
            var y = cX * sY * cZ + sX * cY * sZ;
            var z = cX * cY * sZ + sX * sY * cZ;
            this.q.w = w;
            this.q.x = x;
            this.q.y = y;
            this.q.z = z;
            //var orient = -this.getOrientation() * this.degtorad;// this.getOrientation()) * this.degtorad ; // O
            //this.state = this.getOrientation();
            //var zee: Vector3 = new Vector3(0, 0, 1);
            //var q0: Quaternion = new Quaternion();
            //q0.fromAxisAngle(Vector3.X_AXIS, 270 * this.degtorad);
            //this.q.multiply(this.q, q0);                                      // camera looks out the back of the device, not the top
            //zee.setTo(-1, 0, 0);
            //q0.fromAxisAngle(zee, 90 * this.degtorad);
            //this.q.multiply(this.q, q0);
            return this.q;
        };
        return OrientationController;
    }());
    egret3d.OrientationController = OrientationController;
    __reflect(OrientationController.prototype, "egret3d.OrientationController");
})(egret3d || (egret3d = {}));
