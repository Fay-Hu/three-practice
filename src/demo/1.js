import * as THREE from 'three'
import OrbitControls from '@/lib/tools/orbitControls'
import dat from 'dat.gui'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
document.body.appendChild(renderer.domElement)

class Cube {
  constructor (width = 1, height = 1, depth = 1) {
    this.width = width
    this.height = height
    this.depth = depth

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.rotation.y = 5
  }
  update (v) {
    var geometry = new THREE.BoxGeometry(v, this.height, this.depth)
    var material = new THREE.MeshBasicMaterial({ color: 0xffffff })
    this.mesh = new THREE.Mesh(geometry, material)
  }
}

const cube = new Cube()
scene.add(cube.mesh)

camera.position.z = 5

renderer.render(scene, camera)
window.addEventListener(
  'resize',
  function () {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  },
  false
)

var orbit = new OrbitControls(camera, renderer.domElement)
console.log(orbit)

const gui = new dat.GUI()
console.log(cube)
gui.add(cube, 'width', 1, 100).onChange(cube.update)

var render = function () {
  requestAnimationFrame(render)
  renderer.render(scene, camera)
}
render()
