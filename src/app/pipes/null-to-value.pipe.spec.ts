import { NullToValuePipe } from './null-to-value.pipe';

describe('NullToValuePipe', () => {
  it('create an instance', () => {
    const pipe = new NullToValuePipe();
    expect(pipe).toBeTruthy();
  });
});
