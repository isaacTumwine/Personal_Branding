var products = [
  {id: 1, name: 'blog1', description: 'Superheroic JavaScript MVW Framework.'},
  {id: 2, name: 'blog2', description: 'A framework for creating ambitious web applications.'},
  {id: 3, name: 'blog3', description: 'A JavaScript Library for building user interfaces.'}
];

function findProduct (blogid) {
  return products[findProductKey(blogid)];
};

function findProductKey (blogid) {
  for (var key = 0; key < products.length; key++) {
    if (products[key].id == blogid) {
      return key;
    }
  }
};

var List = Vue.extend({
  template: '#blog-list',
  data: function () {
    return {products: products, searchKey: ''};
  }
});

var blog = Vue.extend({
  template: '#blog',
  data: function () {
    return {blog: findProduct(this.$route.params.blog_id)};
  }
});

var ProductEdit = Vue.extend({
  template: '#blog-edit',
  data: function () {
    return {blog: findProduct(this.$route.params.blog_id)};
  },
  methods: {
    updateProduct: function () {
      var blog = this.$get('blog');
      products[findProductKey(blog.id)] = {
        id: blog.id,
        name: blog.name,
        description: blog.description,
        content: blog.content
      };
      router.go('/');
    }
  }
});

var ProductDelete = Vue.extend({
  template: '#blog-delete',
  data: function () {
    return {blog: findProduct(this.$route.params.blog_id)};
  },
  methods: {
    deleteProduct: function () {
      products.splice(findProductKey(this.$route.params.blog_id), 1);
      router.go('/');
    }
  }
});

var AddProduct = Vue.extend({
  template: '#add-blog',
  data: function () {
    return {blog: {name: '', description: ''}
    }
  },
  methods: {
    createProduct: function() {
      var blog = this.$get('blog');
      products.push({
        id: Math.random().toString().split('.')[1],
        name: blog.name,
        description: blog.description,
        // content: blog.content
      });
      router.go('/');
    }
  }
});

var router = new VueRouter();
router.map({
  '/': {component: List},
  '/blog/:blog_id': {component: blog, name: 'blog'},
  '/add-blog': {component: AddProduct},
  '/blog/:blog_id/edit': {component: ProductEdit, name: 'blog-edit'},
  '/blog/:blog_id/delete': {component: ProductDelete, name: 'blog-delete'}
})
  .start(Vue.extend({}), '#app');