<template>
    <div class="intro">
        <h2>Hello !</h2>
        <div style="display:flex;align-items:center;">
            <img style="width: 32px;height:32px;border-radius:3px; margin-right: 5px;" :src="user.avatar" />
            <label>{{user.name}}({{user.english_name}})</label>
        </div>
    </div>    
</template>

<script>
// import {get} from 'axios';
export default {
    data(){
        return {
            user: window.settings.user
        }
    },
    async mounted(){
        
    }
}
</script>

<style>
.intro{
    padding:60px;
}
</style>