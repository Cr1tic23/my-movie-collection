import { TruncatePipe } from './truncate-pipe';

describe('TruncatePipe', () => {
  const pipe = new TruncatePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should truncate long text', () => {
    const text = 'This is a very long text';
    const result = pipe.transform(text, 10);
    expect(result).toBe('This is a ...');
  });

  it('should not truncate short text', () => {
    const text = 'Short';
    const result = pipe.transform(text, 10);
    expect(result).toBe('Short');
  });
});
