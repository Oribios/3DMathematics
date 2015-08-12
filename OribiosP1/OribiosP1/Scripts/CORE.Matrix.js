//CORE.Matrix.js
///////////////////////////////////////////////////////////////////////////////////////////////////

var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;

var _ModelMatrix = []; //describes rotation and translation
var _ViewMatrix = []; // Describes world rotation and translation to line up with the camera
var _ProjectionMatrix = []; // Describes distortion to simulate certain camera lenses
var _NormalMatrix = []; // describes transformation of surface normals for lighting
var _IDENTITY4x4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
var _IDENTITY3x3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];
//sets Global Model Matrix
function GL_SetModelMatrix(Matrix) {
    _ModelMatrix = Matrix;
}

//sets Global View Matrix
function GL_SetViewMatrix(Matrix) {
    _ViewMatrix = Matrix;
}

//sets Global Projection Matrix
function GL_SetProjectionMatrix(Matrix) {
    _ProjectionMatrix = Matrix;
}

//sets Global Normal Matrix
function GL_SetNormalMatrix(Matrix) {
    _NormalMatrix = Matrix;
}

function identityMatrix3x3() {
    return [
        1, 0, 0, 0, 1, 0, 0, 0, 1
    ];

}

function identityMatrix4x4() {
    return [
     1, 0, 0, 0,
     0, 1, 0, 0,
     0, 0, 1, 0,
     0, 0, 0, 1
    ];
}
function TranslateMatrix(x, y, z) {
    return [
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 1, z,
    0, 0, 0, 1,
    ];
}

function RotationMatrix(g, b, a) {
    return [
    cos(a) * cos(b), cos(a) * sin(b) * sin(g) - sin(a) * cos(g), cos(a) * sin(b) * cos(g) + sin(a) * sin(g), 0,
    sin(a) * cos(b), sin(a) * sin(b) * sin(g) + cos(a) * cos(g), sin(a) * sin(b) * cos(g) - cos(a) * sin(g), 0,
    -sin(b), cos(b) * sin(g), cos(b) * cos(g), 0,
    0, 0, 0, 1
    ];

}

function RotationInverseMatrix(g, a, b) {
    return [
        cos(a) * cos(b), sin(a) * cos(b), -sin(b), 0,
         cos(a) * sin(b) * sin(g) - sin(a) * cos(g), sin(a) * sin(b) * sin(g) + cos(a) * cos(g), cos(b) * sin(g), 0,
         cos(a) * sin(b) * cos(g) + sin(a) * sin(g), sin(a) * sin(b) * cos(g) - cos(a) * sin(g), cos(b) * cos(g), 0,
        0, 0, 0, 1];
}

function RotationVectorMatrix(t, Vx, Vy, Vz) {
    return [
        cos(t) + Vx * Vx * (1 - cos(t)), -Vz * sin(t) + Vx * Vy * (1 - cos(t)), Vy * sin(t) + Vx * Vz * (1 - cos(t)), 0,
        Vz * sin(t) + Vy * Vx * (1 - cos(t)), cos(t) + Vy * Vy * (1 - cos(t)), -Vx * sin(t) + Vy * Vz * (1 - cos(t)), 0,
        -Vy * sin(t) + Vz * Vx * (1 - cos(t)), Vx * sin(t) + Vz * Vy * (1 - cos(t)), cos(t) + Vz * Vz * (1 - cos(t)), 0,
        0, 0, 0, 1];
}

function SpaceRotationMatrix(xaxis, yaxis, zaxis) {
    return [
        xaxis.x, xaxis.y, xaxis.z, 0,
        yaxis.x, yaxis.y, yaxis.z, 0,
        zaxis.x, zaxis.y, zaxis.z, 0,
        0, 0, 0, 1];
}

function SpaceRotationInverseMatrix(xaxis, yaxis, zaxis) {
    return [
        xaxis.x, yaxis.x, zaxis.x, 0,
        xaxis.y, yaxis.y, zaxis.y, 0,
        xaxis.z, yaxis.z, zaxis.z, 0,
        0, 0, 0, 1];
}

function OrthographicMatrix(l, r, b, t, n, f) {
    return [
        2 / (r - l), 0, 0, (r + l) / (r - l),
        0, 2 / (t - b), 0, (t + b) / (t - b),
        0, 0, -2 / (f - n), (f + n) / (f - n),
        0, 0, 0, 1];
}

function OrthographicInverseMatrix(l, r, b, t, n, f) {
    return [
        (r - l) / 2.0, 0, 0, (r + l) / 2.0,
        0, (t - b) / 2.0, 0, (t + b) / 2.0,
        0, 0, (f - n) / -2.0, (f + n) / 2.0,
        0, 0, 0, 1];
}

function PerspectiveMatrix(fov, w, h, near, far) {
    var aspect = w / h;
    fov = (fov * 3.14159265358) / 180.0;
    var fovy = fov / aspect;
    var f = 1 / tan(fovy / 2);
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (far + near) / (near - far), (2 * far * near) / (near - far),
        0, 0, -1, 0, ];
}

