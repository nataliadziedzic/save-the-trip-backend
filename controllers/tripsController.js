const getDb = require('../config/database')

exports.getTripsController = async (req, res) => {
  const db = await getDb()
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
  res.json(res.trip)
}

exports.createTripController = async (req, res) => {
  const db = await getDb()
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

exports.getTrip = async (req, res, next) => {
  console.log('get by id')
  const db = await getDb()
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
