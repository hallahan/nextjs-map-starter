import React from 'react'
import type { GetServerSideProps } from 'next'
import Layout from '../components/Layout'
import Post, { PostProps } from '../components/Post'
import prisma from '../prisma/prisma'

import AspectRatio from '@mui/joy/AspectRatio'
import Box from '@mui/joy/Box'
import Card from '@mui/joy/Card'
import CardOverflow from '@mui/joy/CardOverflow'
import CardCover from '@mui/joy/CardCover'
import CardContent from '@mui/joy/CardContent'
import IconButton from '@mui/joy/IconButton'
import Typography from '@mui/joy/Typography'

import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

// https://github.com/mui/material-ui/tree/master/docs/data/joy/getting-started/templates/files

export const getServerSideProps: GetServerSideProps = async () => {
  const feed = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
        },
      },
    },
  })
  return {
    props: { feed },
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = props => {
  return (
    <Layout>
      <Typography level="display1">Planets</Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 2,
        }}
      >
        <Card
          variant='outlined'
          sx={{
            '--Card-radius': theme => theme.vars.radius.sm,
            bgcolor: 'background.componentBg',
            boxShadow: 'none',
          }}
        >
          <CardOverflow
            sx={{
              borderBottom: '1px solid',
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <AspectRatio ratio='16/9' color='primary'>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.plainColor',
                }}
              >
                .zip
              </Typography>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography>photos-travel.zip</Typography>
              <Typography level='body3' mt={0.5}>
                Added 25 May 2011
              </Typography>
            </Box>
            <IconButton variant='plain' color='neutral'>
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        </Card>
        <Card
          sx={{
            '--Card-radius': theme => theme.vars.radius.sm,
            boxShadow: 'none',
          }}
        >
          <CardCover>
            <img alt='' src='https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?auto=format&fit=crop&w=774' />
          </CardCover>
          <CardCover
            sx={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.12))',
            }}
          />
          <CardContent
            sx={{
              mt: 'auto',
              flexGrow: 0,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography textColor='#fff'>torres-del-paine.png</Typography>
              <Typography level='body3' mt={0.5} textColor='rgba(255,255,255,0.72)'>
                Added 5 Aug 2016
              </Typography>
            </Box>
            <IconButton variant='plain' color='neutral' sx={{ color: '#fff' }}>
              <EditOutlinedIcon />
            </IconButton>
          </CardContent>
        </Card>
        <Card
          variant='outlined'
          sx={{
            '--Card-radius': theme => theme.vars.radius.sm,
            bgcolor: 'background.componentBg',
            boxShadow: 'none',
          }}
        >
          <CardOverflow
            sx={{
              borderBottom: '1px solid',
              borderColor: 'neutral.outlinedBorder',
            }}
          >
            <AspectRatio ratio='16/9' color='primary'>
              <Typography
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'primary.plainColor',
                }}
              >
                .zip
              </Typography>
            </AspectRatio>
          </CardOverflow>
          <Box sx={{ pt: 2, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flex: 1 }}>
              <Typography>platform_ios.zip</Typography>
              <Typography level='body3' mt={0.5}>
                Added 26 May 2011
              </Typography>
            </Box>
            <IconButton variant='plain' color='neutral'>
              <EditOutlinedIcon />
            </IconButton>
          </Box>
        </Card>
      </Box>
      <Typography level="display2">Posts</Typography>
        {props.feed.map(post => (
          <Post post={post} />
        ))}
    </Layout>
  )
}

export default Blog
