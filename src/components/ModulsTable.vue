<template>
    <button @click="send">Отправить список на сервер</button>
    <!--    <button @click="editTable">Edit</button>-->
    <div class="form-check form-switch" >
        <form>
            <label class="form-check-label" ><input class="form-check-input" type="checkbox" v-model="checked">Режим редактирования</label>
        </form>
        <form>
            <label class="form-check-label"><input class="form-check-input" type="checkbox" v-model="checked2">Курсовой проект</label>
        </form>
    </div>
    <div class="d-flex justify-content-center">
        <select v-model="type" name="Type" id="Type" class="form-select form-select-sm mx-auto" style="max-width: 8%" aria-label=".form-select-sm example">
            <option value="Зачет" selected="selected">Зачет</option>
            <option value="Зачет с оценкой">Зачет с оценкой</option>
            <option value="Экзамен">Экзамен</option>
        </select>
    </div>
<!--    <div>-->
<!--        <select name="" v-model="selectedTeacher">-->
<!--            <option disabled value="">Выберите преподавателя</option>-->
<!--            <option v-for="(teacher, index) in teachers" :key="index" v-model="listOfStudent.teacher1">{{teacher}}</option>-->
<!--        </select>-->
<!--    </div>-->
    <div class="table-responsive">
        <table class="table table-hover table-bordered border-primary">
            <thead style="font-size: 10px; height: auto">
            <tr>
                <!--                <td></td>-->
                <th style="border-top:2px solid #0d6efd; border-left:2px solid #0d6efd; border-right:2px solid #0d6efd; border-bottom:2px solid #0d6efd" :colspan="cols" scope="col">{{ Object.values(this.arrayHeaders[0]).toString() }}</th>
            </tr>
            <tr>
                <!--                <td></td>-->
                <th style="border-left:2px solid #0d6efd; border-right:2px solid #0d6efd; border-bottom:2px solid #0d6efd" :colspan="cols" scope="col">{{Object.values(this.arrayHeaders[1]).toString()}}</th>
            </tr>
            <tr>
                <td style="border-left:2px solid #0d6efd; " ></td>
                <th style="text-align:left; " >Дата: </th>
                <th :colspan="cols - 1" style="text-align:left; border-right:2px solid #0d6efd" scope="col">{{Object.values(this.arrayHeaders[2]).toString()}}</th>
            </tr>
            <tr>
                <td style="border-left:2px solid #0d6efd"> </td>
                <th style="text-align:left" >Дисциплина: </th>
                <th :colspan="cols - 1" style="text-align:left; border-right:2px solid #0d6efd" scope="col">{{ this.$route.params.name }}</th>
            </tr>
            <tr>
                <td style="border-left:2px solid #0d6efd; border-left:2px solid #0d6efd"></td>
                <th style="text-align:left">Группа: </th>
                <th :colspan="cols - 1" style="text-align:left; border-right:2px solid #0d6efd" scope="col">{{this.group}}</th>
            </tr>
            <tr>
                <td style="border-left:2px solid #0d6efd"></td>
                <th style="text-align:left">Кафедра: </th>
                <th :colspan="cols - 1" style="text-align:left; border-right:2px solid #0d6efd" scope="col">{{Object.values(this.arrayHeaders[5]).toString()}}</th>
            </tr>
            <tr>
                <td style="border-bottom: 2px solid black; border-left:2px solid #0d6efd"></td>
                <th style="border-bottom: 2px solid black; text-align:left">Преподаватель: </th>
                <th style="border-bottom: 2px solid black; text-align:left; border-right:2px solid #0d6efd" :colspan="cols - 1" scope="col">{{Object.values(this.arrayHeaders[6]).toString()}}</th>
            </tr>
            <tr>
                <th  rowspan="2" style="border-right: 2px solid black; border-left: 2px solid black; vertical-align: middle; width: 40px">№ п/п</th>
                <th  style="vertical-align: middle;" rowspan="2" >Фамилия Имя Отчество</th>
                <!--                <th  rowspan="2">Имя</th>-->
                <!--                <th  rowspan="2">Отчество</th>-->
                <th  rowspan="2" style="border-left: 2px solid black; vertical-align: middle" class="M1M2">М1</th>
                <th  rowspan="2" style="border-right: 2px solid black; vertical-align: middle" class="M1M2">М2</th>
                <th v-if="checked2" colspan="4" style="border-right: 2px solid black">Курсовой проект</th>
                <th colspan="4" style="border-right: 2px solid black">Экзамен/Зачет</th>
                <th colspan="4" style="border-right: 2px solid black">Повторный экзамен/зачет (1) </th>
                <th colspan="4" style="border-right: 2px solid black">Повторный экзамен/зачет (2) </th>
            </tr>
            <tr>
                <th v-if="checked2">Балл</th>
                <th v-if="checked2">Оценка</th>
                <th v-if="checked2" style="min-width: 100px">Дата</th>
                <th v-if="checked2">Преподаватель</th>
                <th style="border-left: 2px solid black">Балл</th>
                <th>Оценка</th>
                <th style="min-width: 100px">Дата</th>
                <th style="border-right: 2px solid black">Преподаватель</th>
                <th>Балл</th>
                <th>Оценка</th>
                <th style="min-width: 100px">Дата</th>
                <th style="border-right: 2px solid black">Преподаватель</th>
                <th>Балл</th>
                <th>Оценка</th>
                <th style="min-width: 100px">Дата</th>
                <th style="border-right: 2px solid black">Преподаватель</th>
            </tr>
            </thead>
            <tbody class="table-striped table-group-divider table-striped" ref="body">

            <tr v-if="checked" v-for="(student, index) in listOfStudent" :key="student.id">
                <th style="border-right: 2px solid black; border-left: 2px solid black"> {{student.id}}</th>

                <th style="border-right: 2px solid black"><input class="form-control"  style="font-size: 12px" type="text" v-model="student.FIO"></th>
                <th class="M1M2 table-fit"><input class="form-control" style="min-width: 40px" type="number" v-model="student.m1" @change="validinpm1"></th>
                <th style="border-right: 2px solid black" class="M1M2 table-fit"><input class="form-control" style="min-width: 40px" type="number" v-model="student.m2"  @change="validinpm2"></th>
                <th v-if="checked2" class="table-fit"><input class="form-control" style="min-width: 40px" type="number" v-model="student.scope4" @change="validinpsc4"></th>
                <th v-if="checked2" class="table-fit"><input class="form-control" style="min-width: 150px" type="text" v-model="student.scopeText4"></th>
                <!--                <th v-if="checked2">{{student.scopeText4}}</th>-->
                <th v-if="checked2" class="table-fit"><input class="form-control" type="date" v-model="student.date4"></th>
                <th v-if="checked2" class="table-fit" style="border-right: 2px solid black"><select class="form-select form-select-sm mx-auto" aria-label=".form-select-sm example" name=""  v-model="student.teacher4">
                    <option disabled value="">Выберите преподавателя</option>
                    <option v-for="(teacher, index) in teachers" :key="index">{{teacher}}</option>
                </select></th>
                <th class="table-fit"><input class="form-control" style="min-width: 40px" type="number" v-model="student.scope1"  @change="validinpsc1" ></th>
                <th class="table-fit"><input class="form-control" style="min-width: 150px" type="text" v-model="student.scopeText1"></th>
