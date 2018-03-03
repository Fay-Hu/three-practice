/**
* 3D 飞行线
*/
import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Stage from '@/components/stage'
import {getSparePoint, getCenterOfVector, getEndPointOfVector} from '@/utils'

// globals
const stage = new Stage({
  onRender: (time) => {
    TWEEN.update(time)
  }
})

stage.camera.position.z = 300
const scene = stage.scene

let earthGeo = new THREE.SphereGeometry(60, 60, 60)
let earthMaterial = new THREE.MeshPhongMaterial({color: 0x2194CE, side: THREE.DoubleSide})
let earth = new THREE.Mesh(earthGeo, earthMaterial)
scene.add(earth)

// 随机生成球面点
function generateDots() {
  const dotGroups = new THREE.Group()
  for (let i = 0; i < 50; i++) {
    let dotGeo = new THREE.SphereGeometry(2, 60, 60)
    let dotMaterial = new THREE.MeshPhongMaterial({color: 0x8A2BE2})
    let dotMesh = new THREE.Mesh(dotGeo, dotMaterial)
    const dotPos = getSparePoint(70, Math.PI * 2 * Math.random(), Math.PI * 2 * Math.random())
    dotMesh
      .position
      .set(dotPos.x, dotPos.y, dotPos.z)

    dotGroups.add(dotMesh)
  }

  return dotGroups
}

// 生成贝塞尔曲线
function generateBezier(dotGroups) {
  const v1 = dotGroups.children[0].position
  const v2 = dotGroups.children[1].position
  const vC12 = getCenterOfVector(v1, v2)
  // 夹角 [0,π]
  const angle12 = v1.angleTo(v2) * 180 / Math.PI / 10

  const aLen = angle12 * 10
  const hLen = Math.pow(angle12, 2)
  // 连接圆心射线
  const ray = new THREE.Ray(new THREE.Vector3(0, 0, 0), vC12)
  // 射线顶点向量
  const vTop = ray.at(hLen / ray.at(1).distanceTo(new THREE.Vector3(0, 0, 0)))
  const v3 = getEndPointOfVector(v2, vTop, aLen)
  const v4 = getEndPointOfVector(v1, vTop, aLen)

  const curve = new THREE.CubicBezierCurve3(v1, v3, v4, v2)
  const geo = new THREE.Geometry()
  geo.vertices = curve.getPoints(200)
  const material = new THREE.LineBasicMaterial({color: 0xff0000})
  return new THREE.Line(geo, material)
}

const dotGroups = generateDots()
const line = generateBezier(dotGroups)
scene.add(dotGroups)
scene.add(line)

let dotGeo = new THREE.SphereGeometry(2, 60, 60)
let dotMaterial = new THREE.MeshPhongMaterial({color: 0xffffff})
let dotMesh = new THREE.Mesh(dotGeo, dotMaterial)

var coords = { i: 0 }

var tween = new TWEEN.Tween(coords)
  .to({i: line.geometry.vertices.length - 1}, 5000)
  .easing(TWEEN.Easing.Quadratic.In)
  .onUpdate(function () {
    const p = line.geometry.vertices[Math.round(coords.i)]
    dotMesh.position.set(p.x, p.y, p.z)
  })
var tweenback = new TWEEN.Tween(coords)
  .to({i: 0}, 5000)
  .easing(TWEEN.Easing.Quadratic.Out)
  .onUpdate(function () {
    const p = line.geometry.vertices[Math.round(coords.i)]
    dotMesh.position.set(p.x, p.y, p.z)
  })
scene.add(dotMesh)
tween.start()
tween.chain(tweenback)
tweenback.chain(tween)

const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
scene.add(light)
