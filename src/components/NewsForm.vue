<template>
    <div class="card mt-5">
        <div class="card-header">
            Добавить новость
        </div>
        <div class="card-body">
            <form @submit.prevent="addNews">
                <div class="form-group">
                    <label for="title">Заголовок</label>
                    <input type="text" class="form-control" id="title" v-model="title">
                </div>
                <div class="form-group">
                    <label for="description">Описание</label>
                    <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
                </div>
                <div class="form-group">
                    <label for="date">Дата</label>
                    <input type="date" class="form-control" id="date" v-model="date">
                </div>
                <button type="submit" class="btn btn-primary">Добавить новость</button>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
                description: '',
                date: ''
            }
        },
        methods: {
            addNews() {
                const newNews = {
                    id: Math.random(),
                    title: this.title,
                    description: this.description,
                    date: this.date
                }
                this.$emit('add_News', newNews)
                this.title = ''
                this.description = ''
                this.date = ''
            }
        }
    }
</script>
