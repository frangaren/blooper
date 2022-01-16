export interface Step {
    uuid: string;
    type: string;
};

export type Steps = Step[];

export interface ClickStep extends Step {
    type: "click";
    target: string;
};

export interface InputStep extends Step {
    type: "input";
    target: string;
    value: string;
};
