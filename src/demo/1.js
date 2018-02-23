import * as THREE from 'three'
import Stage from '@/components/stage'

class Cube {
  constructor (width = 1, height = 1, depth = 1) {
    this.width = width
    this.height = height
    this.depth = depth

    var geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
    var material = new THREE.MeshBasicMaterial({color: 0x2194CE})
    this.mesh = new THREE.Mesh(geometry, material)
    this.mesh.rotation.y = 5
  }
  update (v) {
    this.mesh.geometry.dispose()
    this.mesh.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth)
  }
}

const cube = new Cube()
const stage = new Stage()

stage.scene.add(cube.mesh)
var ambientLight = new THREE.AmbientLight(0xffffff)
stage.scene.add(ambientLight)
stage.gui.add(cube, 'width', 1, 10).onChange(cube.update.bind(cube))
