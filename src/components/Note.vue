<script>
import axios from 'axios';
import _ from 'lodash';

export default {
    data() {
        return {
            activeNoteCopy: _.cloneDeep(this.activeNote)
        }
    },
    props: {
        closeNote: {
            type: Function,
            required: true,
        },
        activeNote: {
            type: Object,
            required: true,
        },
        folders: {
            type: Array,
            required: true,
        },
        updateNotesList: {
            type: Function,
            required: true,
        },
        updateNotesListAfterDelete: {
            type: Function,
            required: true,
        }
    },
    methods: {
        async handleCloseNote() {
            try {
                if (!this.activeNoteCopy.title && !this.activeNoteCopy.text) {
                    this.closeNote();
                    return;
                };

                const noteData = {
                    title: this.activeNoteCopy.title || '',
                    text: this.activeNoteCopy.text || '',
                    folder_id: this.activeNoteCopy.folder_id ?? null,
                };

                console.log("Updating note with:", noteData);

                let response;
                if (this.activeNoteCopy.id === undefined) {
                    response = await axios.post('http://localhost:3000/notes', noteData);
                    console.log("Note created successfully", response.data);
                } else {
                    response = await axios.put('http://localhost:3000/notes', {
                        id: this.activeNoteCopy.id,
                        ...noteData, // Spread object to keep it clean
                    });
                    console.log("Note saved successfully", response.data);
                }

                // Update the UI dynamically
                this.updateNotesList(response.data);
                this.closeNote();
            } catch (err) {
                console.error('Error saving note:', err.response || err);
            }
        },
        async deleteNote() {
            try {
                const response = await axios.delete(`http://localhost:3000/notes/${this.activeNoteCopy.id}`);
                console.log("Note deleted", response.data);
                this.closeNote();
                this.updateNotesListAfterDelete(this.activeNoteCopy.id)
            } catch (err) {
                console.error('Error deleting note', err.response || err);
            }
        },
    },
    watch: {
        activeNote: {
            immediate: true,
            handler(newVal) {
                this.activeNoteCopy = _.cloneDeep(newVal); // Ensures deep reactivity
            }
        },
        "activeNoteCopy.folder_id": function (newVal) {
            if (newVal === "null") {
                this.activeNoteCopy.folder_id = null;
            }
        }
    },
}
</script>

<template>
    <div className="note">
        <div className="note__navigations">
            <button @click="handleCloseNote()" class="note__close-button"><i class='bx bx-chevron-left'></i></button>
            <select name="folders" id="folders" class="note__folder-selector" v-model="activeNoteCopy.folder_id">
                <option :value="null">None</option>
                <option :value="folder.id" v-for="folder in folders" :key="folder.id">{{ folder.name }}</option>
            </select>
            <button @click="deleteNote()" class="note__delete-button"><i class='bx bxs-trash'></i></button>
        </div>
        <div className="note__header">
            <input className="note__title" placeholder="Title" v-model="this.activeNoteCopy.title" />
            <h3 className="note__date">{{ this.activeNoteCopy.date }}</h3>
        </div>
        <textarea class="note__content" v-model="this.activeNoteCopy.text" placeholder="Start typing...">
            {{ this.activeNoteCopy.text }}
        </textarea>
    </div>
</template>

<style scoped lang="scss">
.note {
    width: 100vw;
    padding: max(2vw, 14px);
    height: 100dvh;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        position: relative;

        &::after {
            content: '';
            width: 100%;
            height: 4px;
            background-color: var(--text);
            opacity: 40%;
            position: absolute;
            bottom: -1em;
            left: 0;
        }
    }

    &__title,
    &__date {
        @include transparent_noBorder_noOutline();

        font-size: max(2vw, toRem(24));
        font-weight: bold;
        // width: 100%;
    }

    &__navigations {
        margin-bottom: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: max(.8vw, 4px);
    }

    &__close-button {
        @include transparent_noBorder_noOutline();

        cursor: pointer;

        i {
            font-size: max(3vw, 3rem);
        }
    }

    &__delete-button {
        @include transparent_noBorder_noOutline();

        cursor: pointer;

        i {
            font-size: max(2vw, 2rem);
        }
    }

    &__content {
        @include transparent_noBorder_noOutline();

        font-size: max(1.5vw, toRem(16));
        width: 100%;
        height: 100%;
        overflow: hidden;
        resize: none;
    }

    &__folder-selector {
        @include transparent_noBorder_noOutline();

        font-size: max(1.2vw, toRem(16));
    }
}
</style>