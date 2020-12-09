const express =  require ('express')
const router = express.Router();
const Pusher = require('pusher')


let message = require('../models/message')
const auth = require("../middleware/auth");




router.route('/message').get((req, res)=>{
    message.find()
    .then(messageData=>{
        res.json(messageData)
    })
    .catch(err => res.send("error " + err))
})

router.route('/message/new').post((req, res)=>{
    let dbMessage = req.body

    message.create(dbMessage, (err, data)=>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})

// delete route
router.route('/message/:id').delete((req, res)=>{
    message.findByIdAndDelete(req.params.id)
    .then(data=>{
        res.json(`deleted > ${data}`)
    })
    .catch(err => res.status(400).send(err))
})




module.exports = router


