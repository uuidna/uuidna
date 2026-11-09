import type { CMSLinkType } from '@components/CMSLink/index'
import type { Media, Post } from '@root/payload-types'
import type { DefaultDocumentIDType } from 'payload'

export interface SharedProps {
  className?: string
  description?: null | string
  price?: null | string
  title?: null | string
}

export interface SquareCardProps extends SharedProps {
  enableLink?: boolean | null
  leader?: string
  link?: CMSLinkType
  revealDescription?: boolean | null
}

export interface ContentMediaCardProps extends SharedProps {
  authors: Post['authors'] | Post['guestAuthor']
  href: string
  media: DefaultDocumentIDType | Media | string // a string is an image URL
  orientation?: 'horizontal' | 'vertical'
  publishedOn?: string
  style?: 'default' | 'minimal'
}

export interface PricingCardProps extends SharedProps {
  hasPrice?: boolean | null
  leader?: string
  link?: CMSLinkType
}

export interface DefaultCardProps extends SharedProps {
  href?: string
  leader?: string
  media?: DefaultDocumentIDType | Media | null
  onClick?: () => void
  pill?: string
}
