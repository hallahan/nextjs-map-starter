import React from 'react'
import Sheet from '@mui/joy/Sheet'
import Typography from "@mui/joy/Typography"

import Map from '../../components/map/Map'

export default function MapPage() {
  return (
    <Map>
      <Sheet
        variant='outlined'
        sx={{
          borderRadius: 'md',
          bgcolor: 'background.componentBg',
          maxWidth: 400,
          maxHeight: '100vh',
          overflow: 'auto'
        }}
      >
        <Typography level='h1'>Hello</Typography>
      </Sheet>
    </Map>
  )
}
