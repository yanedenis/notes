<template>
    <div className="note">
        <div className="note__navigations">
            <button @click="handleCloseNote" class="note__close-button"><i class='bx bx-chevron-left'></i></button>
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
<script>
import axios from 'axios';
import _ from 'lodash';

export default {
    data() {
        return {
            activeNoteCopy: { ...this.activeNote }
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
    },
    methods: {
        async handleCloseNote() {
            try {
                if (!this.activeNoteCopy.title && !this.activeNoteCopy.text) {
                    this.closeNote();
                    window.location.reload();
                    return;
                } else if (this.activeNoteCopy.id === undefined) {
                    const response = await axios.post('http://localhost:3000/api/notes', {
                        title: this.activeNoteCopy.title || '',
                        text: this.activeNoteCopy.text || '',
                    });
                    console.log("Note created successfully", response.data);
                } else {
                    const response = await axios.put('http://localhost:3000/api/notes', {
                        id: this.activeNoteCopy.id,
                        title: this.activeNoteCopy.title,
                        text: this.activeNoteCopy.text,
                    });
                    console.log('Note saved successfully:', response.data);
                }
            } catch (err) {
                console.error('Error saving note:', err.response || err);
            }
            this.closeNote();
            window.location.reload();
        },
        async deleteNote() {
            try {
                const response = await axios.delete(`http://localhost:3000/api/notes/${this.activeNoteCopy.id}`);
                console.log("Note deleted", response.data);
                this.closeNote();
                window.location.reload();
            } catch (err) {
                console.error('Error deleting note', err.response || err);
            }
        },
    },
    watch: {
        activeNote: {
            immediate: true,
            handler(newVal) {
                this.activeNoteCopy = { ...newVal };
            }
        }
    },
}
</script>
<style scoped>
.note {
    background-color: color-mix(in oklab, var(--background), white 10%);
    border-radius: 12px;
    width: 80vw;
    padding: 16px;
    height: 80dvh;
}

.note__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2em;
    position: relative;
}

.note__title {
    background-color: transparent;
    border: 0;
    outline: 0;
    font-size: 1.6em;
    font-weight: bold;
    width: 100%;
}

.note__header::after {
    content: '';
    width: 100%;
    height: 2px;
    background-color: var(--text);
    opacity: 40%;
    position: absolute;
    bottom: -1em;
    left: 0;
}

.note__navigations {
    margin-bottom: 2em;
    display: flex;
    justify-content: space-between;
    align-items: center
}

.note__navigations input {
    border: 0;
    width: 20px;
    background-color: transparent;
}

.note__close-button,
.note__delete-button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
}

.note__close-button i {
    font-size: 3.5em;
}

.note__delete-button i {
    font-size: 2em;
}

.note__date {
    user-select: none;
}

.note__content {
    font-size: 1.3em;
    background-color: transparent;
    width: 100%;
    height: 100%;
    outline: 0;
    border: none;
    overflow: hidden;
    resize: none;
}
</style>