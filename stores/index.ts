import { defineStore } from 'pinia'
export const useIndexStore = defineStore('indexStore', () => {
    const bg = ref('/bg.jpg')
    const users = ref([])
    enum Priorities {
        High = "High",
        Medium = "Medium",
        Low ="Low",
        Urgent = "Urgent",
        Important = "Important",
        Critical = "Critical"
    }

    interface Todo {
        id: number;
        title: string;
        description: string;
        priority: string;
    }

    interface Board {
        id: number;
        title: string;
        tasks: Todo[];
    }


    const boards = ref<Board[]>([
        { id: 1, title: 'Todo', tasks: [] },
        { id: 2, title: 'In progress', tasks: [] },
        { id: 3, title: 'Done', tasks: [] },
    ])

    const createBoard = (title: string):void => {
        boards.value.push({
            id: Date.now(),
            title,
            tasks: []
        })
    }

    const createTask = (id: number, title: string, description: string, priority: Priorities ) :void => {
        const findBoard = boards.value.find(b => b.id === id)
        if (findBoard) {
            findBoard.tasks.push({
                id: Date.now(),
                title,
                description,
                priority
            })
        } else {
            // можна зробити логіку, де буде показуватися на клієнті в інтерфейсі
            console.error('Board not found')
        }
    }

        const editTask = (id: number, title: string,taskId: number, description: string, priority: Priorities ) :void => {
        const findBoard = boards.value.find(b => b.id === id)
        if (findBoard) {
            const task = findBoard.tasks.find( t => t.id == taskId)
            if (task) {
                Object.assign(task, {
                title,
                description,
                priority
            })
            } else {
                console.error('task not found')
            }

        } else {
            // можна зробити логіку, де буде показуватися на клієнті в інтерфейсі
            console.error('Board not found')
        }
    }



    const setBg = (img: File) => {
        bg.value = URL.createObjectURL(img)
    }

    return { boards, users, createBoard, editTask, Priorities, createTask, bg, setBg }
})