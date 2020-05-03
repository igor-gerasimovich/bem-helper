let elementDivider = '__';
let modifierDivider = '--';

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
    this.elDivider = elDivider === undefined ? elementDivider : elDivider;
    this.modDivider = modDivider === undefined ? modifierDivider : modDivider;
  }

  public block(modifier?: ModifierName): string {
    const {
      blockNames,
    } = this;

    if (!modifier) {
      return blockNames.join(' ');
    }

    const modifiers = Bem.arr(modifier);

    return Bem.concatArrayElements(blockNames, modifiers, this.modDivider, true).join(' ');
  }

  public element(element: ElementName, modifier?: ModifierName): string {
    const {
      blockNames,
    } = this;

    const elements = Bem.arr(element);
    const elementClasses = Bem.concatArrayElements(blockNames, elements, this.elDivider, false);

    if (!modifier) {
      return elementClasses.join(' ');
    }

    const modifiers = Bem.arr(modifier);
    const withModifiers = Bem.concatArrayElements(elementClasses, modifiers, this.modDivider, true);

    return withModifiers.join(' ');
  }

  // private part

  private static arr(data: string | string[]): string[] {
    return Array.isArray(data) ? data : [data];
  }

  private static concatArrayElements(firstPart: string[], secondPart: string[], delimiter: string, withBaseArr: boolean) {
    // Why forEach + push: https://jsperf.com/test-concat-spread
    // Why template string: https://jsperf.com/string-plus-string-concat-template-string

    let results = [];

    firstPart.forEach((block) => {
      secondPart.forEach((element) => {
        results.push(`${block}${delimiter}${element}`)
      });
    });

    if (withBaseArr) {
      return firstPart.concat(results);
    }

    return results;
  }
}

export {
  // Main class
  Bem,

  // Base types
  BlockName,
  ElementName,
};
