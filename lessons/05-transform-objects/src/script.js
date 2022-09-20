import './style.css'
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()


/* Creating a cube */
// Objects
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// Mesh position
mesh.position.set(0.7, -0.6, 1)
// Mesh scale
mesh.scale.set(2, 0.5, 0.5)
// Mesh rotation
mesh.rotation.reorder('YXZ') // default is 'XYZ'
mesh.rotation.x = Math.PI * 0.25
mesh.rotation.y = Math.PI * 0.25 // 45 degrees
//scene.add(mesh)
/* End of creating a cube */

/* Creating a group of cubes */
const group = new THREE.Group()
group.position.y = 1
group.scale.y = 2
group.rotation.y = 1
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
group.add(cube1) // add cube1 to group

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
cube2.position.x = 2
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff })
)
cube3.position.x = -2
group.add(cube3)
/* End of group of cubes */


// Axis helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

// Sizes
const sizes = {
    width: 800,
    height: 600
}
// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)
// look at the mesh
//camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)



/* Reminder Space */

// distance from origin
//console.log(mesh.position.length())

// normalize the vector
//console.log(mesh.position.normalize())

// distance from camera
//console.log(mesh.position.distanceTo(camera.position))

// Define object position
// mesh.position.set(0.7, -0.6, 1)
// same as
// mesh.position.x = 0.7
// mesh.position.y = -0.6
// mesh.position.z = 1

/* ------------- */