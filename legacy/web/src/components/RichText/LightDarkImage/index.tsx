'use client'
import type { Media } from '@types'
import type { DefaultDocumentIDType } from 'payload'

import { usePopulateDocument } from '@root/hooks/usePopulateDocument'
import { useThemePreference } from '@root/providers/Theme/index'
import React from 'react'

import classes from './index.module.scss'

type Props = {
  alt: string
  caption?: string
  srcDark?: string
  srcDarkId?: DefaultDocumentIDType
  srcLight?: string
  srcLightId?: DefaultDocumentIDType
}

export const LightDarkImage: (props: Props) => null | React.JSX.Element = ({
  alt,
  caption,
  srcDark,
  srcDarkId,
  srcLight,
  srcLightId,
}) => {
  const { theme } = useThemePreference()
  const isDark = theme === 'dark'

  const directSrc = isDark ? srcDark : srcLight
  const mediaId = isDark ? srcDarkId : srcLightId

  const { data: media } = usePopulateDocument<Media>({
    id: mediaId,
    collection: 'media',
    enabled: !directSrc && !!mediaId,
  })

  const src = directSrc ?? media?.url

  if (!src) {
    return null
  }

  return (
    <div className={classes.imageWrap}>
      <img alt={alt} src={src} />
      {caption && <div className={classes.caption}>{caption}</div>}
    </div>
  )
}
