/**
 * 获取球面上的点
 * @param {float} radius
 * @param {float} alpha
 * @param {float} beta
 */
export function getSparePoint(radius, alpha, beta) {
  const x = radius * Math.sin(alpha) * Math.cos(beta)
  const y = radius * Math.sin(alpha) * Math.sin(beta)
  const z = radius * Math.cos(alpha)

  return {x, y, z}
}

/**
 * 计算向量中心点
 * @param {*} v1
 * @param {*} v2
 */
export function getCenterOfVector(v1, v2) {
  let v = v1.clone().add(v2)
  return v.divideScalar(2)
}

/**
 * 计算向量固定长度结束点
 * @param {*} v1
 * @param {*} v2
 */
export function getEndPointOfVector(v1, v2, dis) {
  let distance = v1.clone().distanceTo(v2)
  return v1.clone().lerp(v2.clone(), distance / dis)
}
