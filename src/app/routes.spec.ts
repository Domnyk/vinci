import { routes } from './routes';

const expectedPaths: Array<string> = [
  'sign_up',
  'sign_in',
  '',
  '**'
]

describe('Routes', () => {
  it('should have expected routes', () => {
    routes.forEach(({path, component}, index) => {
      const actualPath = path;
      const expectedPath: string = expectedPaths[index];

      expect(actualPath).toEqual(expectedPath);
    });
  });
});