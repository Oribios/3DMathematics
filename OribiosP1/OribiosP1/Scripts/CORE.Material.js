//Core.Material.js
////////////////////////////////////////////////////////////////////////////////
var VERTEX_SHADER_DEFAULT = "\
attribute vec3 aVertexPosition;\
attribute vec3 aVertexNormal;\
attribute vec4 aTextureCoord;\
\
uniform mat4 uModelMatrix;\
uniform mat4 uViewMatrix;\
uniform mat4 uProjectionMatrix;\
uniform mat3 uNormalMatrix;\
\
uniform vec3 uAmbientColor;\
\
uniform vec3 uLightingDirection;\
uniform vec3 uDirectionalColor;\
\
varying vec4 vTextureCoord;\
varying vec3 vLightWeighting;\
\
void main(void) {\
\
vec4 worldPos = uModelMatrix * vec4(aVertexPosition, 1.0);\
vec4 cameraPos = uViewMatrix * worldPos;\
vec4 screenPos = uProjectionMatrix * cameraPos;\
vTextureCoord = aTextureCoord;\
gl_Position = screenPos;\
\
vec3 transformedNormal = mat3(uViewMatrix * uModelMatrix) * aVertexNormal;\
float directionalLightWeighting = max(dot(transformedNormal, uLightingDirection), 0.0);\
vLightWeighting = uAmbientColor + uDirectionalColor * directionalLightWeighting;\
}\
";

var FRAGMENT_SHADER_DEFAULT = "\
precision mediump float;\
\
varying vec2 vTextureCoord;\
varying vec3 vLightWeighting;\
\
uniform sampler2D uSamplerColor;\
\
void main(void) {\
/*vec4 textureColor = texture2D(uSamplerColor, vec2(vTextureCoord.x, vTextureCoord.y));*/\
/*gl_FragColor = vec4(textureColor.rgb * vLightWeighting, textureColor.a);*/\
gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\
}\
";


function Material() {
    this.shader = null;

}

var _defaultMaterial = null;

//var Material = new Material();


function GL_GetDefaultMaterial() {
    if (_defaultMaterial == null) {
        _defaultMaterial = GL_CreateDefaultMaterial();
    }
    return _defaultMaterial;
}

function GL_CreateDefaultMaterial() {
    var material = new Material();
    material.shader = GL_CompileMaterial(VERTEX_SHADER_DEFAULT, FRAGMENT_SHADER_DEFAULT);
    return material;
}


function GL_CompileMaterial(vs_src, fs_src) {
    var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);



    gl.shaderSource(fragmentShader, fs_src);
    gl.compileShader(fragmentShader);

    var fs_Success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (fs_Success == 0) {
        alert(gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs_src);
    gl.compileShader(vertexShader);
    var vs_Success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (vs_Success == 0) {
        alert(gl.getShaderInfoLog(vertexShader));
        return null;
    }
    var material = gl.createProgram();
    gl.attachShader(material, vertexShader);
    gl.attachShader(material, fragmentShader);
    gl.linkProgram(material);

    if (!gl.getProgramParameter(material, gl.LINK_STATUS)) {
        return null;
    }
    return material;
}

