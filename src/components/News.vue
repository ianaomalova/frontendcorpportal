<template>
    <div  class="row row-cols-1 row-cols-sm-2 row-cols-md-3  g-4 mx-3 mb-5 justify-content-center">
        <div class="col mb-4" v-for="item in news" :key="item.id">
            <div class="card h-100 w-75">
                <img class="card-img-top" src="https://via.placeholder.com/600x400" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text" style="height: 70px; ">{{item.description}}</p>
                    <p class="card-text"><small class="text-muted">{{item.date}}</small></p>
                    <router-link :to="'/news/details/' + item.id" class="btn btn-primary stretched-link">Подробнее</router-link>
                </div>
            </div>
        </div>
    </div>
<!--    <button type="button" class="btn btn-primary" @click="add">Добавить новость</button>-->
<!--    <NewsForm v-if="showForms" @add_News="add_News"></NewsForm>-->
    <!-- Button trigger modal -->
    <button style="margin-top: 10px;" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить новость</button>
    <div ref="modalAdd" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Добавить новость</h5>
                    <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input class="form-control" type="text" placeholder="Заголовок: " v-model="newsObj.title">
                </div>
                <div class="modal-body">
                    <textarea class="form-control" placeholder="Описание: " v-model="newsObj.description"></textarea>
                </div>
                <div class="modal-body">
                    <input class="form-control" type="date" placeholder="Введите имя студента: " v-model="newsObj.date">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="add_News(newsObj)" data-bs-dismiss="modal">Сохранить</button>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    import NewsForm from "@/components/NewsForm";
    import ModalForm from "@/components/ModalForm";
    export default {
        components: {
          NewsForm, ModalForm
        },
        data() {
            return {
                news: [
                    {id: 1, title: 'Новость 1', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                    {id: 2, title: 'Новость 2', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                    {id: 3, title: 'Новость 3', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                    {id: 4, title: 'Новость 4', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                    {id: 5, title: 'Новость 5', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                    {id: 6, title: 'Новость 6', description: 'Some quick прпарапрexмисмисмисмample text to build on the card title and make up the bulk of the card\'s content.', date: '01.05.2023'},
                ],
                showForms: false,
                newsObj : {
                    id: '',
                    title: '',
                    description: '',
                    date: ''
                }
            }
        },
        methods : {
            add_News(news) {
                const newNews = JSON.parse(JSON.stringify(news));
                this.news.unshift(newNews);
                this.newsObj.title = '';
                this.newsObj.id = '';
                this.newsObj.description = '';
                this.newsObj.date = '';
            },
        }
    }
</script>

<style scoped>
.card {
    margin-top: 30px;
    margin-left: auto;
    margin-right: auto;
}
.card-text {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: normal;
}
.row-cols-1 .col {
    margin-bottom: 1rem;
}

</style>