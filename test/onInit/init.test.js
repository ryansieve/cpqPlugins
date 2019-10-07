'use strict'

import { init } from '../../src/onInit/init'
import quote from '../mocks/QuoteMock'

test('init', () => {
    expect.assertions(1)
    return init(quote, null)
        .then( resp => {
            expect(resp).toBe(undefined)
        }, err => {
            expect(err).toBe(null)
        })
})
