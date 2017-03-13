var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
    * @private
    * @class egret3d.LODNode
    * @classdesc
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LODNode = (function () {
        function LODNode(parent, lodQuadTree, x, z) {
            if (parent === void 0) { parent = null; }
            if (lodQuadTree === void 0) { lodQuadTree = null; }
            if (x === void 0) { x = 0; }
            if (z === void 0) { z = 0; }
            this.lt = 0;
            this.rt = 0;
            this.lb = 0;
            this.rb = 0;
            this.tc = 0;
            this.bc = 0;
            this.lc = 0;
            this.rc = 0;
            this.oc = 0;
            this.center = new egret3d.Vector3();
            this.center_0 = new egret3d.Vector3();
            this.radius = 0;
            this.dh0 = 0;
            this.dh1 = 0;
            this.dh2 = 0;
            this.dh3 = 0;
            this.dh4 = 0;
            this.dh5 = 0;
            this.minDH = 0;
            this.maxDH = 0;
            this.d = 0;
            this.childs = [];
            this.level = 0;
            this.isRender = false;
            this.parent = parent;
            this.lodQuadTree = lodQuadTree;
            if (this.parent) {
                this.level = this.parent.level + 1;
            }
            if (x != 0 && z != 0) {
                this.createNode(0, x, (z + 1) * x, (z + 1) * (x + 1) - 1);
            }
            if (!this.parent) {
                this.findNeighbour(this, x, z);
            }
        }
        LODNode.prototype.calculateHeightDiff = function () {
            LODNode.v0.length = 0;
            LODNode.v1.length = 0;
            LODNode.v2.length = 0;
            LODNode.v3.length = 0;
            LODNode.v4.length = 0;
            LODNode.v5.length = 0;
            LODNode.v6.length = 0;
            LODNode.v7.length = 0;
            LODNode.v8.length = 0;
            LODNode.getVertex(this.lt, LODNode.v0, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rt, LODNode.v1, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.lb, LODNode.v2, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rb, LODNode.v3, this.lodQuadTree.vertexDatas);
            var tc = (this.lt + this.rt) / 2;
            var bc = (this.lb + this.rb) / 2;
            var lc = (this.lt + this.lb) / 2;
            var rc = (this.rt + this.rb) / 2;
            var oc = (this.lt + this.rb) / 2;
            LODNode.getVertex(tc, LODNode.v4, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(bc, LODNode.v5, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(lc, LODNode.v6, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(rc, LODNode.v7, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(oc, LODNode.v8, this.lodQuadTree.vertexDatas);
            this.dh0 = (LODNode.v0[2] + LODNode.v1[2]) / 2 - LODNode.v4[2];
            this.dh1 = (LODNode.v2[2] + LODNode.v3[2]) / 2 - LODNode.v5[2];
            this.dh2 = (LODNode.v0[2] + LODNode.v2[2]) / 2 - LODNode.v6[2];
            this.dh3 = (LODNode.v1[2] + LODNode.v3[2]) / 2 - LODNode.v7[2];
            this.dh4 = (LODNode.v0[2] + LODNode.v3[2]) / 2 - LODNode.v8[2];
            this.dh5 = (LODNode.v1[2] + LODNode.v2[2]) / 2 - LODNode.v8[2];
            this.minDH = Math.max(this.dh0, this.dh1);
            this.minDH = Math.max(this.minDH, this.dh2);
            this.minDH = Math.max(this.minDH, this.dh3);
            this.minDH = Math.max(this.minDH, this.dh4);
            this.minDH = Math.max(this.minDH, this.dh5);
            this.maxDH = Math.max(this.dh0, this.dh1);
            this.maxDH = Math.max(this.maxDH, this.dh2);
            this.maxDH = Math.max(this.maxDH, this.dh3);
            this.maxDH = Math.max(this.maxDH, this.dh4);
            this.maxDH = Math.max(this.maxDH, this.dh5);
            this.maxDH = Math.max(this.maxDH, 1);
            var x = LODNode.v1[0] - LODNode.v0[0];
            var y = LODNode.v1[1] - LODNode.v0[1];
            var z = LODNode.v1[2] - LODNode.v0[2];
            this.d = Math.sqrt(x * x + y * y + z * z);
        };
        LODNode.prototype.createNode = function (lt, rt, lb, rb) {
            this.lt = lt;
            this.rt = rt;
            this.lb = lb;
            this.rb = rb;
            if (this.lodQuadTree.vertexDatas) {
                this.createBoundSphere();
            }
            if (this.rt - lt > 1) {
                this.calculateHeightDiff();
                var quad = null;
                var tc = (lt + rt) / 2;
                var bc = (lb + rb) / 2;
                var lc = (lt + lb) / 2;
                var rc = (rt + rb) / 2;
                var oc = (lt + rb) / 2;
                this.tc = tc;
                this.bc = bc;
                this.lc = lc;
                this.rc = rc;
                this.oc = oc;
                quad = new LODNode(this, this.lodQuadTree);
                this.childs[0] = quad;
                quad.createNode(lt, tc, lc, oc);
                quad = new LODNode(this, this.lodQuadTree);
                this.childs[1] = quad;
                quad.createNode(tc, rt, oc, rc);
                quad = new LODNode(this, this.lodQuadTree);
                this.childs[2] = quad;
                quad.createNode(lc, oc, lb, bc);
                quad = new LODNode(this, this.lodQuadTree);
                this.childs[3] = quad;
                quad.createNode(oc, rc, bc, rb);
            }
        };
        LODNode.prototype.createBoundSphere = function () {
            LODNode.v0.length = 0;
            LODNode.v1.length = 0;
            LODNode.v2.length = 0;
            LODNode.v3.length = 0;
            LODNode.getVertex(this.lt, LODNode.v0, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rt, LODNode.v1, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.lb, LODNode.v2, this.lodQuadTree.vertexDatas);
            LODNode.getVertex(this.rb, LODNode.v3, this.lodQuadTree.vertexDatas);
            LODNode.v4[0] = Math.min(LODNode.v0[0], LODNode.v1[0]);
            LODNode.v4[0] = Math.min(LODNode.v4[0], LODNode.v2[0]);
            LODNode.v4[0] = Math.min(LODNode.v4[0], LODNode.v3[0]);
            LODNode.v4[1] = Math.min(LODNode.v0[1], LODNode.v1[1]);
            LODNode.v4[1] = Math.min(LODNode.v4[1], LODNode.v2[1]);
            LODNode.v4[1] = Math.min(LODNode.v4[1], LODNode.v3[1]);
            LODNode.v4[2] = Math.min(LODNode.v0[2], LODNode.v1[2]);
            LODNode.v4[2] = Math.min(LODNode.v4[2], LODNode.v2[2]);
            LODNode.v4[2] = Math.min(LODNode.v4[2], LODNode.v3[2]);
            LODNode.v5[0] = Math.max(LODNode.v0[0], LODNode.v1[0]);
            LODNode.v5[0] = Math.max(LODNode.v5[0], LODNode.v2[0]);
            LODNode.v5[0] = Math.max(LODNode.v5[0], LODNode.v3[0]);
            LODNode.v5[1] = Math.max(LODNode.v0[1], LODNode.v1[1]);
            LODNode.v5[1] = Math.max(LODNode.v5[1], LODNode.v2[1]);
            LODNode.v5[1] = Math.max(LODNode.v5[1], LODNode.v3[1]);
            LODNode.v5[2] = Math.max(LODNode.v0[2], LODNode.v1[2]);
            LODNode.v5[2] = Math.max(LODNode.v5[2], LODNode.v2[2]);
            LODNode.v5[2] = Math.max(LODNode.v5[2], LODNode.v3[2]);
            var x = LODNode.v5[0] - LODNode.v4[0];
            var y = LODNode.v5[1] - LODNode.v4[1];
            var z = LODNode.v5[2] - LODNode.v4[2];
            this.radius = Math.sqrt(x * x + y * y + z * z) / 2;
            this.center.x = LODNode.v4[0] + x / 2;
            this.center.y = LODNode.v4[1] + y / 2;
            this.center.z = LODNode.v4[2] + z / 2;
            this.center_0.copyFrom(this.center);
        };
        LODNode.getVertex = function (index, data, vertexDatas) {
            data[0] = vertexDatas[index * 3 + 0];
            data[1] = vertexDatas[index * 3 + 1];
            data[2] = vertexDatas[index * 3 + 2];
        };
        LODNode.prototype.isNeighbour = function (lt, rt, lb, rb) {
            if (this.lt == lt &&
                this.rt == rt &&
                this.lb == lb &&
                this.rb == rb) {
                return this;
            }
            if (this.childs[0]) {
                var oc = (lt + rt + lb + rb) / 4;
                LODNode.v0.length = 0;
                LODNode.getVertex(oc, LODNode.v0, this.lodQuadTree.vertexDatas);
                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[0].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[0].rb, LODNode.v2, this.lodQuadTree.vertexDatas);
                if (egret3d.Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[0].isNeighbour(lt, rt, lb, rb);
                }
                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[1].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[1].rb, LODNode.v2, this.lodQuadTree.vertexDatas);
                if (egret3d.Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[1].isNeighbour(lt, rt, lb, rb);
                }
                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[2].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[2].rb, LODNode.v2, this.lodQuadTree.vertexDatas);
                if (egret3d.Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[2].isNeighbour(lt, rt, lb, rb);
                }
                LODNode.v1.length = 0;
                LODNode.v2.length = 0;
                LODNode.getVertex(this.childs[3].lt, LODNode.v1, this.lodQuadTree.vertexDatas);
                LODNode.getVertex(this.childs[3].rb, LODNode.v2, this.lodQuadTree.vertexDatas);
                if (egret3d.Rectangle.pointInRect(LODNode.v0[0], LODNode.v0[2], LODNode.v1[0], LODNode.v1[2], LODNode.v2[0], LODNode.v2[2])) {
                    return this.childs[3].isNeighbour(lt, rt, lb, rb);
                }
            }
            return null;
        };
        LODNode.prototype.findNeighbour = function (root, x, z) {
            var g = this.rt - this.lt;
            if (g <= 1) {
                return;
            }
            var _0 = 0;
            var _1 = 0;
            var _2 = 0;
            var _3 = 0;
            var n = 0;
            if (this.lt == 16350 && this.rt == 16352 &&
                this.lb == 16608 && this.rb == 16610) {
                var sss = 0;
            }
            for (var i = 0; i < 4; ++i) {
                switch (i) {
                    case 0:
                        _0 = this.lt - g * (x + 1);
                        _1 = this.rt - g * (x + 1);
                        _2 = this.lt;
                        _3 = this.rt;
                        break;
                    case 1:
                        _0 = this.lb;
                        _1 = this.rb;
                        _2 = this.lb + g * (x + 1);
                        _3 = this.rb + g * (x + 1);
                        break;
                    case 2:
                        _0 = this.lt - g;
                        _1 = this.lt;
                        _2 = this.lb - g;
                        _3 = this.lb;
                        break;
                    case 3:
                        _0 = this.rt;
                        _1 = this.rt + g;
                        _2 = this.rb;
                        _3 = this.rb + g;
                        break;
                }
                n = (_0 + _1 + _2 + _3) / 4;
                if (n >= 0 && n <= ((x + 1) * (z + 1) - 1)) {
                    this.childs[i + 4] = root.isNeighbour(_0, _1, _2, _3);
                }
            }
            if (this.childs[0]) {
                this.childs[0].findNeighbour(root, x, z);
                this.childs[1].findNeighbour(root, x, z);
                this.childs[2].findNeighbour(root, x, z);
                this.childs[3].findNeighbour(root, x, z);
            }
        };
        LODNode.prototype.isDivide = function (camera, lod) {
            LODNode.v0.length = 0;
            LODNode.getVertex(this.oc, LODNode.v0, this.lodQuadTree.vertexDatas_0);
            //MathUtil.CALCULATION_VECTOR3D.setTo(LODNode.v0[0], LODNode.v0[1], LODNode.v0[2]);
            //object3d.modelMatrix.transformVector(MathUtil.CALCULATION_VECTOR3D, MathUtil.CALCULATION_VECTOR3D);
            //var x: number = camera.globalX - MathUtil.CALCULATION_VECTOR3D.x;
            //var y: number = camera.globalY - MathUtil.CALCULATION_VECTOR3D.y;
            //var z: number = camera.globalZ - MathUtil.CALCULATION_VECTOR3D.z;
            var x = camera.globalX - LODNode.v0[0];
            var y = camera.globalY - LODNode.v0[1];
            var z = camera.globalZ - LODNode.v0[2];
            var l = Math.sqrt(x * x + y * y + z * z);
            if (l / (this.d * lod * this.maxDH) < 1) {
                return true;
            }
            return false;
        };
        LODNode.prototype.setIsRender = function (value) {
            this.isRender = value;
            if (this.childs[0]) {
                this.childs[0].setIsRender(value);
                this.childs[1].setIsRender(value);
                this.childs[2].setIsRender(value);
                this.childs[3].setIsRender(value);
            }
        };
        return LODNode;
    }());
    LODNode.v0 = [];
    LODNode.v1 = [];
    LODNode.v2 = [];
    LODNode.v3 = [];
    LODNode.v4 = [];
    LODNode.v5 = [];
    LODNode.v6 = [];
    LODNode.v7 = [];
    LODNode.v8 = [];
    egret3d.LODNode = LODNode;
    __reflect(LODNode.prototype, "egret3d.LODNode");
    /**
    * @private
    * @class egret3d.LODNode
    * @classdesc
    *
    * @version Egret 3.0
    * @platform Web,Native
    */
    var LODQuadTree = (function () {
        /**
        * @language zh_CN
        * 构造
        * @param vertex 地形顶点列表
        * @param size 地形格子 行列格子
        * @version Egret 3.0
        * @platform Web,Native
        */
        function LODQuadTree(vertex, size) {
            /**
            * @language zh_CN
            * lod微调值
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.lodValue = 16;
            /**
            * @language zh_CN
            * 每个节点的包围球半径偏移
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.offset = 200;
            /**
            * @language zh_CN
            * 每个节点的层级
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.level = 7;
            /**
            * @language zh_CN
            * 格子行数
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.row = 128;
            /**
            * @language zh_CN
            * 格子列数
            * @version Egret 3.0
            * @platform Web,Native
            */
            this.col = 128;
            this.enable = true;
            this.currentNodes = [];
            this.nextNodes = [];
            this.v0 = new egret3d.Vector3();
            this.v1 = new egret3d.Vector3();
            this.row = size;
            this.col = size;
            this.vertexDatas = vertex;
            this.vertexDatas_0 = [];
            for (var i = 0; i < vertex.length; ++i) {
                this.vertexDatas_0[0] = vertex[i];
            }
            this.level = LODQuadTree.getOrder(size);
            this.root = new LODNode(null, this, this.row, this.col);
        }
        /**
        * @private
        * @language zh_CN
        * @version Egret 3.0
        * @platform Web,Native
        */
        LODQuadTree.getOrder = function (size) {
            var order = 0;
            size = (size - 1) >> (0);
            do {
                size >>= 1;
                order++;
            } while (size);
            return order;
        };
        LODQuadTree.prototype.build = function (index, indexBuffer, camera) {
            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            var node;
            this.root.setIsRender(false);
            for (var i = this.level; i >= 0; --i) {
                for (var j = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];
                    if (!camera.frustum.inSphere(node.center_0, node.radius + this.offset)) {
                        continue;
                    }
                    if (node.rt - node.lt <= 1) {
                        indexBuffer[index++] = node.lt;
                        indexBuffer[index++] = node.rb;
                        indexBuffer[index++] = node.lb;
                        indexBuffer[index++] = node.lt;
                        indexBuffer[index++] = node.rt;
                        indexBuffer[index++] = node.rb;
                        node.isRender = true;
                        continue;
                    }
                    if (this.enable) {
                        if (node.isDivide(camera, this.lodValue)) {
                            this.nextNodes.push(node.childs[0]);
                            this.nextNodes.push(node.childs[1]);
                            this.nextNodes.push(node.childs[2]);
                            this.nextNodes.push(node.childs[3]);
                        }
                        else {
                            node.setIsRender(true);
                        }
                    }
                    else {
                        this.nextNodes.push(node.childs[0]);
                        this.nextNodes.push(node.childs[1]);
                        this.nextNodes.push(node.childs[2]);
                        this.nextNodes.push(node.childs[3]);
                    }
                }
                var currentNodes = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }
            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            for (var i = this.level; i >= 0; --i) {
                for (var j = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];
                    if (node.isRender && (node.rt - node.lt) > 1) {
                        var b0 = false;
                        var b1 = false;
                        var b2 = false;
                        var b3 = false;
                        if (node.childs[4]) {
                            b0 = node.childs[4].isRender;
                        }
                        else {
                            b0 = true;
                        }
                        if (node.childs[5]) {
                            b1 = node.childs[5].isRender;
                        }
                        else {
                            b1 = true;
                        }
                        if (node.childs[6]) {
                            b2 = node.childs[6].isRender;
                        }
                        else {
                            b2 = true;
                        }
                        if (node.childs[7]) {
                            b3 = node.childs[7].isRender;
                        }
                        else {
                            b3 = true;
                        }
                        if (b0 && b1 && b2 && b3) {
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rb;
                            indexBuffer[index++] = node.lb;
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rt;
                            indexBuffer[index++] = node.rb;
                            continue;
                        }
                        if (b0 || !node.childs[4]) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[4].childs[2], 4);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[4].childs[3], 4);
                        }
                        if (b1 || !node.childs[5]) {
                            indexBuffer[index++] = node.lb;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[5].childs[0], 5);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[5].childs[1], 5);
                        }
                        if (b2 || !node.childs[6]) {
                            indexBuffer[index++] = node.lt;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.lb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[6].childs[1], 6);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[6].childs[3], 6);
                        }
                        if (b3 || !node.childs[7]) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node.rt;
                            indexBuffer[index++] = node.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node.childs[7].childs[0], 7);
                            index = this.mendCracks(index, indexBuffer, node, node.childs[7].childs[2], 7);
                        }
                    }
                    else {
                        if (node.childs[0]) {
                            this.nextNodes.push(node.childs[0]);
                            this.nextNodes.push(node.childs[1]);
                            this.nextNodes.push(node.childs[2]);
                            this.nextNodes.push(node.childs[3]);
                        }
                    }
                }
                var currentNodes = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }
            return index;
        };
        LODQuadTree.prototype.mendCracks = function (index, indexBuffer, node, node_0, dir) {
            if (!node_0) {
                return index;
            }
            switch (dir) {
                case 4:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.lb;
                            indexBuffer[index++] = node_0.rb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[2], 4);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[3], 4);
                        }
                    }
                    break;
                case 5:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node_0.lt;
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[0], 5);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[1], 5);
                        }
                    }
                    break;
                case 6:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.rb;
                            indexBuffer[index++] = node_0.rt;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[1], 6);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[3], 6);
                        }
                    }
                    break;
                case 7:
                    if (node_0) {
                        if (node_0.isRender) {
                            indexBuffer[index++] = node.oc;
                            indexBuffer[index++] = node_0.lt;
                            indexBuffer[index++] = node_0.lb;
                        }
                        else {
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[0], 7);
                            index = this.mendCracks(index, indexBuffer, node, node_0.childs[2], 7);
                        }
                    }
                    break;
            }
            return index;
        };
        LODQuadTree.prototype.onUpdate = function (modle) {
            this.currentNodes.length = 0;
            this.nextNodes.length = 0;
            this.currentNodes.push(this.root);
            var node;
            for (var i = this.level; i >= 0; --i) {
                for (var j = 0; j < this.currentNodes.length; ++j) {
                    node = this.currentNodes[j];
                    modle.transformVector(node.center, node.center_0);
                    this.nextNodes.push(node.childs[0]);
                    this.nextNodes.push(node.childs[1]);
                    this.nextNodes.push(node.childs[2]);
                    this.nextNodes.push(node.childs[3]);
                }
                var currentNodes = this.currentNodes;
                this.currentNodes = this.nextNodes;
                this.nextNodes = currentNodes;
                this.nextNodes.length = 0;
            }
            for (var i = 0; i < this.vertexDatas.length / 3; ++i) {
                this.v0.setTo(this.vertexDatas[i * 3 + 0], this.vertexDatas[i * 3 + 1], this.vertexDatas[i * 3 + 2]);
                modle.transformVector(this.v0, this.v0);
                this.vertexDatas_0[i * 3 + 0] = this.v0.x;
                this.vertexDatas_0[i * 3 + 1] = this.v0.y;
                this.vertexDatas_0[i * 3 + 2] = this.v0.z;
            }
        };
        return LODQuadTree;
    }());
    egret3d.LODQuadTree = LODQuadTree;
    __reflect(LODQuadTree.prototype, "egret3d.LODQuadTree");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=LODQuadTree.js.map