export default function clamp(min, num, max) {
  if (num < min) {
    return min
  }

  if (num > max) {
    return max
  }

  return num
  // return num <= min ? min : num >= max ? max : num
}
