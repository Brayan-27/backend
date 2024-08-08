const { faker } = require('@faker-js/faker');

class ProductService {
    constructor() {
        this.products = [];
        this.generate();
    }

    generate() {
        const limit = 100;
        for (let index = 0; index < limit; index++) {
            this.products.push({
                id: faker.datatype.uuid(),
                name: faker.commerce.productName(), 
                price: parseInt(faker.commerce.price(), 10), 
                image: faker.image.imageUrl(),
            });
        }
    }

    create(data) {
        const newProduct = {
            id: faker.datatype.uuid(),
            ...data
        };
        this.products.push(newProduct);
        return newProduct;
    }

    find() {
        return new Promise((resolve, reject)=> {
            setTimeout(() =>{
                resolve(this.products);
            },5000);
        });
    }

    findOne(id) {
        return this.products.find(item => item.id === id);
    }

    update(id, changes) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        const product = this.products[index];
        this.products[index] = {
            ...product,
            ...changes
        };
        return this.products[index];
    }

    delete(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error('Product not found');
        }
        this.products.splice(index, 1);
        return { id };
    }
}

module.exports = ProductService;


//productos
//http://localhost:3000/api/v1/products

//por id 
//http://localhost:3000/api/v1/products/244cae03-54b1-471c-af37-8bc30bcb71f2


//ver filter 
//http://localhost:3000/api/v1/products/filter