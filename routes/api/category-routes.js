const router = require('express').Router()
const { Category, Product } = require('../../models')

// find all categories
router.get('/', async (req, res) => {
  try {
    const dbCategoryData = await Category.findAll({
      include: [{ model: Product }],
    })

    const categories = dbCategoryData.map((category) => {
      return category.get({ plain: true })
    })

    res.status(200).json(categories)
  } catch (error) {
    res.status(500).json(error)
  }
})

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    const category = dbCategoryData.get({ plain: true })

    res.status(200).json(category)
  } catch (error) {
    res.status(500).json(error)
  }
})

// create a new category
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      "category_name": "seasonal"
    }
  */
  try {
    const newCategory = await Category.create(req.body)

    res.status(201).json(newCategory)
  } catch (error) {
    res.status(500).json(error)
  }
})

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const newCategory = await Category.update(req.body, {
      where: {
        id: req.params.id,
      },
    })

    if (!newCategory) {
      res.status(404).json({ message: 'No category found with this id!' })
      return
    }

    res.status(200).json({ message: 'record changed' })
  } catch (error) {
    res.status(500).json(error)
  }
})

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const dbCategoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    })

    if (!dbCategoryData) {
      res.status(404).json({ message: 'No category found with this id!' })
      return
    }

    res.status(200).json({ message: 'record deleted', dbCategoryData })
  } catch (error) {
    res.status(500).json(error)
  }
})

module.exports = router
