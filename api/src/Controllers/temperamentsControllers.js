const axios = require("axios")
const { Dogs, Temperament } = require("../db")
const  API_KEY  = "live_FOzu4lM1h36Vo0P4qH6VjkR26qqnn0QDfDykKeDl1Fg0diHP2CkRz2PuHvTGkKTw"


const getTemperaments = async () => {

        let infoApi = (await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)).data.map(t =>{
        return  t.temperament? t.temperament.split(", ") : []
        

    })

     let array = []
     for(let i = 0; i < infoApi.length; i++){
        for(let j = 0; j < infoApi[i].length; j++){
            array.push(infoApi[i][j])
        }
     }

         let newSet = new Set(array);
            infoApi = Array.from(newSet)

      infoApi.map(async(t) => await Temperament.findOrCreate({where: {name: t}})  )      
      return infoApi
}   

const getTemperamentsDb = async () => {
    const temperamentsDb = await Temperament.findAll()
    return temperamentsDb
}

module.exports = {
    getTemperaments,
    getTemperamentsDb
}