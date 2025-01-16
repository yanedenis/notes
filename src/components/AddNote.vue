<template>
<button @click="createNote(note)">
    <i class='bx bx-plus'></i>
    <p>Create note</p>
</button>
</template>

<script>
const d = new Date()

export default {
    data() {
        return {
            note: {
                title: null,
                text: null,
                date: `${d.getDate()}.${d.getMonth()}.${d.getFullYear()}`,
                folder_id: null,
            },
        }
    },
    props: {
        createNote: {
            type: Function,
            required: true,
        }
    },
}
</script>

<style scoped>
button {
    background-color: var(--secondary);
    border: 0;
    padding: 8px;
    width: 100%;
    border-radius: 12px;
    display: flex;
    font-size: 18px;
    gap: 6px;
    margin-bottom: 12px;
    cursor: pointer;
}
</style>