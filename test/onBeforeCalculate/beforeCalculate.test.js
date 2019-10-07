'use strict'

import { beforeCalculate } from '../../src/onBeforeCalculate/beforeCalculate'

test('beforeCalculate', () => {
    expect.assertions(1)
    return beforeCalculate(null, null)
        .then( resp => {
            expect(resp).toBe(undefined)
        }, err => {
            expect(err).toBe(null)
        })
})
