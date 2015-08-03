//APP.Main.js
/////////////////////////////////////////

var _Mesh = null;

var _RotationX;
var _RotationY;
var _RotationZ;

function OnInitialize() {
    GL_SetModelMatrix(IdentityMatrix());
    GL_SetViewMatrix(IdentityMatrix());

    var mesh = new Mesh();
    mesh.AddVertex(new AddVertex(-0.75, 0.0, 0.0));
    mesh.AddVertex(new AddVertex(0.75, 0.0, 0.0));
    mesh.AddVertex(0.0, 0.75, 0.0);
    mesh.Build();
    _Mesh = mesh;
}

function OnFrame() {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    _Mesh.Render.camera = null;
    var rotationMatrix = RotationMatrix(_RotationX, _RotationY, _RotationZ);
    GL_SetModelMatrix(rotationMatrix);
    _RotationX += 0.1;
    _RotationY += 0.2;
    _RotationZ += 0.3;
}