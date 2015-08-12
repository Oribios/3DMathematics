//APP.Main.js
/////////////////////////////////////////

var _Mesh = null;

var _RotationX = 0;
var _RotationY = 0;
var _RotationZ = 0;

function OnInitialize() {
    GL_SetModelMatrix(identityMatrix4x4());
    GL_SetViewMatrix(identityMatrix4x4());
    GL_SetProjectionMatrix(identityMatrix4x4());
    GL_SetNormalMatrix(identityMatrix3x3());
    var mesh = new Mesh();
    mesh.AddVertex(new MeshVertex(-0.75, 0.0, 0.0));
    mesh.AddVertex(new MeshVertex(0.75, 0.0, 0.0));
    mesh.AddVertex(new MeshVertex(0.0, 0.75, 0.0));
    mesh.Build();
    _Mesh = mesh;
}

function OnFrame() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    _Mesh.Render(null);
    var rotationMatrix = RotationMatrix(_RotationX, _RotationY, _RotationZ);
    GL_SetModelMatrix(rotationMatrix);
    _RotationX += 0.1;
    _RotationY += 0.1;
    _RotationZ += 0.1;
}