import axios from 'axios'


class UserService {

    constructor() {
        this.app = axios.create({
            baseURL: 'http://localhost:5000',
            withCredentials: true
        })
    }

    profile = () => this.app.get('/profile') //The current user's profile (dependent on role)
    getAllUsers = () => this.app.get('/allusers') //All users except itself (dependent on role)
    getOneUser = userId => this.app.get(`/user/${userId}`) //Get a signle user's info

    changeName = name => this.app.put('/changename', { name }) //Updated CurrentUser.json (dependent on role)
    
    addFriend = friendId => this.app.put('/addfriend', {friendId}) //Updated CurrentUser.json (dependent on role)
    removeFriend = friendId => this.app.put('/removefriend', { friendId }) //Updated CurrentUser.json (dependent on role)
    
    deleteOneUser = userId => this.app.delete(`/${userId}`) //msg: 'User deleted successfully'

}


export default UserService