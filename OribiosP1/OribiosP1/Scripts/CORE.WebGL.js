//CORE.WebGL.js
//////////////////////////////////////////////

var gl = null;
var canvas = null;
var draw = null;

function GL_Init() {
    gl.clearColor(0.1, 0.9, 0.1, 1.0);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    //gl.enable(gl.CULL_FACE);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.viewport(0, 0, canvas.width, canvas.height)
}

function OnSystemFrame() {
    OnFrame();
    window.requestAnimationFrame(OnSystemFrame);

}

function _OnStartup(eventArgs) {
    canvas = document.getElementById("_CanvasScreen");
    gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    GL_Init();
    OnInitialize();
    OnSystemFrame();
}



function _OnWindowResize(eventArgs) {

}

function _OnKeyDown(eventArgs) {

}

function _OnKeyUp(eventArgs) {

}

function _OnMouseMove(eventArgs) {

}

function _OnMouseDown(eventArgs) {

}

function _OnMouseUp(eventArgs) {

}

