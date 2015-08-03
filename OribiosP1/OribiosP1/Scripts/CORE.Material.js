//Core.Material.js
////////////////////////////////////////////////////////////////////////////////

function GL_GetDefaultMaterial() {
    if (_defaultMaterial == null) {
        _defaultMaterial = GL_CreateDefaultMaterial();
    }
    return _defaultMaterial;
}

function GL_CreateDefaultMaterial() {
    var material = Material;
    material.shader = GL_CompileMaterial(VERTEX_SHADER_DEFAULT, FRAGMENT_SHADER_DEFAULT);
    return material;
}


var _defaultMaterial = null;

function Material() {
    this.shader = null;
    this.Build = Build;
    this.Activate = Activate;
    this.Render = Render;
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
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array(mesh.normals, gl.STATIC_DRAW));
        mesh.normalBuffer.itemSize = 3;
        mesh.normalBuffer.numItems = mesh.vertices.length / 3;
        //textureCoordinateBuffer
        mesh.textureCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, Float32Array(mesh.textureCoord), gl.STATIC_DRAW);
        mesh.textureCoordBuffer.itemSize = 2;
        mesh.textureCoordBuffer.numItems = mesh.textureCoords.length / 2;

        //indexBuffer
        mesh.indexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Float32Array(mesh.indices), gl.STATIC_DRAW);
        mesh.indexBuffer.itemSize = 1;
        mesh.indexBuffer.numItems = mesh.indices.length;

    }
}
//Activate Member Function
Material.prototype.Activate = function () {
    gl.useProgram(this.shader);
    this.shader.vertexPositionAtrribute = gl.getAttribLocation(this.shader, "aVertexPosition");
    this.shader.vertexNormalAttribute = gl.getAttribLocation(this.shader, "aVertexNormal");
    this.shader.textureCoordAttribute = gl.getAttribLocation(this.shader, "aTextureCoord");
    this.shader.projectionMatrixUniform = gl.getUniformLocation(this.shader, "uProjecionMatrix");
    this.shader.modelMatrixUniform = gl.getUniformLocation(this.shader, "uModelMatrix");
    this.shader.sampleColorUniform = gl.getUniformLocation(this.shader, "uNormalMatrix");
    this.shader.lightingDirectionUniform = gl.getUniformLocation(this.shader, "uSamplerColor");
    this.shader.directionalColorUniform = gl.getUniformLocation(this.shader, "uDirectionalColor");
    //invocation of things
    gl.enableVertexAttribArray(this.shader.vertexPositionAttribute);
    gl.enableVertexAttribArray(this.shader.vertexNormalAttribute);
    gl.enableVertexAttribArray(this.shader.textureCoordAttribute);
}
//Render Member Function
Material.prototype.Render = function () {
    this.Activate();
    //Position
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.vertexBuffer);
    gl.vertexAttribPointer(this.shader.vertexPositionAttributem, mesh.vertexBuffer.itemSize, gl.FLOAT, false, 0, 0);
    //Normal
    gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
    gl.vertexAttribPointer(this.shader.vertexNormalAttribute, mesh.normalBuffer.itemSize, gl.FLOAT, false, 0, 0);
    //texture
    gl.bindBuffer(gl.ARRAY_BUFFER, mesh.textureCoordBufer);
    gl.vertexAttribPointer(this.shader.textureCoordAttruibute, mesh.textureCoordBuffer.itemSize, gl.FLOAT, false, 0, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, _TEXTURE0);
    gl.uniformli(this.shader.sampleColorUniform, 0);
    gl.uniform3fv(this.shader.lightingDirectionUniform, [0, 0, -1]);
    gl.uniform3f(this.shader.directionalColorUniform, 0.75, 0.75, 0.75);
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, mesh.indexBuffer);

    gl.uniformMatrix4fv(this.shader.projectionMatrixUniform, false, _ProjectionMatrix);
    gl.unifromMatrix4fv(this.shader.modelMatrixUniform, false, second, _ModelMatrix);
    gl.uniformMatrix4fv(this.shader.viewMatrixUniform, false, _ViewMatrix);
    gl.uniformMatrix3fv(normalMatrixUniform, false, _NormalMatrix);
    gl.drawElements(gl.TRIANGLES, mesh.indexBuffer.numItems, gl.UNSIGNED_SHORT, 0);
}

var Material = new Material()

function GL_CompileMaterial(vs_src, fs_src) {
    var fragmentShader = gl.creatShader(gl.FRAGMENT_SHADER);
    var material = gl.createProgram();


    gl.shaderSource(fragmentShader, fs_src);
    gl.compileShader(fragmentShader);

    var fs_Success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (fs_Success != 0) {
        alert(gl.getShaderInfoLog(fragmentShader));
        return null;
    }

    vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vs_src);
    gl.compileShader(vertexShader);
    var vs_Success = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (vs_Success != 0) {
        alert(gl.getShaderInfoLog(vertexShader));
        return null;
    }

    gl.atachShader(material, vertexShader);
    gl.attachShader(material, fragmentShader);
    gl.linkProgram(material);
    var prgrm_Success = gl.getProgramParameter(material, gl.LINK_STATUS);
    if (prgrm_Success != 0) {
        return null;
    } else {
        return material;
    }

}