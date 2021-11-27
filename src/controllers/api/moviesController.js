const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


const moviesController = {
    list : async (req, res) => {
        try {
            let movies = await db.Movie.findAll({
                include: ['genre']
            })

            let response = {
                meta : {
                    status : 200,
                    total : movies.length,
                    url : "/api/movies"
                },
                data : movies
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }
    },
    'detail': async (req, res) => {

        try {
            let movie = await db.Movie.findByPk(req.params.id,
                {
                    include : ['genre']
                })

            let response = {
                meta : {
                    status : 200,
                    total : movie.length,
                    url : "/api/movies/" + req.params.id
                },
                data : movie
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }

    },
    news: async (req, res) => {

        try {
            let movies = await db.Movie.findAll({
                order : [
                    ['release_date', 'DESC']
                ],
                limit: 5
            })

            let response = {
                meta : {
                    status : 200,
                    total : movies.length,
                    url : "/api/movies/news"
                },
                data : movies
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }

    },
    recomended: async (req, res) => {

        try {
            let movies = await db.Movie.findAll({
                include: ['genre'],
                where: {
                    rating: {[db.Sequelize.Op.gte] : 8}
                },
                order: [
                    ['rating', 'DESC']
                ]
            })
            let response = {
                meta : {
                    status : 200,
                    total : movies.length,
                    url : "/api/movies/recomended"
                },
                data : movies
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }

    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    create: async function (req,res) {
        try {
            let movie = await Movies.create(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                }
            )

            let response = {
                meta : {
                    status : 200,
                    total : movie.length,
                    url : "/api/movies/create"
                },
                data : movie
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }

    },

    update: async function (req,res) {
        try {
            let movieId = req.params.id;
            let movie = await db.Movies.update(
                {
                    title: req.body.title,
                    rating: req.body.rating,
                    awards: req.body.awards,
                    release_date: req.body.release_date,
                    length: req.body.length,
                    genre_id: req.body.genre_id
                },
                {
                    where: {id: movieId}
                })

            let response = {
                meta : {
                    status : 200,
                    total : movie.length,
                    url : "/api/movies/update" + movieId
                },
                data : movie
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }

    },

    destroy: async function (req,res) {
        try {
            let movieId = req.params.id;
            let movie = await db.Movies.destroy({where: {id: movieId}, force: true})
            let response = {
                meta : {
                    status : 200,
                    total : movie.length,
                    url : "/api/movies/destroy" + movieId
                },
                data : movie
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }
    }
}

module.exports = moviesController;