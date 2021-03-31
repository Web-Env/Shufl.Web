import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GroupSuggestionRating } from "src/app/models/download-models/group-suggestion-rating.model";
import { GroupSuggestion } from "src/app/models/download-models/group-suggestion.model";
import { GroupSuggestionRatingUploadModel } from "src/app/models/upload-models/group-suggestion-rating.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-suggestion-rate',
    templateUrl: './group-suggestion-rate.component.html',
    styleUrls: [
        './group-suggestion-rate.component.scss',
        '../../../../../../assets/scss/form.scss'
    ]
})
export class GroupSuggestionRateComponent implements OnInit {
    isLoading: boolean = false;
    
    overallRatingActive: boolean = false;
    overallRatingPopulated: boolean = false;

    lyricsRatingActive: boolean = false;
    lyricsRatingPopulated: boolean = false;

    vocalsRatingActive: boolean = false;
    vocalsRatingPopulated: boolean = false;

    instrumentalsRatingActive: boolean = false;
    instrumentalsRatingPopulated: boolean = false;

    compositionRatingActive: boolean = false;
    compositionRatingPopulated: boolean = false;

    formErrorMessage: string = "";
    formErrorMessageVisible: boolean = false;

    groupId!: string;
    groupSuggestionId!: string;
    
    rateGroupSuggestionForm: FormGroup = new FormGroup({});

    constructor(formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<GroupSuggestionRateComponent>,
                private dataService: DataService) {
        this.rateGroupSuggestionForm = formBuilder.group({
            overallRating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
            lyricsRating: ['', [Validators.min(0), Validators.max(10)]],
            vocalsRating: ['', [Validators.min(0), Validators.max(10)]],
            instrumentalsRating: ['', [Validators.min(0), Validators.max(10)]],
            compositionRating: ['', [Validators.min(0), Validators.max(10)]]
        });
    }

    ngOnInit(): void {}
    
    public changeInputState(inputName: string, active: boolean): void {
        if (inputName === 'overallRating') {
            this.overallRatingActive = active;
            this.overallRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
        else if (inputName === 'lyricsRating') {
            this.lyricsRatingActive = active;
            this.lyricsRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
        else if (inputName === 'vocalsRating') {
            this.vocalsRatingActive = active;
            this.vocalsRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
        else if (inputName === 'instrumentalsRating') {
            this.instrumentalsRatingActive = active;
            this.instrumentalsRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
        else if (inputName === 'compositionRating') {
            this.compositionRatingActive = active;
            this.compositionRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
    }
    
    public async rateGroupSuggestionAsync(createGroupFormData: any): Promise<void> {
        if (!this.isLoading) {
            try {
                this.isLoading = true;
                this.formErrorMessageVisible = false;

                var newGroup = new GroupSuggestionRatingUploadModel(
                    this.groupId,
                    this.groupSuggestionId,
                    createGroupFormData['overallRating'],
                    createGroupFormData['lyricsRating'],
                    createGroupFormData['vocalsRating'],
                    createGroupFormData['instrumentalsRating'],
                    createGroupFormData['compositionRating'],
                    ""
                );
    
                var groupSuggestionRating = await this.dataService.postAsync<GroupSuggestionRating>('GroupSuggestionRating/Create', newGroup, GroupSuggestionRating);

                if (groupSuggestionRating != null) {
                    this.dialogRef.close({data: groupSuggestionRating});
                }
            }
            catch (err) {
                console.log(err);
                this.formErrorMessage = 'An unexpected error occured, please try again';
                this.formErrorMessageVisible = true;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}
