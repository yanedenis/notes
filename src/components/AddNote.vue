<template>
<button @click="createNote(note)">
    <i class='bx bx-plus'></i>
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

<style scoped lang="scss">
button {
    position: fixed;
    right: 1vw;
    bottom: 3vh;
    background-color: var(--secondary);
    border: 0;
    padding: min(8px, 5%);
    border-radius: 50%;
    cursor: pointer;

    i {
        width: min-content;
        height: min-content;
        font-weight: bold;
        font-size: px_to_rem(24);
    }
}
</style>