const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')
const app = express()




dotenv.config();
app.use(cors());
app.use(express.json());




mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Заявки ');
    })
    .catch(err => {
        console.log('Ошибка подключения к MongoDB:', err);
    });


const VoprosSchema = new mongoose.Schema({
  
      name: { type: String ,required: true  },
      telef: { type: String ,required: true  },
      cont: { type: String ,required: true  },
 
      


},{ timestamps: true });

const Vopros = mongoose.model('Vopros', VoprosSchema);


app.post( '/voprosi', async(req ,res) => {
  
   try{
    const {name,telef,cont } = req.body
    const zauv = new Vopros({name,telef,cont});
    await zauv.save()
    return res.sendStatus(200)
   }catch(error){
   return req.sendStatus(400)

   }
  

})

app.get( '/vopr' , async (req,res)=> {

  try{
    const application = await Vopros.find().lean()
    return res.status(200).json(application )

  }catch(error){
   return res.sendStatus(400)

  }

})

app.delete('/vopr/:id', async (req, res) => {
  try {
    const deleted = await Vopros.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Не найдено' });
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;
