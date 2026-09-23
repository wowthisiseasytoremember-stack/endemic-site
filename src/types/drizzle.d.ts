declare module "drizzle-orm" {
  export const sql: any;
  export const eq: any;
  export const and: any;
  export const or: any;
  export const not: any;
  export const desc: any;
  export const asc: any;
}

declare module "drizzle-orm/node-postgres" {
  export const drizzle: any;
}

declare module "drizzle-orm/pg-core" {
  export const pgTable: any;
  export const text: any;
  export const timestamp: any;
  export const uuid: any;
  export const varchar: any;
  export const integer: any;
  export const jsonb: any;
  export const boolean: any;
}
