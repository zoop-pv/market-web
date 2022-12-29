const environments = {
    app: {        
        nodeEnv: process.env.NODE_ENV,
    },
    provider: {
        baseUrl: process.env.ENDPOINT_BASE_URL || '',
    },
    mapApiKey: process.env.MAP_API_KEY || ''
}

export default environments