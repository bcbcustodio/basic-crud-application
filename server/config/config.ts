const config = {
  mongoOptions: {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true
  },
  db: 'mongodb+srv://root:root@crud-application.ohfaxvn.mongodb.net/?retryWrites=true&w=majority',
  port: '3001',
  requiresAuth: false
}

export default config
