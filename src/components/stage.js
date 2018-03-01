import * as THREE from 'three'
import OrbitControls from '@/lib/tools/orbitControls'
import Stats from '@/lib/tools/stats'
import dat from 'dat.gui'

const noop = () => {}
export default class Stage {
  /**
  * @param {Boolean} antialias 抗锯齿
  * @param {Boolean} autoRender 自动实时渲染
  * @param {Function} onRender 实时渲染回调
  */
  constructor(params = {}) {
    let { antialias = true, autoRender = true, onRender = noop } = params
    this.antialias = antialias
    this.onRender = onRender
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5

    this.initRender()

    // TODO 生产环境应去掉helper
    this.initHelper()
    this.AddAdaption()

    if (autoRender) {
      this.render()
    }
  }

  initRender() {
    const renderer = this.renderer = new THREE.WebGLRenderer({
      antialias: this.antialias,
      // alpha: true,
      preserveDrawingBuffer: true
    })

    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    document
      .body
      .appendChild(renderer.domElement)
    renderer.render(this.scene, this.camera)
  }

  initHelper() {
    this.orbit = new OrbitControls(this.camera, this.renderer.domElement)

    this.gui = new dat.GUI()

    const stats = this.stats = new Stats()
    // 0: fps, 1: ms, 2: mb, 3+: custom
    stats.showPanel(0)
    document
      .body
      .appendChild(stats.dom)
  }

  render(time) {
    requestAnimationFrame(this.render.bind(this))
    this
      .renderer
      .render(this.scene, this.camera)

    if (typeof this.onRender === 'function') {
      this.onRender(time)
    }

    if (this.stats) {
      this
        .stats
        .update()
    }
  }

  /**
   * 添加窗口变化自适应监听
   */
  AddAdaption() {
    window
      .addEventListener('resize', () => {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this
          .camera
          .updateProjectionMatrix()
        this
          .renderer
          .setSize(window.innerWidth, window.innerHeight)
      }, false)
  }
}
