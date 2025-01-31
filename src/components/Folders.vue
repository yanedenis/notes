<template>
    <section>
        <h1>Folders</h1>
        <div className="folders" v-show="(folders ?? folders.length)">
            <div className="folders__folder" v-for="(folder) in folders" :key="folder.id">
                <details>
                    <summary>{{ folder.name }}</summary>
                    <div className="file file--in-folder" v-for="(note) in notes"
                        v-show="note.folder_id === folder.id" @click="openNote(note.id)">
                        <i class='bx bxs-note'></i>
                        <h4 v-if="(note.title)">{{ note.title }}</h4>
                        <h4 v-else>{{ truncateText(note.text, 25) }}</h4>
                    </div>
                </details>
            </div>
        </div>
        <div v-for="(note) in notesNotInFolder" @click="openNote(note.id)">
            <div class="file">
                <i class='bx bxs-note'></i>
                <h4 v-if="(note.title)">{{ note.title }}</h4>
                <h4 v-else>{{ truncateText(note.text, 25) }}</h4>
            </div>
        </div>
        <h2 v-show="(!notes || !folders)">There's nothing here yet</h2>
    </section>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            folders: []
        }
    },
    created() {
        this.fetchFolders();
    },
    computed: {
        notesNotInFolder() {
            return this.notes.filter(note => note.folder_id === null)
        },
    },
    methods: {
        async fetchFolders() {
            try {
                const response = await axios.get('http://localhost:3000/folders');
                console.log('Received folders:', response.data);
                this.folders = response.data;
            } catch (err) {
                console.error('Error fetching folders:', err);
            }
        },
    },
    props: {
        notes: {
            type: Array,
            required: true,
        },
        openNote: {
            type: Function,
            required: true,
        },
        truncateText: {
            type: Function,
            required: true,
        }
    },
}
</script>

<style scoped>
.active {
    display: block;
}

h1 {
    font-size: 2em;
    margin-top: 20px;
    margin-bottom: 8px;
}

h4, .file i {
    font-size: 1.3rem;
}

summary {
    font-size: 1.4rem;
    font-weight: bold;
}

details {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    user-select: none;
    font-size: 18px;
}

section {
    height: 74dvh;
    overflow-y: scroll;
}

section > div {
    background-color: color-mix(in oklab, var(--background), white 6%);
    overflow-x: hidden;
    padding: 6px;
}

.folders__folder {
    outline: none;
}

.file {
    /* margin-top: 6px; */
    display: flex;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-size: 1em;
}

.file--in-folder {
    padding: .2rem;
    background-color: color-mix(in oklab, var(--background), white 2%);
    margin: .3rem 0 0 1rem;
    font-size: 16px;
}
</style>