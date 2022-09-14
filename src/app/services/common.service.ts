import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
}) 

export class CommonService {
    public frames = [1,2,3,4,5,6,7,8,9,10,11,12];
    public frameDetailsMap = {};
}