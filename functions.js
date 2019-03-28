/**
 * Created by Phanou on 23/03/2019.
 */
exports.success= function(result){
    "use strict";
    return{
        status:'success',
        result: result
    }
}
exports.erreur= function(msg){
    "use strict";
    return {
        status:'erreur',
        message:msg
    }
}