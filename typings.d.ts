declare module '*.css';
declare module '*.less';
declare module '*.png';
declare const baseUrl: string;
declare const imgPrefix: string;
declare const appName: string;
declare const appSecretkey: string;
declare const appNameSpace: string;
declare const CLODOP: any;
declare const getCLodop: any;
declare module '*.svg' {
  export function ReactComponent(
    props: React.SVGProps<SVGSVGElement>,
  ): React.ReactElement;
  const url: string;
  export default url;
}
