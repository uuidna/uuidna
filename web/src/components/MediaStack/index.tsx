import type { Media as MediaType } from '@root/payload-types'
import type { DefaultDocumentIDType } from 'payload'

import { Media } from '@components/Media'
import Image from 'next/image'

import classes from './index.module.scss'

type MediaStackProps = {
  media: {
    image: DefaultDocumentIDType | MediaType
  }[]
}

export const MediaStack: React.FC<MediaStackProps> = ({ media }) => {
  return (
    <div className={classes.stack}>
      {typeof media[0].image === 'object' && (
        <Media className={classes.mediaOne} resource={media[0].image} />
      )}
      {typeof media[1].image === 'object' && (
        <Media className={classes.mediaTwo} resource={media[1].image} />
      )}
    </div>
  )
}
