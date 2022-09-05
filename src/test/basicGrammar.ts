/**
 * @description 抽象类语法基本回顾(不允许直接被实例化, 只能通过子类继承, 再进行实例化)
 * @abstract
 * @class Foo
 */
abstract class Foo {
  /**
   * @description
   * @private
   * @type {string}
   * @memberof Foo
   */
  private _id: string;

  /**
   * Creates an instance of Foo.
   * @param {string} id
   * @memberof Foo
   */
  constructor(id: string) {
    this._id = id;
  }

  /**
   * @description es6 的属性代理访问器, 有点类似于 Proxy/DefineProperty 下定义的 get 操作
   * @type {string}
   * @memberof Foo
   */
  public get id(): string {
    console.log(`someone want to get _id value`);
    return this._id;
  }

  /**
   * @description es6 的属性代理访问器, 有点类似于 Proxy/DefineProperty 下定义的 set 操作
   * @memberof Foo
   */
  public set id(id: string) {
    console.log(`someone want to modify _id value`);
    this._id = id;
  }
}

/**
 * @description 一个简单继承抽象类的测试
 * @class FooChild
 * @extends {Foo}
 */
class FooChild extends Foo {
  /**
   * @description static 修饰的变量只允许通过类直接访问, 或者静态函数
   * @static
   * @type {string}
   * @memberof FooChild
   */
  static readonly _version: string = "4412215324vs";

  /**
   * Creates an instance of FooChild.
   * @param {string} idValue
   * @memberof FooChild
   */
  constructor(idValue: string) {
    super(idValue);
  }

  /**
   * @description
   * @readonly
   * @static
   * @type {string}
   * @memberof FooChild
   */
  static get version(): string {
    console.log(`someone want to get version value`);
    return this._version;
  }

  /**
   * @description static 修饰的属性只属于类本身
   * @return {*}  {string}
   * @memberof FooChild
   */
  public getVersion(): string {
    return FooChild.version;
  }
}

/**
 * @description 导出测试
 * @export
 */
export function basicGrammarTest() {
  const instance: FooChild = new FooChild("4123asd3234");
  console.log(instance.getVersion());
  console.log(instance.id);
  console.log(FooChild.version);
  console.log(instance.getVersion() === FooChild.version);
}