<!--                <th>{{student.scopeText1}}</th>-->
                <th class="table-fit"><input class="form-control" type="date" v-model="student.date1"></th>
                <th class="table-fit" style="border-right: 2px solid black"><select class="form-select form-select-sm mx-auto" aria-label=".form-select-sm example" name="" id="" v-model="student.teacher1">
                    <option disabled value="">Выберите преподавателя</option>
                    <option v-for="(teacher, index) in teachers" :key="index">{{teacher}}</option>
                </select></th>
                <th class="table-fit"><input class="form-control" style="min-width: 40px" type="number" v-model="student.scope2" @change="validinpsc2"></th>
                <th class="table-fit"><input class="form-control" style="min-width: 150px" type="text" v-model="student.scopeText2"></th>
<!--                <th>{{student.scopeText2}}</th>-->
                <th class="table-fit"><input class="form-control" type="date" v-model="student.date2"></th>
                <th class="table-fit" style="border-right: 2px solid black"><select class="form-select form-select-sm mx-auto" aria-label=".form-select-sm example" name=""  v-model="student.teacher2">
                    <option disabled value="">Выберите преподавателя</option>
                    <option v-for="(teacher, index) in teachers" :key="index">{{teacher}}</option>
                </select></th>
                <th class="table-fit" ><input class="form-control" style="min-width: 40px" type="number" v-model="student.scope3" @change="validinpsc3"></th>
                <th class="table-fit"><input class="form-control" type="text" style="min-width: 150px" v-model="student.scopeText3"></th>
