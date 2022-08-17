import React, { useState } from 'react'
import maplibregl, { LngLatBounds } from 'maplibre-gl'
import axios from 'axios'

import Sheet from '@mui/joy/Sheet'
import Typography from '@mui/joy/Typography'
import Button from '@mui/joy/Button'

import Map, { MapInfo } from '../../components/map/Map'

const SHARD_TREE_URL = 'https://storage.googleapis.com/hellopvt3/shards.geojson'

export default function MapPage() {
  const [mapInfo, setMapInfo] = useState<MapInfo>(null)
  const [map, setMap] = useState<maplibregl.Map>(null)
  const [tileBoundaries, setTileBoundaries] = useState<boolean>(false)
  const [shards, setShards] = useState<object>(null)
  const [showShards, setShowShards] = useState<boolean>(false)

  function toggleTileBoundaries() {
    const newVal = !tileBoundaries
    setTileBoundaries(newVal)
    map.showTileBoundaries = newVal
  }

  async function toggleShardTree() {
    let fc = shards
    if (!shards) {
      try {
        const { data } = await axios.get(SHARD_TREE_URL)
        console.log('number of shards', data?.features?.length)
        fc = data
        setShards(fc)
        map.addSource('shards', {
          type: 'geojson',
          data: fc,
        })
      } catch (e) {
        console.error('Unable to fetch shards.', e)
        return
      }
    }

    const show = !showShards

    if (show) {
      map.addLayer({
        id: 'shards',
        type: 'line',
        source: 'shards',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#c220ba',
          'line-width': 1,
        },
      })
      map.addLayer({
        id: 'shards_label',
        type: 'symbol',
        source: 'shards',
        layout: {
          'text-field': ['get', 'file'],
          'text-anchor': 'center',
          'text-size': 10,
        },
        paint: {
          'text-color': '#c220ba'
        }
      })
    } else {
      map.removeLayer('shards')
      map.removeLayer('shards_label')
    }

    setShowShards(show)
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
        <Button size='sm' variant='plain' onClick={() => toggleShardTree()}>
          Shards
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
