export const validate= (schema,req)=>{
    const result= schema.validate(req)
    if(result.error){
        throw result.error
    }else{
        return result.value
    }
}