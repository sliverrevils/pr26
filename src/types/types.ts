export type ISvg = React.FC<React.SVGProps<SVGSVGElement>>;

export type IResultType = "success" | "warning" | "error";
export interface IActionResult {
    type: IResultType;
    message: string;
}
