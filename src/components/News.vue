<template>
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3  g-4 mx-3 mb-5 justify-content-center">
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
    <NewsForm v-if="showForms" @add_News="add_News"></NewsForm>

</template>

<script>
    import NewsForm from "@/components/NewsForm";
    export default {
        components: {
          NewsForm
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
                showForms: true
            }
        },
        methods : {
            add_News(news) {
                this.news.push(news);
            }
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