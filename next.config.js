/* eslint-disable @typescript-eslint/no-var-requires */
const { parsed: localEnv } = require('dotenv').config()
const path = require('path')

module.exports = {
  env: {
    ...localEnv,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  future: {
    webpack5: true,
  },
}
