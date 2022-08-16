import React, { useState } from 'react'
import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'

import Map, { MapInfo } from '../../components/map/Map'
import { LngLatBounds } from 'maplibre-gl'

export default function MapPage() {
  const [mapInfo, setMapInfo] = useState<MapInfo>(null)
  return (
    <Map onMove={info => setMapInfo(info)}>
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
        <Typography level='body3'>
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
