type CssModuleObj = Record<string, string>;
type CssModuleOutput = { $: string };
type CssModuleFnOutput = { (): string };

type CssModuleCondition<M extends CssModuleObj> = (
  condition: unknown
) => CssModuleChain<M>;

type CssModuleClasses<M extends CssModuleObj> = {
  [key in keyof M]: CssModuleCallableChain<M>;
};

type CssModuleChain<M extends CssModuleObj> = CssModuleClasses<M> &
  CssModuleOutput &
  CssModuleFnOutput;
  
type CssModuleCallableChain<M extends CssModuleObj> = CssModuleChain<M> &
  CssModuleCondition<M>;

function ccn<M extends CssModuleObj>(mod: M): CssModuleClasses<M> {
  const classNames = new Set<string>();
  let latestClassName: string = "";

  function buildFinalClassName() {
    latestClassName && classNames.add(latestClassName);
    const finalName = Array.from(classNames)
      .map((cn) => mod[cn])
      .filter((cn) => !!cn)
      .join(" ");
    classNames.clear();
    latestClassName = "";
    return finalName;
  }

  function conditionFn(condition?: unknown) {
    if (arguments.length === 0) return buildFinalClassName();
    condition
      ? classNames.add(latestClassName)
      : classNames.delete(latestClassName);
    latestClassName = "";
    return chainProxy;
  }

  const handler: ProxyHandler<CssModuleCallableChain<M>> = {
    get(_, prop: string) {
      if (prop === "$") return buildFinalClassName();
      if (latestClassName) classNames.add(latestClassName);
      latestClassName = prop;
      return callableChainProxy;
    },
  };

  const callableChainProxy = new Proxy<CssModuleCallableChain<M>>(
    conditionFn as any,
    handler
  );
  const chainProxy = new Proxy<CssModuleChain<M>>(
    buildFinalClassName as any,
    handler
  );

  return new Proxy<CssModuleClasses<M>>(mod as any, {
    get: (_, prop: string) => {
      if (classNames.size > 0 || latestClassName) {
        throw new Error("Uncompleted class name chain");
      }

      latestClassName = prop;
      return callableChainProxy;
    },
  });
}

export default ccn;
