// Tsvetan Rouschev, @uuidna/qpu, CC-BY-NC-ND-4.0 (https://orcid.org/0009-0000-7312-9778)
// Added to the MIT fork of payloadcms/website (Copyright (c) 2023 Payload); this file is QPU's: see NOTICE.qpu.md.
// The licence catalogue as Payload's own ecommerce: the plugin's products, variants, carts, orders, transactions and addresses, the
// Stripe adapter as the payment, access by the site's roles, the order's accessToken as the licence key — the API of selling from the config.
import { ecommercePlugin } from '@payloadcms/plugin-ecommerce'
import { stripeAdapter } from '@payloadcms/plugin-ecommerce/payments/stripe'
import type { Access, FieldAccess } from 'payload'

export const QPU_CURRENCIES = [{"code":"EUR","decimals":2,"label":"Euro","symbol":"€"},{"code":"USD","decimals":2,"label":"US Dollar","symbol":"$"},{"code":"BGN","decimals":2,"label":"Bulgarian lev","symbol":"лв"}]
const roles = (req: { user?: unknown }): string[] => ((req.user as { roles?: string[] } | undefined)?.roles ?? [])
const isAdmin: Access = ({ req }) => roles(req).includes('admin')
const isAdminField: FieldAccess = ({ req }) => roles(req).includes('admin')
const isCustomerField: FieldAccess = ({ req }) => !!req.user

export const qpuEcommerce = ecommercePlugin({
  access: {
    isAdmin,
    adminOnlyFieldAccess: isAdminField,
    adminOrPublishedStatus: ({ req }) => (roles(req).includes('admin') ? true : { _status: { equals: 'published' } }),
    isCustomer: isCustomerField,
    isDocumentOwner: ({ req }) => (req.user ? { customer: { equals: req.user.id } } : false),
  },
  customers: { slug: 'users' },
  currencies: { defaultCurrency: 'EUR', supportedCurrencies: [...QPU_CURRENCIES] },
  orders: {
    ordersCollectionOverride: ({ defaultCollection }) => ({
      ...defaultCollection,
      fields: [...defaultCollection.fields, { name: 'accessToken', type: 'text', unique: true, index: true, admin: { position: 'sidebar', readOnly: true, description: 'the licence key of the order' }, hooks: { beforeValidate: [({ value, operation }) => (operation === 'create' || !value ? crypto.randomUUID() : value)] } }],
    }),
  },
  payments: { paymentMethods: [stripeAdapter({ secretKey: process.env.STRIPE_SECRET_KEY ?? '', publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '', webhookSecret: process.env.STRIPE_WEBHOOKS_SIGNING_SECRET })] },
  products: {
    productsCollectionOverride: ({ defaultCollection }) => ({
      ...defaultCollection,
      admin: { ...defaultCollection.admin, useAsTitle: 'title' },
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'licence', type: 'group', fields: [{ name: 'product', type: 'text' }, { name: 'variant', type: 'text' }, { name: 'unit', type: 'text' }, { name: 'interval', type: 'text' }, { name: 'domains', type: 'text' }] },
        { name: 'iso', type: 'group', fields: [{ name: 'standard', type: 'text' }, { name: 'formula', type: 'textarea' }, { name: 'documented', type: 'checkbox' }] },
        ...defaultCollection.fields,
      ],
      hooks: {
        beforeChange: [({ data }) => (data && data.iso && data.iso.formula ? { ...data, iso: { standard: 'ISO 9001', formula: data.iso.formula, documented: true } } : data)],
        afterChange: [({ doc }) => { const formula = doc && doc.iso ? doc.iso.formula : ''; const held = doc && doc.docs ? doc.docs : {}; const server = 'https://api.cursor.com/rest-mcp/google-drive/mcp'; const mime = 'application/vnd.google-apps.document'; if (!formula) return { ...doc, docs: { text: '', written: false } }; if (held.auth !== 'ready') return { ...doc, docs: { tool: 'mcp_auth', server, text: formula, written: false } }; if (held.fileId && held.from !== 'search' && held.from !== 'create') return { ...doc, docs: { refused: true, why: 'a file id comes from search or create, never a guess', text: formula, written: false, research: { via: 'hooks', hooks: ['beforeChange', 'afterChange', 'afterRead'], tokenFree: true, fetched: false, request: { method: 'GET', url: 'https://www.iso.org/open-data.html', accept: 'text/html' }, possibilities: ['search', 'create_file', 'iso-open-data'] } } }; if (!held.fileId) return { ...doc, docs: { tool: 'create_file', server, arguments: { title: doc.title || 'ISO 9001', content_markdown: formula, target_mime_type: mime, ...(held.parentFolderId ? { parent_folder_id: held.parentFolderId } : {}) }, text: formula, written: false, verify: 'read_file' } }; const matches = typeof held.read === 'string' && held.read.indexOf(formula) >= 0; return { ...doc, docs: { tool: matches ? 'read_file' : 'update_file_content', fileId: held.fileId, from: held.from, server, text: formula, written: matches, verify: 'read_file' } } }],
        afterRead: [({ doc }) => doc],
      },
    }),
  },
})
