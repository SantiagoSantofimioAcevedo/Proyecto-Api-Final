import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import connection from './db';

const app = express();
app.use(express.json());

// Rutas para usuarios
app.get('/users', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM users');
        res.json(rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

app.post('/users', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [result] = await connection.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, password]
        );
        res.status(201).json({ id: (result as any).insertId, name, email });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

// Ruta para mecánicos
app.post('/mechanics', async (req, res) => {
    const { name, email, password, currentLocation } = req.body;

    // Validaciones básicas
    if (!name || !email || !password || !currentLocation) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await connection.execute(
            'INSERT INTO mechanics (name, email, password, current_location) VALUES (?, ?, ?, ST_GeomFromText(?))',
            [name, email, password, `POINT(${currentLocation.lat} ${currentLocation.lng})`]
        );
        res.status(201).json({ id: (result as any).insertId, name, email });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

// Rutas para servicios
app.post('/services', async (req, res) => {
    const { userId, mechanicId, vehicleInfo, status } = req.body;

    
    if (!userId || !mechanicId || !vehicleInfo) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const [result] = await connection.execute(
            'INSERT INTO services (user_id, mechanic_id, vehicle_info, status) VALUES (?, ?, ?, ?)',
            [userId, mechanicId, vehicleInfo, status || 'requested']
        );
        res.status(201).json({ id: (result as any).insertId, userId, mechanicId, vehicleInfo, status: status || 'requested' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

app.get('/services', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM services');
        res.json(rows);
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Unknown error' });
        }
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



