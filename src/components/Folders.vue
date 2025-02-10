<script>
export default {
    computed: {
        notesNotInFolder() {
            return this.notes.filter(note => note.folder_id === null)
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
        },
        folders: {
            type: Array,
            required: true,
        }
    },
}
</script>

<template>
    <h1>Folders</h1>
    <section>
        <div className="folders" v-show="(folders ?? folders.length)">
            <div className="folders__folder" v-for="(folder) in folders" :key="folder.id">
                <details name="folder">
                    <summary>{{ folder.name }}</summary>
                    <div className="folders__file folders__file--in-folder" v-for="(note) in notes"
                        v-show="note.folder_id === folder.id" @click="openNote(note.id)">
                        <h4 v-if="(note.title)">{{ note.title }}</h4>
                        <h4 v-else>{{ truncateText(note.text, 25) }}</h4>
                    </div>
                </details>
            </div>
        </div>
        <div class="file" v-for="(note) in notesNotInFolder" @click="openNote(note.id)">
            <h4 v-if="(note.title)">{{ note.title }}</h4>
            <h4 v-else>{{ truncateText(note.text, 25) }}</h4>
        </div>
        <h2 v-show="(!notes || !folders)">There's nothing here yet</h2>
    </section>
</template>

<style scoped lang="scss">
h1 {
    font-size: min(3vw, 2rem);
    margin-bottom: 8px;
}

h4 {
    font-size: min(1.3rem, 1.5vw);
}

summary {
    font-size: min(1.4rem, 1.6vw);
    font-weight: bold;
    width: 100%;
}

details {
    cursor: pointer;
    user-select: none;
    font-size: 18px;
}

section {
    height: 100%;
    overflow-y: scroll;

    & > div {
        &:hover {
            @include background_whiteness(5);
        }

        overflow-x: hidden;
        padding: 6px;
    }
}

.file {
    display: flex;
    outline: none;
    align-items: center;
    user-select: none;
    cursor: pointer;
    font-size: 1rem;
    gap: 2%;

    &:hover {
        color: red;
    }
}

.folders__file {
    @extend .file;

    &--in-folder {
        padding: .2rem;
        margin: .3rem 0 0 1rem;
        font-size: 16px;
    }
}
</style>