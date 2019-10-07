'use strict'

import { isEditable, isVisible } from '../../src/pageSecurityPlugin/psp'

test('isEditable', () => {
    expect(isEditable('Name', null, null)).toBe(null);
})

test('isVisible', () => {
    expect(isVisible('Name', null, null)).toBe(null);
})

