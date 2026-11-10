'use client'
import type { CheckboxFieldClientProps } from 'payload'
import type React from 'react'

import { TableIcon } from '@blocks/ComparisonTable/Icons'
import { useField } from '@payloadcms/ui'

import classes from './index.module.scss'

const TableCheckboxField: React.FC<CheckboxFieldClientProps> = ({ path }) => {
  const { setValue, value } = useField({ path })

  return (
    <button
      className={classes.toggle}
      data-checked={value}
      onClick={() => {
        setValue(!value)
      }}
      type="button"
    >
      <TableIcon checked={Boolean(value)} />
    </button>
  )
}

export default TableCheckboxField
