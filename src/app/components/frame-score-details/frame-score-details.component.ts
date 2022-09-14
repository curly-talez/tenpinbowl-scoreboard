import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
    selector: 'frame-score-details',
    templateUrl: './frame-score-details.component.html',
    styleUrls: ['./frame-score-details.component.scss']
})

export class FrameScoreDetailsComponent implements OnInit {
    public frames: number[] = [];
    public frameDetailsMap: any;

    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.frames = this.commonService.frames;
        this.frameDetailsMap = this.commonService.frameDetailsMap;
    }
}