import path from 'path'

let port = process.env.PORT
let logDir = process.env.LOGDIR

const config = {
    get: function (name) {
        return config[name]
    },
    PORT: port != null ? port : 9083,
    LOGDIR: logDir != null ? logDir : path.join(__dirname, '../../log')
}

export default config
