let express = require('express');
let router = express.Router();
let validateSession = require('../middleware/validate-session');
const Logbook = require('../db').import('../models/loogbook');


router.post('/', validateSession, (req, res) => {
    const logbookEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result,
        owner_id: req.user.id
    }
    Logbook.create(logbookEntry)
        .then(logbook => res.status(200).json(logbook))
        .catch(err => res.status(500).json({ error: err }))
})

// router.get("/all", (req, res) => {
//     Logbook.findAll()
//         .then(logbooks => res.status(200).json(logbooks))
//         .catch(err => res.status(500).json({ error: err }))
// });

router.get('/', validateSession, (req, res) => {
    let userid = req.user.id
    Logbook.findAll({
        where: { owner_id: userid }
    })
        .then(logbooks => res.status(200).json(logbooks))
        .catch(err => res.status(500).json({ error: err }))
});

// router.get('/:title', function (req, res) {    
//     let title = req.params.title;

//     Logbook.findAll({
//         where: { title: title }
//     })
//         .then(logbooks => res.status(200).json(logbooks))
//         .catch(err => res.status(500).json({ error: err }))
// });

router.put("/:id", validateSession, function (req, res) {
    const updateLogbookEntry = {
        description: req.body.log.description,
        definition: req.body.log.definition,
        result: req.body.log.result
    };

    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Logbook.update(updateLogbookEntry, query)
        .then((logbooks) => res.status(200).json(logbooks))
        .catch((err) => res.status(500).json({ error: err }));
})

router.delete("/:id", validateSession, function (req, res) {
    const query = { where: { id: req.params.id, owner_id: req.user.id } };

    Logbook.destroy(query)
        .then(() => res.status(200).json({ message: "Logbook Entry Removed" }))
        .catch((err) => res.status(500).json({ error: err }));
});


module.exports = router

