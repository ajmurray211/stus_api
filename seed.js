const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const Bean = require("./model/bean");
const Merch = require("./model/merch");
const BakedGoods = require('./model/bakedGood')
const cleanupUnusedImages = require("./utils/cleanUploadsFOlder");

const beanSeedData = [
    {
        name: "Signature",
        productId: "1",
        region: "South America",
        type: "Blend",
        variants: [
            {
                productImages: [],
                sizeOptions: [
                    {
                        name: "12 ounces",
                        priceInCents: 800
                    },
                    {
                        name: "1 lb",
                        priceInCents: 1500
                    },
                    {
                        name: "2 lbs",
                        priceInCents: 2500
                    }
                ]
            }
        ],
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, odit enim. Laborum debitis assumenda consequatur fugit.Natus perspiciatis fugit, non nihil vel praesentium omnis qui veritatis totam repudiandae placeat est.Ut facere magni ducimus pariatur dolorem at accusantium quibusdam, quam sequi nesciunt inventore fugiat beatae odiodignissimos asperiores dolore, a sit consequuntur delectus maxime molestiae officiis adipisci reiciendis! Fugit, sequi. Cupiditate consequuntur eos consectetur tempore quisquam tempora odit at ea, perferendis non deserunt atque autem harum nesciunt. Earum a, soluta magni similique excepturi mollitia debitis quae nisi dignissimos tempora. Sit!",
        ingredients: "Beans",
        outOfStock: true
    },
    {
        name: "Dark roast",
        productId: "2",
        region: "Huila Department, Colombia",
        type: "Blend",
        variants: [
            {
                productImages: [],
                sizeOptions: [
                    {
                        name: "12 ounces",
                        priceInCents: 800
                    },
                    {
                        name: "1 lb",
                        priceInCents: 1500
                    },
                    {
                        name: "2 lbs",
                        priceInCents: 2500
                    }
                ]
            }
        ],
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, odit enim. Laborum debitis assumenda consequatur fugit.Natus perspiciatis fugit, non nihil vel praesentium omnis qui veritatis totam repudiandae placeat est.Ut facere magni ducimus pariatur dolorem at accusantium quibusdam, quam sequi nesciunt inventore fugiat beatae odiodignissimos asperiores dolore, a sit consequuntur delectus maxime molestiae officiis adipisci reiciendis! Fugit, sequi. Cupiditate consequuntur eos consectetur tempore quisquam tempora odit at ea, perferendis non deserunt atque autem harum nesciunt. Earum a, soluta magni similique excepturi mollitia debitis quae nisi dignissimos tempora. Sit!",
        ingredients: "Beans",
        outOfStock: false
    },
    {
        name: "Medium roast, Caramel",
        productId: "3",
        region: "South America",
        type: "Blend",
        variants: [
            {
                productImages: [],
                sizeOptions: [
                    {
                        name: "12 ounces",
                        priceInCents: 800
                    },
                    {
                        name: "1 lb",
                        priceInCents: 1500
                    },
                    {
                        name: "2 lbs",
                        priceInCents: 2500
                    }
                ]
            }
        ],
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, odit enim. Laborum debitis assumenda consequatur fugit.Natus perspiciatis fugit, non nihil vel praesentium omnis qui veritatis totam repudiandae placeat est.Ut facere magni ducimus pariatur dolorem at accusantium quibusdam, quam sequi nesciunt inventore fugiat beatae odiodignissimos asperiores dolore, a sit consequuntur delectus maxime molestiae officiis adipisci reiciendis! Fugit, sequi. Cupiditate consequuntur eos consectetur tempore quisquam tempora odit at ea, perferendis non deserunt atque autem harum nesciunt. Earum a, soluta magni similique excepturi mollitia debitis quae nisi dignissimos tempora. Sit!",
        ingredients: "Beans, caramel",
        outOfStock: true
    }
];

const merchSeedData = [
    {
        productID: "M31",
        name: "Mug",
        description: "Lorem ipsum dolor sit amet.",
    },
    {
        productID: "4",
        name: "Womans cropped longsleeve",
        color: "black",

        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, odit enim. Laborum debitis assumenda consequatur fugit.Natus perspiciatis fugit, non nihil vel praesentium omnis qui veritatis totam repudiandae placeat est.Ut facere magni ducimus pariatur dolorem at accusantium quibusdam, quam sequi nesciunt inventore fugiat beatae odiodignissimos asperiores dolore, a sit consequuntur delectus maxime molestiae officiis adipisci reiciendis! Fugit, sequi. Cupiditate consequuntur eos consectetur tempore quisquam tempora odit at ea, perferendis non deserunt atque autem harum nesciunt. Earum a, soluta magni similique excepturi mollitia debitis quae nisi dignissimos tempora. Sit!",
    },
    {
        productID: "ss1",
        name: "Sweatshirt",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, odit enim. Laborum debitis assumenda consequatur fugit.Natus perspiciatis fugit, non nihil vel praesentium omnis qui veritatis totam repudiandae placeat est.Ut facere magni ducimus pariatur dolorem at accusantium quibusdam, quam sequi nesciunt inventore fugiat beatae odiodignissimos asperiores dolore, a sit consequuntur delectus maxime molestiae officiis adipisci reiciendis! Fugit, sequi. Cupiditate consequuntur eos consectetur tempore quisquam tempora odit at ea, perferendis non deserunt atque autem harum nesciunt. Earum a, soluta magni similique excepturi mollitia debitis quae nisi dignissimos tempora. Sit!",
    }
];

