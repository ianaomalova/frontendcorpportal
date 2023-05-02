<template>

    <div class="event-form-modal">
        <div class="event-form-wrapper">
            <form @submit.prevent="submitEvent" class="event-form">
                <div class="form-group">
                    <label for="title">Title:</label>
                    <input v-model="task.title" type="text" id="title" required />
                </div>
                <div class="form-group">
                    <label for="dateStart">Start date:</label>
                    <input v-model="task.dateStart" type="date" id="dateStart" required />
                </div>
                <div class="form-group">
                    <label for="dateEnd">End date:</label>
                    <input v-model="task.dateEnd" type="date" id="dateEnd" required />
                </div>
                <div class="form-group">
                    <label for="timeStart">Start time:</label>
                    <input v-model="task.timeStart" type="time" id="timeStart" required />
                </div>
                <div class="form-group">
                    <label for="timeEnd">End time:</label>
                    <input v-model="task.timeEnd" type="time" id="timeEnd" required />
                </div>
                <div>
                    <select v-model="task.color" name="color" id="color">
                        <option value="green" selected="selected">Зеленый</option>
                        <option value="yellow">Желтый</option>
                        <option value="blue">Голубой</option>
                        <option value="red">Красный</option>
                    </select>
                </div>
                <div class="form-group">
                    <button type="submit">Сохранить</button>
                </div>
            </form>
            <button class="close-button" @click="$emit('close')">X</button>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                task: {
                    title: '',
                    dateStart: '',
                    dateEnd: '',
                    timeStart: '',
                    timeEnd: '',
                    color: 'blue',
                },
            };
        },
        props: {
            newObj: {
                type: Object,
            },
            date: {
                type: String,
            },
        },
        methods: {
            submitEvent() {
                this.$emit('add-event', this.task);
                this.task.title = '';
                this.task.dateStart = '';
                this.task.dateEnd = '';
                this.task.timeStart = '';
                this.task.timeEnd = '';

            },
            init() {
                console.log('init');
                if (this.newObj.title !== '') {
                    this.task.title = this.newObj.title;
                    this.task.dateStart = this.newObj.dateStart;
                    this.task.dateEnd = this.newObj.dateEnd;
                    this.task.timeStart = this.newObj.timeStart;
                    this.task.timeEnd = this.newObj.timeEnd;
                    this.task.color = this.newObj.color;
                }
                if (this.date !== '') {
                    this.task.dateStart = this.date;
                    this.task.dateEnd = this.date;
                }
            },
        },
        mounted() {
            this.init();
        },

    };
</script>

<style>
    .event-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999; /* Устанавливаем z-index больше, чем у родительского компонента, чтобы он был поверх него */
        padding: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        border-radius: 5px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    }
    .event-form-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .event-form-wrapper {
        background-color: white;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
        display: flex;
        flex-direction: column;
    }

    .event-form {
        display: flex;
        flex-direction: column;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }

    label {
        font-weight: bold;
        margin-bottom: 5px;
    }

    input[type='text'],
    input[type='date'],
    input[type='time'] {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        margin-bottom: 5px;
    }

    button[type='submit'] {
        background-color: #008cba;
        color: white;
        border: none;
        border-radius: 5px;
        padding: 10px;
        font-size: 16px;
        cursor: pointer;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background-color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        padding: 5px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
    }
    .modal {
        z-index: 99999;
    }
</style>
