const getDb = require('../config/database')

exports.getDocumentsForTripController = async (req, res) => {
  res.json(res.documents)
}

exports.updateDocumentsController = async (req, res) => {
  const db = await getDb()
  const documentsId = res.documents.id
  const {
    passport,
    visa,
    id_card,
    eu_covid_certificate,
    covid_pcr_test,
    covid_antigen_test,
    vaccination_certificate,
    driving_licence,
    trip_id,
    user_id,
    ehic,
  } = req.body
  try {
    if (
      passport === undefined ||
      visa === undefined ||
      id_card === undefined ||
      eu_covid_certificate === undefined ||
      covid_pcr_test === undefined ||
      covid_antigen_test === undefined ||
      vaccination_certificate === undefined ||
      driving_licence === undefined ||
      trip_id === undefined ||
      user_id === undefined ||
      ehic === undefined
    ) {
      return res.status(400).json({ message: 'Bad request' })
    }
    await db.query(
      'UPDATE documents_lists SET passport = ?, visa = ?, id_card = ?, eu_covid_certificate = ?, covid_pcr_test = ?, covid_antigen_test = ?, vaccination_certificate = ?, driving_licence = ?, trip_id = ?, user_id = ?, ehic = ? WHERE id = ?',
      [
        passport,
        visa,
        id_card,
        eu_covid_certificate,
        covid_pcr_test,
        covid_antigen_test,
        vaccination_certificate,
        driving_licence,
        trip_id,
        user_id,
        ehic,
        documentsId,
      ]
    )
    const updatedDocuments = await db.query('SELECT * FROM documents_lists WHERE id = ?', [documentsId])
    res.status(200).json(updatedDocuments[0][0])
  } catch (error) {
    res.status(500).json({ message: error.message })
    process.exit(1)
  }
}

exports.findDocuments = async (req, res, next) => {
  const db = await getDb()
  let documents
  try {
    const dbDocuments = await db.query('SELECT * FROM documents_lists WHERE trip_id = ?', [req.params.id])
    if (dbDocuments[0].length === 0) {
      return res.status(404).json({ message: 'Cannot find documents' })
    }
    documents = dbDocuments[0][0]
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
  res.documents = documents
  next()
}
