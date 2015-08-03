//CORE.WebGL.js
//////////////////////////////////////////////

var gl = null;
var draw = null;
var canvas = null;



function OnSystemFrame() {
    OnFrame();
    window.requestAnimationFrame(OnSystemFrame);

}

function _OnStartup() {
    canvas = document.getElementById("_CanvasScreen");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    GL_Init();
    OnInitialize();
    OnSystemFrame();
}

function GL_Init() {
    gl.clearColor(0.5, 1.0, 0.5, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height)
}

function _OnWindowResize(a) {

}

function _OnKeyDown(a) {

}

function _OnKeyUp(a) {

}

function _OnMouseMove(a) {

}

function _OnMouseDown(a) {

}

function _OnMouseUp(a) {

}

