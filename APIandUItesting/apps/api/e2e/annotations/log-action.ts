function LocAction(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
        console.log(`[LOG] Művelet indul: ${propertyKey} arguments: ${JSON.stringify(args)}`)
        try {
            const result = await originalMethod.apply(this, args);
            console.log(`[LOG] sikeresen lefutott: ${propertyKey}`);
            return result;
        } catch (error) {
            console.error(`[LOG] Hiba történt itt: ${propertyKey}`, error);
            throw error;
        }
    }

    return descriptor;
}