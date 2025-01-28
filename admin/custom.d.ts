declare module '@strapi/design-system/*';
declare module '@strapi/design-system';
declare module '*.module.css' {
  const classes: Record<string, string>
  export default classes;
}