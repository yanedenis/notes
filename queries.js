import { pool } from './server.js'

const getNotes = async () => {
    try {
        const res = await pool.query('SELECT * FROM notes');
        return res.rows;
    } catch (err) {
        console.error('DATABASE: Error getting notes:', err);
        throw err;
    }
};

const addNote = async (title, text, folder_id = null) => {
    try {
        const res = await pool.query(`INSERT INTO notes (title, text, folder_id) VALUES ('${title}', '${text}', ${folder_id}) RETURNING *`);
        return res.rows[0];
    } catch (err) {
        console.error('DATABASE: Error adding note:', err);
        throw err;
    }
};

const updateNote = async (id, title, text) => {
    try {
        const res = await pool.query(`UPDATE notes SET title = '${title}', text = '${text}' WHERE id = ${id} RETURNING *`);
        return res.rows[0];
    } catch (err) {
        console.error("DATABASE: Error updating note");
        throw err;
    }
}

const deleteNote = async (id) => {
    try {
        const res = await pool.query(`DELETE FROM notes WHERE id = ${id} RETURNING *`);
        return res.rows[0];
    } catch (err) {
        console.error("DATABASE: Error deleting note");
        throw err;
    }
}

// Function for getting folders
const getFolders = async () => {
    try {
        const res = await pool.query('SELECT * FROM folders');
        return res.rows;
    } catch(err) {
        console.error('DATABASE: Error getting folders:', err);
        throw err;
    }
};

// Function for adding folder
const addFolder = async (name) => {
    try {
        const res = await pool.query(`INSERT INTO folders(name) VALUES (${name}) RETURNING *`)
        return res.rows[0];
    } catch(err) {
        console.error('DATABASE: Error adding folder', err);
        throw err;
    }
};

export { getNotes, addNote, getFolders, addFolder, updateNote, deleteNote };
