
export function isVisible(fieldName, record, conn, objectName){
    switch(objectName){
        case 'Quote__c':
            //todo - return quote field security
            return true;
            break;
        case 'QuoteLine__c':
            //todo - return line field security
            return true;
            break;
        default:
            return null;
    }
}

export function isEditable(fieldName, record, conn, objectName) {
    switch(objectName){
        case 'Quote__c':
            //todo - return quote field security
            return true;
            break;
        case 'QuoteLine__c':
            //todo - return line field security
            return true;
            break;
        default:
            return null;
    }
}
