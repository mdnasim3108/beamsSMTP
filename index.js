const express = require("express");
const cors = require("cors");
const { response } = require("express");
require("dotenv").config();
const app = express();
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb' }));
app.use(cors({ origin: true, credentials: true }));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SEND_GRID_API_KEY)
app.post('/send-email', (req, res) => {
    const { to, subject, text,html } = req.body;
    
    const msg = {
      to,
      from: 'info@beams.world',
      subject,
      html,
      text
    };
  
    sgMail.send(msg)
      .then(() => {
        res.status(200).json({ message: 'Email sent successfully' });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error });
      });
  });
