import { methods } from '../src/util/Secretbox';

jest.mock('tweetnacl');

test('Does not throw error with a package installed', () => {
	// @ts-expect-error
	expect(() => methods.open()).not.toThrowError();
});
