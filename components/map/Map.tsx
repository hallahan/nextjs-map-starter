import React, { useEffect, useRef, useState } from 'react'
import maplibregl from 'maplibre-gl'

import styles from './Map.module.css'

export default function Map() {
  const mapContainerRef = useRef(null)

  const [lng, setLng] = useState(5)
  const [lat, setLat] = useState(34)
  const [zoom, setZoom] = useState(1.5)

  // Initialize map when component mounts
  useEffect(() => {
    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://demotiles.maplibre.org/style.json',
      center: [lng, lat],
      zoom: zoom,
    })

    // Add navigation control (the +/- zoom buttons)
    map.addControl(new maplibregl.NavigationControl({
      showCompass: true,
      showZoom: true,
      visualizePitch: true,
    }), 'top-right')

    map.on('move', () => {
      setLng(Number(map.getCenter().lng.toFixed(4)))
      setLat(Number(map.getCenter().lat.toFixed(4)))
      setZoom(Number(map.getZoom().toFixed(2)))
    })

    // Clean up on unmount
    return () => map.remove()
  }, [])

  return (
    <div className={styles.mapContainer} ref={mapContainerRef} />
  )
}