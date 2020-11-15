// see https://github.com/vercel/next.js/tree/canary/examples/with-msw
const loadServer = async () => {
    const { server } = await import('./server')
    await server.listen()
}

const loadBrowser = async () => {
    const { worker } = require('./browser')
    await worker.start()
}

if (typeof window === 'undefined') {
    loadServer()
} else {
    loadBrowser()
}