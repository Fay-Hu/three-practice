import * as THREE from 'three'
import Stage from '@/components/stage'

const stage = new Stage()
const scene = stage.scene

var loader = new THREE.JSONLoader()

// 加载一个资源
loader.load('static/models/curve.json', (geometry, materials) => {
  var material = new THREE.MultiMaterial(materials)
  var object = new THREE.Mesh(geometry, material)
  scene.add(object)
})

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
scene.add(light)
