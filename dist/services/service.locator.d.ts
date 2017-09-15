import { DataModelService } from "../datamodels/datamodel.service";
export declare class ServiceLocator {
    get(name: string, args: any): DataModelService;
}