//Build member function
Material.prototype.Build = function (mesh) {
    if (mesh.built == false) {
        //vertexBuffer
        mesh.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.vertices), gl.STATIC_DRAW);
        mesh.vertexBuffer.itemSize = 3;
        mesh.vertexBuffer.numItems = mesh.vertices.length / 3;
        //normalBuffer
        mesh.normalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.normals), gl.STATIC_DRAW);
        mesh.normalBuffer.itemSize = 3;
        mesh.normalBuffer.numItems = mesh.normalBuffer.length / 3;
        //textureCoordinateBuffer
        mesh.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(mesh.textureCoords), gl.STATIC_DRAW);
        mesh.textureCoordBuffer.itemSize = 2;
        mesh.textureCoordBuffer.numItems = mesh.textureCoords.length / 2;

        //indexBuffer
        mesh.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(mesh.indices), gl.STATIC_DRAW);
        mesh.indexBuffer.itemSize = 1;
        mesh.indexBuffer.numItems = mesh.indices.length;
        mesh.built = true;
    }
}
//Activate Member Function
Material.prototype.Activate = function () {
    gl.useProgram(this.shader);

    this.shader.vertexPositionAttribute = gl.getAttribLocation(this.shader, "aVertexPosition");
    gl.enableVertexAttribArray(this.shader.vertexPositionAttribute);

    this.shader.vertexNormalAttribute = gl.getAttribLocation(this.shader, "aVertexNormal");
    gl.enableVertexAttribArray(this.shader.vertexNormalAttribute);

    this.shader.textureCoordAttribute = gl.getAttribLocation(this.shader, "aTextureCoord");
    gl.enableVertexAttribArray(this.shader.textureCoordAttribute);

    this.shader.projectionMatrixUniform = gl.getUniformLocation(this.shader, "uProjectionMatrix");
    this.shader.modelMatrixUniform = gl.getUniformLocation(this.shader, "uModelMatrix");
    this.shader.viewMatrixUniform = gl.getUniformLocation(this.shader, "uViewMatrix");
    this.shader.normalMatrixUniform = gl.getUniformLocation(this.shader, "uNormalMatrix");

    this.shader.vertexPositionAttribute = gl.getAttribLocation(this.shader, "aVertexPosition");
    this.shader.vertexNormalAttribute = gl.getAttribLocation(this.shader, "aVertexNormal");
    this.shader.textureCoordAttribute = gl.getAttribLocation(this.shader, "aTextureCoord");

    //this.shader.projectionMatrixUniform = gl.getUniformLocation(this.shader, "uProjectionMatrix");
    //this.shader.modelMatrixUniform = gl.getUniformLocation(this.shader, "uModelMatrix");
    this.shader.samplerColorUniform = gl.getUniformLocation(this.shader, "uNormalMatrix");
    this.shader.samplerAmbientOcclusionUniform = gl.getUniformLocation(this.shader, "uSamplerAmbientOcclusion");
    this.shader.samplerBakedLightingUniform = gl.getUniformLocation(this.shader, "uSamplerBakedLighting");
    this.shader.ambientColorUniform = gl.getUniformLocation(this.shader, "uAmbientColor");

    this.shader.lightingDirectionUniform = gl.getUniformLocation(this.shader, "uLightingDirection");
    this.shader.directionalColorUniform = gl.getUniformLocation(this.shader, "uDirectionalColor");
    //invocation of things



}
//Render Member Function
Material.prototype.Render = function (camera, mesh) {
    //
    var vertexBuffer = mesh.vertexBuffer;
    var normalBuffer = mesh.normalBuffer;
    var textureCoordBuffer = mesh.textureCoordBuffer;
    var indexBuffer = mesh.indexBuffer;
    //

    this.Activate();
    //Position
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttribute, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    //Normal
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.normalBuffer);
    gl.vertexAttribPointer(this.shader.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    //texture
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBufer);
    gl.vertexAttribPointer(this.shader.textureCoordAttribute, mesh.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);

    gl.uniform1i(this.shader.sampleColorUniform, 0);
    gl.uniform3fv(this.shader.lightingDirectionUniform, [0, 0, -1]);
    gl.uniform3f(this.shader.directionalColorUniform, 0.75, 0.75, 0.75);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

    gl.uniformMatrix4fv(this.shader.projectionMatrixUniform, false, _ProjectionMatrix);
    gl.uniformMatrix4fv(this.shader.modelMatrixUniform, false, _ModelMatrix);
    gl.uniformMatrix4fv(this.shader.viewMatrixUniform, false, _ViewMatrix);
    gl.uniformMatrix3fv(this.shader.normalMatrixUniform, false, _NormalMatrix);
    gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

