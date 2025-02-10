import { pool } from './server.js'

const getNotes = async () => {
    try {
        const res = await pool.query('SELECT * FROM notes');
        return res.rows;
    } catch (err) {
        console.error('QUERY: Error getting notes\n', err);
        throw err;
    }
};

const addNote = async (title, text, folder_id) => {
    try {
        const res = await pool.query(`INSERT INTO notes (title, text, folder_id) VALUES ($1, $2, $3) RETURNING *`, [title, text, folder_id]);
        return res.rows[0];
    } catch (err) {
        console.error('QUERY: Error adding note\n', err);
        throw err;
    }
};

const updateNote = async (id, title, text, folder_id) => {
    try {
        const res = await pool.query(`UPDATE notes SET title = $1, text = $2, folder_id = $3 WHERE id = $4 RETURNING *`, [title, text, folder_id, id]);
        return res.rows[0];
    } catch (err) {
        console.error("QUERY: Error updating note\n");
        throw err;
    }
}

const deleteNote = async (id) => {
    try {
        const res = await pool.query(`DELETE FROM notes WHERE id = $1 RETURNING *`, [id]);
        return res.rows[0];
    } catch (err) {
        console.error("QUERY: Error deleting note\n");
        throw err;
    }
}

const getFolders = async () => {
    try {
        const res = await pool.query('SELECT * FROM folders');
        return res.rows;
    } catch(err) {
        console.error('QUERY: Error getting folders\n', err);
        throw err;
    }
};

const addFolder = async (name) => {
    try {
        const res = await pool.query(`INSERT INTO folders(name) VALUES ($1) RETURNING *`, [name])
        return res.rows[0];
    } catch(err) {
        console.error('QUERY: Error adding folder\n', err);
        throw err;
    }
};

export { getNotes, addNote, getFolders, addFolder, updateNote, deleteNote };
