<template>
    <button class="create-btn">
        <i class='bx bx-plus bx-fw'></i>
        <ul class="dropdown">
            <li @click="createNote(note)">Create note</li>
            <li @click="createFolder">Create folder</li>
        </ul>
    </button>
</template>

<script>
import axios from 'axios';
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
    methods: {
        async createFolder() {
            const folderName = prompt('Enter folder name').trim();
            if (folderName) {
                try {
                    const response = await axios.post('http://localhost:3000/folders', {
                        name: folderName,
                    });
                } catch (err) {
                    console.error(err.response || err);
                }
            }
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
.create-btn {
    position: fixed;
    right: 2vh;
    bottom: 3vh;
    background-color: var(--secondary);
    border: 0;
    padding: 1rem;
    border-radius: 50%;
    cursor: pointer;

    i {
        font-size: 2rem;
    }

    &:hover .dropdown {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
}

.dropdown {
    position: absolute;
    right: 0;
    bottom: 100%;
    list-style: none;
    width: max-content;
    opacity: 0;
    visibility: hidden;
    transform: translateY(100px);
    transition: all 0.3s ease-in-out;
    
    li {
        background-color: var(--secondary);
        padding: 0.5rem 1rem;
        border-radius: 10px;
        margin-bottom: 0.5rem;
        font-size: 1.2rem;
        cursor: pointer;
    }
}
</style>