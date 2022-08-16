import React, { useState } from 'react'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'

import Map, { MapInfo } from '../../components/map/Map'
import maplibregl, { LngLatBounds } from 'maplibre-gl'

export default function MapPage() {
  const [mapInfo, setMapInfo] = useState<MapInfo>(null)
  const [map, setMap] = useState<maplibregl.Map>(null)
  const [tileBoundaries, setTileBoundaries] = useState<boolean>(false)

  function toggleTileBoundaries() {
    const newVal = !tileBoundaries
    setTileBoundaries(newVal)
    map.showTileBoundaries = newVal
  }

  return (
    <Map onInit={map => setMap(map)} onMove={info => setMapInfo(info)}>
      <Sheet
        variant='outlined'
        sx={{
          borderRadius: 'md',
          bgcolor: 'background.componentBg',
          maxWidth: 400,
          maxHeight: '100vh',
          overflow: 'auto',
          padding: 1,
        }}
      >
        <Button size='sm' variant='plain' onClick={() => toggleTileBoundaries()}>
          Tile Boundaries
        </Button>
        <Typography level='body3' pt={1}>
          Bounds: <Typography component='strong'>{JSON.stringify(bbox(mapInfo?.bounds))}</Typography>
          <br />
          Center: <Typography component='strong'>{JSON.stringify(fixed(mapInfo?.center.toArray()))}</Typography>
          <br />
          Zoom: <Typography component='strong'>{mapInfo?.zoom?.toFixed(2)}</Typography>
          <br />
          Bearing: <Typography component='strong'>{mapInfo?.bearing?.toFixed(2)}</Typography>
          <br />
          Pitch: <Typography component='strong'>{mapInfo?.pitch?.toFixed(2)}</Typography>
        </Typography>
      </Sheet>
    </Map>
  )
}

function fixed(array?: number[], len = 4) {
  return array?.map(num => Number(num?.toFixed(len)))
}

function bbox(bounds?: LngLatBounds, len = 4) {
  if (!bounds) {
    return []
  }
  const sw = bounds.getSouthWest()
  const ne = bounds.getNorthEast()
  return [
    Number(sw.lng.toFixed(len)),
    Number(sw.lat.toFixed(len)),
    Number(ne.lng.toFixed(len)),
    Number(ne.lat.toFixed(len)),
  ]
}
