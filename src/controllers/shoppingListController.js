const getDb = require('../../config/database')

exports.getItemsController = async (req, res) => {
  const db = await getDb()
  const tripId = req.params.tripId
  try {
    if (!tripId) return res.status(400).json({ message: 'Bad request' })
    const items = await db.query('SELECT * FROM shopping_lists WHERE trip_id = ?', [tripId])
    res.status(200).json(items[0])
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.createShoppingItemController = async (req, res) => {
  const db = await getDb()
  const { title, amount, unit, user_id, trip_id } = req.body
  try {
    if (!title || !amount || !unit || !user_id || !trip_id) return res.status(400).json({ message: 'Bad request' })
    const item = await db.query(
      'INSERT INTO shopping_lists (title, amount, unit, status, user_id, trip_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, amount, unit, 'TO_BUY', user_id, trip_id]
    )
    const selectNewItem = await db.query('SELECT * FROM shopping_lists WHERE id = ?', [item[0].insertId])
    const itemToSend = selectNewItem[0][0]
    res.status(200).json( itemToSend )
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.updateItemController = async (req, res) => {
  const db = await getDb()
  const { id, title, amount, unit, status, trip_id, user_id } = req.body
  try {
    if ((id, title, amount, unit, status, trip_id, user_id)) {
      await db.query(
        'UPDATE shopping_lists SET id = ?, title = ?, amount = ?, unit = ?, status = ?, trip_id = ?, user_id = ? WHERE id = ?',
        [id, title, amount, unit, status, trip_id, user_id, id]
      )
      res.status(200).json({ message: 'Updated successfully' })
    } else res.status(400).json({ message: 'Bad request' })
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.deleteItemController = async (req, res) => {
  const db = await getDb()
  const itemId = res.item.id
  try {
    await db.query('DELETE FROM shopping_lists WHERE id = ?', [itemId])
    res.status(204).json({ message: 'Deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.findItem = async (req, res, next) => {
  const db = await getDb()
  let item
  try {
    const dbItem = await db.query('SELECT * FROM shopping_lists WHERE id = ?', [req.params.id])
    if (dbItem[0].length === 0) {
      return res.status(404).json({ message: 'Cannot find item' })
    }
    item = dbItem[0][0]
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.item = item
  next()
}
