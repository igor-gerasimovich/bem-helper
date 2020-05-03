let defaultElementDivider = '__';
let defaultModifierDivider = '--';
let defaultThemeDivider = '__';

type BlockName = string[] | string;
type ElementName = string[] | string;
type ModifierName = string[] | string;

class Bem {
  private blockNames: string[];
  private readonly elDivider: string;
  private readonly modDivider: string;

  constructor(
    blockClassName: BlockName,
    elDivider?: string,
    modDivider?: string,
  ) {
    this.blockNames = Array.isArray(blockClassName) ? blockClassName : [blockClassName];
    this.elDivider = elDivider === undefined ? defaultElementDivider : elDivider;
    this.modDivider = modDivider === undefined ? defaultModifierDivider : modDivider;
  }

  public block(modifier?: ModifierName): string {
    return this.blockArr(modifier).join(' ');
  }

  protected blockArr(modifier?: ModifierName): string[] {
    const {
      blockNames,
    } = this;

    if (!modifier) {
      return blockNames;
    }

    const modifiers = Bem.arr(modifier);

    return Bem.mergeArrayElements(blockNames, modifiers, this.modDivider, true);
  }

  public element(element: ElementName, modifier?: ModifierName): string {
    return this.elementArr(element, modifier).join(' ');
  }

  protected elementArr(element: ElementName, modifier?: ModifierName): string[] {
    const {
      blockNames,
    } = this;

    const elements = Bem.arr(element);
    const elementClasses = Bem.mergeArrayElements(blockNames, elements, this.elDivider, false);

    if (!modifier) {
      return elementClasses;
    }

    const modifiers = Bem.arr(modifier);
    return Bem.mergeArrayElements(elementClasses, modifiers, this.modDivider, true);
  }

  // private part

  private static arr(data: string | string[]): string[] {
    return Array.isArray(data) ? data : [data];
  }

  private static mergeArrayElements(firstPart: string[], secondPart: string[], delimiter: string, withBaseArr: boolean) {
    // Why double for + push: https://jsperf.com/test-concat-spread/9
    // Why template string: https://jsperf.com/string-plus-string-concat-template-string

    let results = withBaseArr ? firstPart.slice() : [];

    let firstPartLen = firstPart.length;
    let secondPartLen = secondPart.length;

    for (let i = 0; i < firstPartLen; i++) {
      for (let j = 0; j < secondPartLen; j++) {
        results.push(`${firstPart[i]}${delimiter}${secondPart[j]}`)
      }
    }

    return results;
  }
}

class ThemedBem extends Bem {
  private themeDivider?: string;
  private currentTheme?: string;

  constructor(
    blockClassName: BlockName,
    elDivider?: string,
    modDivider?: string,
    themeDivider?: string,
  ) {
    super(blockClassName, elDivider, modDivider);

    this.themeDivider = themeDivider === undefined ? defaultThemeDivider : themeDivider;
  }

  public useTheme(theme?: string) {
    this.currentTheme = theme;
  }

  public block(modifier?: ModifierName): string {
    const classList = super.blockArr(modifier);

    if (!this.currentTheme) {
      return classList.join(' ');
    }

    return this.addThemePrefix(classList).join(' ');
  }

  public element(element: ElementName, modifier?: ModifierName): string {
    const classList = super.elementArr(element, modifier);

    if (!this.currentTheme) {
      return classList.join(' ');
    }

    return this.addThemePrefix(classList).join(' ');
  }

  private addThemePrefix(classList: string[]): string[] {
    return classList
      .map((className) => `${this.currentTheme}${this.themeDivider}${className}`)
      .concat(classList);
  }
}

export {
  // Main class
  Bem,
  ThemedBem,

  // Base types
  BlockName,
  ElementName,
};
