var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.ParticleJsonParser
     * @classdesc
     * 用 ParticleJsonParser 解析粒子文件
     */
    var ParticleJsonParser = (function () {
        function ParticleJsonParser() {
        }
        /**
         * @language zh_CN
         * @param json 粒子特效的数据解析
         * @returns ParticleData
         */
        ParticleJsonParser.prototype.parse = function (json, data) {
            this._particleData = data;
            this.engineVersion = json.engineVersion + "";
            this.version = json.version + "";
            //property
            var propertyNode = json.property;
            this.parseProperty(propertyNode);
            //emission
            var emissionNode = json.emission;
            this.parseEmission(emissionNode);
            //life
            var life = json.life;
            this.parseLife(life);
            //shape
            var shape = json.shape;
            this.parseShape(shape);
            //rotationBirth
            var rotationBirth = json.rotationBirth;
            this.parseRotationBirth(rotationBirth);
            //scaleBirth
            var scaleBirth = json.scaleBirth;
            this.parseScaleBirth(scaleBirth);
            //geometry
            var geometry = json.geometry;
            this.parseGeometry(geometry);
            //moveSpeed
            var moveSpeed = json.moveSpeed;
            this.parseMoveSpeed(moveSpeed);
            //followTarget
            var followTarget = json.followTarget;
            this.parseFollowTarget(followTarget);
            //parseBezierNode
            var scaleSize = json.scaleSize;
            var scaleBezier = json.scaleBezier;
            if (scaleSize) {
                this.parseScaleSize(scaleSize);
            }
            else {
                this.parseScaleBeizer(scaleBezier);
            }
            //rotationSpeed
            var rotationSpeed = json.rotationSpeed;
            this.parseRotationSpeed(rotationSpeed);
            //colorOffset
            var colorOffset = json.colorOffset;
            this.parseColorOffset(colorOffset);
            //material
            var material = json.mat;
            //textureSheet
            var textureSheet = json.textureSheet;
            this.parseTextureSheet(textureSheet);
        };
        /**
         * @private
         * 解析基础属性
         */
        ParticleJsonParser.prototype.parseProperty = function (node) {
            var property = this._particleData.property;
            property.particleCount = Number(node.particleCount);
            property.prewarm = node.prewarm;
            if (node.playOnAwake != undefined) {
                property.playOnAwake = node.playOnAwake;
            }
            property.bounds = this.parseVector3D(node.bounds, property.bounds);
            //color
            property.colorType = egret3d.ParticleBirthColorType[node.colorType + ""];
            var colorConst1 = node.colorConst1;
            var colorConst2 = node.colorConst2;
            var gradients1 = node.colorGradients1;
            var gradients2 = node.colorGradients2;
            this.parseColorProperty(property, colorConst1, colorConst2, gradients1, gradients2);
            //gravity
            property.gravity = Number(node.gravity);
            //transform
            var transform = node.transform;
            var rotation = transform.rotation;
            var scale = transform.scale;
            var position = transform.position;
            property.rotation = this.parseVector3D(rotation, property.rotation);
            property.scale = this.parseVector3D(scale, property.scale);
            property.position = this.parseVector3D(position, property.position);
            //render
            var render = node.render;
            property.renderMode = egret3d.ParticleRenderModeType[render.renderMode + ""];
            property.lengthScale = Number(render.lengthScale);
            property.cameraScale = Number(render.cameraScale);
            property.speedScale = Number(render.speedScale);
            //meshFile
            property.meshFile = render.meshFile;
            if (property.meshFile == "") {
                property.meshFile = null;
            }
            //fudge
            property.sortingFudge = Number(node.sortingFudge);
        };
        /**
         * @private
         * 解析颜色属性
         */
        ParticleJsonParser.prototype.parseColorProperty = function (property, c1, c2, cg1, cg2) {
            if (c1) {
                property.colorConst1 = egret3d.Color.createColor(Number(c1));
            }
            if (c2) {
                property.colorConst2 = egret3d.Color.createColor(Number(c2));
            }
            if (cg1) {
                property.colorGradients1 = this.parseGradientsColor(cg1, property.colorGradients1);
            }
            if (cg2) {
                property.colorGradients2 = this.parseGradientsColor(cg2, property.colorGradients2);
            }
        };
        /**
         * @private
         * 解析发射器数据
         */
        ParticleJsonParser.prototype.parseEmission = function (node) {
            var emission = this._particleData.emission;
            emission.type = egret3d.ParticleValueType[node.type + ""];
            emission.rate = Number(node.rate);
            //bursts
            var bursts = node.bursts;
            var i = 0;
            var count = 0;
            var pt;
            var item;
            if (bursts) {
                emission.bursts = [];
                for (i = 0, count = bursts ? bursts.length : 0; i < count; i++) {
                    item = bursts[i];
                    pt = new egret3d.Point();
                    pt.x = Number(item[0]);
                    pt.y = Number(item[1]);
                    emission.bursts.push(pt);
                }
            }
            //bezier
            if (emission.type == egret3d.ParticleValueType.OneBezier) {
                emission.bezier = this.parseFoldLine(node.line) || this.parseBezierData(node.bezier);
            }
        };
        /**
         * @private
         * 解析生命周期相关数据
         */
        ParticleJsonParser.prototype.parseLife = function (node) {
            var life = this._particleData.life;
            life.type = egret3d.ParticleValueType[node.type + ""];
            life.min = Number(node.min);
            life.max = Number(node.max);
            life.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            life.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
            life.duration = Number(node.duration);
            life.delay = Number(node.delay);
            life.loop = node.loop;
        };
        /**
         * @private
         * 解析发射器的范围类型
         */
        ParticleJsonParser.prototype.parseShape = function (node) {
            if (node == null)
                return;
            var shape = this._particleData.shape;
            shape.type = egret3d.ParticleDataShapeType[node.type + ""];
            shape.randomDirection = node.randomDirection;
            shape.emitFromShell = node.emitFromShell;
            //cube
            var cube = node.cube;
            if (cube) {
                shape.cubeW = Number(cube[0]);
                shape.cubeH = Number(cube[1]);
                shape.cubeD = Number(cube[2]);
            }
            //sphere
            shape.sphereRadius = Number(node.sphereRadius);
            //hemiSphereRadius
            shape.hemiSphereRadius = Number(node.hemiSphereRadius);
            //cone
            if (shape.type == egret3d.ParticleDataShapeType.Cone) {
                var cone = node.cone;
                shape.coneType = egret3d.ParticleConeShapeType[cone.type + ""];
                shape.coneLength = Number(cone.length);
                shape.coneRadius = Number(cone.radius);
                shape.coneAngle = Number(cone.angle);
            }
            //meshType
            shape.meshType = egret3d.ParticleMeshShapeType[node.meshType + ""];
            //meshFile
            shape.meshFile = node.meshFile;
            if (shape.meshFile == "") {
                shape.meshFile = null;
            }
        };
        /**
         * @private
         * 解析粒子出生的旋转信息
         */
        ParticleJsonParser.prototype.parseRotationBirth = function (node) {
            var rotationBirth = this._particleData.rotationBirth;
            rotationBirth.type = egret3d.ParticleValueType[node.type + ""];
            rotationBirth.min = Number(node.min);
            rotationBirth.max = Number(node.max);
            rotationBirth.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            rotationBirth.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
        };
        /**
         * @private
         * 解析粒子出生的缩放信息
         */
        ParticleJsonParser.prototype.parseScaleBirth = function (node) {
            var scaleBirth = this._particleData.scaleBirth;
            scaleBirth.type = egret3d.ParticleValueType[node.type + ""];
            scaleBirth.min = Number(node.min);
            scaleBirth.max = Number(node.max);
            scaleBirth.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            scaleBirth.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
        };
        /**
         * @private
         * 解析粒子的几何形状
         */
        ParticleJsonParser.prototype.parseGeometry = function (node) {
            var geometry = this._particleData.geometry;
            var plane = node.plane;
            geometry.planeW = Number(plane[0]);
            geometry.planeH = Number(plane[1]);
        };
        /**
         * @private
         * 解析粒子速度相关信息
         */
        ParticleJsonParser.prototype.parseMoveSpeed = function (node) {
            var moveSpeed = this._particleData.moveSpeed;
            moveSpeed.type = egret3d.ParticleValueType[node.type + ""];
            moveSpeed.min = Number(node.min);
            moveSpeed.max = Number(node.max);
            moveSpeed.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            moveSpeed.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
            var velocityOverNode = node.velocityOver;
            if (velocityOverNode) {
                var velocityOver = new egret3d.VelocityOverLifeTimeData();
                velocityOver.type = egret3d.ParticleValueType[velocityOverNode.type + ""];
                velocityOver.min = this.parseVector3D(velocityOverNode.min, velocityOver.min);
                velocityOver.max = this.parseVector3D(velocityOverNode.max, velocityOver.max);
                velocityOver.worldSpace = velocityOverNode.worldSpace;
                velocityOver.xBezier1 = this.parseFoldLine(node.xLine1) || this.parseBezierData(velocityOverNode.xBezier1);
                velocityOver.yBezier1 = this.parseFoldLine(node.yLine1) || this.parseBezierData(velocityOverNode.yBezier1);
                velocityOver.zBezier1 = this.parseFoldLine(node.zLine1) || this.parseBezierData(velocityOverNode.zBezier1);
                velocityOver.xBezier2 = this.parseFoldLine(node.xLine2) || this.parseBezierData(velocityOverNode.xBezier2);
                velocityOver.yBezier2 = this.parseFoldLine(node.yLine2) || this.parseBezierData(velocityOverNode.yBezier2);
                velocityOver.zBezier2 = this.parseFoldLine(node.zLine2) || this.parseBezierData(velocityOverNode.zBezier2);
                moveSpeed.velocityOver = velocityOver;
            }
            var velocityForceNode = node.velocityForce;
            if (velocityForceNode) {
                var velocityForce = new egret3d.VelocityForceLifeTimeData();
                velocityForce.type = egret3d.ParticleValueType[velocityForceNode.type + ""];
                velocityForce.min = this.parseVector3D(velocityForceNode.min, velocityForce.min);
                velocityForce.max = this.parseVector3D(velocityForceNode.max, velocityForce.max);
                velocityForce.worldSpace = velocityForceNode.worldSpace;
                velocityForce.xBezier1 = this.parseFoldLine(node.xLine1) || this.parseBezierData(velocityForceNode.xBezier1);
                velocityForce.yBezier1 = this.parseFoldLine(node.yLine1) || this.parseBezierData(velocityForceNode.yBezier1);
                velocityForce.zBezier1 = this.parseFoldLine(node.zLine1) || this.parseBezierData(velocityForceNode.zBezier1);
                velocityForce.xBezier2 = this.parseFoldLine(node.xLine2) || this.parseBezierData(velocityForceNode.xBezier2);
                velocityForce.yBezier2 = this.parseFoldLine(node.yLine2) || this.parseBezierData(velocityForceNode.yBezier2);
                velocityForce.zBezier2 = this.parseFoldLine(node.zLine2) || this.parseBezierData(velocityForceNode.zBezier2);
                moveSpeed.velocityForce = velocityForce;
            }
            var velocityLimitNode = node.velocityLimit;
            if (velocityLimitNode) {
                var velocityLimit = new egret3d.VelocityLimitLifeTimeData();
                velocityLimit.type = egret3d.ParticleValueType[velocityLimitNode.type + ""];
                velocityLimit.min = Number(velocityLimitNode.min);
                velocityLimit.max = Number(velocityLimitNode.max);
                velocityLimit.dampen = Number(velocityLimitNode.dampen);
                velocityLimit.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(velocityLimitNode.bezier1);
                velocityLimit.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(velocityLimitNode.bezier2);
                moveSpeed.velocityLimit = velocityLimit;
            }
        };
        /**
         * @private
         * 解析全局位置or本地位置类型
         */
        ParticleJsonParser.prototype.parseFollowTarget = function (node) {
            if (node == null)
                return;
            var followTarget = this._particleData.followTarget = new egret3d.ParticleDataFollowTarget();
            followTarget.followRotation = node.followRotation;
            followTarget.followScale = node.followScale;
        };
        /**
         * @private
         * 解析粒子生命过程中缩放变化信息(早期版本，只支持一个贝塞尔曲线形势)
         */
        ParticleJsonParser.prototype.parseScaleBeizer = function (node) {
            if (node == null)
                return;
            var scaleBezier = this._particleData.scaleSize = new egret3d.ParticleDataScaleSize();
            scaleBezier.type = egret3d.ParticleValueType.OneBezier;
            scaleBezier.bezier1 = this.parseFoldLine(node.line) || this.parseBezierData(node.bezier);
        };
        /**
         * @private
         * 解析粒子生命过程中缩放变化信息
         */
        ParticleJsonParser.prototype.parseScaleSize = function (node) {
            if (node == null)
                return;
            var scaleSize = this._particleData.scaleSize = new egret3d.ParticleDataScaleSize();
            scaleSize.type = egret3d.ParticleValueType[node.type + ""];
            scaleSize.min = Number(node.min);
            scaleSize.max = Number(node.max);
            scaleSize.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            scaleSize.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
        };
        /**
        * @private
        * 解析粒子旋转角速度
        */
        ParticleJsonParser.prototype.parseRotationSpeed = function (node) {
            if (node == null)
                return;
            var rotationSpeed = this._particleData.rotationSpeed = new egret3d.ParticleDataRotationSpeed();
            rotationSpeed.type = egret3d.ParticleValueType[node.type + ""];
            rotationSpeed.min = this.parseVector3D(node.min, rotationSpeed.min);
            rotationSpeed.max = this.parseVector3D(node.max, rotationSpeed.max);
            rotationSpeed.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            rotationSpeed.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
        };
        /**
        * @private
        * 解析粒子生命过程中颜色渐变信息
        */
        ParticleJsonParser.prototype.parseColorOffset = function (node) {
            if (node == null)
                return;
            var colorOffset = this._particleData.colorOffset = new egret3d.ParticleDataColorOffset();
            colorOffset.data = this.parseGradientsColor(node.item, colorOffset.data);
        };
        /**
        * @private
        * 解析材质球
        */
        ParticleJsonParser.prototype.parseTextureSheet = function (node) {
            if (node == null)
                return null;
            var textureSheet = this._particleData.textureSheet = new egret3d.ParticleDataTextureSheet();
            textureSheet.frameType = egret3d.ParticleValueType[node.frameType + ""];
            textureSheet.tileX = Number(node.tileX);
            textureSheet.tileY = Number(node.tileY);
            textureSheet.whole = node.whole;
            textureSheet.row = Number(node.row);
            textureSheet.min = Number(node.min);
            textureSheet.max = Number(node.max);
            textureSheet.circles = Number(node.circles);
            textureSheet.bezier1 = this.parseFoldLine(node.line1) || this.parseBezierData(node.bezier1);
            textureSheet.bezier2 = this.parseFoldLine(node.line2) || this.parseBezierData(node.bezier2);
            return textureSheet;
        };
        /**
        * @private
        * 解析渐变数据
        */
        ParticleJsonParser.prototype.parseGradientsColor = function (itemList, dst) {
            dst || (dst = new egret3d.ColorGradients);
            var item;
            var i = 0;
            var count = 0;
            var color;
            for (i = 0, count = itemList ? itemList.length : 0; i < count; i++) {
                item = itemList[i];
                dst.times.push(Number(item[0]));
                color = egret3d.Color.createColor(Number(item[1]));
                dst.colors.push(color);
            }
            //排序
            var sortTimes = dst.times.slice();
            var sortColors = dst.colors.slice();
            sortTimes.sort(function (a, b) {
                return a - b;
            });
            for (i = 0, count = dst ? dst.times.length : 0; i < count; i++) {
                var index = sortTimes.indexOf(dst.times[i]);
                dst.colors[i] = sortColors[index];
            }
            dst.times = sortTimes;
            return dst;
        };
        /**
        * @private
        * 解析一条贝塞尔曲线数据
        */
        ParticleJsonParser.prototype.parseBezierData = function (node) {
            var bzData = new egret3d.BezierData();
            bzData.lineMode = false;
            if (node == null)
                return bzData;
            var item;
            var i = 0;
            var count = 0;
            var pt;
            for (i = 0, count = node ? node.length : 0; i < count; i++) {
                item = node[i];
                pt = new egret3d.Point();
                pt.x = Number(item[1]);
                pt.y = Number(item[2]);
                if (item[0] == "pos") {
                    bzData.posPoints.push(pt);
                }
                else {
                    bzData.ctrlPoints.push(pt);
                }
            }
            return bzData;
        };
        /**
        * @private
        * 解析一条折线数据
        */
        ParticleJsonParser.prototype.parseFoldLine = function (node) {
            if (node == null)
                return null;
            var bzData = new egret3d.BezierData();
            bzData.lineMode = true;
            var item;
            var i = 0;
            var count = 0;
            var pt;
            for (i = 0, count = node ? node.length : 0; i < count; i++) {
                item = node[i];
                pt = new egret3d.Point();
                pt.x = Number(item[0]);
                pt.y = Number(item[1]);
                bzData.linePoints.push(pt);
            }
            return bzData;
        };
        /**
        * @private
        * 解析一个vector3D数据
        */
        ParticleJsonParser.prototype.parseVector3D = function (node, vector) {
            if (vector == null)
                vector = new egret3d.Vector3();
            if (node) {
                vector.x = Number(node[0]);
                vector.y = Number(node[1]);
                vector.z = Number(node[2]);
            }
            return vector;
        };
        return ParticleJsonParser;
    }());
    egret3d.ParticleJsonParser = ParticleJsonParser;
    __reflect(ParticleJsonParser.prototype, "egret3d.ParticleJsonParser");
})(egret3d || (egret3d = {}));
