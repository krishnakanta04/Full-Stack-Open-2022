import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const req = axios.get(baseUrl)
    return req.then(res => res.data)
}

const create = obj => {
    const req = axios.post(baseUrl, obj)
    return req.then(res => res.data)
}

const remove = id => {
    const req = axios.delete(`${baseUrl}/${id}`)
    return req.then(res => res.data)
}

const update = (id, obj) => {
    const req = axios.put(`${baseUrl}/${id}`, obj)
    return req.then(res => res.data)
}

const recordService = {getAll, create, remove, update}

export default recordService