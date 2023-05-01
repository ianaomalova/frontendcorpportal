<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 mx-auto">
                <div class="card mb-4">
                    <img :src="article.image" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ article.title }}</h5>
                        <p class="card-text">{{ article.content }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                article: {},
            };
        },
        mounted() {
            const id = this.$route.params.id;
            this.article = this.$parent.articles.find((article) => article.id == id);
        },
    };
</script>
