<script>
import SearchBar from './components/SearchBar.vue';
import AddNote from './components/AddNote.vue';
import Folders from './components/Folders.vue';
import Notes from './components/Notes.vue';
import Note from './components/Note.vue';

import axios from 'axios';

export default {
    components: { SearchBar, AddNote, Folders, Notes, Note },

    data() {
        return {
            notes: [],
            folders: [],
            activeNote: null,
        }
    },
    created() {
        this.fetchData();
    },
    methods: {
        closeNote() {
            this.activeNote = null;
        },
        searchNote(title) {
            title = title?.toLowerCase()

            if (!title) {
                console.log(this.notes)
                return this.notes
            } else {
                console.log(this.notes.filter(note => note.title.toLowerCase().includes(title)))
                return this.notes.filter(note => note.title.toLowerCase().includes(title))
            }
        },
        openNote(index) {
            this.activeNote = this.notes.find(note => note.id == index);
            console.log(this.activeNote);
        },
        truncateText(value, length) {
            if (!value) return '';
            value = value.toString();
            return value.length > length ? value.slice(0, length) + '...' : value;
        },
        createNote(note) {
            this.activeNote = note
        },
        async fetchData() {
            try {
                const notes = await axios.get('http://localhost:3000/notes');
                const folders = await axios.get('http://localhost:3000/folders');
                this.folders = folders.data;
                this.notes = notes.data;
                this.notes.sort((a, b) => {
                    const dateA = new Date(a.date.split('.').reverse().join('-'));
                    const dateB = new Date(b.date.split('.').reverse().join('-'));
                    return dateB - dateA; // Sort descending
                });
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        },
        /* Functions for updating page dynamicaly */
        updateNotesList(updatedNote) {
            const noteIndex = this.notes.findIndex(note => note.id === updatedNote.id);
            if (noteIndex !== -1) {
                this.notes.splice(noteIndex, 1, updatedNote); // Updating existing note
            } else {
                this.notes.push(updatedNote); // Adding new note
            }
        },
        updateNotesListAfterDelete(deletedNoteId) {
            this.notes = this.notes.filter(note => note.id !== deletedNoteId);
        }
    },
}

</script>

<template>
    <main>
        <!-- Variable activeNote allows to dynamicaly open note that was pressed -->
        <div class="menu" v-if="(!activeNote)">
            <aside class="menu__side-bar">
                <AddNote :createNote="createNote" />
                <Folders :notes :openNote="openNote" :truncateText="truncateText" :folders />
            </aside>
            <div class="menu__content">
                <SearchBar :searchNote="searchNote" />
                <Notes :notes :openNote="openNote" :truncateText="truncateText" :folders />
            </div>
        </div>
        <Note v-else :activeNote :closeNote="closeNote" :folders :updateNotesList="updateNotesList" :updateNotesListAfterDelete="updateNotesListAfterDelete" />
    </main>
</template>

<style scoped lang="scss">
.menu {
    display: grid;
    grid-template-columns: 15vw 1fr;
    gap: 2vw;
    // overflow: hidden;
    padding: max(2vw, 14px);
    border-radius: 20px;
    width: 100vw;
    height: 100dvh;
}

.menu__side-bar {
    @include background_whiteness(5);
}
</style>
