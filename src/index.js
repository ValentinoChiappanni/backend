require('dotenv').config();
require('module-alias/register');
const express = require("express");
const cors = require('cors');

//routes
const affiliateRoutes = require("@routes/affiliateRoutes");
const planRoutes = require('@routes/planRoutes');
const therapeuticSituationRoutes = require('@routes/therapeuticSituationRoutes')

// Providers
const providerRoute = require('./interfaces/routes/providerRoute');
const specialtyRoute = require('./interfaces/routes/specialtyRoute');

const app = express();

// Configuración de CORS
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());

// Rutas
app.use("/api", affiliateRoutes);
app.use("/api", planRoutes);
app.use("/api", therapeuticSituationRoutes)
app.use(providerRoute);
// Specialty routes mounted at root (no /api prefix)
app.use(specialtyRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`✅ CORS enabled for: ${corsOptions.origin}`);
});
