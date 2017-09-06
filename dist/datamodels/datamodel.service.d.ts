import { Observable } from "rxjs";
export declare class DataModelService {
    constructor();
    setup(): void;
    init(): void;
    update(): void;
    onUpdateScope(): Observable<any>;
    updateScope(): void;
    destroy(): void;
}
