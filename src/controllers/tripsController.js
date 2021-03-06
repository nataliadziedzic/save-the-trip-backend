const db = require('../../config/database')

exports.getTripsController = async (req, res) => {
  const userId = req.params.userId
  try {
    if (!userId) return res.status(400).json({ message: 'Bad request' })
    const trips = await db.query('SELECT * FROM trips WHERE user_id = ?', [userId])
    res.status(200).json(trips[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.getSingleTripController = async (req, res) => {
  const trip = res.trip
  if(+req.params.userId === trip.user_id){
    res.status(200).json(res.trip)
  }
}

exports.createTripController = async (req, res) => {
  const { title, description, user_id, start_date, img } = req.body
  try {
    if (!user_id || !title || !description || !start_date) return res.status(400).json({ message: 'Bad request' })
    const newTrip = await db.query('INSERT INTO trips (title, description, user_id, start_date) VALUES (?, ?, ?, ?)', [
      title,
      description,
      user_id,
      start_date,
    ])
    const documentsListForTrip = await db.query('INSERT INTO documents_lists (trip_id, user_id) VALUES (?, ?)', [
      newTrip[0].insertId,
      user_id,
    ])
    const selectNewTrip = await db.query('SELECT * FROM trips WHERE id = ?', [newTrip[0].insertId])
    res.status(200).json({ trip: selectNewTrip[0][0], documents_list_id: documentsListForTrip[0].insertId })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.updateTripController = async (req, res) => {
  const tripId = res.trip.id
  const { title, description, img, start_date } = req.body
  try {
    if (title) {
      await db.query('UPDATE trips SET title = ? WHERE id = ?', [title, tripId])
    }
    if (description) {
      await db.query('UPDATE trips SET description = ? WHERE id = ?', [description, tripId])
    }
    // delete current ?
    if (img) { await db.query('UPDATE trips SET img = ? WHERE id = ?', [img, tripId])}
    if (start_date) {
      await db.query('UPDATE trips SET start_date = ? WHERE id = ?', [start_date, tripId])
    }
    res.status(200).json({ message: 'Updated successfully' })
  } catch (error) {
        res.status(500).json({ message: error.message })
        process.exit(1)
  }
}

exports.deleteTripController = async (req, res) => {
  const tripId = res.trip.id
  try {
    await db.query('DELETE FROM documents_lists WHERE trip_id = ?', [tripId])
    await db.query('DELETE FROM trips WHERE id = ?', [tripId])
    res.status(204).json({ message: 'Deleted successfully' })
  } catch (error) {
        res.status(500).json({ message: error.message })
        process.exit(1)
  }
}

exports.findTrip = async (req, res, next) => {
  let trip
  try {
    const dbTrips = await db.query('SELECT * FROM trips WHERE id = ?', [req.params.id])
    if (dbTrips[0].length === 0) {
      return res.status(404).json({ message: 'Cannot find trip' })
    }
    trip = dbTrips[0][0]
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.trip = trip
  next()
}
