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
            searchText: null,
            notes: [],
            activeNote: null,
        }
    },
    created() {
        this.fetchNotes();
    },
    methods: {
        closeNote() {
            this.activeNote = null;
        },
        searchNote(title) {
            this.searchText = title;
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
        async fetchNotes() {
            try {
                const response = await axios.get('http://localhost:3000/notes');
                this.notes = response.data;
            } catch(err) {
                console.error('Error fetching notes:', err);
            }
        },
    },
}

</script>

<template>
    <main>
        <div class="menu" v-if="(!activeNote)">
            <aside class="menu__side-bar">
                <AddNote :createNote />
                <Folders :notes :openNote :truncateText />
            </aside>
            <div class="menu__content">
                <SearchBar :searchNote />
                <Notes :notes :openNote :searchText :truncateText />
            </div>
        </div>
        <Note v-else :activeNote :closeNote :deleteNote />
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
