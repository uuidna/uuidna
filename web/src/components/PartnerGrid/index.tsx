import type { PartnerCardProps } from '@components/cards/PartnerCard'
import type { DefaultDocumentIDType } from 'payload'

import { PartnerCard } from '@components/cards/PartnerCard'

import classes from './index.module.scss'

type PartnerGridProps = {
  featured?: boolean
  partners: (DefaultDocumentIDType | PartnerCardProps)[]
}

export const PartnerGrid = (props: PartnerGridProps) => {
  const { featured, partners } = props
  return (
    <div className={classes.PartnerGridWrap}>
      {partners?.map((partner) => {
        return (
          typeof partner === 'object' && (
            <PartnerCard {...partner} key={`${partner.id}${featured ? '_featured' : ''}`} />
          )
        )
      })}
    </div>
  )
}
