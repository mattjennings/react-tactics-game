import { useState, useEffect } from 'react'
import * as PIXI from 'pixi.js'

export default function LoadResources({ resources, children, fallback }) {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    resources.forEach(resource => PIXI.loader.add(resource))
    PIXI.loader.load()
    PIXI.loader.onComplete.add(() => setLoading(false))
  }, [resources])

  return loading ? fallback : children
}
