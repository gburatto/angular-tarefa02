const express = require('express');

const router = express.Router();

const CATEGORIAS = [
  {
    "_id": 1,
    "nome": "Comédia",
  },
  {
    "_id": 2,
    "nome": "Fantasia",
  },
  {
    "_id": 3,
    "nome": "Crime",
  },
  {
    "_id": 4,
    "nome": "Drama",
  },
  {
    "_id": 5,
    "nome": "Aventura",
  },
  {
    "_id": 6,
    "nome": "Terror",
  },
  {
    "_id": 7,
    "nome": "Animação",
  },
  {
    "_id": 8,
    "nome": "Mistério",
  },
  {
    "_id": 9,
    "nome": "Ação",
  },
  {
    "_id": 10,
    "nome": "Romance",
  },
  {
    "_id": 11,
    "nome": "Musical",
  },
  {
    "_id": 12,
    "nome": "Família",
  },
  {
    "_id": 13,
    "nome": "História",
  },
  {
    "_id": 14,
    "nome": "Ficção Científica",
  },
  {
    "_id": 15,
    "nome": "Suspense",
  },
];

router.get('/', function(req, res, next) {
  res.json(CATEGORIAS);
});

module.exports = router;
