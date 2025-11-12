// Allow importing JS style modules from screens/styles/menu/* without TypeScript type errors
declare module '../styles/menu/*' {
  export const styles: any;
  const defaultExport: any;
  export default defaultExport;
}