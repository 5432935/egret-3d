var fs = require("fs");

function parseShader(file, path) {
    var buffer = fs.readFileSync(path + file);
    var string = buffer.toString().replace(/[ \t]*\/\/.*\n/g, '')
          .replace(/[ \t]*\/\*[\s\S]*?\*\//g, '')
          .replace(/\n{2,}/g, '\n');

    return string;
}

function compileShader(inputPath, outputPath, outputName) {
    fs.readdir(inputPath, function(err, files) {
        if(err) {
            return console.log(err);
        }

        var all = "module egret3d {/*** @private*/export class ShaderLib {static lib: { [key:string]: string } = {\n";

        for(var i = 0; i < files.length; i++) {
            var file = files[i];

            if(file.indexOf(".glsl") > 0) {
                var name = file.replace(/\.fx$/, "");

                all += name + ": " + JSON.stringify(parseShader(file, inputPath)) + ",\n";
            }
        }

        all += "};}}\n";

        fs.writeFile(outputPath + outputName +".ts", all, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file " + outputName + ".ts" + " was saved!");
        });
    });
}

// exports.compileShader = compileShader;
compileShader("../Shaders/", "./", "ShaderLib");
