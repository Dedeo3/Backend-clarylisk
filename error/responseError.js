
export default class responseError extends Error{
    constructor(status,msg){
        super(msg);
        this.status=status 
    }
}

