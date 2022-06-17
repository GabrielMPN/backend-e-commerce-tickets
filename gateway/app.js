const express = require("express");
const app = express();
const httpProxy = require('express-http-proxy');
const basicAuth = require('express-basic-auth')
const port = 80;
require('dotenv').config();

app.use(
    basicAuth({
        authorizer: (username, password) => {
            const userMatches = basicAuth.safeCompare(username, process.env.USER_BASICAUTH);
            const passwordMatches = basicAuth.safeCompare(password, process.env.PASSWORD_BASICAUTH);

            return userMatches & passwordMatches;
        },
        unauthorizedResponse: (req) => {
            return "Acesso negado!"
        }
    })
)

const clienteServiceProxy = httpProxy("http://localhost:3001");
const carrinhoServiceProxy = httpProxy("http://localhost:3003");
const ingressoServiceProxy = httpProxy("http://localhost:3004");

app.get("/", (req, res) => res.send("Gateway API online!"))
app.get('/clientes', (req, res, next) => clienteServiceProxy(req, res, next));
app.get('/clientes/:id', (req, res, next) => clienteServiceProxy(req, res, next));
app.post('/clientes', (req, res, next) => clienteServiceProxy(req, res, next));
app.put('/clientes/:id', (req, res, next) => clienteServiceProxy(req, res, next));
app.delete('/clientes/:id', (req, res, next) => clienteServiceProxy(req, res, next));

app.get('/carrinhos', (req, res, next) => carrinhoServiceProxy(req, res, next));
app.get('/carrinhos/:id', (req, res, next) => carrinhoServiceProxy(req, res, next));
app.post('/carrinhos', (req, res, next) => carrinhoServiceProxy(req, res, next));
app.put('/carrinhos/:id', (req, res, next) => carrinhoServiceProxy(req, res, next));
app.delete('/carrinhos/:id', (req, res, next) => carrinhoServiceProxy(req, res, next));

app.get('/ingressos', (req, res, next) => ingressoServiceProxy(req, res, next));
app.get('/ingressos/:id', (req, res, next) => ingressoServiceProxy(req, res, next));
app.post('/ingressos', (req, res, next) => ingressoServiceProxy(req, res, next));
app.put('/ingressos/:id', (req, res, next) => ingressoServiceProxy(req, res, next));
app.delete('/ingressos/:id', (req, res, next) => ingressoServiceProxy(req, res, next));

app.listen(port, (err) => {
    if (err) { return console.log(err) }

    console.log("Servidor iniciado na porta " + port)
})

