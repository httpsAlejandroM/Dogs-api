const axios = require("axios");
const { Op } = require("sequelize");
const { Dog, Temperament } = require("../db")
const  API_KEY  = "live_FOzu4lM1h36Vo0P4qH6VjkR26qqnn0QDfDykKeDl1Fg0diHP2CkRz2PuHvTGkKTw"



const getDogsApi = async () => {
    const infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data.map(d =>{
    let array = d.height.metric.split(" ")  
    let array2 = d.weight.metric.split(" ")
    return {
            id: d.id,
            name: d.name,
            image: d.image.url,
            height: array.length > 1 ? `${array[0]}cm ${array[1]} ${array[2]}cm`: `${array[0]}cm`,
            weight: array2.length > 1 ? `${array2[0]}kg ${array2[1]} ${array2[2]}kg`: `${array2[0]}kg`,
            temperaments: d.temperament? d.temperament : "",
            life_span: d.life_span,
            created: false
        }
    }
)

 return infoApi
}

const getDogsDatabase = async () => {
    const dogs = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: ["name", "id"],
            through: {
                attributes: []
            }
        }
    }
    )

    return dogs
}

const getAllDogs = async () => {
    const dogsApi = await getDogsApi();
    const dogsDb = await getDogsDatabase();

    return [...dogsApi, ...dogsDb]
}

const getDogsByName = async (name) => {
    const dogs = await Dog.findAll({
        where: {
            name:{
                [Op.iLike]:`%${name}%`
            }
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through:{
                attributes: []
            }
        }
    });

    let dogsArray = await getDogsApi()
    dogsArray = dogsArray.filter(d => d.name.toLowerCase().split(" ").includes(name.toLowerCase()))

    return [...dogs, ...dogsArray]
}

const isUUID = (value) => {
    const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    return uuidPattern.test(value);
  };

  const getDogsById = async (id) => {
    const dogId = Number(id);
    let dogsArray = await getDogsApi();
    
    if (!Number.isNaN(dogId)) {
      return dogsArray.filter(d => d.id === dogId);
    } else if (isUUID(id)) {
      return await Dog.findByPk(id,{
        include: {
          model: Temperament,
          attributes: ["name"],
          through: {
            attributes: []
          }
        }
      });
    } else {
      throw new Error("Invalid ID");
    }
  }

const createDog = async (name, image, height, weight, life_span, temperamentId) => {
    const newDog = await Dog.create({name, image, height, weight, life_span})
     await newDog.addTemperament(temperamentId)
     return newDog
}

module.exports = {
    getDogsByName,
    getAllDogs,
    getDogsById,
    createDog,
    getDogsApi

}