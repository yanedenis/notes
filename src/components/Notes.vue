<template>
    <section>
        <div v-for="(note) in notes" :key="note.id" className="note" @click="openNote(note.id)">
            <h2 className="note__title" v-if="(note.title)">{{ note.title }}</h2>
            <p className="note__text" :class="{ 'title': !note.title }">{{ truncateText(note.text, 300) }}</p>
            <h4 className="note__date">{{ note.date }}</h4>
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

<style scoped>
.empty-notif {
    text-align: center;
}

.title {
    font-weight: bold;
    font-size: 1.8rem;
}

section {
    display: grid;
    /* grid-template-columns: repeat(auto-fill, 200px); */
    align-content: start;
    margin-top: 1.5em;
    gap: 10px;
    background-color: color-mix(in oklab, var(--background), white 6%);
    padding: 12px;
    height: 73dvh;
    border-radius: 12px;
    overflow-y: scroll;
}

.note {
    background-color: color-mix(in oklab, var(--background), white 20%);
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

textarea {
    width: 100%;
    height: 100%;
    background-color: transparent;
    text-align: justify;
}

.color label {
    margin-right: 4px;
}

.color option {
    padding: 2px;
}
</style>