function PerspectiveInverseMatrix(fov, w, h, near, far) {
    var aspect = w / h;
    fov = (fov * 3.14159265358) / 180.0;
    var fovy = fov / aspect;
    var f = 1 / tan(fovy / 2);
    return [
        aspect / f, 0, 0, 0,
        0, 1 / f, 0, 0,
        0, 0, 0, -1,
        0, 0, (near - far) / (2 * far * near), (far + near) / (2 * far * near),
    ];
}

function TransformPoint(m, p){

}

function MatrixMultiply(m, n) {
    var r = IdentityMatrix();
    r[0 * 4 + 0] = m[0 * 4 + 0] * n[0 * 4 + 0] + m[1 * 4 + 0] * n[0 * 4 + 1] + m[2 * 4 + 0] * n[0 * 4 + 2] + m[3 * 4 + 0] * n[0 * 4 + 3];
    r[1 * 4 + 0] = m[0 * 4 + 0] * n[1 * 4 + 0] + m[1 * 4 + 0] * n[1 * 4 + 1] + m[2 * 4 + 0] * n[1 * 4 + 2] + m[3 * 4 + 0] * n[1 * 4 + 3];
    r[2 * 4 + 0] = m[0 * 4 + 0] * n[2 * 4 + 0] + m[1 * 4 + 0] * n[2 * 4 + 1] + m[2 * 4 + 0] * n[2 * 4 + 2] + m[3 * 4 + 0] * n[2 * 4 + 3];
    r[3 * 4 + 0] = m[0 * 4 + 0] * n[3 * 4 + 0] + m[1 * 4 + 0] * n[3 * 4 + 1] + m[2 * 4 + 0] * n[3 * 4 + 2] + m[3 * 4 + 0] * n[3 * 4 + 3];
    r[0 * 4 + 1] = m[0 * 4 + 1] * n[0 * 4 + 0] + m[1 * 4 + 1] * n[0 * 4 + 1] + m[2 * 4 + 1] * n[0 * 4 + 2] + m[3 * 4 + 1] * n[0 * 4 + 3];
    r[1 * 4 + 1] = m[0 * 4 + 1] * n[1 * 4 + 0] + m[1 * 4 + 1] * n[1 * 4 + 1] + m[2 * 4 + 1] * n[1 * 4 + 2] + m[3 * 4 + 1] * n[1 * 4 + 3];
    r[2 * 4 + 1] = m[0 * 4 + 1] * n[2 * 4 + 0] + m[1 * 4 + 1] * n[2 * 4 + 1] + m[2 * 4 + 1] * n[2 * 4 + 2] + m[3 * 4 + 1] * n[2 * 4 + 3];
    r[3 * 4 + 1] = m[0 * 4 + 1] * n[3 * 4 + 0] + m[1 * 4 + 1] * n[3 * 4 + 1] + m[2 * 4 + 1] * n[3 * 4 + 2] + m[3 * 4 + 1] * n[3 * 4 + 3];
    r[0 * 4 + 2] = m[0 * 4 + 2] * n[0 * 4 + 0] + m[1 * 4 + 2] * n[0 * 4 + 1] + m[2 * 4 + 2] * n[0 * 4 + 2] + m[3 * 4 + 2] * n[0 * 4 + 3];
    r[1 * 4 + 2] = m[0 * 4 + 2] * n[1 * 4 + 0] + m[1 * 4 + 2] * n[1 * 4 + 1] + m[2 * 4 + 2] * n[1 * 4 + 2] + m[3 * 4 + 2] * n[1 * 4 + 3];
    r[2 * 4 + 2] = m[0 * 4 + 2] * n[2 * 4 + 0] + m[1 * 4 + 2] * n[2 * 4 + 1] + m[2 * 4 + 2] * n[2 * 4 + 2] + m[3 * 4 + 2] * n[2 * 4 + 3];
    r[3 * 4 + 2] = m[0 * 4 + 2] * n[3 * 4 + 0] + m[1 * 4 + 2] * n[3 * 4 + 1] + m[2 * 4 + 2] * n[3 * 4 + 2] + m[3 * 4 + 2] * n[3 * 4 + 3];
    r[0 * 4 + 3] = m[0 * 4 + 3] * n[0 * 4 + 0] + m[1 * 4 + 3] * n[0 * 4 + 1] + m[2 * 4 + 3] * n[0 * 4 + 2] + m[3 * 4 + 3] * n[0 * 4 + 3];
    r[1 * 4 + 3] = m[0 * 4 + 3] * n[1 * 4 + 0] + m[1 * 4 + 3] * n[1 * 4 + 1] + m[2 * 4 + 3] * n[1 * 4 + 2] + m[3 * 4 + 3] * n[1 * 4 + 3];
    r[2 * 4 + 3] = m[0 * 4 + 3] * n[2 * 4 + 0] + m[1 * 4 + 3] * n[2 * 4 + 1] + m[2 * 4 + 3] * n[2 * 4 + 2] + m[3 * 4 + 3] * n[2 * 4 + 3];
    r[3 * 4 + 3] = m[0 * 4 + 3] * n[3 * 4 + 0] + m[1 * 4 + 3] * n[3 * 4 + 1] + m[2 * 4 + 3] * n[3 * 4 + 2] + m[3 * 4 + 3] * n[3 * 4 + 3];
    return r;
};