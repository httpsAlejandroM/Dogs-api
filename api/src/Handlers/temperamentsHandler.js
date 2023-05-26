const {  getTemperamentsDb, getTemperaments } = require("../Controllers/temperamentsControllers")

const temperamentsHandler = async (req, res) => {
        const temperaments = await getTemperaments()
    try {
        const allTemperaments = await getTemperamentsDb()
        res.status(200).json(allTemperaments)
        
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

module.exports = {
    temperamentsHandler
}