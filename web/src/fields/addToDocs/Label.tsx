'use client'

import type { TextFieldLabelClientProps } from 'payload'
import type React from 'react'

import { CopyToClipboard, useField } from '@payloadcms/ui'

import classes from './index.module.scss'

export const Label: React.FC<TextFieldLabelClientProps> = ({ path }) => {
  const { value } = useField({ path })
  return (
    <span className={classes.label}>
      Add to Docs <CopyToClipboard value={value as string} />
    </span>
  )
}
