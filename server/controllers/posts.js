module.exports = {
    readPosts: async (req, res) => {
      // console.log('req',req)
      // let id = 6
      let { id } = req.session.user;
      // let { id } = req.body
      let { mine, search, oldest } = req.query;
      console.log('req.query',req.query)
      const db = await req.app.get('db')
      if (mine && !search) {
        if (oldest) {
          console.log("you've hit oldest")
          db.post.read_all_oldest_first()
            .then(posts => res.status(200).send(posts))
        } else {
          console.log("you' hit all")
          db.post.read_all_posts()
            .then(posts => res.status(200).send(posts))
        }
      } else if (!mine && search) {
        console.log("you've hit not min and search")
        if (oldest) {
          db.search.search_other_oldest_first([`%${search.toLowerCase()}%`, id])
            .then(posts => res.status(200).send(posts))
        } else {
          db.search.search_other_users_posts([`%${search.toLowerCase()}%`, id])
            .then(posts => res.status(200).send(posts))
        }
      } else if (mine && search) {
        if (oldest) {
          db.search.search_all_oldest_first([`%${search.toLowerCase()}%`])
            .then(posts => res.status(200).send(posts))
        } else {
          db.search.search_all_posts([`%${search.toLowerCase()}%`])
            .then(posts => res.status(200).send(posts))
        }
      } else {
        if (oldest) {
          db.post.read_other_oldest_first([id])
            .then(posts => res.status(200).send(posts))
        } else {
          db.post.read_other_users_posts([id])
            .then(posts => res.status(200).send(posts))
        }
      }
    },
    createPost: async (req, res) => {
      //code here
      const db = await req.app.get('db')
      const { id } = req.session.user
      // const id = 1 // for testing
      const { title,content,img } = req.body
      const newPost = db.post.create_post([title,content,img,id])
      return res.status(200).send(newPost)
        
    },
    readPost: (req, res) => {
      req.app.get('db').post.read_post(req.params.id)
        .then(post => post[0] ? res.status(200).send(post[0]) : res.status(200).send({}))
    },
    deletePost: (req, res) => {
      req.app.get('db').post.delete_post(req.params.id)
        .then(_ => res.sendStatus(200))
    }
  }