<!--                <th>{{student.scopeText3}}</th>-->
                <th class="table-fit"><input class="form-control form-control-sm" type="date" v-model="student.date3"></th>
                <th class="table-fit" style="border-right: 2px solid black"><input class="form-control" type="text" v-model="student.teacher3"></th>

            </tr>
            <tr v-else :key="student.id" v-for="(student, index) in listOfStudent">
                <th class="table-fit" v-if="checked2" v-for="key in gridColumnsKurs" :class="[{borderSt: key.includes('id') || key.includes('FIO') || key.includes('m2')
                    || key.includes('teacher1') || key.includes('teacher2') || key.includes('teacher3') || key.includes('teacher4'), M1M2 : key.includes('m1') || key.includes('m2'), borderLeftID : key.includes('id')}]"
                >
                    {{student[key]}}
                </th>
                <th  class="table-fit" v-else v-for="key in gridColumns" :class="{borderSt: key.includes('id') || key.includes('FIO') || key.includes('m2')
                    || key.includes('teacher1') || key.includes('teacher2') || key.includes('teacher3') || key.includes('teacher4'), M1M2 : key.includes('m1') || key.includes('m2'), borderLeftID : key.includes('id'),
                    left : key.includes('FIO')}"
                >
                    {{student[key]}}
                </th>

            </tr>

            </tbody>
            <tfoot>
            <button v-if="checked" style="margin-top: 10px;" type="button" class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal">+</button>
            <div ref="modalAdd" class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Добавить студента</h5>
                            <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="Введите имя студента: " v-on:keyup.enter="addStudent" v-model="newStudent">
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-primary" @click="addStudent" data-bs-dismiss="modal">Сохранить</button>
                        </div>
                    </div>
                </div>
            </div>
            </tfoot>
        </table>

    </div>

</template>




