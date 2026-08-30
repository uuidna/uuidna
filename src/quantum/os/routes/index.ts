/** The path each default install specifies on uuidna.com — editorial translation of package role. */
export const INSTALL_ROUTES: Readonly<Record<string, string>> = {
  'alpine-base': '/',
  'alpine-baselayout': '/layout',
  'alpine-baselayout-data': '/layout/data',
  'alpine-conf': '/setup',
  'alpine-keys': '/keys',
  'alpine-release': '/release',
  'apk-tools': '/packages',
  'busybox': '/terminal',
  'busybox-binsh': '/terminal/sh',
  'busybox-ifupdown': '/terminal/network',
  'busybox-mdev-openrc': '/terminal/devices',
  'busybox-openrc': '/terminal/services',
  'busybox-suid': '/terminal/privileged',
  'ca-certificates-bundle': '/trust',
  'libapk': '/apk',
  'libcap2': '/capabilities',
  'libcrypto3': '/crypto',
  'libssl3': '/tls',
  'mdev-conf': '/devices',
  'musl': '/core',
  'musl-utils': '/core/utils',
  'openrc': '/services',
  'openrc-user': '/services/user',
  'scanelf': '/scan',
  'zlib': '/compression',
}

/** routeOf(name) → uuidna.com path for a default-install package. */
export const routeOf = (name: string): string => INSTALL_ROUTES[name] ?? '/' + name
