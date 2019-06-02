export default function getCollisionBounds(pos, bounds) {
  return {
    left: pos.x - bounds.pivot[0],
    right: pos.x + bounds.width - bounds.pivot[0],
    top: pos.y - bounds.pivot[1],
    bottom: pos.y + bounds.height - bounds.pivot[1]
  }
}
