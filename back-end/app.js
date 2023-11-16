const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path');
const cookieParser = require('cookie-parser')
const Stripe = require('stripe')
const stripe = Stripe(process.env.STRIPE_SECRET_KEY)
express.urlencoded({ extended: true })
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())
app.use("/stripe", express.raw({ type: "*/*" }));

app.use('/uploads', express.static(path.join(__dirname + '/uploads')));

require('./src/model/db')
app.use('/api/v1/admin', require('./src/routes/AdminRoute'))
app.use('/api/v1/movie', require('./src/routes/MovieRoute'))
app.use('/api/v1/user', require('./src/routes/UserRoute'))

app.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = await stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY
    );
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }

  // Event when a payment is initiated
  if (event.type === "payment_intent.created") {
    console.log(`${event.data.object.metadata.name} initated payment!`);
  }
  // Event when a payment is succeeded
  if (event.type === "payment_intent.succeeded") {
    console.log(`${event.data.object.metadata.name} succeeded payment!`);
    // fulfilment
  }
  res.json({ ok: true });
});
app.listen(3001, () => {
    console.log('port is listening')
})