<script>
    import axios from "axios";
    import {getStudent} from "@/api/ModulsTable";

    export default {
        props: {
            group : {
                type: String,
            },

        },
        name: 'my-table',
        data() {
            return {
                arrayHeaders: [],

                gridColumns: ['id', 'FIO', 'm1', 'm2', 'scope1', 'scopeText1', 'date1', 'teacher1',
                    'scope2', 'scopeText2', 'date2', 'teacher2', 'scope3', 'scopeText3', 'date3', 'teacher3'
                ],
                gridColumnsKurs: [
                    'id', 'FIO', 'm1', 'm2', 'scope4', 'scopeText4', 'date4', 'teacher4', 'scope1', 'scopeText1', 'date1', 'teacher1',
                    'scope2', 'scopeText2', 'date2', 'teacher2', 'scope3', 'scopeText3', 'date3', 'teacher3',
                ],
                newStudent: '',
                listOfStudent: [],
                cols: 25,
                checked: false,
                checked2: false,
                type: 'Экзамен',
                selectedTeacher: '',
                counterCols: [],
            }
        },
        created() {
            this.initStudents();
            this.headersInit();

        },
        computed: {
          teachers() {
              const teachersObj = this.arrayHeaders.find(obj => obj.teachers);
              if(teachersObj) {
                  return teachersObj.teachers;
              } else {
                  return []
              }
          }
        },
        watch: {
            listOfStudent: {
                handler(newVal, oldVal) {
                    let counter = 0;
                    const a = new Date();
                    const year = a.getFullYear();
                    const month = a.getMonth() + 1;
                    const day = a.getDate();
                    const hour = a.getHours();
                    const minutes = a.getMinutes();
                    const seconds = a.getSeconds();
                    let dateString = day + '/' + month + '/' + year + ' ' + hour + ':' + minutes + ':' + seconds
                    this.arrayHeaders[2].date = dateString;
                    this.listOfStudent.forEach(el => {
                        if(this.type.includes('Экзамен')) {
                            if(el.scope1 >= 45 && el.scope1 <=54) {
                                el.scopeText1 = 'Отлично';
                            } else if(el.scope1 >= 35 && el.scope1 < 45) {
                                el.scopeText1 = 'Хорошо';
                            }
                            else if(el.scope1 >=25 && el.scope1 < 35){
                                el.scopeText1 = 'Удовлетворительно'
                            }


                            if(el.scope2 >= 45 && el.scope2 <=54) {
                                el.scopeText2 = 'Отлично';
                            } else if(el.scope2 >= 35 && el.scope2 < 45) {
                                el.scopeText2 = 'Хорошо';
                            }
                            else if(el.scope2 >=25 && el.scope2 < 35){
                                el.scopeText2 = 'Удовлетворительно'
                            }


                            if(el.scope3 >= 45 && el.scope3 <=54) {
                                el.scopeText3 = 'Отлично';
                            } else if(el.scope3 >= 35 && el.scope3 < 45) {
                                el.scopeText3 = 'Хорошо';
                            }
                            else if(el.scope3 >=25 && el.scope3 < 35){
                                el.scopeText3 = 'Удовлетворительно'
                            }


                            if(el.scope4 >= 45 && el.scope4 <=54) {
                                el.scopeText4 = 'Отлично';
                            } else if(el.scope4 >= 35 && el.scope4 < 45) {
                                el.scopeText4 = 'Хорошо';
                            }
                            else if(el.scope4 >=25 && el.scope4 < 35){
                                el.scopeText4 = 'Удовлетворительно'
                            }


                        } else if(this.type.includes('Зачет с оценкой')) {
                            if(el.scope1 >= 45 && el.scope1 <=54) {
                                el.scopeText1 = 'Отлично';
                            } else if(el.scope1 >= 35 && el.scope1 < 45) {
                                el.scopeText1 = 'Хорошо';
                            }
                            else if(el.scope1 >=25 && el.scope1 < 35){
                                el.scopeText1 = 'Удовлетворительно'
                            }
                            if(el.scope2 >= 45 && el.scope2 <=54) {
                                el.scopeText2 = 'Отлично';
                            } else if(el.scope2 >= 35 && el.scope2 < 45) {
                                el.scopeText2 = 'Хорошо';
                            }
                            else if(el.scope2 >=25 && el.scope2 < 35){
                                el.scopeText2 = 'Удовлетворительно'
                            }
                            if(el.scope3 >= 45 && el.scope3 <=54) {
                                el.scopeText3 = 'Отлично';
                            } else if(el.scope3 >= 35 && el.scope3 < 45) {
                                el.scopeText3 = 'Хорошо';
                            }
                            else if(el.scope3 >=25 && el.scope3 < 35){
                                el.scopeText3 = 'Удовлетворительно'
                            }
                            if(el.scope4 >= 45 && el.scope4 <=54) {
                                el.scopeText4 = 'Отлично';
                            } else if(el.scope4 >= 35 && el.scope4 < 45) {
                                el.scopeText4 = 'Хорошо';
                            }
                            else if(el.scope4 >=25 && el.scope4 < 35){
                                el.scopeText4 = 'Удовлетворительно'
                            }

                        } else if(this.type.includes('Зачет')) {
                            if(el.scope1 !== '') {
                                el.scopeText1 = 'Зачтено'
                            }
                            if(el.scope2 !== '') {
                                el.scopeText2 = 'Зачтено'
                            }
                            if(el.scope3 !== '') {
                                el.scopeText3 = 'Зачтено'
                            }
                            if(el.scope4 !== '') {
                                el.scopeText4 = 'Зачтено'
                            }
                        }

                    })
                    console.log('Вотчер отработал ' + counter)
                },

                deep: true,

            },

            type() {
                this.listOfStudent.forEach(el => {
                    if(this.type.includes('Экзамен')) {
                        if(el.scope1 >= 45 && el.scope1 <=54) {
                            el.scopeText1 = 'Отлично';
                        } else if(el.scope1 >= 35 && el.scope1 < 45) {
                            el.scopeText1 = 'Хорошо';
                        }
                        else if(el.scope1 >=25 && el.scope1 < 35){
                            el.scopeText1 = 'Удовлетворительно'
                        }

                        if(el.scope2 >= 45 && el.scope2 <= 54) {
                            el.scopeText2 = 'Отлично';
                        } else if(el.scope2 >= 35 && el.scope2 < 45) {
                            el.scopeText2 = 'Хорошо';
                        }
                        else if(el.scope2 >=25 && el.scope2 < 35){
                            el.scopeText2 = 'Удовлетворительно'
                        }
                        if(el.scope3 >= 45 && el.scope3 <= 54) {
                            el.scopeText3 = 'Отлично';
                        } else if(el.scope3 >= 35 && el.scope3 < 45) {
                            el.scopeText3 = 'Хорошо';
                        }
                        else if(el.scope3 >=25 && el.scope3 < 35){
                            el.scopeText3 = 'Удовлетворительно'
                        }
                        if(el.scope4 >= 45 && el.scope4 <= 54) {
                            el.scopeText4 = 'Отлично';
                        } else if(el.scope4 >= 35 && el.scope4 < 45) {
                            el.scopeText4 = 'Хорошо';
                        }
                        else if(el.scope4 >=25 && el.scope4 < 35){
                            el.scopeText4 = 'Удовлетворительно'
                        }
                    } else if(this.type.includes('Зачет с оценкой')) {
                        if(el.scope1 >= 45 && el.scope1 <= 54) {
                            el.scopeText1 = 'Отлично';
                        } else if(el.scope1 >= 35 && el.scope1 < 45) {
                            el.scopeText1 = 'Хорошо';
                        }
                        else if(el.scope1 >=25 && el.scope1 < 35){
                            el.scopeText1 = 'Удовлетворительно'
                        }
                        if(el.scope2 >= 45 && el.scope2 <= 54) {
                            el.scopeText2 = 'Отлично';
                        } else if(el.scope2 >= 35 && el.scope2 < 45) {
                            el.scopeText2 = 'Хорошо';
                        }
                        else if(el.scope2 >=25 && el.scope2 < 35){
                            el.scopeText2 = 'Удовлетворительно'
                        }
                        if(el.scope3 >= 45 && el.scope3 <= 54) {
                            el.scopeText3 = 'Отлично';
                        } else if(el.scope3 >= 35 && el.scope3 < 45) {
                            el.scopeText3 = 'Хорошо';
                        }
                        else if(el.scope3 >=25 && el.scope3 < 35){
                            el.scopeText3 = 'Удовлетворительно'
                        }
                        if(el.scope4 >= 45 && el.scope4 <= 54) {
                            el.scopeText4 = 'Отлично';
                        } else if(el.scope4 >= 35 && el.scope4 < 45) {
                            el.scopeText4 = 'Хорошо';
                        }
                        else if(el.scope4 >=25 && el.scope4 < 35){
                            el.scopeText4 = 'Удовлетворительно'
                        }
                    } else if(this.type.includes('Зачет')) {
                        if(el.scope1 !== '') {
                            el.scopeText1 = 'Зачтено'
                        }
                        if(el.scope2 !== '') {
                            el.scopeText2 = 'Зачтено'
                        }
                        if(el.scope3 !== '') {
                            el.scopeText3 = 'Зачтено'
                        }
                        if(el.scope4 !== '') {
                            el.scopeText4 = 'Зачтено'
                        }
                    }

                })
            },
            checked() {
                this.listOfStudent.forEach(el => {
                    if((typeof el.scope1) === 'number') {
                        if(el.scope1 < 25 || el.scope1 > 54) {
                            el.scope1 = ''
                            el.scopeText1 =''
                        }
                    }
                    if((typeof el.scope2) === 'number') {
                        if(el.scope2 < 25) {
                            el.scope2 = ''
                            el.scopeText2 =''
                        }
                    }
                    if((typeof el.scope3) === 'number') {
                        if(el.scope3 < 25) {
                            el.scope3 = ''
                            el.scopeText3 =''
                        }
                    }
                    if((typeof el.scope4) === 'number') {
                        if(el.scope4 < 25) {
                            el.scope4 = ''
                            el.scopeText4 =''
                        }
                    }
                    if((typeof el.m1) === 'number') {
                        if(el.m1 < 25) {
                            el.m1 = ''
                        }
                    }
                    if((typeof el.m2) === 'number') {
                        if(el.m2 < 25) {
                            el.m2 = ''
                        }
                    }
                })
            },

        },
        methods: {
            headersInit() {
                this.arrayHeaders = [
                    {semester: 'Весенний семестр 2022/2023 учебного года'},
                    {fieldsOfStudy: '09.03.03 «Прикладная информатика»'},
                    {date: '26.02.2023 21:57:41'},
                    {discipline: this.$route.params.name},
                    {group: this.currentGroup},
                    {department: 'УИТС'},
                    {teachers: ['Ибатулин М.Ю.','Чеканин В.А', 'Бычкова Н.А.']}
                ]

            },
            async initStudents() {
                try {
                    let counter = 1;
                    const response = await getStudent();
                    const users = response.data;
                    console.log(users);
                    users.forEach(el => {
                        this.listOfStudent.push({id: el.id, FIO : el.fio, m1: '', m2: '', scope1: '', scopeText1: '',
                            date1: '', teacher1 :'', scope2: '', scopeText2 :'', date2 :'', teacher2 :'',
                            scope3 : '', scopeText3 : '', date3 :'', teacher3 :'',
                            scope4 :'', scopeText4 :'', date4 :'', teacher4 :'' })
                        this.counterCols.push(counter);
                        this.counter ++;
                    })

                    
                } catch (error) {
                    console.error(error)
                }
            },
            addStudent() {
                let counter = this.listOfStudent.length + 1;
                this.listOfStudent.push({id: counter, FIO : this.newStudent, m1: '', m2: '', scope1: '', scopeText1: '',
                    date1: '', teacher1 :'', scope2: '', scopeText2 :'', date2 :'', teacher2 :'',
                    scope3 : '', scopeText3 : '', date3 :'', teacher3 :'',
                    scope4 :'', scopeText4 :'', date4 :'', teacher4 :'' })
                this.newStudent = '';
                this.sortedStudents()
            },
            sortedStudents() {
                this.listOfStudent.sort((st1, st2) => {
                    const key = 'FIO'
                    return st1[key]?.localeCompare(st2[key])
                })
                let newcounter = 1;
                this.listOfStudent.forEach(el => {
                    el.id = newcounter;
                    newcounter++;
                })
            },
            send() {
                try {
                    axios.post("url", this.listOfStudent)
                } catch (e) {
                    console.error(e)
                }

            },

            validinpsc1() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.scope1);
                    if(value < 25 || value > 54) {
                        el.scope1 = ''
                        el.scopeText1 = ''
                    }
                })
            },
            validinpsc2() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.scope2);
                    if(value < 25 || value > 54) {
                        el.scope2 = ''
                        el.scopeText2 = ''
                    }
                })
            },
            validinpsc3() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.scope3);
                    if(value < 25 || value > 54) {
                        el.scope3 = ''
                        el.scopeText3 = ''
                    }
                })
            },
            validinpsc4() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.scope4);
                    if(value < 25 || value > 54) {
                        el.scope4 = ''
                        el.scopeText4 = ''
                    }
                })
            },
            validinpm1() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.m1);
                    if(value < 25 || value > 54) {
                        el.m1 = ''
                    }
                })
            },
            validinpm2() {
                this.listOfStudent.forEach(el => {
                    const value =  Number(el.m2);
                    if(value < 25 || value > 54) {
                        el.m2 = ''
                    }
                })
            }


        }
    }
</script>





<style scoped>
    th input {
        width: 100%;
    }
    th {
        font-size: 12px;
    }

    .FIO {
        /*font-family: Avenir, Helvetica, Arial, sans-serif;*/
        /*-webkit-font-smoothing: antialiased;*/
        /*-moz-osx-font-smoothing: grayscale;*/
        text-align: center;
        font-size: 12px;
        color: black;
    }
    .M1M2 {
        background-color: rgba(127, 215, 251, 0.4);
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    .borderSt {
        border: 1px solid #0d6efd;
        border-right: 2px solid black;
    }
    .borderLeftID {
        border-left: 2px solid black
    }
    .grayCol {
        background: gray;
    }
    .left {
        text-align: left;
    }
    .table select.form-select {
        width: auto;
        min-width: 100%;
    }
    .form-control {
        height: 30px;
        font-size: 14px;
        padding: 4px 8px;
    }


</style>