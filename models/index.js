const Product = require('./Product')
const Category = require('./Category')
const Tag = require('./Tag')
const ProductTag = require('./ProductTag')

Category.hasMany(Product, {
  foreignKey: 'category_id',
})

Product.belongsTo(Category)

Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false,
  },

  as: 'tagIds',
})

Tag.belongsToMany(Product, {
  through: {
    model: 'ProductTag',
    unique: false,
  },
  as: 'tagIds',
})

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
}
