import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import pkg from 'pg';
const { Pool } = pkg;
import cors from 'cors';
import { getNotes, addNote, getFolders, addFolder, updateNote, deleteNote } from './queries.js';

const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

export const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});


// Notes endpoints
app.get('/notes', async (req, res) => {
    try {
        const result = await getNotes();
        res.json(result);
    } catch (err) {
        res.status(500).send('ENDPOINT: Cannot get notes');
        console.error(err);
    }
});

app.post('/notes', async (req, res) => {
    const { title, text, folder_id } = req.body;
    console.log("\n🌐 SERVER|Note for post", req.body)
    try {
        const newNote = await addNote(title, text, folder_id);
        res.status(201).json(newNote);
    } catch (err) {
        res.status(500).send('ENDPOINT: Error adding note');
        console.error(err);
    }
});

app.put('/notes', async (req, res) => {
    const { id, title, text, folder_id } = req.body;
    console.log('\n🌐 SERVER|Note for put:', req.body);
    try {
        const updatedNote = await updateNote(id, title, text, folder_id);
        res.status(201).json(updatedNote);
    } catch (err) {
        res.status(500).send("ENDPOINT: Can't save note");
        console.error(err);
    }
});

app.delete('/notes/:id', async (req, res) => {
    const { id } = req.params;
    console.log('\n🌐 SERVER|Deleting note:', id);
    try {
        const deletedNote = await deleteNote(id);
        res.status(200).json(deletedNote);
    } catch (err) {
        res.status(500).send("ENDPOINT: Can't delete note");
        console.error(err);
    }
})


// Folders endpoints
app.get('/folders', async (req, res) => {
    try {
        const result = await getFolders();
        res.json(result)
    } catch (err) {
        console.error(err);
        res.status(500).send('ENDPOINT: Cannot get folders')
    }
})

app.post('/folders', async (req, res) => {
    const { name } = req.body;
    console.log('\n🌐 SERVER|Created folder: ', name)
    try {
        const newFolder = await addFolder(name);
        res.status(201).json(newFolder);
    } catch (err) {
        res.status(500).send('ENDPOINT: Error adding folder')
        console.error(err)
    }
})


app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
