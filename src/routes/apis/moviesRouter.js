const express = require('express');
const router = express.Router();
const { create,list,detail, destroy, news, recomended, update } = require('../../controllers/api/moviesController');

router.get('/', list);
router.get('/:id', detail);
router.get("/news",news);
router.get("/recomended",recomended);
router.put("/update", update);
router.post("/create", create);
router.delete("/destroy", destroy);


module.exports = router;