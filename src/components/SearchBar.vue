<template>
<div class="search-bar">
    <i class='bx bx-search bx-fw'></i>
    <input type="text" @input="searchNotes(searchQuery)" v-model="searchQuery" :placeholder="searchQuery || 'Search notes...'" />
</div>
</template>

<script>
export default {
    data() {
        return {
            searchQuery: '',
        }
    },
    props: { 
        searchNotes: {
            type: Function,
            required: true,
        }
    }
}
</script>

<style scoped lang="scss">
.search-bar {
    position: relative;
}

i {
    fill: var(--text);
    position: absolute;
    bottom: 50%;
    left: 6px;
    transform: translateY(50%);
    font-size: max(1.2vw, 1rem);
}

input {
    @include background_whiteness(7%);

    outline: 0;
    border: 0;
    border-bottom: 2px var(--text) solid;
    padding: 4px 6px;
    font-size: max(1.2vw, 1rem);
    padding-left: 2rem;
}

</style>