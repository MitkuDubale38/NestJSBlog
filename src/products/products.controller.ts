import { Controller, Get, Param, Post, Body, Put, Delete} from '@nestjs/common';
import { ProductsService } from './products.service';

interface ProductDto {
    id: string;
    name: string;
  }


@Controller('products')
export class ProductsController {
    constructor( private readonly productsService: ProductsService){}
  
    @Get()
    getProducts(){
        return this.productsService.getProducts();
    }

    @Get(':id')
    getProduct(@Param() params){
        return this.productsService.getProducts().filter(product => product.id == params.id);

    }
    @Post()
    createProduct(@Body() product: ProductDto){
        this.productsService.createProduct(product);
    }

    @Put()
    updateProduct(@Body() product: ProductDto) {
        this.productsService.updateProduct(product);
    }

    @Delete()
    deleteProduct(@Body() product: ProductDto) {
        this.productsService.deleteProduct(product.id);
    }
    
}
