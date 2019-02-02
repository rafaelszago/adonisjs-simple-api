'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

/**
 * Resourceful controller for interacting with posts
 */
class PostController {
  /**
   * Show a list of all posts.
   * GET posts
   */
  async index ({ request, response, view }) {
    const posts = await Post.query().with('user').fetch()
    return posts
  }

  /**
   * Create/save a new post.
   * POST posts
   */
  async store ({ request, auth }) {
    const data = request.only(['content'])
    const post = await Post.create({ user_id: auth.user.id, ...data })

    return post
  }

  /**
   * Display a single post.
   * GET posts/:id
   */
  async show ({ params, request, response, view }) {
    const post = await Post.findOrFail(params.id)
    return post
  }

  /**
   * Delete a post with id.
   * DELETE posts/:id
   */
  async destroy ({ params, auth }) {
    const post = await Post.findOrFail(params.id)
    if (post.user_id != auth.user.id) {
      return response.status(401)
    }
    await post.delete()
  }
}

module.exports = PostController
