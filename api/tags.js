const express = require('express');
const tagsRouter = express.Router();
const { getPostsByTagName } = require('../db');

tagsRouter.use((req, res, next) => {
  console.log('A request is being made to /tags');

  next();
});

const { getAllTags } = require('../db');

tagsRouter.get('/', async (req, res) => {
  const posts = await getAllTags();

  res.send({
    posts,
  });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  const { tagName } = req.params;

  try {
    const filterTagPosts = await getPostsByTagName(tagName);
    // use our method to get posts by tag name from the db
    const posts = filterTagPosts.filter((post) => {
      // keep a post if it is either active, or if it belongs to the current user
      //for an ACTIVE post
      if (post.active) {
        return true;
      }

      //for a post that belongs to the user, whether active or not
      if (req.user && post.author.id === req.user.id) {
        return true;
      }

      //else
      return false;
    });

    res.send({
      posts,
    });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
