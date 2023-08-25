export class Pagination{
    async  paginate(limit: number, page: number, data: any, totalCount: number): Promise<any> {
       var result =  await data.limit(limit).skip(limit * (page-1)).exec();
       const totalPages = Math.ceil(totalCount /  parseInt(limit?.toString()));
       const isLastPage = parseInt(page?.toString()) >= totalPages;
        var response = {
        data: result,
        pagination: {
           limit:parseInt(limit?.toString()),
           page:parseInt(page?.toString()),
           totalCount:totalCount,
           totalPages,
           currentPage: parseInt(page?.toString()),
           isLastPage,
        },
      };
      return response;
     }
   }