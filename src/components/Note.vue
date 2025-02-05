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
                    const response = await axios.post('http://localhost:3000/notes', {
                        title: this.activeNoteCopy.title || '',
                        text: this.activeNoteCopy.text || '',
                    });
                    console.log("Note created successfully", response.data);
                } else {
                    const response = await axios.put('http://localhost:3000/notes', {
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
                const response = await axios.delete(`http://localhost:3000/notes/${this.activeNoteCopy.id}`);
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

<style scoped lang="scss">
.note {
    border-radius: 12px;
    width: 80vw;
    padding: 16px;
    height: 80dvh;

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
        position: relative;

        &::after {
            content: '';
            width: 100%;
            height: 2px;
            background-color: var(--text);
            opacity: 40%;
            position: absolute;
            bottom: -1em;
            left: 0;
        }
    }

    &__title {
        @include transparent_noBorder_noOutline();

        font-size: 1.6rem;
        font-weight: bold;
        // width: 100%;
    }

    &__date {
        width: max-content;
    }

    &__navigations {
        margin-bottom: 2em;
        display: flex;
        justify-content: space-between;
        align-items: center;

        input {
            @include transparent_noBorder_noOutline();

            width: 20px;
        }
    }

    &__close-button {
        @include transparent_noBorder_noOutline();

        cursor: pointer;

        i {
            font-size: 3.5rem;
        }
    }

    &__delete-button {
        @include transparent_noBorder_noOutline();

        cursor: pointer;

        i {
            font-size: 2rem;
        }
    }

    &__content {
        @include transparent_noBorder_noOutline();

        font-size: 1.3em;
        width: 100%;
        height: 100%;
        overflow: hidden;
        resize: none;
    }
}
</style>