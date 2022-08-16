import React, { ReactElement, useEffect, useRef } from 'react'
import maplibregl, { LngLat, LngLatBounds } from 'maplibre-gl'

import styles from './Map.module.css'

export type MapInfo = {
  bounds: LngLatBounds
  center: LngLat
  zoom: number
  bearing: number
  pitch: number
}

interface MapProps {
  children?: ReactElement | ReactElement[]
  onMove?: (info: MapInfo) => void
}

export default function Map({ children, onMove }: MapProps) {
  const mapContainerRef = useRef(null)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [5, 34],
      zoom: 2,
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(
      new maplibregl.NavigationControl({
        showCompass: true,
        showZoom: true,
        visualizePitch: true,
      }),
      'top-right'
    )

    map.on('move', () =>
      onMove({
        bounds: map.getBounds(),
        center: map.getCenter(),
        zoom: map.getZoom(),
        bearing: map.getBearing(),
        pitch: map.getPitch(),
      })
    )

    // Clean up on unmount
    return () => map.remove()
  }, [])

  return (
    <div className={styles.mapContainer} ref={mapContainerRef}>
      <div className={styles.mapUi}>{children}</div>
    </div>
  )
}
