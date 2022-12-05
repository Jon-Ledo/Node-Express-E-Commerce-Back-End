const router = require('express').Router()
const { Tag, Product, ProductTag } = require('../../models')

// find all tags
router.get('/', async (req, res) => {
  try {
    const dbTagData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'tagged_product' }],
    })

    const tags = dbTagData.map((tag) => {
      return tag.get({ plain: true })
    })

    res.status(200).json(tags)
  } catch (error) {
    res.status(500).json(error)
  }
})

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  try {
    const dbTagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'tagged_product' }],
    })

    const tag = dbTagData.get({ plain: true })

    res.status(200).json(tag)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a new tag
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "tag_name": "halloween"
    }
  */

  try {
    const newTag = await Tag.create(req.body)

    res.status(201).json(newTag)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const newTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    res.status(200).json(newTag)
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const tagToDelete = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!tagToDelete) {
      res.status(404).json({ message: 'No tag found with this id!' })
      return
    }

    res.status(200).json({ message: 'record deleted', tagToDelete })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
