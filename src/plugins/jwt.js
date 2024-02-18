import fp from 'fastify-plugin'
import fastifyJwt from "@fastify/jwt";

export default fp(async function (app, opts) {
    const privateKeyPath = path.join(__dirname, '.ssl/private.pem');
    const privateKey = fs.readFileSync(privateKeyPath, 'utf8');
    app.register(fastifyJwt, {
        //etape2
        secret: {
            private: privateKey,
            public: publicKey,
        },
        sign: {
            algorithm: 'ES256',
            issuer: 'info.iutparis.fr'
        },
    })

})