<template>
    <div class="input-group" style="max-width: 300px; margin-bottom: 15px; margin-left: 70px; margin-top: 30px">
        <div class="input-group-prepend">
            <span class="input-group-text"><img src="icons/search_FILL0_wght400_GRAD0_opsz24.png" alt=""></span>
        </div>
        <input type="text" class="form-control" placeholder="Search..." v-model="searchQuery">
    </div>

    <div class="container" style="margin-top: 15px" v-if="teachers.length > 0">
        <div class="row">
            <div v-for="teacher in teachers" :key="teacher.id" class="col-lg-4 col-md-6 col-sm-12">
                <div class="card mb-3">
                    <div class="row no-gutters">
                        <div class="col-md-4">
                            <!-- Картинка преподавателя -->
                            <img :src="teacher.image" alt="Преподаватель" class="card-img" style="margin-left: 10px; margin-top: 10px">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <!-- Описание преподавателя -->
                                <h5 class="card-title"><i>{{ teacher.name }}</i></h5>
                                <p class="card-text">{{ teacher.position }}</p>
                                <p class="card-text">{{ teacher.title }}</p>
                                <p class="card-text">{{ teacher.description }}</p>
                                <div class="accordion accordion-flush" :id="'accordion-' + teacher.id">
                                    <div class="accordion-item">
                                        <h2 class="accordion-header">
                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse-' + teacher.id" aria-expanded="false" aria-controls="flush-collapseOne"

                                            >
                                                Читаемые дисциплины
                                            </button>
                                        </h2>
                                        <div :id="'collapse-' + teacher.id" class="accordion-collapse collapse" :data-bs-parent="'#accordion-' + teacher.id">
                                            <div class="accordion-body" >
                                                <ul>
                                                    <li v-for="subject in teacher.subjects" style="text-align: left">{{subject}}</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div v-else><h5>Ничего не найдено...</h5></div>
</template>

<script>
    export default {
        data() {
            return {
                teachers: [
                    {
                        id: 1,
                        name: "Чеканин Владислав Александрович",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Заведующий кафедрой, д.т.н",
                        title: "",
                        description: "Описание преподавателя...",
                        subjects: ['Алгоритмические языки программирования', 'Информатика', 'Компьютерная механика', 'Методы и средства имитационного моделирования',
                        'Технические средства информационных систем', 'Руководство ВКР бакалавров и магистров', 'Руководство аспирантами']
                    },
                    {
                        id: 2,
                        name: "Ибатулин Михаил Юрьевич",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Ст. преподаватель",
                        title: "",
                        description: "Описание преподавателя...",
                        subjects: [
                            'Введение в специальность', 'Информационные технологии', 'Вычислительные системы, сети и телекоменникации',
                            'Информационные системы и технологии', 'Системы интеллектуального анализа данных',
                            'Облачные вычисления и сервисы', 'Руководство ВКР бакалавров', 'Руководство практиками'
                        ]
                    },
                    {
                        id: 3,
                        name: "Елисеева Наталья Владимировна",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Доцент, к.т.н",
                        title: "",
                        description: "Описание преподавателя...",
                        subjects: [
                            'Моделирование и анализ бизнес-процессов', 'Проектирование информационных систем',
                            'Проектирование человеко-машинного взаимодействия', 'Реинжиниринг и управление бизнес-процессами',
                            'Управление проектами', 'Руководство ВКР бакалавров и магистров', 'Руководство аспирантами'
                        ]
                    },
                    {
                        id: 4,
                        name: "Бычкова Наталья Александровна",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Доцент, к.т.н",
                        title: "",
                        description: "Описание преподавателя...",
                        subjects: [
                            'Базы данных', 'Моделирование и анализ бизнес-процессов', 'Проектирование информационных систем',
                            'Реинжиниринг и управление бизнес-процессами', 'Управление проектами', 'Руководство ВКР бакалавров и магистров',
                            'Руководство аспирантами'
                        ]
                    },
                    // Добавьте остальных преподавателей
                ],
                searchQuery: ''

            };
        },
        computed: {
            teachers() {
                return this.teachers.filter(el => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        }

    };
</script>

<style>
    /* Дополнительный CSS-стиль для карточки */
    .card-img {
        width: 100%;
        height: auto;
    }
</style>
