const { response, request } = require('express');

const userGet = (req = request, res = response) => {

    const { q, nombre = '', apikey, page = 1, limit } = req.query;

    res.json({
        msg: 'get API - controller',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

const userPut = (req, res = response) => {

    const { id } = req.params;

    res.status(500).json({
        msg: 'put API - controller',
        id
    });
}

const userPost = (req, res = response) => {

    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: 'post API - controller',
        nombre,
        edad
    });
}

const userPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - controller'
    });
}

const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - controller'
    });
}

module.exports = {
    userGet,
    userPut,
    userPost,
    userPatch,
    userDelete
}