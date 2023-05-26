const { getDogsByName, getDogsById, getAllDogs, createDog, getDogsApi } = require("../Controllers/dogsControllers")

const getDogsHandler = async (req, res) => {
    const { name } = req.query
    //const dogs = await getAllDogs()
    try {
        if(name){
            const dogsByName = await getDogsByName(name)
            dogsByName.length? res.status(200).json(dogsByName) : res.status(400).json(`${name} not found`)      
        }   
        else {
            const dogs = await getAllDogs()
            res.status(200).json(dogs)
        }
       
    } catch (error) {
        res.status(400).json({error:error.message});
    
    }
}

const getDogHandler = async (req, res) => {
    const { id } = req.params
    try {
        if(id){
            const dogById = await getDogsById(id)
            dogById? res.status(200).json(dogById) : res.status(400).json(`Dog with id ${id} not found`)
        }
    } catch (error) {
        res.status(400).json({ error: error.message });

    }
}

const createDogHandler = async (req, res) => {
    const requiredFields = ['name', 'image', 'height', 'weight', 'life_span', 'temperamentId'];
    const missingFields = [];
    requiredFields.forEach(field => {
        if (!req.body[field]) {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        const missingFieldsMsg = `Missing fields: ${missingFields.join(', ')}`;
        res.status(400).json({ error: missingFieldsMsg });
    } else {
        const { name, image, height, weight, life_span, temperamentId } = req.body;
        try {
            const newDog = await createDog(name, image, height, weight, life_span, temperamentId);
            res.status(200).json(newDog);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = {
    getDogsHandler,
    getDogHandler,
    createDogHandler

}