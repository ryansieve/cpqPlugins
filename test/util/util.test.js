'use strict'

import flatten from '../../src/util/flattenRecords'
import quote from '../mocks/QuoteMock'
import lines from '../mocks/QuoteLineMock'

test('flatten', () => {
    let response = flatten(quote, lines)
    expect(response.quote).not.toBe(null)
    expect(response.quote.SBQQ__Opportunity__r).toBe(undefined)
    expect(response.lines).not.toBe(null)
    expect(response.quote.SBQQ__Product__r).toBe(undefined)
})
