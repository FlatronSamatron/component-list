import axios from 'axios'

const postsApi = {
    async getPosts() {
        const {data} = await axios.get('https://jsonplaceholder.typicode.com/posts')
        return data
    },
    async addPost (post) {
        const req = await axios.post('https://jsonplaceholder.typicode.com/posts', post)
        console.log(req)
        return req.data
    },
    async editPost (put,id) {
        const req = await axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, put)
        console.log(req)
        return req.data
    }
}

export default postsApi