const { ctrlWrapper } = require("../../helpers");
const { Diary } = require("../../models/diary");

const addProduct = async (req, res) => {
    const { _id: owner } = req.user;
    
    const {
        productId,
        date,
        calories,
        amount,
      } = req.body;


      const newProduct = {
        productId,
        calories,
        amount,
      };

      const oldProduct = await Diary.findOne({ date, owner });

      if(!oldProduct){
       const newProductDiary=await Diary.create({
            owner,
            date,
            Calories: calories,
            amountAll: amount,
            products: [newProduct]
        });
        res.status(201).json(newProductDiary);
      }
      else{

        upDateProduct = await Diary.findOneAndUpdate(
          { date, owner },
            {
              $inc: { Calories: +calories, amountAll: +amount }, 
              $push: { products: { productId, amount, calories } }, 
            },
            {new: true}
          );
          res.status(200).json(upDateProduct);
      }

};

module.exports = ctrlWrapper(addProduct);