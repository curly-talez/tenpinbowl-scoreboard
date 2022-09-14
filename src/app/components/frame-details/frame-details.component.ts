import { Component, Input, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
    selector: 'frame-details',
    templateUrl: './frame-details.component.html',
    styleUrls: ['./frame-details.component.scss']
})

export class FrameDetailsComponent implements OnInit {
    public frames: number[] = []
    public frameDetailsMap: any;
    @Input() public hideFrames: boolean = false;

    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.frames = this.commonService.frames;
        this.frameDetailsMap = this.commonService.frameDetailsMap;
    }

    
}