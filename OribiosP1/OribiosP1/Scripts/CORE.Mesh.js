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
    this.indices = [];
    this.nextIndex = 0;
    this.built = false;
}

function MeshVertex(x, y, z, nx, ny, nz, tu, tv) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.nx = nx;
    this.ny = ny;
    this.nz = nz;
    this.tu = tu;
    this.tv = tv;
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
    this.textureCoords.push(vertex.tu);
    this.textureCoords.push(vertex.tv);
    this.indices.push(this.nextIndex);
    this.nextIndex += 1;
}

Mesh.prototype.Build = function () {
    this.material.Build(this);
}

Mesh.prototype.Render = function (camera) {
    this.material.Render(camera, this);
}
