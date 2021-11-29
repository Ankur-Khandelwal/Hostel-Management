const router = require('express').Router();
const passport = require('passport')
const Room = require('../../models/Room')


const { validateRoomInput } = require('../../validation/room')

// GET
// Get a single room defined by id
router.get('/block/:block', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { block } = req.params

  Room.find({ block }).then(room => res.json(room))
    .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch rooms' }))
})


// Get all rooms
router.get('/all', passport.authenticate('jwt', { session: false }), (req, res) => {
  Room.find().then(rooms => res.json(rooms))
    .catch(err => res.status(400).json({ ...err, message: 'Failed to fetch rooms' }))
})

// POST
// Create a room
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { errors, isValid } = validateRoomInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const room = new Room(req.body)

  room.save()
    .then(data => res.json({ success: true, message: 'Room has been created.' }))
    .catch(err => res.status(400).json({ ...err, message: 'Error while creating room.' }))
})

router.delete('/:_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { _id } = req.params

  Room.findByIdAndDelete(_id)
    .then(status => res.json({ succes: true, message: 'Student has been deleted.' }))
    .catch(err => res.json({ ...err, message: 'Failed to delete room.' }))
})

module.exports = router;
