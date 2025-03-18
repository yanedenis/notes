<script>
import SearchBar from './components/SearchBar.vue';
import CreateBtn from './components/CreateBtn.vue';
import Folders from './components/Folders.vue';
import Notes from './components/Notes.vue';
import Note from './components/Note.vue';

import axios from 'axios';

export default {
    components: { SearchBar, CreateBtn, Folders, Notes, Note },

    data() {
        return {
            notes: [],
            originalNotes: [], // Store the original list of notes
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
        searchNotes(query) {
            query = query.trim().toLowerCase();
            if (!query) {
                this.notes = this.originalNotes; // Reset to original notes if query is empty
                return;
            }

            this.notes = this.originalNotes.filter(note => 
                note.title.toLowerCase().includes(query) || 
                note.text.toLowerCase().includes(query)
            );
        },
        openNote(index) {
            this.activeNote = this.originalNotes.find(note => note.id == index);
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
                this.originalNotes = notes.data; // Store the original notes
                this.notes.sort((a, b) => {
                    const dateA = new Date(a.date.split('.').reverse().join('-'));
                    const dateB = new Date(b.date.split('.').reverse().join('-'));
                    return dateB - dateA; // Sort descending
                });
            } catch (err) {
                console.error('Error fetching data:', err);
            }
        },
        /* Functions for updating page dynamically */
        updateNotesList(updatedNote) {
            const noteIndex = this.notes.findIndex(note => note.id === updatedNote.id);
            if (noteIndex !== -1) {
                this.notes.splice(noteIndex, 1, updatedNote); // Updating existing note
                this.originalNotes.splice(noteIndex, 1, updatedNote); // Update original notes
            } else {
                this.notes.push(updatedNote); // Adding new note
                this.originalNotes.push(updatedNote); // Add to original notes
            }
        },
        handleNoteDelete(deletedNoteId) {
            this.notes = this.notes.filter(note => note.id !== deletedNoteId);
            this.originalNotes = this.originalNotes.filter(note => note.id !== deletedNoteId);
        }
    },
}

</script>

<template>
    <div>
        <!-- Variable activeNote allows to dynamically open note that was pressed -->
        <div class="menu" v-if="(!activeNote)">
            <aside class="menu__side-bar">
                <CreateBtn :createNote="createNote" />
                <Folders :notes="originalNotes" :openNote="openNote" :truncateText="truncateText" :folders="folders" />
            </aside>
            <main class="menu__content">
                <SearchBar :searchNotes="searchNotes" />
                <Notes :notes="notes" :openNote="openNote" :truncateText="truncateText" :folders="folders" />
            </main>
        </div>
        <Note v-else :activeNote="activeNote" :closeNote="closeNote" :folders="folders" :updateNotesList="updateNotesList" :handleNoteDelete="handleNoteDelete" />
    </div>
</template>

<style scoped lang="scss">
.menu {
    display: grid;
    grid-template-columns: 15vw 1fr;
    gap: 2vw;
    padding: max(2vw, 14px);
    border-radius: 20px;
    width: 100vw;
    height: 100dvh;
}

.menu__side-bar {
    @include background_whiteness(5);
    position: sticky;
    top: 0;
    left: 0;
}
</style>
