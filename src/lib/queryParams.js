import { FIELD_SEPARATOR, EQUAL_SYMBOL, VALUE_SEPARATOR, ALLOWED_QUERY_OPERATOR } from './constants'

export const prepareSelectParam = (arSelect = []) => {
    if (arSelect.length < 1) {
        return "";
    }

    return arSelect.join(FIELD_SEPARATOR)
}

/**
 * Method to prepare filters query param syntax
 * 
 * @param {Array}   arFilters   Array of objects to perform filters
 * @example[{
     key: 'name',
     value: 'magnitt',
     op: null
 }, {
     key: 'id',
     value: 152,
     op: 'gte'
 }]
 * @returns {String}            Returns a prepared query param string
 */
export const prepareFilterParam = (arFilters = []) => {
    if (arFilters.length < 1) {
        return "";
    }

    let arTempFilters = []
    let strTempFilter = ''
    let objTempFilter = {}
    let strTempVal;

    for (let i = 0; i < arFilters.length; i++) {
        objTempFilter = arFilters[i]
        if (objTempFilter.value.length > 0) { // here check if string, continue with this same logic
            if (objTempFilter.op === ALLOWED_QUERY_OPERATOR.gte || objTempFilter.op === ALLOWED_QUERY_OPERATOR.lte) {
                strTempVal = objTempFilter.value
            }
            else {
                strTempVal = objTempFilter.value.join(VALUE_SEPARATOR)
            }
            strTempFilter = `${objTempFilter.key}${objTempFilter.op}${strTempVal}`
            arTempFilters.push(strTempFilter)
        } else if(Array.isArray(objTempFilter.value)) { //TODO: here do the in thing 

        } 
    }

    arTempFilters = arTempFilters.join(FIELD_SEPARATOR);
    return encodeURIComponent(arTempFilters);
}

/**
 * Method to prepare filters query param syntax
 * 
 * @param {Array}   arSort   Array of objects to perform sort
 * @example[{
     key: 'name',
     sortVal: 'asc'
 }, {
     key: 'id',
     sortVal: 'desc'
 }]
 * @returns {String}            Returns a prepared query param string
 */

export const prepareSortParam = (arSort = []) => {
    if (arSort.length < 1) {
        return "";
    }

    let objTempSort = {}
    let arTempSort = []
    for (let i = 0; i < arSort.length; i++) {
        objTempSort = arSort[i]
        arTempSort.push(`${objTempSort.key}${EQUAL_SYMBOL}${objTempSort.sortVal}`)
    }

    return arTempSort.join(FIELD_SEPARATOR)
}
