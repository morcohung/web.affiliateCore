  export async function importPage(filename: string) {
    return import(
      /* webpackChunkName: "[request]" */
      `@/pages/${filename}`
    );
  }
  
  export async function importLayout(filename: string) {
    return import(
      /* webpackChunkName: "[request]" */
      `@/layout/${filename}`
    );
  }
  