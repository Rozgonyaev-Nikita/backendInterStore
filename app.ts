import * as express from "express";
import { Request, Response } from "express";
import { myDataSource } from "./data-source";
import { Products } from "./entity/products";
import { Rating } from "./entity/rating";
import cors from "cors";

// establish database connection
myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());
app.use(cors());
// register routes
app.get("/", async function (req: Request, res: Response) {
  // const product = await myDataSource.getRepository(Products).find();
  const photoRepository = myDataSource.getRepository(Products);
  const products = await photoRepository.find({
    relations: {
      rating: true,
    },
  });

  res.json(products);
  // console.log(products);
});

////

app.get(
  "/category/:category/:limit",
  async function (req: Request, res: Response) {
    const { category, limit } = req.params;

    const products = await myDataSource.getRepository(Products).find({
      where: {
        category: category, // Указываем поле для фильтрации и передаем значение из параметра category
      },
      take: Number(limit), // Указываем ограничение на количество записей
    });
    //   res.send("feefef");
    res.json(products);
    console.log(category);
  }
);

app.post("/addProduct", async function (req: Request, res: Response) {
  const {
    id,
    title,
    description,
    price = 0,
    category,
    image = "",
    rating,
  } = req.body;
  console.log("rating", rating);
  // const rating = new Rating();
  rating.rate = rating.rate || 0;
  rating.count = rating.count || 0;

  const product = new Products();
  // product.id = id;
  product.title = title;
  product.description = description;
  product.price = price;
  product.category = category;
  product.rating = rating;
  product.image = image;

  const productRepository = myDataSource.getRepository(Products);
  const ratingRepository = myDataSource.getRepository(Rating);
  await ratingRepository.save(rating);
  await productRepository.save(product);

  // await myDataSource.getRepository(Products).save(product);

  // await ratingRepository.save(rating);

  // return res.send("Product added successfully!");
  return res.json(product);
});

app.delete("/productDel/:id", async function (req: Request, res: Response) {
  const results = await myDataSource
    .getRepository(Products)
    .delete(req.params.id);
  return res.send(results);
});

app.patch("/updateProduct/:id", async (req: Request, res: Response) => {
  try {
    // const id = req.params.id;
    // const dataToUpdate = req.body; // Данные для обновления
    const userRepository = myDataSource.getRepository(Products);
    const user = await myDataSource.getRepository(Products).findOneBy({
      id: Number(req.params.id),
    });
    // const user = await userRepository.findOne(req.params.id);
    userRepository.merge(user, req.body);
    const updatedUser = await userRepository.save(user);
    res.json(updatedUser);
    // Ваш код для обновления данных в базе данных с использованием TypeORM
    // Например, можно использовать метод `findOneOrFail` для поиска записи и обновить ее с помощью метода `save`
  } catch (error) {
    console.error("Error updating data:", error);
    res.status(500).json({ success: false, message: "Error updating data" });
  }
});

// start express server
app.listen(5000);
