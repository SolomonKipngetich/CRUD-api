const express = require('express')
const router = express.Router()
const Alien = require('../models/alien')


router.get ('/', async(req,res) => {
    try {
        const alien = await Alien.find()
        res.json(alien)
    } catch (error) {
        res.send("Error" + error)
    }
    
})

router.post ('/', async(req,res) => {
    const alien = new Alien({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    })
    
    try {
        const a1 = await alien.save()
        res.json(a1)
        
    } catch (error) {
        res.send("Error" + error)
    }
    
})

router.get ('/:id', async(req,res) => {
    
    try {
        const alien = await Alien.findById(req.params.id)
        res.json(alien)
        
    } catch (error) {
        res.send("Error No such id present" )
    }
    
})

router.patch("/:id", async (req,res) => {
    try {
        const alien = await Alien.findById(req.params.id)
        alien.sub = req.body.sub
        const a1 = await alien.save()
        res.json(a1)

    } catch (error) {
        res.send('Error')
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const alien = await Alien.findById(req.params.id);
        
        if (!alien) {
            return res.send("Alien not found");
        }
        
        await alien.deleteOne(); 
        res.send("Deleted successfully");
    } catch (error) {
        console.error("Error deleting alien:", error.message);
        res.send("No such alien");
    }
});


module.exports = router