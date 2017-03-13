module egret3d {

    /**
     * @private 
     * @language zh_CN
     * @class egret3d.ESMVersion
     * @classdesc
     * 
     */
    export class ESMVersion {
        static versionDictionary: any = {
            1: (bytes: ByteArray, geomtry: GeometryData, param: any) => ESMVersion.parserVersion_1(bytes, geomtry, param),
            2: (bytes: ByteArray, geomtry: GeometryData, param: any) => ESMVersion.parserVersion_2(bytes, geomtry, param),
            3: (bytes: ByteArray, geomtry: GeometryData, param: any) => ESMVersion.parserVersion_3(bytes, geomtry, param),
            4: (bytes: ByteArray, geomtry: GeometryData, param: any) => ESMVersion.parserVersion_4(bytes, geomtry, param),
            5: (bytes: ByteArray, geomtry: GeometryData, param: any) => ESMVersion.parserVersion_5(bytes, geomtry, param),
        };

        public static parserVersion_1(bytes: ByteArray, geomtry: GeometryData, param: any) {
            var description: number = bytes.readInt();

            geomtry.matCount = bytes.readInt();
            for (var i: number = 0; i < geomtry.matCount; ++i) {
                geomtry.material[i] = {};
                geomtry.material[i].matID = bytes.readInt();
                geomtry.material[i].start = bytes.readInt();
                geomtry.material[i].count = bytes.readInt();
                geomtry.material[i].textureDiffuse = bytes.readUTF();
                geomtry.material[i].textureNormal = bytes.readUTF();
                geomtry.material[i].textureSpecular = bytes.readUTF();
            }

            if (description & VertexFormat.VF_POSITION) {
                var vertexCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexCount; i++) {
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_NORMAL) {
                var vertexNormalCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexNormalCount; i++) {
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_COLOR) {
                var vertexColorCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexColorCount; i++) {
                    geomtry.source_vertexColorData.push(bytes.readFloat());
                    geomtry.source_vertexColorData.push(bytes.readFloat());
                    geomtry.source_vertexColorData.push(bytes.readFloat());
                    geomtry.source_vertexColorData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV0) {
                var uvCount: number = bytes.readInt();
                for (var i: number = 0; i < uvCount; i++) {
                    geomtry.source_uvData.push(bytes.readFloat());
                    geomtry.source_uvData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV1) {
                var uvCount: number = bytes.readInt();
                for (var i: number = 0; i < uvCount; i++) {
                    geomtry.source_uv2Data.push(bytes.readFloat());
                    geomtry.source_uv2Data.push(bytes.readFloat());
                }
            }

            geomtry.faces = bytes.readInt();
            for (var i: number = 0; i < geomtry.faces; i++) {

                geomtry.vertexIndices.push(bytes.readUnsignedInt());
                geomtry.vertexIndices.push(bytes.readUnsignedInt());
                geomtry.vertexIndices.push(bytes.readUnsignedInt());

                if (description & VertexFormat.VF_NORMAL) {
                    geomtry.normalIndices.push(bytes.readUnsignedInt());
                    geomtry.normalIndices.push(bytes.readUnsignedInt());
                    geomtry.normalIndices.push(bytes.readUnsignedInt());
                }

                if (description & VertexFormat.VF_COLOR) {
                    geomtry.colorIndices.push(bytes.readUnsignedInt());
                    geomtry.colorIndices.push(bytes.readUnsignedInt());
                    geomtry.colorIndices.push(bytes.readUnsignedInt());
                }

                if (description & VertexFormat.VF_UV0) {
                    geomtry.uvIndices.push(bytes.readUnsignedInt());
                    geomtry.uvIndices.push(bytes.readUnsignedInt());
                    geomtry.uvIndices.push(bytes.readUnsignedInt());
                }

                if (description & VertexFormat.VF_UV1) {
                    geomtry.uv2Indices.push(bytes.readUnsignedInt());
                    geomtry.uv2Indices.push(bytes.readUnsignedInt());
                    geomtry.uv2Indices.push(bytes.readUnsignedInt());
                }
            }

            var nBoneCount: number = bytes.readUnsignedByte();
            if (nBoneCount > 0) {
                geomtry.skeleton = new Skeleton();
            }

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3 = new Vector3();
            var scaling: Vector3 = new Vector3();
            var translation: Vector3 = new Vector3();

            for (var i: number = 0; i < nBoneCount; ++i) {

                var joint: Joint = new Joint();

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                rotation.x = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;
                rotation.y = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;
                rotation.z = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.buildInverseMatrix(scaling, rotation, translation);
                geomtry.skeleton.joints.push(joint);
            }

            var nVertsCount: number = bytes.readInt();

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();
                for (var j: number = 0; j < nCount; j++) {

                    geomtry.source_skinData.push(bytes.readUnsignedByte());
                    geomtry.source_skinData.push(bytes.readFloat());
                }

                for (var j: number = nCount; j < 4; j++) {

                    geomtry.source_skinData.push(0);
                    geomtry.source_skinData.push(0);
                }
            }
        }
        public static parserVersion_2(bytes: ByteArray, geomtry: GeometryData, param: any) {
            var description: number = bytes.readInt();

            geomtry.matCount = bytes.readInt();
            for (var i: number = 0; i < geomtry.matCount; ++i) {
                geomtry.material[i] = {};
                geomtry.material[i].matID = bytes.readInt();
                geomtry.material[i].start = bytes.readInt();
                geomtry.material[i].count = bytes.readInt();
                geomtry.material[i].textureDiffuse = bytes.readUTF();
                geomtry.material[i].textureNormal = bytes.readUTF();
                geomtry.material[i].textureSpecular = bytes.readUTF();
            }

            if (description & VertexFormat.VF_POSITION) {
                var vertexCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexCount; i++) {
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_NORMAL) {
                var vertexNormalCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexNormalCount; i++) {
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_COLOR) {
                var vertexColorCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexColorCount; i++) {
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                }
            }

            if (description & VertexFormat.VF_UV0) {
                var uvCount: number = bytes.readInt();
                for (var i: number = 0; i < uvCount; i++) {
                    geomtry.source_uvData.push(bytes.readFloat());
                    geomtry.source_uvData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV1) {
                var uvCount: number = bytes.readInt();
                for (var i: number = 0; i < uvCount; i++) {
                    geomtry.source_uv2Data.push(bytes.readFloat());
                    geomtry.source_uv2Data.push(bytes.readFloat());
                }
            }

            geomtry.faces = bytes.readInt();
            for (var i: number = 0; i < geomtry.faces; i++) {

                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());

                if (description & VertexFormat.VF_NORMAL) {
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_COLOR) {
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_UV0) {
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_UV1) {
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                }
            }

            var nBoneCount: number = bytes.readUnsignedByte();
            if (nBoneCount > 0) {
                geomtry.skeleton = new Skeleton();
            }

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3 = new Vector3();
            var scaling: Vector3 = new Vector3();
            var translation: Vector3 = new Vector3();

            for (var i: number = 0; i < nBoneCount; ++i) {

                var joint: Joint = new Joint();

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                rotation.x = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;
                rotation.y = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;
                rotation.z = bytes.readFloat() * MathUtil.RADIANS_TO_DEGREES;

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.buildInverseMatrix(scaling, rotation, translation);
                geomtry.skeleton.joints.push(joint);
            }

            var nVertsCount: number = bytes.readInt();

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();
                for (var j: number = 0; j < nCount; j++) {

                    geomtry.source_skinData.push(bytes.readUnsignedByte());
                    geomtry.source_skinData.push(bytes.readFloat());
                }

                for (var j: number = nCount; j < 4; j++) {

                    geomtry.source_skinData.push(0);
                    geomtry.source_skinData.push(0);
                }
            }
        }

        public static parserVersion_3(bytes: ByteArray, geomtry: GeometryData, param: any) {
            var description: number = bytes.readInt();

            geomtry.matCount = bytes.readInt();
            var vertexNormalCount: number = 0;
            var vertexColorCount: number = 0;
            var uvCount0: number = 0;
            var uvCount1: number = 0;
            for (var i: number = 0; i < geomtry.matCount; ++i) {
                geomtry.material[i] = {};
                geomtry.material[i].matID = bytes.readInt();
                geomtry.material[i].start = bytes.readInt();
                geomtry.material[i].count = bytes.readInt();
                geomtry.material[i].textureDiffuse = bytes.readUTF();
                geomtry.material[i].textureNormal = bytes.readUTF();
                geomtry.material[i].textureSpecular = bytes.readUTF();
            }

            if (description & VertexFormat.VF_POSITION) {
                var vertexCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexCount; i++) {
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_NORMAL) {
                vertexNormalCount = bytes.readInt();
                for (var i: number = 0; i < vertexNormalCount; i++) {
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_COLOR) {
                vertexColorCount = bytes.readInt();
                for (var i: number = 0; i < vertexColorCount; i++) {
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                }
            }

            if (description & VertexFormat.VF_UV0) {
                uvCount0 = bytes.readInt();
                for (var i: number = 0; i < uvCount0; i++) {
                    geomtry.source_uvData.push(bytes.readFloat());
                    geomtry.source_uvData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV1) {
                uvCount1 = bytes.readInt();
                for (var i: number = 0; i < uvCount1; i++) {
                    geomtry.source_uv2Data.push(bytes.readFloat());
                    geomtry.source_uv2Data.push(bytes.readFloat());
                }
            }

            geomtry.faces = bytes.readInt();
            for (var i: number = 0; i < geomtry.faces; i++) {

                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());

                if (description & VertexFormat.VF_NORMAL) {
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                    geomtry.normalIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_COLOR) {
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                    geomtry.colorIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_UV0) {
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                    geomtry.uvIndices.push(bytes.readUnsignedShort());
                }

                if (description & VertexFormat.VF_UV1) {
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                    geomtry.uv2Indices.push(bytes.readUnsignedShort());
                }
            }

            var nBoneCount: number = bytes.readUnsignedByte();
            if (nBoneCount > 0) {
                geomtry.skeleton = new Skeleton();
            }

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3 = new Vector3();
            var scaling: Vector3 = new Vector3();
            var translation: Vector3 = new Vector3();

            for (var i: number = 0; i < nBoneCount; ++i) {

                var joint: Joint = new Joint();

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                orientation.x = bytes.readFloat();
                orientation.y = bytes.readFloat();
                orientation.z = bytes.readFloat();
                orientation.w = bytes.readFloat();

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.buildInverseMatrix(scaling, orientation, translation);
                geomtry.skeleton.joints.push(joint);
            }

            var nVertsCount: number = bytes.readInt();

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();
                for (var j: number = 0; j < nCount; j++) {

                    geomtry.source_skinData.push(bytes.readUnsignedByte());
                    geomtry.source_skinData.push(bytes.readFloat());
                }

                for (var j: number = nCount; j < 4; j++) {

                    geomtry.source_skinData.push(0);
                    geomtry.source_skinData.push(0);
                }
            }
        }

        public static parserVersion_4(bytes: ByteArray, geomtry: GeometryData, param: any) {
            var description: number = bytes.readInt();

            geomtry.matCount = bytes.readInt();
            var vertexNormalCount: number = 0;
            var vertexColorCount: number = 0;
            var uvCount0: number = 0;
            var uvCount1: number = 0;
            for (var i: number = 0; i < geomtry.matCount; ++i) {
                geomtry.material[i] = {};
                geomtry.material[i].matID = bytes.readInt();
                geomtry.material[i].start = bytes.readInt();
                geomtry.material[i].count = bytes.readInt();
                geomtry.material[i].textureDiffuse = bytes.readUTF();
                geomtry.material[i].textureNormal = bytes.readUTF();
                geomtry.material[i].textureSpecular = bytes.readUTF();
            }

            if (description & VertexFormat.VF_POSITION) {
                var vertexCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexCount; i++) {
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_NORMAL) {
                vertexNormalCount = bytes.readInt();
                for (var i: number = 0; i < vertexNormalCount; i++) {
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                    geomtry.source_normalData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_COLOR) {
                vertexColorCount = bytes.readInt();
                for (var i: number = 0; i < vertexColorCount; i++) {
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                }
            }

            if (description & VertexFormat.VF_UV0) {
                uvCount0 = bytes.readInt();
                for (var i: number = 0; i < uvCount0; i++) {
                    geomtry.source_uvData.push(bytes.readFloat());
                    geomtry.source_uvData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV1) {
                uvCount1 = bytes.readInt();
                for (var i: number = 0; i < uvCount1; i++) {
                    geomtry.source_uv2Data.push(bytes.readFloat());
                    geomtry.source_uv2Data.push(bytes.readFloat());
                }
            }

            geomtry.faces = bytes.readInt();
            for (var i: number = 0; i < geomtry.faces; i++) {

                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());
                geomtry.vertexIndices.push(bytes.readUnsignedShort());

                if (vertexNormalCount > 0) {
                    if (description & VertexFormat.VF_NORMAL) {
                        geomtry.normalIndices.push(bytes.readUnsignedShort());
                        geomtry.normalIndices.push(bytes.readUnsignedShort());
                        geomtry.normalIndices.push(bytes.readUnsignedShort());
                    }
                }

                if (vertexColorCount > 0) {
                    if (description & VertexFormat.VF_COLOR) {
                        geomtry.colorIndices.push(bytes.readUnsignedShort());
                        geomtry.colorIndices.push(bytes.readUnsignedShort());
                        geomtry.colorIndices.push(bytes.readUnsignedShort());
                    }
                }

                if (uvCount0 > 0) {
                    if (description & VertexFormat.VF_UV0) {
                        geomtry.uvIndices.push(bytes.readUnsignedShort());
                        geomtry.uvIndices.push(bytes.readUnsignedShort());
                        geomtry.uvIndices.push(bytes.readUnsignedShort());
                    }
                }

                if (uvCount1 > 0) {
                    if (description & VertexFormat.VF_UV1) {
                        geomtry.uv2Indices.push(bytes.readUnsignedShort());
                        geomtry.uv2Indices.push(bytes.readUnsignedShort());
                        geomtry.uv2Indices.push(bytes.readUnsignedShort());
                    }
                }
            }

            var nBoneCount: number = bytes.readUnsignedByte();
            if (nBoneCount > 0) {
                geomtry.skeleton = new Skeleton();
            }

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3 = new Vector3();
            var scaling: Vector3 = new Vector3();
            var translation: Vector3 = new Vector3();

            for (var i: number = 0; i < nBoneCount; ++i) {

                var joint: Joint = new Joint();

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                orientation.x = bytes.readFloat();
                orientation.y = bytes.readFloat();
                orientation.z = bytes.readFloat();
                orientation.w = bytes.readFloat();

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.buildInverseMatrix(scaling, orientation, translation);
                geomtry.skeleton.joints.push(joint);
            }

            var nVertsCount: number = bytes.readInt();

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();
                for (var j: number = 0; j < nCount; j++) {

                    geomtry.source_skinData.push(bytes.readUnsignedByte());
                    geomtry.source_skinData.push(bytes.readFloat());
                }

                for (var j: number = nCount; j < 4; j++) {

                    geomtry.source_skinData.push(0);
                    geomtry.source_skinData.push(0);
                }
            }
        }

        public static parserVersion_5(bytes: ByteArray, geomtry: GeometryData, param: any) {
            var description: number = bytes.readInt();

            geomtry.matCount = bytes.readInt();
            var vertexNormalCount: number = 0;
            var vertexColorCount: number = 0;
            var uvCount0: number = 0;
            var uvCount1: number = 0;
            for (var i: number = 0; i < geomtry.matCount; ++i) {
                geomtry.material[i] = {};
                geomtry.material[i].matID = bytes.readInt();
                geomtry.material[i].start = bytes.readInt();
                geomtry.material[i].count = bytes.readInt();
                geomtry.material[i].textureDiffuse = bytes.readUTF();
                geomtry.material[i].textureNormal = bytes.readUTF();
                geomtry.material[i].textureSpecular = bytes.readUTF();
            }

            if (description & VertexFormat.VF_POSITION) {
                var vertexCount: number = bytes.readInt();
                for (var i: number = 0; i < vertexCount; i++) {
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                    geomtry.source_vertexData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_NORMAL) {
                vertexNormalCount = bytes.readInt();
                for (var i: number = 0; i < vertexNormalCount; i++) {


                    geomtry.source_normalData.push(bytes.readByte() / 125);
                    geomtry.source_normalData.push(bytes.readByte() / 125);
                    geomtry.source_normalData.push(bytes.readByte() / 125);
                }
            }

            if (description & VertexFormat.VF_COLOR) {
                vertexColorCount = bytes.readInt();
                for (var i: number = 0; i < vertexColorCount; i++) {
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                    geomtry.source_vertexColorData.push(bytes.readUnsignedByte() / 255);
                }
            }

            if (description & VertexFormat.VF_UV0) {
                uvCount0 = bytes.readInt();
                for (var i: number = 0; i < uvCount0; i++) {
                    geomtry.source_uvData.push(bytes.readFloat());
                    geomtry.source_uvData.push(bytes.readFloat());
                }
            }

            if (description & VertexFormat.VF_UV1) {
                uvCount1 = bytes.readInt();
                for (var i: number = 0; i < uvCount1; i++) {
                    geomtry.source_uv2Data.push(bytes.readFloat());
                    geomtry.source_uv2Data.push(bytes.readFloat());
                }
            }

            geomtry.faces = bytes.readInt();
            for (var i: number = 0; i < geomtry.faces; i++) {

                var index_0 = bytes.readUnsignedShort();
                var index_1 = bytes.readUnsignedShort();
                var index_2 = bytes.readUnsignedShort();



                geomtry.vertexIndices.push(index_0);
                geomtry.vertexIndices.push(index_1);
                geomtry.vertexIndices.push(index_2);

                if (vertexNormalCount > 0) {
                    if (description & VertexFormat.VF_NORMAL) {
                        geomtry.normalIndices.push(index_0);
                        geomtry.normalIndices.push(index_1);
                        geomtry.normalIndices.push(index_2);
                    }
                }

                if (vertexColorCount > 0) {
                    if (description & VertexFormat.VF_COLOR) {
                        geomtry.colorIndices.push(index_0);
                        geomtry.colorIndices.push(index_1);
                        geomtry.colorIndices.push(index_2);
                    }
                }

                if (uvCount0 > 0) {
                    if (description & VertexFormat.VF_UV0) {
                        geomtry.uvIndices.push(index_0);
                        geomtry.uvIndices.push(index_1);
                        geomtry.uvIndices.push(index_2);
                    }
                }

                if (uvCount1 > 0) {
                    if (description & VertexFormat.VF_UV1) {
                        geomtry.uv2Indices.push(index_0);
                        geomtry.uv2Indices.push(index_1);
                        geomtry.uv2Indices.push(index_2);
                    }
                }
            }

            var nBoneCount: number = bytes.readUnsignedByte();
            if (nBoneCount > 0) {
                geomtry.skeleton = new Skeleton();
            }

            var orientation: Quaternion = new Quaternion();
            var rotation: Vector3 = new Vector3();
            var scaling: Vector3 = new Vector3();
            var translation: Vector3 = new Vector3();

            for (var i: number = 0; i < nBoneCount; ++i) {

                var joint: Joint = new Joint();

                bytes.readInt();

                joint.parentIndex = bytes.readInt();

                joint.name = bytes.readUTF();

                orientation.x = bytes.readFloat();
                orientation.y = bytes.readFloat();
                orientation.z = bytes.readFloat();
                orientation.w = bytes.readFloat();

                scaling.x = bytes.readFloat();
                scaling.y = bytes.readFloat();
                scaling.z = bytes.readFloat();

                translation.x = bytes.readFloat();
                translation.y = bytes.readFloat();
                translation.z = bytes.readFloat();

                joint.buildInverseMatrix(scaling, orientation, translation);
                geomtry.skeleton.joints.push(joint);
            }

            var nVertsCount: number = bytes.readInt();

            for (var i: number = 0; i < nVertsCount; i++) {

                var nCount: number = bytes.readUnsignedByte();
                for (var j: number = 0; j < nCount; j++) {

                    geomtry.source_skinData.push(bytes.readUnsignedByte());
                    geomtry.source_skinData.push(bytes.readFloat());
                }

                for (var j: number = nCount; j < 4; j++) {

                    geomtry.source_skinData.push(0);
                    geomtry.source_skinData.push(0);
                }
            }
        }
    }
} 