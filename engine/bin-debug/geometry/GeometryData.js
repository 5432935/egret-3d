var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var egret3d;
(function (egret3d) {
    /**
     * @private
     * @language zh_CN
     * @class egret3d.GeometryData
     * @classdesc
     * GeometryData类 表示几何形状数据
     *
     * @version Egret 3.0
     * @platform Web,Native
     * @includeExample geometry/GeometryData.ts
     */
    var GeometryData = (function () {
        function GeometryData() {
            /**
            * @language zh_CN
            * 顶点属性长度
            */
            this.vertexAttLength = 17;
            /**
            * @language zh_CN
            * 顶点长度
            */
            this.vertLen = 0;
            /**
            * @language zh_CN
            * 面数
            */
            this.faces = 0;
            /**
            * @language zh_CN
            * 索引数据
            */
            this.source_indexData = new Array();
            /**
            * @language zh_CN
            * 顶点数据
            */
            this.source_vertexData = new Array();
            /**
            * @language zh_CN
            * 顶点色数据
            */
            this.source_vertexColorData = new Array();
            /**
            * @language zh_CN
            * 顶点法线
            */
            this.source_normalData = new Array();
            /**
            * @language zh_CN
            * 顶点切线数据
            */
            this.source_tangtData = new Array();
            /**
            * @language zh_CN
            * 顶点uv数据
            */
            this.source_uvData = new Array();
            /**
            * @language zh_CN
            * 顶点uv2数据
            */
            this.source_uv2Data = new Array();
            /**
            * @language zh_CN
            * 蒙皮数据
            */
            this.source_skinData = new Array();
            /**
            * @language zh_CN
            * 顶点索引
            */
            this.vertexIndex = 0;
            /**
            * @language zh_CN
            * 索引数据数组
            */
            this.indices = new Array();
            /**
            * @language zh_CN
            * 顶点数据数组(x、y、z)三个number为一个顶点数据
            */
            this.vertices = new Array();
            /**
            * @language zh_CN
            * 法线数据数组(x、y、z)三个number为一个法线数据
            */
            this.normals = new Array();
            /**
            * @language zh_CN
            * 切线数据数组(x、y、z)三个number为一个切线数据
            */
            this.tangts = new Array();
            /**
            * @language zh_CN
            * 顶点颜色数据数组
            */
            this.verticesColor = new Array();
            /**
            * @language zh_CN
            * 第一套UV数据数组
            */
            this.uvs = new Array();
            /**
            * @language zh_CN
            * 第二套UV数据数组
            */
            this.uv2s = new Array();
            /**
            * @language zh_CN
            * 蒙皮数据数组
            */
            this.skinMesh = new Array();
            /**
            * @language zh_CN
            * 面法线数据数组
            */
            this.faceNormals = new Array();
            /**
            * @language zh_CN
            * 面权重数据数组
            */
            this.faceWeights = new Array();
            /**
              * @language zh_CN
              * 顶点索引数据
              */
            this.vertexIndices = new Array();
            /**
            * @language zh_CN
            * uv索引数据
            */
            this.uvIndices = new Array();
            /**
            * @language zh_CN
            * uv2索引数据
            */
            this.uv2Indices = new Array();
            /**
            * @language zh_CN
            * 法线索引数据
            */
            this.normalIndices = new Array();
            /**
            * @language zh_CN
            * 顶点色索引数据
            */
            this.colorIndices = new Array();
            /**
            * @language zh_CN
            * 索引数据数组
            */
            this.indexIds = new Array(); // used for real index lookups
            this.matCount = 0;
            this.material = {};
            /*
            private static updateFaceTangents(geometry: Geometry) {
                var i: number = 0;
                var index1: number, index2: number, index3: number;
                var len: number = geometry.indexData.length;
                var ui: number, vi: number;
                var v0: number;
                var dv1: number, dv2: number;
                var denom: number;
                var x0: number, y0: number, z0: number;
                var dx1: number, dy1: number, dz1: number;
                var dx2: number, dy2: number, dz2: number;
                var cx: number, cy: number, cz: number;
                var vertices: Array<number> = geometry.verticesData;
             //   var uvs: Array<number> = geometry.source_uvData;
    
                var posStride: number = geometry.vertexAttLength ;
                var posOffset: number = 0;
                var texStride: number = geometry.vertexAttLength;
                var texOffset: number = 0;
    
                if (geometry.vertexFormat & VertexFormat.VF_TANGENT)
                    texOffset += Geometry.positionSize + Geometry.normalSize + Geometry.tangentSize;
                if (geometry.vertexFormat & VertexFormat.VF_COLOR)
                    texOffset += Geometry.colorSize ;
    
                while (i < len) {
                    index1 = geometry.indexData[i];
                    index2 = geometry.indexData[i + 1];
                    index3 = geometry.indexData[i + 2];
    
                    ui = texOffset + index1 * texStride ;
                    v0 = vertices[ui];
                                                        
                    ui = texOffset + index2 * texStride ;
                    dv1 = vertices[ui] - v0;
                                                        
                    ui = texOffset + index3 * texStride ;
                    dv2 = vertices[ui] - v0;
    
                    vi = posOffset + index1 * posStride;
                    x0 = vertices[vi];
                    y0 = vertices[(vi + 1)];
                    z0 = vertices[(vi + 2)];
    
                    vi = posOffset + index2 * posStride;
                    dx1 = vertices[(vi)] - x0;
                    dy1 = vertices[(vi + 1)] - y0;
                    dz1 = vertices[(vi + 2)] - z0;
    
                    vi = posOffset + index3 * posStride;
                    dx2 = vertices[(vi)] - x0;
                    dy2 = vertices[(vi + 1)] - y0;
                    dz2 = vertices[(vi + 2)] - z0;
    
                    cx = dv2 * dx1 - dv1 * dx2;
                    cy = dv2 * dy1 - dv1 * dy2;
                    cz = dv2 * dz1 - dv1 * dz2;
                    denom = 1 / Math.sqrt(cx * cx + cy * cy + cz * cz);
    
                    geometry.source_tangentData[i++] = denom * cx;
                    geometry.source_tangentData[i++] = denom * cy;
                    geometry.source_tangentData[i++] = denom * cz;
                }
    
                var k: number;
                var lenI: number = geometry.indexData.length;
                var index: number;
                var weight: number;
                var f1: number = 0, f2: number = 1, f3: number = 2;
                var tangentOffset: number = Geometry.positionSize + Geometry.normalSize;
                var tangentStride: number = geometry.vertexAttLength;
    
    
                i = 0;
    
                while (i < lenI) {
                    weight = 1;
                    index = tangentOffset + geometry.indexData[i++] * tangentStride;
                    geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                    geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                    geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                    index = tangentOffset + geometry.indexData[i++] * tangentStride;
                    geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                    geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                    geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                    index = tangentOffset + geometry.indexData[i++] * tangentStride;
                    geometry.verticesData[index++] += geometry.source_tangentData[f1] * weight;
                    geometry.verticesData[index++] += geometry.source_tangentData[f2] * weight;
                    geometry.verticesData[index] += geometry.source_tangentData[f3] * weight;
                    f1 += 3;
                    f2 += 3;
                    f3 += 3;
                }
    
                var lenV: number = geometry.verticesData.length ;
                i = tangentOffset;
                while (i < lenV) {
                    var vx: number = geometry.verticesData[i];
                    var vy: number = geometry.verticesData[i + 1];
                    var vz: number = geometry.verticesData[i + 2];
                    var d: number = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
                    geometry.verticesData[i] = vx * d;
                    geometry.verticesData[i + 1] = vy * d;
                    geometry.verticesData[i + 2] = vz * d;
                    i += geometry.vertexAttLength;
                }
            }
            */
        }
        /**
        * @language zh_CN
        *
        * 构建顶点数据数组
        * @param source 未组合顶点数据的GeometryData对象
        * @param vertexFormat 生成顶点格式
        * @returns 经过组合并生成顶点数据数组的新GeometryData对象
        */
        GeometryData.buildGeomtry = function (source, vertexFormat) {
            var target = new egret3d.Geometry();
            target.vertexFormat = vertexFormat;
            target.vertexCount = source.faces * 3;
            target.indexCount = source.faces * 3;
            target.faceCount = source.faces;
            target.skeleton = source.skeleton;
            var vertex = new egret3d.Vector3();
            var normal = new egret3d.Vector3(1.0, 1.0, 1.0);
            var color = new egret3d.Vector3(1.0, 1.0, 1.0, 1.0);
            var uv_0 = { u: 1, v: 0 };
            var uv_1 = { u: 1, v: 0 };
            var index = 0;
            var vertexIndex = 0;
            var offset = 0;
            for (var faceIndex = 0; faceIndex < source.faces; faceIndex++) {
                target.indexArray[faceIndex * 3 + 0] = faceIndex * 3 + 0;
                target.indexArray[faceIndex * 3 + 1] = faceIndex * 3 + 2;
                target.indexArray[faceIndex * 3 + 2] = faceIndex * 3 + 1;
                for (var i = 0; i < 3; i++) {
                    vertexIndex = faceIndex * 3 + i;
                    vertexIndex *= target.vertexAttLength;
                    offset = 0;
                    index = source.vertexIndices[faceIndex * 3 + i] * egret3d.Geometry.positionSize;
                    if (vertexFormat & egret3d.VertexFormat.VF_POSITION) {
                        vertex.x = source.source_vertexData[index + 0];
                        vertex.y = source.source_vertexData[index + 1];
                        vertex.z = source.source_vertexData[index + 2];
                        target.vertexArray[vertexIndex + offset + 0] = vertex.x;
                        target.vertexArray[vertexIndex + offset + 1] = vertex.y;
                        target.vertexArray[vertexIndex + offset + 2] = vertex.z;
                        offset += egret3d.Geometry.positionSize;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_NORMAL) {
                        if (source.normalIndices && source.source_normalData && source.source_normalData.length > 0) {
                            index = source.normalIndices[faceIndex * 3 + i] * egret3d.Geometry.normalSize;
                            normal.x = source.source_normalData[index + 0];
                            normal.y = source.source_normalData[index + 1];
                            normal.z = source.source_normalData[index + 2];
                        }
                        target.vertexArray[vertexIndex + offset + 0] = normal.x;
                        target.vertexArray[vertexIndex + offset + 1] = normal.y;
                        target.vertexArray[vertexIndex + offset + 2] = normal.z;
                        offset += egret3d.Geometry.normalSize;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_TANGENT) {
                        target.vertexArray[vertexIndex + offset + 0] = 0;
                        target.vertexArray[vertexIndex + offset + 1] = 0;
                        target.vertexArray[vertexIndex + offset + 2] = 0;
                        offset += egret3d.Geometry.tangentSize;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_COLOR) {
                        if (source.colorIndices && source.source_vertexColorData && source.source_vertexColorData.length > 0) {
                            index = source.colorIndices[faceIndex * 3 + i] * egret3d.Geometry.colorSize;
                            color.x = source.source_vertexColorData[index + 0];
                            color.y = source.source_vertexColorData[index + 1];
                            color.z = source.source_vertexColorData[index + 2];
                            color.w = source.source_vertexColorData[index + 3];
                        }
                        target.vertexArray[vertexIndex + offset + 0] = color.x;
                        target.vertexArray[vertexIndex + offset + 1] = color.y;
                        target.vertexArray[vertexIndex + offset + 2] = color.z;
                        target.vertexArray[vertexIndex + offset + 3] = color.w;
                        offset += egret3d.Geometry.colorSize;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_UV0) {
                        if (source.uvIndices && source.source_uvData && source.source_uvData.length > 0) {
                            index = source.uvIndices[faceIndex * 3 + i] * egret3d.Geometry.uvSize;
                            uv_0.u = source.source_uvData[index + 0];
                            uv_0.v = source.source_uvData[index + 1];
                        }
                        target.vertexArray[vertexIndex + offset + 0] = uv_0.u;
                        target.vertexArray[vertexIndex + offset + 1] = uv_0.v;
                        offset += egret3d.Geometry.uvSize;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_UV1) {
                        if (source.uv2Indices && source.source_uv2Data && source.source_uv2Data.length > 0) {
                            index = source.uv2Indices[faceIndex * 3 + i] * egret3d.Geometry.uv2Size;
                            uv_1.u = source.source_uv2Data[index + 0];
                            uv_1.v = source.source_uv2Data[index + 1];
                        }
                        target.vertexArray[vertexIndex + offset + 0] = uv_1.u;
                        target.vertexArray[vertexIndex + offset + 1] = uv_1.v;
                        offset += egret3d.Geometry.uv2Size;
                    }
                    if (vertexFormat & egret3d.VertexFormat.VF_SKIN) {
                        if (source.source_skinData != null && source.source_skinData.length > 0) {
                            index = source.vertexIndices[faceIndex * 3 + i] * egret3d.Geometry.skinSize;
                            target.vertexArray[vertexIndex + offset + 0] = source.source_skinData[index + 0];
                            target.vertexArray[vertexIndex + offset + 1] = source.source_skinData[index + 2];
                            target.vertexArray[vertexIndex + offset + 2] = source.source_skinData[index + 4];
                            target.vertexArray[vertexIndex + offset + 3] = source.source_skinData[index + 6];
                            target.vertexArray[vertexIndex + offset + 4] = source.source_skinData[index + 1];
                            target.vertexArray[vertexIndex + offset + 5] = source.source_skinData[index + 3];
                            target.vertexArray[vertexIndex + offset + 6] = source.source_skinData[index + 5];
                            target.vertexArray[vertexIndex + offset + 7] = source.source_skinData[index + 7];
                        }
                        else {
                            target.vertexArray[vertexIndex + offset + 0] = 0;
                            target.vertexArray[vertexIndex + offset + 1] = 0;
                            target.vertexArray[vertexIndex + offset + 2] = 0;
                            target.vertexArray[vertexIndex + offset + 3] = 0;
                            target.vertexArray[vertexIndex + offset + 4] = 0;
                            target.vertexArray[vertexIndex + offset + 5] = 0;
                            target.vertexArray[vertexIndex + offset + 6] = 0;
                            target.vertexArray[vertexIndex + offset + 7] = 0;
                        }
                    }
                }
            }
            // GeometryData.updateFaceTangents(target);
            for (var i = 0; i < source.matCount; ++i) {
                var subGeometry = new egret3d.SubGeometry();
                subGeometry.matID = i;
                subGeometry.geometry = target;
                //subGeometry.start = source.material[i].start * 3 * Uint16Array.BYTES_PER_ELEMENT;
                subGeometry.start = source.material[i].start * 3;
                subGeometry.count = source.material[i].count * 3;
                subGeometry.textureDiffuse = source.material[i].textureDiffuse;
                subGeometry.textureNormal = source.material[i].textureNormal;
                subGeometry.textureSpecular = source.material[i].textureSpecular;
                target.subGeometrys.push(subGeometry);
            }
            return target;
        };
        //private static translateMaterialGroup(geomtryData: GeometryData): GeometryData {
        //    var faces: Array<FaceData> = geomtryData.source_faceData;
        //    var face: FaceData;
        //    var numFaces: number = faces.length;
        //    var numVerts: number;
        //    var targetGeomtryData: GeometryData = new GeometryData();
        //    targetGeomtryData.vertexAttLength = geomtryData.vertexAttLength;
        //    var j: number;
        //    for (var i: number = 0; i < numFaces; ++i) {
        //        face = faces[i];
        //        numVerts = face.indexIds.length - 1;
        //        for (j = 1; j < numVerts; ++j) {
        //            this.translateVertexData(face, j, geomtryData, targetGeomtryData);
        //            this.translateVertexData(face, 0, geomtryData, targetGeomtryData);
        //            this.translateVertexData(face, j + 1, geomtryData, targetGeomtryData);
        //        }
        //    }
        //    if (targetGeomtryData.vertices.length > 0) {
        //        targetGeomtryData.vertLen = (targetGeomtryData.vertices.length / 3) * geomtryData.vertexAttLength;
        //       targetGeomtryData.vertexDatas = new Array<number>(targetGeomtryData.vertLen)
        //        //this.updateFaceTangents(targetGeomtryData);
        //        //this.updateFaceNormals(targetGeomtryData);
        //        this.combinGeomtryData(targetGeomtryData);
        //    }
        //    return targetGeomtryData;
        //}
        //private static translateVertexData(face: FaceData, vertexIndex: number, sourceGeomtryData: GeometryData, targetGeomtryData: GeometryData) {
        //    var index: number;
        //    var vertex: Vector3;
        //    var color: Vector3;
        //    var vertexNormal: Vector3;
        //    var uv: UV;
        //    if (!targetGeomtryData.indices[face.indexIds[vertexIndex]]) {
        //        index = targetGeomtryData.vertexIndex;
        //        targetGeomtryData.indices[face.indexIds[vertexIndex]] = ++targetGeomtryData.vertexIndex;
        //        vertex = sourceGeomtryData.source_vertexData[face.vertexIndices[vertexIndex] - 1];
        //        targetGeomtryData.vertices.push(vertex.x, vertex.y, vertex.z);
        //        if (sourceGeomtryData.source_vertexColorData != null && sourceGeomtryData.source_vertexColorData.length > 0) {
        //            color = sourceGeomtryData.source_vertexColorData[face.vertexIndices[vertexIndex] - 1]
        //            targetGeomtryData.verticesColor.push(color.r, color.g, color.b, color.a);
        //        }
        //        if (sourceGeomtryData.source_skinData != null && sourceGeomtryData.source_skinData.length > 0) {
        //            targetGeomtryData.skinMesh.push(
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 0],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 2],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 4],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 6],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 1],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 3],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 5],
        //                sourceGeomtryData.source_skinData[(face.vertexIndices[vertexIndex] - 1) * 8 + 7]
        //                );
        //        }
        //        if (face.normalIndices.length > 0) {
        //            vertexNormal = sourceGeomtryData.source_normalData[face.normalIndices[vertexIndex] - 1];
        //            targetGeomtryData.normals.push(vertexNormal.x, vertexNormal.y, vertexNormal.z);
        //        }
        //        if (face.uvIndices.length > 0) {
        //            try {
        //                uv = sourceGeomtryData.source_uvData[face.uvIndices[vertexIndex] - 1];
        //                targetGeomtryData.uvs.push(uv.u, uv.v);
        //                if (sourceGeomtryData.source_uv2Data.length > 0) {
        //                    uv = sourceGeomtryData.source_uv2Data[face.uv2Indices[vertexIndex] - 1];
        //                    targetGeomtryData.uv2s.push(uv.u, uv.v);
        //                }
        //            } catch (e) {
        //                switch (vertexIndex) {
        //                    case 0:
        //                        targetGeomtryData.uvs.push(0, 1);
        //                        break;
        //                    case 1:
        //                        targetGeomtryData.uvs.push(.5, 0);
        //                        break;
        //                    case 2:
        //                        targetGeomtryData.uvs.push(1, 1);
        //                }
        //            }
        //        }
        //    } else
        //        index = targetGeomtryData.indices[face.indexIds[vertexIndex]] - 1;
        //    targetGeomtryData.indices.push(index);
        //}
        /**
        * 4 pos
        * 3 normal
        * 4 color
        * 2 uv
        * 2 uv2s
        * length 15
        */
        GeometryData.combinGeomtryData = function (geomtrtData, needTangent) {
            if (needTangent === void 0) { needTangent = true; }
            var index = 0;
            var v = 0;
            var n = 0;
            var t = 0;
            var u1 = 0;
            var u2 = 0;
            var c = 0;
            var skin = 0;
            var data = geomtrtData.vertexDatas;
            while (index < geomtrtData.vertLen) {
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];
                data[index++] = geomtrtData.vertices[v++];
                if (geomtrtData.normals && geomtrtData.normals.length) {
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                    data[index++] = geomtrtData.normals[n++];
                }
                else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }
                if (geomtrtData.tangts) {
                    index++;
                    index++;
                    index++;
                }
                else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }
                if (geomtrtData.source_vertexColorData && geomtrtData.source_vertexColorData.length) {
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                    data[index++] = geomtrtData.verticesColor[c++];
                }
                else {
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                    data[index++] = 1;
                }
                if (geomtrtData.uvs && geomtrtData.uvs.length) {
                    data[index++] = geomtrtData.uvs[u1++];
                    data[index++] = geomtrtData.uvs[u1++];
                    if (geomtrtData.uv2s && geomtrtData.uv2s.length) {
                        data[index++] = geomtrtData.uv2s[u2++];
                        data[index++] = geomtrtData.uv2s[u2++];
                    }
                    else {
                        data[index++] = geomtrtData.uvs[u2++];
                        data[index++] = geomtrtData.uvs[u2++];
                    }
                }
                else {
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                    data[index++] = 0;
                }
                if (geomtrtData.skinMesh && geomtrtData.skinMesh.length) {
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                    data[index++] = geomtrtData.skinMesh[skin++];
                }
            }
            //if (needTangent)
            //    this.updateFaceTangents(geomtrtData
        };
        /**
         * @private
         * Updates the normals for each face.
         */
        GeometryData.updateFaceNormals = function (geomtrtData) {
            var i = 0, j = 0, k = 0;
            var index;
            var len = geomtrtData.indices.length;
            var x1, x2, x3;
            var y1, y2, y3;
            var z1, z2, z3;
            var dx1, dy1, dz1;
            var dx2, dy2, dz2;
            var cx, cy, cz;
            var d;
            var vertices = geomtrtData.vertexDatas;
            var posStride = 17;
            var posOffset = 3;
            //if (_useFaceWeights)
            //    _faceWeights ||= new Vector.<number>(len / 3, true);
            while (i < len) {
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x1 = vertices[index];
                y1 = vertices[index + 1];
                z1 = vertices[index + 2];
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x2 = vertices[index];
                y2 = vertices[index + 1];
                z2 = vertices[index + 2];
                index = posOffset + geomtrtData.indices[i++] * posStride;
                x3 = vertices[index];
                y3 = vertices[index + 1];
                z3 = vertices[index + 2];
                dx1 = x3 - x1;
                dy1 = y3 - y1;
                dz1 = z3 - z1;
                dx2 = x2 - x1;
                dy2 = y2 - y1;
                dz2 = z2 - z1;
                cx = dz1 * dy2 - dy1 * dz2;
                cy = dx1 * dz2 - dz1 * dx2;
                cz = dy1 * dx2 - dx1 * dy2;
                d = Math.sqrt(cx * cx + cy * cy + cz * cz);
                // length of cross product = 2*triangle area
                if (true) {
                    var w = d * 10000;
                    if (w < 1)
                        w = 1;
                    geomtrtData.faceWeights[k++] = w;
                }
                d = 1 / d;
                geomtrtData.faceNormals[j++] = cx * d;
                geomtrtData.faceNormals[j++] = cy * d;
                geomtrtData.faceNormals[j++] = cz * d;
            }
            //_faceNormalsDirty = false;
        };
        /**
         * Updates the vertex normals based on the geometry.
         */
        GeometryData.updateVertexNormals = function (geomtrtData) {
            this.updateFaceNormals(geomtrtData);
            var v1;
            var f1 = 0, f2 = 1, f3 = 2;
            var lenV = geomtrtData.vertexDatas.length;
            var normalStride = 17;
            var normalOffset = 3;
            //target ||= new Vector.<Number>(lenV, true);
            //v1 = normalOffset;
            //while(v1 < lenV) {
            //    target[v1] = 0.0;
            //    target[v1 + 1] = 0.0;
            //    target[v1 + 2] = 0.0;
            //    v1 += normalStride;
            //}
            var i = 0, k = 0;
            var lenI = geomtrtData.indices.length;
            var index;
            var weight;
            while (i < lenI) {
                weight = geomtrtData.faceWeights[k++];
                index = normalOffset + geomtrtData.indices[i++] * normalStride;
                geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                index = normalOffset + geomtrtData.indices[i++] * normalStride;
                geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                index = normalOffset + geomtrtData.indices[i++] * normalStride;
                geomtrtData.vertexDatas[index] += geomtrtData.faceNormals[f1] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f2] * weight;
                geomtrtData.vertexDatas[index++] += geomtrtData.faceNormals[f3] * weight;
                f1 += 3;
                f2 += 3;
                f3 += 3;
            }
            //v1 = normalOffset;
            //    while(v1 < lenV) {
            //        var vx: Number = target[v1];
            //        var vy: Number = target[v1 + 1];
            //        var vz: Number = target[v1 + 2];
            //        var d: Number = 1.0 / Math.sqrt(vx * vx + vy * vy + vz * vz);
            //        target[v1] = vx * d;
            //        target[v1 + 1] = vy * d;
            //        target[v1 + 2] = vz * d;
            //        v1 += normalStride;
            //    }
            //_vertexNormalsDirty = false;
        };
        return GeometryData;
    }());
    egret3d.GeometryData = GeometryData;
    __reflect(GeometryData.prototype, "egret3d.GeometryData");
})(egret3d || (egret3d = {}));
//# sourceMappingURL=GeometryData.js.map