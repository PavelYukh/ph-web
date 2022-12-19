import request from "axios";

const backend = "http://localhost:8080/";
export const updateOne = async (link, data) => {
    try {
        return await request.put(backend + link, data);
    } catch (e) {

        const entity = link.replace(/\/.+/, '');
        if (e.response.status === 400) {
            const res = {};
            const messages = e.response.data.message;
            for (let message of messages){
            const split = message.split(" ");
            const splitName = split[0].split(".");
            const name=splitName.length===3? splitName[2]:splitName[0];
            split[0] = fieldNames[entity][name];
            res[name] = split.join(" ");
            }
            throw new Error(JSON.stringify(res));
        } else {
            e.message = e.response.data.message;
            throw e;
        }
    }

}
export const getOne = (link) => {
    return request.get(backend + link);

}
export const getAll = (link, params = {}) => {
    return request.get(backend + link, params);
}
export const deleteOne = (link) => {
    return request.delete(backend + link);
}
export const createOne = async (link, data) => {
    try {
        return await request.post(backend + link, data);
    } catch(e) {
        const entity = link.replace(/\/.+/, '');
        if (e.response.status === 400) {
            const res = {};
            const messages = e.response.data.message;
            for (let message of messages){
                const split = message.split(" ");
                const splitName = split[0].split(".");
                const name=splitName.length===3? splitName[2]:splitName[0];
                split[0] = fieldNames[entity][name];
                res[name] = split.join(" ");
            }
            throw new Error(JSON.stringify(res));
        } else {
            e.message = e.response.data.message;
            throw e;
        }
    }
}
const fieldNames = {
    department: {
        name: 'Назва',
        shortName: 'Скорочена назва',
        faculty: 'Факультет'
    },
    discipline: {
        name: 'Назва'
    },
    faculty: {
        name: 'Назва',
        shortname: 'Скорочена назва'
    },
    group: {
        department: 'Спеціальність',
        name: 'Назва',
        course: 'Курс'
    },
    schedule: {
        name: 'Назва',
        teacher: 'Викладач',
        discipline: 'Предмет',
        time: 'Час',
        classroom: 'Кабінет'
    },
    student: {
        group: 'Група',
        name: 'Ім\'я',
        email: 'Емайл',
        phone: 'Телефон'
    },
    teacher: {
        name: 'Ім\`я',
        surname: 'Прізвище',
        email: 'Емайл',
        phone: 'Телефон'
    }

}