export class Pagination{
    static paginate(limit: number, page: number, data: any) {
       return data.limit(limit).skip(limit * (page -1)).exec();
     }
   }