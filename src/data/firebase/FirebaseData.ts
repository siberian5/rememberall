import { DataClient } from '../DataProvider'
import firebase from 'firebase'
import Firestore = firebase.firestore.Firestore
import Timestamp = firebase.firestore.Timestamp

/*

    Это низкоуровневый интерфейс базы данных.
    Все запросы прописаны здесь.

 */

export type ModelOps = {
    getCounter: ReturnType<typeof getCounter>
    setCounter: ReturnType<typeof setCounter>
    listUnfinishedUserTasks: ReturnType<typeof listUnfinishedUserTasks>
    listAllUserTasks: ReturnType<typeof listAllUserTasksLimited>
    addTask: ReturnType<typeof addTask>
    getTaskByName: ReturnType<typeof getTaskByName>
    updateTaskById: ReturnType<typeof updateTaskById>
}

export type UserId = number
export type TaskName = string
export type TaskDescription = string
export type TaskId = string
export type Task = {
    name: TaskName
    description: TaskDescription
    time: Date
    done: boolean
}
export type TaskWithId = {task: Task, taskId: TaskId}


export const listUnfinishedUserTasks = (firestore: () => Firestore) => async (id: UserId, limit: number) => {
    const tasksSnapshot = await firestore()
        .collection('tasks')
        .where('userId', '==', id )
        .where('done', '==', false)
        .orderBy('time', 'desc' )
        .limit(limit)
        .get()

    const result: (Task)[] = []

    if (tasksSnapshot.empty) {
        return result
    }

    tasksSnapshot.forEach(taskHolder => {
        const taskData = taskHolder.data()
        result.push({
            name: taskData.name,
            description: taskData.description,
            time: taskData.time.toDate(),
            done: taskData.done,
        })
    })

    return result
}

// Специальный индеск создан в файрбейсе для этого запроса
export const listAllUserTasksLimited = (firestore: () => Firestore) => async (userId: UserId, limit: number) => {

    const tasksSnapshot = await firestore()
        .collection('tasks')
        .where('userId', '==', userId )
        .orderBy('time', 'desc' )
        .limit(limit)
        .get()

    const result: (Task)[] = []

    if (tasksSnapshot.empty) {
        return result
    }

    tasksSnapshot.forEach(taskHolder => {
        const taskData = taskHolder.data()
        result.push({
            name: taskData.name,
            description: taskData.description,
            time: taskData.time.toDate(),
            done: taskData.done,
        })
    })

    return result
}

export const updateTaskById = (firestore: () => Firestore) => async (userId: UserId, taskId: TaskId, task: Task) => {

    const updatedTaskFB = {
        userId : userId,
        description: task.description,
        done: task.done,
        name: task.name,
        time: Timestamp.fromDate(task.time)
    }

    return await firestore().collection('tasks').doc(taskId).set(updatedTaskFB)
}

export const getTaskByName = (firestore: () => Firestore) => async (userId: UserId, taskName: string)
    :Promise<TaskWithId | null> => {

    const tasksSnapshot = await firestore()
        .collection('tasks')
        .where('userId', '==', userId )
        .where('name', '==', taskName)
        .get()


    if (tasksSnapshot.empty) {
        return null
    }

    let result: (TaskWithId)[] = []

    // там только один агрегат

    tasksSnapshot.forEach(taskHolder => {

        const taskData = taskHolder.data()

        result.push(
            {   task: {
                        description: taskData.description,
                        done: taskData.done,
                        time: taskData.time.toDate(),
                        name: taskData.name
                    },
                taskId: taskHolder.id
            })
    })

    return result[0]
}

export const addTask = (firestore: () => Firestore) => async (userId: UserId, task: Task) => {

    const newTaskFB = {
        userId : userId,
        description: task.description,
        done: task.done,
        name: task.name,
        time: Timestamp.fromDate(task.time)
    }

    await firestore().collection('tasks').add(newTaskFB)
}

export const getCounter = (firestore: () => Firestore) => async (id: UserId)
    :Promise<number> => {

    const docRef = await firestore().collection('counters').doc(id.toString())
    const doc = await docRef.get()

    if (!doc.exists) {
        return 0
    }

    return doc.data()!.counter
}

export const setCounter = (firestore: () => Firestore) => async (id: UserId, counter: number) => {

    await firestore().collection('counters').doc(id.toString()).set({counter: counter})

}

export async function create(client: DataClient): Promise<ModelOps> {

    const firestore = () => client.firebase.firestore()

    return {
        getCounter: getCounter(firestore),
        setCounter: setCounter(firestore),
        listAllUserTasks: listAllUserTasksLimited(firestore),
        listUnfinishedUserTasks: listUnfinishedUserTasks(firestore),
        addTask: addTask(firestore),
        getTaskByName: getTaskByName(firestore),
        updateTaskById: updateTaskById(firestore)
    }
}

export default { create }