const bakedGoodsSeedData = [
    {
        classification: 'baked',
        name: 'Carrot Cake',
        description: 'A moist and flavorful carrot cake topped with cream cheese frosting. Perfect for any occasion!',
        priceInCents: 2000, // 20$
        image: 'carrot-cake.jpg', // Add the actual image file path or URL
        ingredients: 'Carrots, flour, sugar, eggs, oil, cinnamon, cream cheese, butter, vanilla extract, powdered sugar'
    },
    {
        classification: 'baked',
        name: 'Everything Bagel',
        description: 'A classic everything bagel topped with a mix of sesame seeds, poppy seeds, garlic, onion, and salt.',
        priceInCents: 120, // $1.20
        image: 'everything-bagel.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, water, yeast, sugar, salt, sesame seeds, poppy seeds, garlic, onion'
    },
    {
        classification: 'baked',
        name: 'Banana Bread',
        description: 'Homemade banana bread made with ripe bananas and a hint of cinnamon. Great for breakfast or a snack!',
        priceInCents: 1000, // 10$
        image: 'banana-bread.jpg', // Add the actual image file path or URL
        ingredients: 'Bananas, flour, sugar, eggs, butter, baking soda, salt, cinnamon, vanilla extract'
    },
    {
        classification: 'baked',
        name: '12 Dozen Cookies',
        description: 'A variety pack of delicious cookies, including chocolate chip, oatmeal raisin, and peanut butter.',
        priceInCents: 1500, // 15$
        image: 'cookies.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, sugar, brown sugar, butter, eggs, vanilla extract, baking soda, chocolate chips, oats, raisins, peanut butter'
    },
    {
        classification: 'assorted',
        name: 'Cinnamon Roll',
        description: 'Soft and gooey cinnamon roll with swirls of cinnamon sugar, topped with cream cheese icing.',
        priceInCents: 500, // 5$
        image: 'cinnamon-roll.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, sugar, cinnamon, yeast, milk, butter, eggs, cream cheese, powdered sugar, vanilla extract'
    },
    {
        classification: 'assorted',
        name: 'Bag of Granola',
        description: 'Nutritious granola mix with a blend of oats, nuts, dried fruits, and honey. A wholesome snack!',
        priceInCents: 1500, // 15$
        image: 'granola.jpg', // Add the actual image file path or URL
        ingredients: 'Oats, almonds, walnuts, dried cranberries, honey, coconut oil, vanilla extract'
    },
    {
        classification: 'doughnut',
        name: 'Raspberry Doughnut',
        description: 'Soft and fluffy doughnut filled with sweet raspberry jam and topped with a raspberry glaze.',
        priceInCents: 180, // $1.80
        image: 'raspberry-doughnut.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, sugar, blueberries, milk, butter, eggs, yeast, powdered sugar, vanilla extract'
    },
    {
        classification: 'doughnut',
        name: 'Chocolate Doughnut',
        description: 'Decadent chocolate doughnut with a rich chocolate glaze. A chocolate lover\'s delight!',
        priceInCents: 200, // $2.00
        image: 'chocolate-doughnut.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, sugar, cocoa powder, milk, butter, eggs, yeast, powdered sugar, vanilla extract'
    },
    {
        classification: 'doughnut',
        name: 'Maple Doughnut',
        description: 'Classic doughnut with a sweet maple glaze, perfect for a cozy breakfast treat.',
        priceInCents: 160, // $1.60
        image: 'maple-doughnut.jpg', // Add the actual image file path or URL
        ingredients: 'Flour, sugar, maple syrup, milk, butter, eggs, yeast, powdered sugar, vanilla extract'
    },
];

let mongoURI = ""
if (process.env.NODE_ENV === "production") {
    mongoURI = process.env.DB_URL;
} else {
    mongoURI = process.env.LOCALHOST;
}

mongoose.connect(mongoURI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Connection error'))
db.once('open', () => {
    console.log('Database connected')
})

async function seedDB() {
    try {
        await Bean.deleteMany({});
        await Merch.deleteMany({});
        await BakedGoods.deleteMany({})

        const beans = await Bean.insertMany(beanSeedData);
        console.log(`${beans.length} beans added to the database.`);

        const merch = await Merch.insertMany(merchSeedData);
        console.log(`${merch.length} merch items added to the database.`);

        const bakedgoods = await BakedGoods.insertMany(bakedGoodsSeedData);
        console.log(`${bakedgoods.length} baked items added to the database.`);

        await cleanupUnusedImages()

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding the database:', error);
        mongoose.connection.close();
    }
}

seedDB()