/* eslint-disable prettier/prettier */
// Uncomment the code below and write your tests
import { doStuffByInterval, doStuffByTimeout, readFileAsynchronously } from '.';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const setTimeoutMock = jest.spyOn(global, 'setTimeout');
    doStuffByTimeout(() => console.log('Yes'), 1000);

    expect(setTimeoutMock).toHaveBeenCalledTimes(1);
    expect(setTimeoutMock).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();
    doStuffByTimeout(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const setIntervalMock = jest.spyOn(global, 'setInterval');
    doStuffByInterval(() => console.log('Yes'), 1000);

    jest.advanceTimersByTime(1000);

    expect(setIntervalMock).toHaveBeenCalledTimes(1);
    expect(setIntervalMock).toHaveBeenLastCalledWith(
      expect.any(Function),
      1000,
    );
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();
    doStuffByInterval(callback, 1000);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(1000);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(1000);
    expect(callback).toHaveBeenCalledTimes(2);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    // const mockedJoin = jest.fn((...paths) => paths.join('/'));
    // jest.doMock('path', () => ({
    //   join: mockedJoin,
    // }));
    // // await import('./index.js');
    // const mockMockOne = mockedJoin as jest.Mock;
    // await readFileAsynchronously('./fileToRead.txt');
    // expect(mockMockOne).toBeCalledWith(__dirname, './fileToRead.txt');
  });

  jest.mock('./index', () => {
    const originalModule = jest.requireActual('./index');

    return {
      ...originalModule,
      readFileAsynchronously: jest.fn(),
    };
  });
  const readFile = readFileAsynchronously as jest.Mock;
  test('should return null if file does not exist', async () => {
    
    const readFileRes = await readFile('./fileToReadNull.txt');
    
    expect(readFileRes).toBeNull();
  });
  
  test('should return file content if file exists', async () => {
    const readFileRes = await readFile('./fileToRead.txt');

    expect(readFileRes).toBe('Data from file');
  });
});
