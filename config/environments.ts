const environments = {
    app: {        
        nodeEnv: process.env.NODE_ENV,
    },
    provider: {
        baseUrl: process.env.ENDPOINT_BASE_URL,
    },
}

export default environments