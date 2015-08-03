//CORE.Mesh.js
////////////////////////////////////////////////////////////////////////////////

function Mesh() {
    this.material = GL_GetDefaultMaterial(); //Instance of material object
    this.vertexBuffer = null; //ID of Mesh vertices on 3D HW
    this.normalBuffer = null;//ID of mesh normals on 3D HW
    this.normalBuffer = null; // ID of mesh UVs on 3D HW
    this.textureCoordBuffer = null; // ID of mesh Triangles
    this.indexBuffer = null;
    this.texture = null;
    this.transform = null;
    this.vertices = [];
    this.normals = [];
    this.textureCoords = [];
    this.nextIndex = 0;
    this.built = false;
}

function MeshVertex(x, y, z, nx, ny, nz, tu, tv) {
    this.x();
    this.y();
    this.z();
    this.nx();
    this.ny();
    this.nz();
    this.tu();
    this.tv();
}

Mesh.prototype.material= function(){

}

Mesh.prototype.AddVertex = function (vertex) {
    this.vertices.push (vertex.x);
    this.vertices.push (vertex.y);
    this.vertices.push (vertex.z);
    this.normals.push (vertex.nx);
    this.normals.push(vertex.ny);
    this.normals.push(vertex.nz);
    this.textureCoords(vertex.tu);
    this.textureCoords(vertex.tv);
    this.indices.push(nextIndex);
    this.nextIndex += 1;
}

Mesh.prototype.Build = function () {
    Mesh.material.Build(this.Mesh);
}

Mesh.prototype.Render = function (camera) {
    this.Mesh.material.Render(camera, this.Mesh);
}
