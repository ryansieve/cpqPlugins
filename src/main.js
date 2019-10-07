import { isVisible, isEditable } from './pageSecurityPlugin/psp'
import { init } from './onInit/init'
import { beforeCalculate } from './onBeforeCalculate/beforeCalculate'
import { afterCalculate } from './onAfterCalculate/afterCalculate'

export function onInit(quoteLineModels, conn){
    return init(quoteLineModels, conn)
}

export function onBeforeCalculate(quote, lines, conn){
    return beforeCalculate(quote, lines, conn)
}

export function onAfterCalculate(quote, lines, conn){
    return afterCalculate(quote, lines, conn)
}

export function isFieldVisibleForObject(fieldName, line, conn, objectName){
    return isVisible(fieldName, line, conn, objectName)
}

export function isFieldEditableForObject(fieldName, line, conn, objectName){
    return isEditable(fieldName, line, conn, objectName)
}