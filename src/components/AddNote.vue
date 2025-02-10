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
@keyframes breathing {
    0%, 
    100% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
}

button {
    position: fixed;
    right: 2vh;
    bottom: 3vh;
    background-color: var(--secondary);
    border: 0;
    padding: min(8px, 5%);
    border-radius: 50%;
    cursor: pointer;
    transition: all .4s ease-in;

    &:hover {
        box-shadow: 0 0 10px var(--secondary);
        animation: breathing 2s infinite ease-out;
    }

    i {
        font-weight: bold;
        font-size: max(2vw, 16px);
    }
}
</style>