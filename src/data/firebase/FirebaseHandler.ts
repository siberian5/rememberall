import {DataClient} from '../DataProvider'
import FirebaseData, {ModelOps, TaskDescription, UserId} from './FirebaseData'

/*
    Это высокоуровневый интерфейс БД.
    Эти функции предназначены для использования логикой бота/админкой сайта.
    Некоторые из этих функций передают работу низкоуровневым функциям,
    другие (см addNewTask) при своём выполнении дёргают по нескольку
    низкоуровневых функций (и совершают по нескольку сетевых вызовов).
 */

export const addNewTask = (firestoreOps: ModelOps) => async (userId: UserId, description: TaskDescription ) => {

    const counterVal = await firestoreOps.getCounter(userId)

    const nextVal = counterVal+ 1

    const newTask = {
        name : '/task'+nextVal,
        description : description,
        time : new Date(),
        done : false
    }

    await firestoreOps.addTask(userId, newTask)
    await firestoreOps.setCounter(userId, nextVal)

    return nextVal
}

export const finishTask = (firestoreOps: ModelOps) => async (userId: UserId, taskName: string ) => {

    const taskResult = await firestoreOps.getTaskByName(userId, taskName)
    if(taskResult === null) return

    const {task, taskId} = taskResult
    task.done = true

    return await firestoreOps.updateTaskById(userId, taskId, task)
}

export const listAllUserTasks = (firestoreOps: ModelOps) => async (userId : number, limit: number) => {
    return firestoreOps.listAllUserTasks(userId, limit)
}

export const listUnfinishedUserTasks = (firestoreOps: ModelOps) => async (userId : number, limit: number) => {
    return firestoreOps.listUnfinishedUserTasks(userId, limit)
}

export const getTaskByName = (firestoreOps: ModelOps) => async (userId : number, taskName: string) => {

    const taskWithId = await firestoreOps.getTaskByName(userId, taskName)

    return ( taskWithId === null) ? null : taskWithId.task
}

export async function create(data: DataClient) {
    const firebaseModel = await FirebaseData.create(data)

    return {
        listAllUserTasks: listAllUserTasks(firebaseModel),
        listUnfinishedUserTasks: listUnfinishedUserTasks(firebaseModel),
        addNewTask: addNewTask(firebaseModel),
        getTaskByName: getTaskByName(firebaseModel),
        finishTask: finishTask(firebaseModel)
    }
}

export default { create }