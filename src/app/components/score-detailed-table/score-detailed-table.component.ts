import { Component, OnInit } from "@angular/core";
import { CommonService } from "../services/common.service";

@Component({
    selector: 'score-details-table',
    templateUrl: './score-details-table.component.html',
    styleUrls: ['./score-details-table.component.scss']
})

export class ScoreDetailsTableComponent implements OnInit {
    public frames: number[] = [];
    public frameDetailsMap: any;

    constructor(private commonService: CommonService) {}

    ngOnInit(): void {
        this.frames = this.commonService.frames;
        this.frameDetailsMap = this.commonService.frameDetailsMap;
    }
}