module egret3d {
    /*
    * @private
    */
    export class StaticMergeUtil {

        public static bacthingMesh(configPasser: UnitConfigParser): Mesh[] {
            var nodes: UnitNodeData[] = configPasser.nodeList;
            var mats: any = configPasser.matDict;

            //收集 帅选条件的mesh集合
            var arr_staticMesh: { [key: number]: UnitNodeData[] } = StaticMergeUtil.collectStaticMesh(nodes);
            var i: number = 0;
            var preBacthingList: UnitNodeData[] = [];
            var finalBacthingList: Mesh[] = [];
            var matID: number;
            var mesh: Mesh;

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
                    mesh = <Mesh>preBacthingList[f].object3d;
                    if (mesh.parent) {
                       mesh.parent.removeChild(mesh);
                    }
                }
            }

            preBacthingList.length = 0;
            return finalBacthingList;
        }

        private static checkMaxBacthing(matID: number, preNodes: UnitNodeData[]): UnitNodeData[][] {
            var maxVerticeIndex: number = 25000;
            var packs: UnitNodeData[][] = [];
            var geometry: Geometry;
            var indexCount: number = 0;
            var listCount: number = 0;
            var geometryMatID: number ;

            for (var i: number = 0; i < preNodes.length; i++) {
                geometry = (<Mesh>preNodes[i].object3d).geometry;
                for (var j: number = 0; j < geometry.subGeometrys.length; j++) {
                    geometryMatID = preNodes[i]["geometryMatID" + matID.toString()];
                    if (geometry.subGeometrys[j].matID == geometryMatID) {
                        if (indexCount + geometry.subGeometrys[j].count < maxVerticeIndex) {
                            packs[listCount] = packs[listCount] || [];
                            packs[listCount].push(preNodes[i]);
                            indexCount = indexCount + geometry.subGeometrys[j].count;
                        } else {
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
        }

        //过滤 静态的mesh
        private static collectStaticMesh(nodes: UnitNodeData[]): { [key: number]: UnitNodeData[] } {
            var arr_staticMesh: { [key: number]: UnitNodeData[] } = {};
            var len: number = 0;
            var mesh: Mesh;
            var matID: number;
            for (var i: number = 0; i < nodes.length; i++) {
                //Mesh
                //static 
                if (nodes[i].type == "Mesh" && nodes[i].staticType == "Batching") {
                    mesh = (<Mesh>nodes[i].object3d);
                    len = mesh.geometry.subGeometrys.length;
                    for (var j: number = 0; j < len; j++) {
                        matID = nodes[i].materialIDs[mesh.geometry.subGeometrys[j].matID];
                        nodes[i]["geometryMatID"+ matID.toString()] = mesh.geometry.subGeometrys[j].matID;
                        arr_staticMesh[matID] = arr_staticMesh[matID] || [];
                        arr_staticMesh[matID].push(nodes[i]);

                    }
                }
            }
            return arr_staticMesh;
        }

        private static sortByZ(a: UnitNodeData, b: UnitNodeData) {
            return a.z - b.z;
        }

        //合并一个材质列表的物体
        private static batching(matID: any, nodes: UnitNodeData[][]): Mesh[] {
            var modelMatrix: Matrix4_4 = Matrix4_4.helpMatrix;
            var mesh: Mesh;
            var vertexLenth: number;
            var pos: Vector3D = Vector3D.HELP_0;
            var i: number, count: number, vertexOffset: number = 0, indexOffset: number = 0;
            var totalVertexLength: number = 0;
            var totalIndexLength: number = 0;
            var meshs: UnitNodeData[];
            var shareMat: MaterialBase;
            var subGeometry: SubGeometry;
            var geometryMatID: number;
            var final: Mesh[] = [];

            //当前材质 如果超过最大值就需要分pack
            for (var packIndex: number = 0; packIndex < nodes.length; packIndex++) {
                meshs = nodes[packIndex];
                totalVertexLength = 0;
                totalIndexLength = 0;
                //meshs = meshs.sort( (a,b) => this.sortByZ(a,b) );
                for (i = 0; i < meshs.length; i++) {
                    mesh = <Mesh>meshs[i].object3d;

                    vertexLenth = mesh.geometry.vertexAttLength;

                    for (var g: number = 0; g < mesh.geometry.subGeometrys.length;g++) {
                        subGeometry = mesh.geometry.subGeometrys[g];
                        geometryMatID = meshs[i]["geometryMatID" + matID.toString()];

                        if (subGeometry.matID == geometryMatID) {
                            totalVertexLength += subGeometry.count * vertexLenth ;
                            totalIndexLength += subGeometry.count;
                        }
                    }
                }

                var geometry: Geometry = new Geometry();
                geometry.vertexFormat = (<Mesh>meshs[0].object3d).geometry.vertexFormat;
                geometry.vertexCount = totalVertexLength;
                geometry.indexCount = totalIndexLength;
                geometry.buildDefaultSubGeometry();

                var vertexs: Float32Array = geometry.vertexArray;
                var indexs: Uint16Array = geometry.indexArray;
                vertexOffset = 0;
                indexOffset = 0;
                //模型 拼接
                for (count = 0; count < meshs.length; count++) {
                    mesh = <Mesh>meshs[count].object3d;

                    modelMatrix.makeTransform(mesh.globalPosition, mesh.globalScale, mesh.globalOrientation);
                    vertexLenth = mesh.geometry.vertexAttLength;

                    //var subVertexArray: Float32Array;
                    //var subIndexArray: Uint16Array;
                    var vertexBuffer: Float32Array;
                    var indexBuffer: Float32Array;
                    for (var g: number = 0; g < mesh.geometry.subGeometrys.length; g++) {
                        subGeometry = mesh.geometry.subGeometrys[g];
                        geometryMatID = meshs[count]["geometryMatID" + matID.toString()];
                        if (subGeometry.matID == geometryMatID) {
                            vertexBuffer = mesh.geometry.vertexArray;
                            indexBuffer = mesh.geometry.indexArray;

                            //geomety 顶点拼接
                            for (i = 0; i < subGeometry.count + 1; i++) {
                                pos.x = vertexBuffer[subGeometry.start * vertexLenth + vertexLenth * i];
                                pos.y = vertexBuffer[subGeometry.start * vertexLenth + vertexLenth * i + 1];
                                pos.z = vertexBuffer[subGeometry.start * vertexLenth + vertexLenth * i + 2];

                                modelMatrix.transformVector(pos, Vector3D.HELP_1);

                                vertexs[vertexOffset + i * vertexLenth + 0] = Vector3D.HELP_1.x;
                                vertexs[vertexOffset + i * vertexLenth + 1] = Vector3D.HELP_1.y;
                                vertexs[vertexOffset + i * vertexLenth + 2] = Vector3D.HELP_1.z;

                                for (var j: number = 3; j < vertexLenth; j++) {
                                    vertexs[vertexOffset + i * vertexLenth + j] = vertexBuffer[subGeometry.start * vertexLenth + vertexLenth * i + j];
                                }
                            }

                            //顶点拼接
                            for (i = 0; i < subGeometry.count; i++) {
                                indexs[indexOffset + i] = indexOffset + indexBuffer[subGeometry.start + i] - subGeometry.start ;
                            }

                            //偏移总数
                            vertexOffset += subGeometry.count * vertexLenth;
                            indexOffset += subGeometry.count;
                        }
                    }
                        
                }

                //取共享的材质球
                shareMat = mesh.getMaterial(geometryMatID);

                var subGeometry: SubGeometry = new SubGeometry();
                subGeometry.matID = geometryMatID;
                subGeometry.geometry = geometry;
                subGeometry.start = 0;
                subGeometry.count = indexOffset;
                final.push(new Mesh(geometry, shareMat));
            }

          
            return final;
        }
    }
}