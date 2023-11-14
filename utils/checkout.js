const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

const createCheckoutSession = async (req, res, next) => {
    try {
        console.log(req.body.cart)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.cart.map((item) => {
                const storeItem = item;
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: `${storeItem.name} - ${storeItem.size}`,
                        },
                        unit_amount: storeItem.priceInCents,
                    },
                    quantity: item.qty,
                };
            }),
            success_url: `${process.env.CLIENT_URL}#/success`,
            cancel_url: process.env.CLIENT_URL,
        });
        res.locals.session = session;
        console.log(session)
        next();
    } catch (e) {
        res.status(500).json({ error: e.message });
    } 
};

module.exports = createCheckoutSession;
   