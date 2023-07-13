class ApiFeatures{
    constructor(query,queryStr){
        this.query=query;
        this.queryStr=queryStr;
    }

    search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,
                $options:"i",
            },
        }:{};
        //console.log(keyword);
        this.query=this.query.find({...keyword});
        return this;
    }

    filter() {
        const queryDup = { ...this.queryStr };
        const removeFields = ["keyword", "page", "limit"];
        removeFields.forEach((key) => delete queryDup[key]);
      
        let queryStr = JSON.stringify(queryDup);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
      
        this.query = this.query.find(JSON.parse(queryStr));
      
        //console.log(queryStr);
        return this;
      }

      pagination(resultPerPage){
        const currPage=Number(this.queryStr.page)||1;
        const skip=resultPerPage*(currPage-1);

        this.query=this.query.limit(resultPerPage).skip(skip);
        return this;
      }

}

module.exports=ApiFeatures;