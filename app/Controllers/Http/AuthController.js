'use strict'

const User = user('App/Models/User')

class AuthController {
  async register({ request }) {
    const data = request.only(['username', 'email', 'password'])
    const user = await User.create(data)
    return user
  }
}