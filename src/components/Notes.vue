<template>
    <section>
        <div v-for="(note) in notes" :key="note.id" class="note" @click="openNote(note.id)">
            <h2 className="note__title" v-show="(note.title)">{{ note.title }}</h2>
            <p className="note__text" :class="{ 'title': !note.title }">{{ truncateText(note.text, 300) }}</p>
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
    },

}
</script>

<style scoped lang="scss">
.empty-notif {
    text-align: center;
}

.title {
    font-weight: bold;
    font-size: 1.8rem;
}

section {
    @include background_whiteness(6%);

    display: grid;
    // grid-template-columns: repeat(auto-fill, 200px);
    align-content: start;
    margin-top: 1.5em;
    gap: 10px;
    padding: 12px;
    height: 100%;
    border-radius: 12px;
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
}

.note__title {
    margin-bottom: 8px;
    font-size: 1.8rem;
}

p {
    font-size: 1.3rem;
}

.note__date {
    text-align: end;
    margin-top: 8px;
}
</style>