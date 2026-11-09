'use client'

import type { Form as FormType } from '@root/payload-types'
import type { DefaultDocumentIDType } from 'payload'

import { RichText } from '@components/RichText/index'
import Form from '@forms/Form/index'
import { Turnstile } from '@root/components/Turnstile/index'
import { CrosshairIcon } from '@root/icons/CrosshairIcon/index'
import { getCookie } from '@root/utilities/get-cookie'
import { usePathname, useRouter } from 'next/navigation'
import * as React from 'react'
import { toast } from 'sonner'

import { fields } from './fields'
import classes from './index.module.scss'
import Submit from './Submit/index'

const buildInitialState = (fields) => {
  const state = {}

  fields.forEach((field) => {
    state[field.name] = {
      errorMessage: 'This field is required.',
      initialValue: field.defaultValue ?? undefined,
      valid: !field.required || field.defaultValue !== undefined,
      value: field.defaultValue ?? undefined,
    }
  })

  return state
}

const RenderForm = ({ form, hiddenFields }: { form: FormType; hiddenFields: string[] }) => {
  const {
    id: formID,
    confirmationMessage,
    confirmationType,
    customID,
    redirect: formRedirect,
    submitButtonLabel,
  } = form

  const [isLoading, setIsLoading] = React.useState(false)

  const [hasSubmitted, setHasSubmitted] = React.useState<boolean>()

  const [error, setError] = React.useState<{ message: string; status?: string } | undefined>()

  const initialState = buildInitialState(form.fields)

  const [turnstileToken, setTurnstileToken] = React.useState<string>()

  const router = useRouter()

  const pathname = usePathname()

  const onSubmit = React.useCallback(
    ({ data }) => {
      const submitForm = async () => {
        setError(undefined)

        setIsLoading(true)

        if (!turnstileToken) {
          setIsLoading(false)
          toast.error('Please complete the Turnstile challenge.')

          return
        }

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        try {
          const hubspotCookie = getCookie('hubspotutk')
          const pageUri = `${process.env.NEXT_PUBLIC_SITE_URL}${pathname}`
          const slugParts = pathname?.split('/')
          const pageName = slugParts?.at(-1) === '' ? 'Home' : slugParts?.at(-1)
          const req = await fetch('/api/form-submissions', {
            body: JSON.stringify({
              form: formID,
              hubspotCookie,
              pageName,
              pageUri,
              submissionData: dataToSend,
              turnstile: turnstileToken,
            }),
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          if (!req.ok) {
            const { errors } = await req.json()
            for (const error of errors) {
              toast.error(error.message)
            }
            setIsLoading(false)
            return
          }

          setIsLoading(false)
          setHasSubmitted(true)
          toast.success('Form submitted successfully!')

          if (confirmationType === 'redirect' && formRedirect) {
            const { url } = formRedirect

            if (!url) {
              return
            }

            const redirectUrl = new URL(url, process.env.NEXT_PUBLIC_SITE_URL)

            try {
              if (url.startsWith('/') || redirectUrl.origin === process.env.NEXT_PUBLIC_SITE_URL) {
                router.push(redirectUrl.href)
              } else {
                window.location.assign(url)
              }
            } catch (err) {
              console.warn(err) // eslint-disable-line no-console
              toast.error('Something went wrong. Did not redirect.')
            }
          }
        } catch (err) {
          console.warn(err) // eslint-disable-line no-console
          setIsLoading(false)
          toast.error('Something went wrong.')
        }
      }

      void submitForm()
    },
    [router, formID, formRedirect, confirmationType, pathname, turnstileToken],
  )

  if (!form?.id) {
    return null
  }

  return (
    <div className={classes.cmsForm}>
      {!isLoading && hasSubmitted && confirmationType === 'message' && (
        <RichText className={classes.confirmationMessage} content={confirmationMessage} />
      )}
      {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
      {!hasSubmitted && (
        <React.Fragment>
          <Form formId={String(formID)} initialState={initialState} onSubmit={onSubmit}>
            <div className={classes.formFieldsWrap}>
              {form.fields?.map((field, index) => {
                const Field: React.FC<any> = fields?.[field.blockType]
                const isLastField = index === (form.fields?.length ?? 0) - 1
                if (Field) {
                  return (
                    <div
                      className={[
                        classes.fieldWrap,
                        field.blockType !== 'message' && hiddenFields.includes(field.name)
                          ? classes.hidden
                          : '',
                        !isLastField ? classes.hideBottomBorder : '',
                      ]
                        .filter(Boolean)
                        .join(' ')}
                      key={index}
                    >
                      <Field
                        form={form}
                        path={'name' in field ? field.name : undefined}
                        {...field}
                        disabled={isLoading}
                      />
                    </div>
                  )
                }
                return null
              })}
              <CrosshairIcon className={[classes.crosshair, classes.crosshairLeft].join(' ')} />
            </div>
            <div className={classes.captchaWrap}>
              <Turnstile className={classes.captcha} onToken={setTurnstileToken} theme="dark" />
            </div>
            <Submit
              className={[classes.submitButton, classes.hideTopBorder].filter(Boolean).join(' ')}
              disabled={isLoading}
              icon={isLoading ? 'loading' : 'arrow'}
              iconRotation={45}
              iconSize={isLoading ? 'large' : 'medium'}
              id={customID ?? String(formID)}
              label={isLoading ? 'Submitting...' : submitButtonLabel}
            />
          </Form>
        </React.Fragment>
      )}
    </div>
  )
}

export const CMSForm: React.FC<{
  form?: DefaultDocumentIDType | FormType | null
  hiddenFields?: string[]
}> = (props) => {
  const { form, hiddenFields } = props

  if (!form || typeof form !== 'object') {
    return null
  }

  return <RenderForm form={form} hiddenFields={hiddenFields ?? []} />
}
