const db = require('../../database/models');
const sequelize = db.sequelize;


const genresController = {
    'list': async (req, res) => {
        try {
            let genres = await db.Genre.findAll()

            let response = {
                meta : {
                    status : 200,
                    total : genres.length,
                    url : "/api/genres"
                },
                data : genres
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }
    },
    'detail': async (req, res) => {
        try {
            let genre = await db.Genre.findByPk(req.params.id)

            let response = {
                meta : {
                    status : 200,
                    total : genre.length,
                    url : "/api/genres"
                },
                data : genre
            }
            return res.status(200).json(response)

        } catch (error) {
            return console.log(error)
        }
        
            
    }

}

module.exports = genresController;