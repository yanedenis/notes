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
                console.log("Received notes: ", response.data)
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
            <aside className="menu__side-bar">
                <AddNote :createNote />
                <Folders :notes :openNote :truncateText />
            </aside>
            <div className="menu__content">
                <SearchBar :searchNote />
                <Notes :notes :openNote :searchText :truncateText />
            </div>
        </div>
        <Note v-else :activeNote :closeNote :deleteNote />
    </main>
</template>

<style scoped lang="scss">
.menu {
    @include background_whiteness(10%);

    display: grid;
    grid-template-columns: 12vw 1fr;
    gap: 2dvh;
    // overflow: hidden;
    padding: max(1.2%, 14px);
    border-radius: 20px;
    width: 85vw;
    height: 90dvh;
}

.menu__side-bar {
    height: 100%;
}
</style>
