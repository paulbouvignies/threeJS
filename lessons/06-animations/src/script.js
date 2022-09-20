import './style.css'
import * as THREE from 'three'
import gsap from 'gsap'


// Scene
const scene = new THREE.Scene()

// Red cube
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)


// Renderer
const canvas = document.querySelector('canvas.webgl')
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

// Clock
const clock = new THREE.Clock()

// Animation
const tick = () => {

    //clock
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.position.y = Math.sin(elapsedTime)
    // mesh.position.x = Math.cos(elapsedTime)

    // Render
    renderer.render(scene, camera)

    window.requestAnimationFrame(tick) // requestAnimationFrame is a function that calls the tick function again and again


}

tick()