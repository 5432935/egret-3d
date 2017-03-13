var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /*
    * @private
    */
    var StaticMergeUtil = (function () {
        function StaticMergeUtil() {
        }
        StaticMergeUtil.bacthingMesh = function (configPasser) {
            var nodes = configPasser.nodeList;
            var mats = configPasser.matDict;
            //收集 帅选条件的mesh集合
            var arr_staticMesh = StaticMergeUtil.collectStaticMesh(nodes);
            var i = 0;
            var preBacthingList = [];
            var finalBacthingList = [];
            var matID;
            var mesh;
            //按材质 来 pack
            for (var key in arr_staticMesh) {
                matID = Number(key);
                preBacthingList = arr_staticMesh[matID];
                //this.checkMaxBacthing(key, preBacthingList) 来检查最大能pack的顶点数量
                finalBacthingList = finalBacthingList.concat(this.batching(matID, this.checkMaxBacthing(matID, preBacthingList)));
            }
            for (var key in arr_staticMesh) {
                preBacthingList = arr_staticMesh[key];
                for (var f in preBacthingList) {
                    mesh = preBacthingList[f].object3d;
                    if (mesh.parent) {
                        mesh.parent.removeChild(mesh);
                    }
                }
            }
            preBacthingList.length = 0;
            return finalBacthingList;
        };
        StaticMergeUtil.checkMaxBacthing = function (matID, preNodes) {
            var maxVerticeIndex = 10000;
            var packs = [];
            var geometry;
            var indexCount = 0;
            var listCount = 0;
            var geometryMatID;
            for (var i = 0; i < preNodes.length; i++) {
                geometry = preNodes[i].object3d.geometry;
                for (var j = 0; j < geometry.subGeometrys.length; j++) {
                    //geometryMatID = preNodes[i]["geometryMatID" + matID.toString()];
                    if (preNodes[i].materialIDs[j] == matID) {
                        if (indexCount + geometry.subGeometrys[j].count < maxVerticeIndex) {
                            packs[listCount] = packs[listCount] || [];
                            packs[listCount].push(preNodes[i]);
                            indexCount = indexCount + geometry.subGeometrys[j].count;
                        }
                        else {
                            listCount++;
                            indexCount = 0;
                            packs[listCount] = packs[listCount] || [];
                            packs[listCount].push(preNodes[i]);
                            indexCount = indexCount + geometry.subGeometrys[j].count;
                        }
                    }
                }
            }
            return packs;
        };
        //过滤 静态的mesh
        StaticMergeUtil.collectStaticMesh = function (nodes) {
            var arr_staticMesh = {};
            var len = 0;
            var mesh;
            var matID;
            for (var i = 0; i < nodes.length; i++) {
                //Mesh
                //static 
                if (nodes[i].type == "Mesh" && nodes[i].staticType == "Batching") {
                    mesh = nodes[i].object3d;
                    len = mesh.geometry.subGeometrys.length;
                    for (var j = 0; j < len; j++) {
                        matID = nodes[i].materialIDs[mesh.geometry.subGeometrys[j].matID];
                        //nodes[i]["geometryMatID"+ matID.toString()] = mesh.geometry.subGeometrys[j].matID;
                        arr_staticMesh[matID] = arr_staticMesh[matID] || [];
                        arr_staticMesh[matID].push(nodes[i]);
                    }
                }
            }
            return arr_staticMesh;
        };
        StaticMergeUtil.sortByZ = function (a, b) {
            return a.z - b.z;
        };
        //合并一个材质列表的物体
        StaticMergeUtil.batching = function (matID, nodes) {
            var _this = this;
            var modelMatrix = egret3d.Matrix4.helpMatrix;
            var normalMatrix = egret3d.Matrix4.helpMatrix2;
            var mesh;
            var vertexLenth;
            var pos = egret3d.Vector3.HELP_0;
            var normal = new egret3d.Vector3();
            var i, count, vertexOffset = 0, indexOffset = 0;
            var totalVertexLength = 0;
            var totalIndexLength = 0;
            var meshs;
            var shareMat;
            var subGeometry;
            var geometryMatID;
            var final = [];
            var indexValue = 0;
            var currentVertexOffset = 0;
            var currentIndexOffset = 0;
            var quaternion = egret3d.Quaternion.HELP_0;
            //当前材质 如果超过最大值就需要分pack
            for (var packIndex = 0; packIndex < nodes.length; packIndex++) {
                meshs = nodes[packIndex];
                totalVertexLength = 0;
                totalIndexLength = 0;
                meshs = meshs.sort(function (a, b) { return _this.sortByZ(a, b); });
                for (i = 0; i < meshs.length; i++) {
                    mesh = meshs[i].object3d;
                    vertexLenth = mesh.geometry.vertexAttLength;
                    for (var g = 0; g < mesh.geometry.subGeometrys.length; g++) {
                        subGeometry = mesh.geometry.subGeometrys[g];
                        if (meshs[i].materialIDs[g] == matID) {
                            geometryMatID = g;
                            //totalVertexLength += subGeometry.count * vertexLenth ;
                            totalVertexLength += subGeometry.count;
                            totalIndexLength += subGeometry.count;
                        }
                    }
                }
                var geometry = new egret3d.Geometry();
                geometry.vertexFormat = meshs[0].object3d.geometry.vertexFormat;
                geometry.vertexCount = totalVertexLength;
                geometry.indexCount = totalIndexLength;
                geometry.buildDefaultSubGeometry();
                var vertexs = geometry.vertexArray;
                var indexs = geometry.indexArray;
                vertexOffset = 0;
                indexOffset = 0;
                //模型 拼接
                for (count = 0; count < meshs.length; count++) {
                    mesh = meshs[count].object3d;
                    var vq = modelMatrix.decompose()[1];
                    quaternion.x = vq.x;
                    quaternion.y = vq.y;
                    quaternion.z = vq.z;
                    quaternion.w = vq.w;
                    modelMatrix.makeTransform(mesh.globalPosition, mesh.globalScale, mesh.globalOrientation);
                    normalMatrix.makeTransform(new egret3d.Vector3(), mesh.globalScale, mesh.globalOrientation);
                    vertexLenth = mesh.geometry.vertexAttLength;
                    //var subVertexArray: Float32Array;
                    //var subIndexArray: Uint16Array;
                    var vertexBuffer;
                    var indexBuffer;
                    for (var g = 0; g < mesh.geometry.subGeometrys.length; g++) {
                        subGeometry = mesh.geometry.subGeometrys[g];
                        if (meshs[count].materialIDs[g] == matID) {
                            geometryMatID = g;
                            vertexBuffer = mesh.geometry.vertexArray;
                            indexBuffer = mesh.geometry.indexArray;
                            //geomety 顶点拼接
                            for (var i = 0; i < subGeometry.count; ++i) {
                                indexValue = indexBuffer[subGeometry.start + i];
                                currentVertexOffset = vertexOffset + i;
                                pos.x = vertexBuffer[indexValue * vertexLenth];
                                pos.y = vertexBuffer[indexValue * vertexLenth + 1];
                                pos.z = vertexBuffer[indexValue * vertexLenth + 2];
                                normal.x = vertexBuffer[indexValue * vertexLenth + 3];
                                normal.y = vertexBuffer[indexValue * vertexLenth + 4];
                                normal.z = vertexBuffer[indexValue * vertexLenth + 5];
                                modelMatrix.transformVector(pos, egret3d.Vector3.HELP_1);
                                normalMatrix.transformVector(normal, egret3d.Vector3.HELP_2);
                                //quaternion.transformVector(normal, Vector3.HELP_2);
                                vertexs[currentVertexOffset * vertexLenth + 0] = egret3d.Vector3.HELP_1.x;
                                vertexs[currentVertexOffset * vertexLenth + 1] = egret3d.Vector3.HELP_1.y;
                                vertexs[currentVertexOffset * vertexLenth + 2] = egret3d.Vector3.HELP_1.z;
                                vertexs[currentVertexOffset * vertexLenth + 3] = egret3d.Vector3.HELP_2.x;
                                vertexs[currentVertexOffset * vertexLenth + 4] = egret3d.Vector3.HELP_2.y;
                                vertexs[currentVertexOffset * vertexLenth + 5] = egret3d.Vector3.HELP_2.z;
                                for (var j = 6; j < vertexLenth; ++j) {
                                    vertexs[currentVertexOffset * vertexLenth + j] = vertexBuffer[indexValue * vertexLenth + j];
                                }
                            }
                            for (var i = 0; i < subGeometry.count; ++i) {
                                currentIndexOffset = vertexOffset + i;
                                indexs[currentIndexOffset] = currentIndexOffset;
                            }
                            vertexOffset += subGeometry.count;
                            indexOffset += subGeometry.count;
                        }
                    }
                }
                //取共享的材质球
                shareMat = mesh.getMaterial(geometryMatID);
                final.push(new egret3d.Mesh(geometry, shareMat));
            }
            return final;
        };
        return StaticMergeUtil;
    }());
    egret3d.StaticMergeUtil = StaticMergeUtil;
    __reflect(StaticMergeUtil.prototype, "egret3d.StaticMergeUtil");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=StaticMergeUtil.js.map