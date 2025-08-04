// import { renderHook } from '@testing-library/react';
// import { useMobile } from '../useMobile';

// describe('useMobileFunction', () => {
// 	let windowSpy: jest.Mock;

// 	beforeEach(() => {
// 		windowSpy = jest.spyOn(global.window, 'window', 'get') as jest.Mock;
// 	});

// 	afterEach(() => {
// 		windowSpy.mockRestore();
// 	});

// 	it('should return true for 600 screen', () => {
// 		windowSpy.mockImplementation(() => ({
// 			innerWidth: 600,
// 		}));

// 		const data = renderHook(() => useMobile());
// 		expect(data.result).toBe(true);
// 	});
// 	it('should return false for 601 screen', () => {
// 		windowSpy.mockImplementation(() => ({
// 			innerWidth: 601,
// 		}));

// 		const data = renderHook(() => useMobile());
// 		expect(data.result).toBe(false);
// 	});
// });
import { renderHook } from '@testing-library/react';
import { useMobile } from '../useMobile';

describe('useMobile', () => {
	const originalInnerWidth = window.innerWidth;

	afterAll(() => {
		// Restore original innerWidth after all tests
		Object.defineProperty(window, 'innerWidth', {
			configurable: true,
			value: originalInnerWidth,
		});
	});

	it('should return true for 600 screen', () => {
		// Mock window.innerWidth
		Object.defineProperty(window, 'innerWidth', {
			configurable: true,
			value: 600,
		});

		const { result } = renderHook(() => useMobile());
		expect(result.current).toBe(true);
	});

	it('should return false for 601 screen', () => {
		// Mock window.innerWidth
		Object.defineProperty(window, 'innerWidth', {
			configurable: true,
			value: 601,
		});

		const { result } = renderHook(() => useMobile());
		expect(result.current).toBe(false);
	});
});
