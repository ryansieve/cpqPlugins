'use strict'

import { afterCalculate } from '../../src/onAfterCalculate/afterCalculate'

test('afterCalculate', () => {
    expect.assertions(1)
    return afterCalculate(null, null)
        .then( resp => {
            expect(resp).toBe(undefined)
        }, err => {
            expect(err).toBe(null)
        })
})
