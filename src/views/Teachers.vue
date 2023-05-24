<template>
    <button style="margin-top: 15px; margin-bottom: 20px" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">Добавить сотрудника</button>
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
                            <img :src="teacher.image" alt="Преподаватель" class="card-img" style="margin-left: 10px; margin-top: 10px; margin-bottom: 15px">
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal" @click.stop ="edit(teacher)"><img src="icons/edit_FILL0_wght400_GRAD0_opsz24.png" alt=""></button>
                            <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#deleteModal" @click.stop="removeInit(teacher)"><img src="icons/delete_FILL0_wght400_GRAD0_opsz24.png" alt=""></button>
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <!-- Описание преподавателя -->
                                <h5 class="card-title"><i>{{ teacher.name }}</i></h5>
                                <p class="card-text">{{ teacher.position }}</p>
                                <a class="card-text" :href="teacher.title" target="_blank">Ссылка на публикации</a>
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
    <div ref="modalAdd" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel" v-if="currentId === ''">Добавить сотрудника</h5>
                    <h5 class="modal-title" id="exampleModalLabel" v-else >Редактировать сотрудника</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="clear"></button>
                </div>
                <div class="modal-body">
                    <input class="form-control" type="text" placeholder="ФИО: " v-model="newTeacher.name">
                </div>
                <div class="modal-body">
                    <input class="form-control" placeholder="Должность, звание: " v-model="newTeacher.position">
                </div>
                <div class="modal-body">
                    <textarea class="form-control" placeholder="Читаемые дисциплины (каждая строка - отдельная дисциплина): " v-model="newTeacher.subjects"></textarea>
                </div>
                <div class="modal-body">
                    <input class="form-control" placeholder="Ссылка на публикации: " v-model="newTeacher.title">
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="addTeacher(newTeacher)" data-bs-dismiss="modal">Добавить</button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel1">Удалить сотрудника</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Вы действительно хотите удалить <b>{{currentUser}}</b>?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="clear">Отмена</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove(currentId)">Удалить</button>
                </div>
            </div>
        </div>
    </div>
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
                        title: "https://www.elibrary.ru/author_items.asp?authorid=636955",
                        description: "",
                        subjects: ['Алгоритмические языки программирования', 'Информатика', 'Компьютерная механика', 'Методы и средства имитационного моделирования',
                        'Технические средства информационных систем', 'Руководство ВКР бакалавров и магистров', 'Руководство аспирантами']
                    },
                    {
                        id: 4,
                        name: "Бычкова Наталья Александровна",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Доцент, к.т.н",
                        title: "",
                        description: "",
                        subjects: [
                            'Базы данных', 'Моделирование и анализ бизнес-процессов', 'Проектирование информационных систем',
                            'Реинжиниринг и управление бизнес-процессами', 'Управление проектами', 'Руководство ВКР бакалавров и магистров',
                            'Руководство аспирантами'
                        ]
                    },
                    {
                        id: 3,
                        name: "Елисеева Наталья Владимировна",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Доцент, к.т.н",
                        title: "",
                        description: "",
                        subjects: [
                            'Моделирование и анализ бизнес-процессов', 'Проектирование информационных систем',
                            'Проектирование человеко-машинного взаимодействия', 'Реинжиниринг и управление бизнес-процессами',
                            'Управление проектами', 'Руководство ВКР бакалавров и магистров', 'Руководство аспирантами'
                        ]
                    },
                    {
                        id: 2,
                        name: "Ибатулин Михаил Юрьевич",
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: "Ст. преподаватель",
                        title: "",
                        description: "",
                        subjects: [
                            'Введение в специальность', 'Информационные технологии', 'Вычислительные системы, сети и телекоменникации',
                            'Информационные системы и технологии', 'Системы интеллектуального анализа данных',
                            'Облачные вычисления и сервисы', 'Руководство ВКР бакалавров', 'Руководство практиками'
                        ]
                    },
                    {
                        id: 5,
                        name: 'Колясинская Елена Зигмундовна',
                        image: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
                        position: 'Ст. преподаватель',
                        title: '',
                        description: '',
                        subjects: [
                            'Информатика'
                        ]
                    },
                    {
                        id: 6,
                        name: 'Ряшенцев Кирилл Владимирович',
                        image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                        position: 'Преподаватель',
                        title: '',
                        description: '',
                        subjects: [
                            'Основы программирования', 'Машинное обучение и интеллектуальные системы',
                        ]
                    }


                    // Добавьте остальных преподавателей
                ],
                searchQuery: '',
                newTeacher: {
                    id: new Date().getTime(),
                    name: '',
                    image: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
                    position: '',
                    title: '',
                    subjects: ''
                },
                currentId: '',
                currentUser: ''

            };
        },
        computed: {
            teachers() {
                return this.teachers.filter(el => el.name.toLowerCase().includes(this.searchQuery.toLowerCase()))
            }
        },
        methods: {
            addTeacher(newTeacher) {
                if(this.currentId !== '') {
                    this.remove(this.currentId);
                    this.currentId = '';
                }
                this.newTeacher.subjects = this.newTeacher.subjects.split('\n');
                const newTeach = JSON.parse(JSON.stringify(newTeacher));
                newTeach.id = new Date().getTime();
                this.teachers.unshift(newTeach);
                this.newTeacher.position = '';
                this.newTeacher.name = '';
                // this.newTeacher.image = '';
                this.newTeacher.subjects = '';
                this.newTeacher.title = '';
            },
            remove(ItemId) {
                const id = ItemId;
                this.teachers = this.teachers.filter(el => el.id !== id);
                this.currentId = '';
                this.currentUser = '';

            },
            removeInit(teacher) {
                this.currentId = teacher.id;
                this.currentUser = teacher.name;
            },
            edit(teacher) {
                this.currentId = teacher.id;
                const newTeach = JSON.parse(JSON.stringify(teacher));
                console.log(newTeach.subjects);
                this.newTeacher.id = newTeach.id;
                this.newTeacher.name = newTeach.name;
                this.newTeacher.title = newTeach.title;
                this.newTeacher.position = newTeach.position;
                this.newTeacher.subjects = newTeach.subjects.join('\n');
            },
            clear() {
                this.currentId = '';
                this.currentUser = '';
                this.newTeacher.id = '';
                this.newTeacher.position = '';
                this.newTeacher.name = '';
                this.newTeacher.subjects = '';
                this.newTeacher.title = '';
            }
        }

    };
</script>

<style>
    /* Дополнительный CSS-стиль для карточки */
    .card-img {
        width: 100%;
        height: auto;
        border-radius: 50% !important;
    }
</style>
