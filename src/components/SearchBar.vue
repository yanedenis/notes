<template>
<div class="search-bar">
    <i class='bx bx-search bx-fw'></i>
    <input type="text" @input="searchNote($event.target.value)" placeholder="Search notes"/>
</div>
</template>

<script>
export default {
    props: { 
        searchNote: {
            type: Function,
            required: true,
        }
    }
}
</script>

<style scoped>
.search-bar {
    position: relative;
}

i {
    fill: var(--text);
    position: absolute;
    bottom: 10px;
    left: 6px;
}

input {
    background-color: color-mix(in oklab, var(--background), white 7%);
    outline: 0;
    border: 0;
    border-bottom: 2px var(--text) solid;
    padding: 4px 6px;
    font-size: 24px;
    padding-left: 2rem;
}

</style>