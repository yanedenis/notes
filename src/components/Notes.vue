<template>
    <section>
        <div v-for="(note) in notes" :key="note.id" class="note" @click="openNote(note.id)">
            <h2 className="note__title" v-show="note.title">
                {{ note.title }}
                <span v-show="note.folder_id !== null">
                    {{ showFolderName(note.folder_id) }}
                </span>
            </h2>
            <p className="note__text" :class="{ 'note__title': !note.title }">
                {{ truncateText(note.text, 300) }}
                <span v-show="!note.title && note.folder_id !== null">
                    {{ showFolderName(note.folder_id) }}
                </span>
            </p>
            <h4 class="note__date">{{ note.date }}</h4>
        </div>
        <h1 v-show="(!notes)" class="empty-notif">Add notes</h1>
    </section>
</template>

<script>
export default {
    props: {
        notes: {
            type: Object,
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
        },
    },
    methods: {
        showFolderName(folderId) {
            return '\\' + (this.folders.find(folder => folder.id === folderId)?.name || '')
        }
    }

}
</script>

<style scoped lang="scss">
.empty-notif {
    text-align: center;
}

section {
    display: grid;
    margin-top: 1.5em;
    gap: 10px;
    // height: 100%;
    overflow-y: scroll;
}

.note {
    @include background_whiteness(20%);

    padding: 8px;
    height: fit-content;
    border-radius: 4px;
    cursor: pointer;
    user-select: none;
    align-self: start;

    span {
        opacity: .3;
    }

    &__title {
        margin-bottom: 8px;
        font-size: 1.8rem;
        font-weight: bold;
    }

    &__date {
        text-align: end;
        margin-top: 8px;
    }
}

p {
    font-size: 1.3rem;
}
</style>