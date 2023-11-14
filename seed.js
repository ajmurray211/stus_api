const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()
const Bean = require("./model/bean");
const Merch = require("./model/merch");
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

        const beans = await Bean.insertMany(beanSeedData);
        console.log(`${beans.length} beans added to the database.`);

        const merch = await Merch.insertMany(merchSeedData);
        console.log(`${merch.length} merch items added to the database.`);

        await cleanupUnusedImages()

        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding the database:', error);
        mongoose.connection.close();
    }
}

seedDB()