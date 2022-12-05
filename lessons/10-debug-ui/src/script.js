import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1, 1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// handle resize
window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
} )

// handle fullscreen
window.addEventListener('dblclick', () => {

    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement) {
        if(canvas.requestFullscreen) {
            canvas.requestFullscreen()
        } else if(canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen()
        }
    } else {
        if(document.exitFullscreen) {
            document.exitFullscreen()
        } else if(document.webkitExitFullscreen) {
            document.webkitExitFullscreen()
        }
    }


})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()



/**
 * Debug
 */
const gui = new dat.GUI({ closed: true, width: 400 })

gui.add(mesh.position, 'x').min(-3).max(3).step(0.01).name('eixo x')
gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('eixo y')
gui.add(mesh.position, 'z').min(-3).max(3).step(0.01).name('eixo z')

gui.add(mesh, 'visible')

gui.add(material, 'wireframe')

gui.addColor(material, 'color')

//spin
const guiMethod = {
    spin: () => {
        gsap.to(mesh.rotation, {duration: 1, y: mesh.rotation.y + 10})
    }
}
gui.add(guiMethod, 'spin')

const folder = gui.addFolder('Escala')
folder.add(mesh.scale, 'x').min(-3).max(3).step(0.01).name('eixo x')
folder.add(mesh.scale, 'y').min(-3).max(3).step(0.01).name('eixo y')
folder.add(mesh.scale, 'z').min(-3).max(3).step(0.01).name('eixo z')


window.addEventListener('keydown', (event) => {
    if(event.key === 'h') {
       if (gui._hidden) {
           gui.show()
       }
       else {
              gui.hide()
       }
    }
})