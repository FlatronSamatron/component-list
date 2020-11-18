import axios from 'axios'

const postsApi = {
    async getPosts() {
        const {data} = await axios.get('http://jsonplaceholder.typicode.com/posts')
        return data
    },
    async addPost (post) {
        const {data} = await axios.post('http://jsonplaceholder.typicode.com/posts', post)
        console.log(data)
        return data
    }
}

export default postsApi