
<template>
    <div id="alphaTable">
        <ul v-for="row in layout" track-by="$index">
            <li v-for="cell in row" track-by="$index" :style="{background: cell.active ? cell.color : '#444444'}">
                {{cell.letter}}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['layout']
    }
</script>


<style lang="stylus" rel="stylesheet/stylus">
    #alphaTable
        margin-top 20px
        width 400px

        ul
            padding 0
            margin 0
            display table-row
            background green
            transform scale(1)

            li
                display table-cell
                padding 0
                margin 0
                font-size 0
                width 4px
                height 4px
                line-height 4px
                overflow hidden
                background blue

                &.active
                    background yellow

                &.inactive
                    background white
</style>