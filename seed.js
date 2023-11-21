const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv')
const path = require('path');
dotenv.config()
const Bean = require("./model/bean");
const Merch = require("./model/merch");
const BakedGoods = require('./model/bakedGood')

cleanupUnusedImages = require("./utils/cleanUploadsFOlder");

const beanSeedData = [
    {
        name: "Signature",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1000, // Replace with the actual price in cents
        Collection: "Blend",
        region: "South America",
        roast: 'Medium',
        type: "Whole",
        stock: 0,
        dropdowns: {
            ingredients: "Beans",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Dark roast",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1000, // Replace with the actual price in cents
        Collection: "Blend",
        region: "Huila Department, Colombia",
        roast: 'Medium',
        type: "Whole",
        stock: 10,
        dropdowns: {
            ingredients: "Beans",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Medium roast, Caramel",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1000, // Replace with the actual price in cents
        Collection: "Blend",
        region: "South America",
        roast: 'Medium',
        type: "Whole",
        stock: 5,
        dropdowns: {
            ingredients: "Beans, caramel",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Decaf",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1200, // Replace with the actual price in cents
        Collection: "Decaf",
        region: "Central America",
        roast: 'Light',
        type: "Whole",
        stock: 15,
        dropdowns: {
            ingredients: "Decaffeinated beans",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Espresso Blend",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1100, // Replace with the actual price in cents
        Collection: "Blend",
        region: "Ethiopia",
        roast: 'Dark',
        type: "Ground",
        stock: 8,
        dropdowns: {
            ingredients: "Beans",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Single Origin: Kenya",
        image: 'uploads/beanBag.png',
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        priceInCents: 1300, // Replace with the actual price in cents
        Collection: "Single Origin",
        region: "Kenya",
        roast: 'Medium',
        type: "Whole",
        stock: 12,
        dropdowns: {
            ingredients: "Beans",
            reviews: ['No reviews on this product yet.']
        }
    },
];

const merchSeedData = [
    {
        name: "Mug",
        description: "Lorem ipsum dolor sit amet.",
        image: 'path/to/mug-image.jpg', // Replace with the actual image path
        priceInCents: 1099, // Replace with the actual price in cents
        classification: "Merch",
        dropdowns: {
            materials: "Ceramic", // Replace with the actual material if applicable
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Womans cropped longsleeve",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        image: 'path/to/longsleeve-image.jpg', // Replace with the actual image path
        priceInCents: 2499, // Replace with the actual price in cents
        classification: "Merch",
        dropdowns: {
            materials: "Cotton", // Replace with the actual material if applicable
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Sweatshirt",
        description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit...",
        image: 'path/to/sweatshirt-image.jpg', // Replace with the actual image path
        priceInCents: 3499, // Replace with the actual price in cents
        classification: "Merch",
        dropdowns: {
            materials: "Fleece", // Replace with the actual material if applicable
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Stu's Logo Sticker",
        description: "Stu's official logo sticker. Perfect for decorating your belongings!",
        image: 'path/to/sticker-image.jpg', // Replace with the actual image path
        priceInCents: 599, // Replace with the actual price in cents
        classification: "Merch",
        dropdowns: {
            materials: "Vinyl",
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        name: "Truckers Hat",
        description: "Classic truckers hat with Stu's logo. Stay stylish and represent!",
        image: 'path/to/hat-image.jpg', // Replace with the actual image path
        priceInCents: 1999, // Replace with the actual price in cents
        classification: "Merch",
        dropdowns: {
            materials: "Polyester",
            reviews: ['No reviews on this product yet.']
        }
    },
];

const bakedGoodsSeedData = [
    {
        classification: 'baked',
        name: 'Banana Bread',
        description: 'Homemade banana bread made with ripe bananas and a hint of cinnamon. Great for breakfast or a snack!',
        priceInCents: 1000,
        image: 'path/to/banana-bread-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Bananas, flour, sugar, eggs, butter, baking soda, salt, cinnamon, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'baked',
        name: '12 Dozen Cookies',
        description: 'A variety pack of delicious cookies, including chocolate chip, oatmeal raisin, and peanut butter.',
        priceInCents: 1500,
        image: 'path/to/cookies-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Flour, sugar, brown sugar, butter, eggs, vanilla extract, baking soda, chocolate chips, oats, raisins, peanut butter',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'assorted',
        name: 'Cinnamon Roll',
        description: 'Soft and gooey cinnamon roll with swirls of cinnamon sugar, topped with cream cheese icing.',
        priceInCents: 500,
        image: 'path/to/cinnamon-roll-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Flour, sugar, cinnamon, yeast, milk, butter, eggs, cream cheese, powdered sugar, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'assorted',
        name: 'Bag of Granola',
        description: 'Nutritious granola mix with a blend of oats, nuts, dried fruits, and honey. A wholesome snack!',
        priceInCents: 1500,
        image: 'path/to/granola-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Oats, almonds, walnuts, dried cranberries, honey, coconut oil, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'doughnut',
        name: 'Raspberry Doughnut',
        description: 'Soft and fluffy doughnut filled with sweet raspberry jam and topped with a raspberry glaze.',
        priceInCents: 180,
        image: 'path/to/raspberry-doughnut-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Flour, sugar, blueberries, milk, butter, eggs, yeast, powdered sugar, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'doughnut',
        name: 'Chocolate Doughnut',
        description: 'Decadent chocolate doughnut with a rich chocolate glaze. A chocolate lover\'s delight!',
        priceInCents: 200,
        image: 'path/to/chocolate-doughnut-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Flour, sugar, cocoa powder, milk, butter, eggs, yeast, powdered sugar, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
    },
    {
        classification: 'doughnut',
        name: 'Maple Doughnut',
        description: 'Classic doughnut with a sweet maple glaze, perfect for a cozy breakfast treat.',
        priceInCents: 160,
        image: 'path/to/maple-doughnut-image.jpg', // Replace with the actual image path
        dropdowns: {
            ingredients: 'Flour, sugar, maple syrup, milk, butter, eggs, yeast, powdered sugar, vanilla extract',
            reviews: ['No reviews on this product yet.']
        }
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