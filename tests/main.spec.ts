import {
  Bem, ThemedBem,
} from "../index";
import {
  expect,
} from 'chai';

describe('bem', function() {
  const blockTestCases = [
    {
      block: 'block1',
      mods: undefined,
      includes: ['block1'],
    },
    {
      block: ['block1', 'block2'],
      mods: undefined,
      includes: ['block1', 'block2'],
    },
    {
      block: ['block1', 'block2'],
      mods: 'mod1',
      includes: ['block1', 'block1--mod1', 'block2', 'block2--mod1'],
    },
  ];

  const themedBlockTestCases = [
    {
      block: 'block1',
      theme: 'theme1',
      mods: undefined,
      includes: ['block1', 'theme1__block1'],
    },
    {
      block: ['block1', 'block2'],
      theme: 'theme1',
      mods: undefined,
      includes: ['block1', 'block2', 'theme1__block1', 'theme1__block2'],
    },
    {
      block: ['block1', 'block2'],
      theme: 'theme1',
      mods: 'mod1',
      includes: ['block1', 'block1--mod1', 'block2', 'block2--mod1', 'theme1__block1', 'theme1__block1--mod1', 'theme1__block2', 'theme1__block2--mod1'],
    },
  ];

  const elTestCases = [
    {
      block: 'block1',
      elements: 'el',
      mods: undefined,
      includes: ['block1__el'],
      notIncludes: ['block1'],
    },
    {
      block: 'block1',
      elements: 'el',
      mods: undefined,
      includes: ['block1__el'],
      notIncludes: ['block1'],
    },
    {
      block: 'block1',
      elements: ['el', 'el2'],
      mods: undefined,
      includes: ['block1__el', 'block1__el2'],
      notIncludes: ['block1'],
    },
    {
      block: 'block1',
      elements: 'el',
      mods: 'mod',
      includes: ['block1__el', 'block1__el--mod'],
      notIncludes: ['block1', 'block1--mod'],
    },
    {
      block: 'block1',
      elements: 'el',
      mods: ['mod', 'mod2'],
      includes: ['block1__el', 'block1__el--mod', 'block1__el--mod2'],
      notIncludes: ['block1', 'block1--mod'],
    },
  ];

  const themeElTestCases = [
    {
      block: 'block1',
      elements: 'el',
      theme: 'theme1',
      mods: undefined,
      includes: ['block1__el', 'theme1__block1__el'],
      notIncludes: ['block1', 'theme1__block1'],
    },
    {
      block: 'block1',
      elements: 'el',
      theme: 'theme1',
      mods: undefined,
      includes: ['block1__el'],
      notIncludes: ['block1'],
    },
    {
      block: 'block1',
      elements: ['el', 'el2'],
      theme: 'theme1',
      mods: undefined,
      includes: ['block1__el', 'block1__el2', 'theme1__block1__el', 'theme1__block1__el2'],
      notIncludes: ['block1', 'theme1__block1'],
    },
    {
      block: 'block1',
      elements: 'el',
      theme: 'theme1',
      mods: 'mod',
      includes: ['block1__el', 'block1__el--mod', 'theme1__block1__el', 'theme1__block1__el--mod'],
      notIncludes: ['block1', 'block1--mod', 'theme1__block1', 'theme1__block1--mod'],
    },
    {
      block: 'block1',
      elements: 'el',
      theme: 'theme1',
      mods: ['mod', 'mod2'],
      includes: ['block1__el', 'block1__el--mod', 'block1__el--mod2', 'theme1__block1__el', 'theme1__block1__el--mod', 'theme1__block1__el--mod2'],
      notIncludes: ['block1', 'block1--mod', 'theme1__block1', 'theme1__block1--mod'],
    },
  ];

  it('block', function() {
    blockTestCases.forEach(testCase => {
      const bem = new Bem(testCase.block);
      const result = bem.block(testCase.mods);
      const resultArr = result.split(' ');

      testCase.includes.forEach(incl => {
        expect(resultArr.indexOf(incl)).not.eq(-1);
      });
    });
  });

  it('block theme', function() {
    themedBlockTestCases.forEach(testCase => {
      const bem = new ThemedBem(testCase.block);
      bem.useTheme(testCase.theme);
      const result = bem.block(testCase.mods);
      const resultArr = result.split(' ');

      testCase.includes.forEach(incl => {
        expect(resultArr.indexOf(incl)).not.eq(-1);
      });
    });
  });

  it('element', function() {
    elTestCases.forEach(testCase => {
      const bem = new Bem(testCase.block);
      const result = bem.element(testCase.elements, testCase.mods);
      const resultArr = result.split(' ');

      testCase.includes.forEach(incl => {
        const resEl = resultArr[resultArr.indexOf(incl)];

        expect(resEl).eq(incl);
      });

      testCase.notIncludes.forEach(incl => {
        expect(resultArr.indexOf(incl)).eq(-1);
      });
    });
  });

  it('element theme', function() {
    themeElTestCases.forEach(testCase => {
      const bem = new ThemedBem(testCase.block);
      bem.useTheme(testCase.theme);
      const result = bem.element(testCase.elements, testCase.mods);
      const resultArr = result.split(' ');

      testCase.includes.forEach(incl => {
        const resEl = resultArr[resultArr.indexOf(incl)];

        expect(resEl).eq(incl);
      });

      testCase.notIncludes.forEach(incl => {
        expect(resultArr.indexOf(incl)).eq(-1);
      });
    });
  });
});
