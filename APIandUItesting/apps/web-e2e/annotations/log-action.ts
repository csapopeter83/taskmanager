export function LogAction<This, Args extends unknown[], Return>(
  target: (this: This, ...args: Args) => Promise<Return>,
  context: ClassMethodDecoratorContext<This, (this: This, ...args: Args) => Promise<Return>>
) {
  return async function (this: This, ...args: Args): Promise<Return> {
    const actionName = String(context.name);
    console.log(`[LOG] Művelet indul: ${actionName} arguments: ${JSON.stringify(args)}`);
    try {
      const result = await target.call(this, ...args);
      console.log(`[LOG] sikeresen lefutott: ${actionName}`);
      return result;
    } catch (error) {
      console.error(`[LOG] Hiba történt itt: ${actionName}`, error);
      throw error;
    }
  };
}
