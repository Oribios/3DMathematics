//CORE.Matrix.js
///////////////////////////////////////////////////////////////////////////////////////////////////

var _ModelMatrix = []; //describes rotation and translation
var _ViewMatrix = []; // Describes world rotation and translation to line up with the camera
var _ProjectionMatrix = []; // Describes distortion to simulate certain camera lenses
var _NormalMatrix = []; // describes transformation of surface normals for lighting
var cos = Math.cos;
var sin = Math.sin;
var tan = Math.tan;


//sets Global Model Matrix
function GL_SetModelMatrix(matrix) {

}

//sets Global View Matrix
function GL_SetViewMatrix(Matrix) {

}

//sets Global Projection Matrix
function GL_SetProjectionMatrix(Matrix) {

}

//sets Global Normal Matrix
function GL_SetNormalMatrix(Matrix) {

}
function TranslateMatrix() {
    [
    1, 0, 0, x,
    0, 1, 0, y,
    0, 0, 0, z,
    0, 0, 0, 1,
    ];
}

function RotationMatrix() {
    var modelMatrix =
[
cos(a) * cos(b), cos(a) * sin(b) * sin(g) - sin(a) * cos(g), cos(a) * sin(b) * cos(g) + sin(a) * sin(g), 0,
sin(a) * cos(b), sin(a) * sin(b) * sin(g) + cos(a) * cos(g), sin(a) * sin(b) * cos(g) - cos(a) * sin(g), 0,
-sin(b)        ,cos(b) * sin(g)                             ,cos(b) * cos(g)                           , 0,
0              , 0                                          , 0                                        , 1
];
}

function IdentityMatrix() {
    var identityMatrix4x4 =
	[
	1, 0, 0, 0,
	0, 1, 0, 0,
	0, 0, 1, 0,
	0, 0, 0, 1
	];
    return IdentityMatrix();
}
