/**
 * This file is used to mock the `@actions/core` module in tests.
 */
import { jest } from '@jest/globals'

export const debug = jest.fn()
export const addPath = jest.fn()
export const setFailed = jest.fn()
