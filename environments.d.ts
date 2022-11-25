declare global {
    namespace NodeJS {
      interface ProcessEnv {
        ENDPOINT_BASE_URL: string;
        NODE_ENV: string;
      }
    }
  }
  
  // If this file has no import/export statements (i.e. is a script)
  // convert it into a module by adding an empty export statement.
  export {}