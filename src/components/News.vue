<template>
    <button style="margin-top: 15px; margin-bottom: 20px" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить новость</button>
    <div class="input-group" style="max-width: 300px; margin-bottom: 25px; margin-left: 15px">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="icons/search_FILL0_wght400_GRAD0_opsz24.png" alt=""></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
    </div>


    <div  class="row row-cols-1 row-cols-sm-2 row-cols-md-3  mx-5 mb-5 justify-content-center">
        <div class="col mb-4" v-for="item in filteredNews" :key="item.id">
            <div class="card h-100 w-75" style="margin-top: 10px">
                <img class="card-img-top" src="https://via.placeholder.com/600x400" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{item.title}}</h5>
                    <p class="card-text" style="height: 70px; ">{{item.description}}</p>
                    <p class="card-text"><small class="text-muted">{{item.date}}</small></p>
                    <button type="button" class="btn btn-primary" @click.stop ="redirectToDetails(item)">Подробнее</button>
                    <br>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.stop ="edit(item)"><img src="icons/edit_FILL0_wght400_GRAD0_opsz24.png" alt=""></button>
                    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal" @click.stop="this.currentId = item.id"><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.png" alt=""></button>
                </div>
            </div>
        </div>
    </div>
<!--    <button type="button" class="btn btn-primary" @click="add">Добавить новость</button>-->
<!--    <NewsForm v-if="showForms" @add_News="add_News"></NewsForm>-->
    <!-- Button trigger modal -->
<!--    <button style="margin-top: 5px;" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить новость</button>-->
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

    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel1">Удалить новость</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить новость?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(currentId)">Удалить</button>
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
                    {id: 1, title: 'Булка', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                    {id: 2, title: 'булка 2', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                    {id: 3, title: 'Хлебушек', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                    {id: 4, title: 'Носок', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                    {id: 5, title: 'Чаечек', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                    {id: 6, title: 'Хлебушек 2', description: 'Some quick example text to build on the card title and make up the bulk of the card\'s content.', date: '2023-05-04'},
                ],
                showForms: false,
                newsObj : {
                    id: '',
                    title: '',
                    description: '',
                    date: ''
                },
                currentId: '',
                searchQuery: '',
            }
        },
        methods : {
            add_News(news) {
                if(this.currentId !== '') {
                    this.remove(this.currentId);
                    this.currentId = '';
                }
                const newNews = JSON.parse(JSON.stringify(news));
                newNews.id = new Date().getTime();
                this.news.unshift(newNews);
                this.newsObj.title = '';
                this.newsObj.id = '';
                this.newsObj.description = '';
                this.newsObj.date = '';
            },

            edit(item) {
                this.currentId = item.id;
                const newNews = JSON.parse(JSON.stringify(item));
                this.newsObj.id = newNews.id;
                this.newsObj.title = newNews.title;
                this.newsObj.description = newNews.description;
                this.newsObj.date = newNews.date;
                //this.remove(newNews.id);
                // this.add_News(newNews);
            },

            redirectToDetails(item) {
                this.$router.push(`/news/details/${item.id}`)
            },

            remove(itemId) {
                const id = itemId;
                this.news = this.news.filter(el => el.id !== id);
                this.currentId = '';
            }
        },
        computed: {
            filteredNews() {
                return this.news.filter(el => el.title.toLowerCase().includes(this.searchQuery.toLowerCase()));
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