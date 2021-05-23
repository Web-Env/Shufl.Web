import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupSuggestionRatingDownloadModel } from "src/app/models/download-models/group-suggestion-rating.model";
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

    structureRatingActive: boolean = false;
    structureRatingPopulated: boolean = false;

    commentActive: boolean = false;

    formErrorMessage: string = "";
    formErrorMessageVisible: boolean = false;

    groupId!: string;
    groupSuggestionId!: string;

    groupSuggestionRating!: GroupSuggestionRatingDownloadModel;
    
    rateGroupSuggestionForm: FormGroup = new FormGroup({});

    constructor(formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<GroupSuggestionRateComponent>,
                private dataService: DataService) {
        this.rateGroupSuggestionForm = formBuilder.group({
            overallRating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
            lyricsRating: ['', [Validators.min(0), Validators.max(10)]],
            vocalsRating: ['', [Validators.min(0), Validators.max(10)]],
            instrumentalsRating: ['', [Validators.min(0), Validators.max(10)]],
            structureRating: ['', [Validators.min(0), Validators.max(10)]],
            comment: ['', [Validators.maxLength(1500)]]
        });
    }

    ngOnInit(): void {
        if (this.groupSuggestionRating != null) {
            this.rateGroupSuggestionForm.setValue({
                overallRating: this.groupSuggestionRating.overallRating,
                lyricsRating: this.groupSuggestionRating.lyricsRating,
                vocalsRating: this.groupSuggestionRating.vocalsRating,
                instrumentalsRating: this.groupSuggestionRating.instrumentalsRating,
                structureRating: this.groupSuggestionRating.structureRating,
                comment: this.groupSuggestionRating.comment
            });

            this.overallRatingPopulated = this.groupSuggestionRating.overallRating != null;
            this.lyricsRatingPopulated = this.groupSuggestionRating.lyricsRating != null;
            this.vocalsRatingPopulated = this.groupSuggestionRating.vocalsRating != null;
            this.instrumentalsRatingPopulated = this.groupSuggestionRating.instrumentalsRating != null;
            this.structureRatingPopulated = this.groupSuggestionRating.structureRating != null;
        }
    }
    
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
        else if (inputName === 'structureRating') {
            this.structureRatingActive = active;
            this.structureRatingPopulated = this.rateGroupSuggestionForm.controls[inputName].value !== '';
        }
        else if (inputName === 'comment') {
            this.commentActive = active;
        }
    }

    public validateRating(event: any): void {
        if (event.target.value.length >= 3 || parseInt(event.target.value) === 0 || parseInt(event.target.value) === 10) {
            event.preventDefault();
        }
    }
    
    public async rateGroupSuggestionAsync(rateGroupSuggestionFormData: any): Promise<void> {
        if (!this.isLoading && this.rateGroupSuggestionForm.valid) {
            try {
                this.isLoading = true;
                this.formErrorMessageVisible = false;

                if (this.groupSuggestionRating == null) {
                    var newGroupSuggestionRating = new GroupSuggestionRatingUploadModel(
                        this.groupId,
                        this.groupSuggestionId,
                        rateGroupSuggestionFormData['overallRating'],
                        rateGroupSuggestionFormData['lyricsRating'],
                        rateGroupSuggestionFormData['vocalsRating'],
                        rateGroupSuggestionFormData['instrumentalsRating'],
                        rateGroupSuggestionFormData['structureRating'],
                        rateGroupSuggestionFormData['comment']
                    );
        
                    var createdGroupSuggestionRating = await this.dataService.postAsync<GroupSuggestionRatingDownloadModel>('GroupSuggestionRating/Create', newGroupSuggestionRating, GroupSuggestionRatingDownloadModel);
    
                    if (createdGroupSuggestionRating != null) {
                        this.dialogRef.close({data: createdGroupSuggestionRating});
                    }
                }
                else {
                    var updateGroupSuggestionRating = new GroupSuggestionRatingUploadModel(
                        this.groupId,
                        this.groupSuggestionId,
                        rateGroupSuggestionFormData['overallRating'],
                        rateGroupSuggestionFormData['lyricsRating'],
                        rateGroupSuggestionFormData['vocalsRating'],
                        rateGroupSuggestionFormData['instrumentalsRating'],
                        rateGroupSuggestionFormData['structureRating'],
                        rateGroupSuggestionFormData['comment']
                    );
                    updateGroupSuggestionRating.groupSuggestionRatingId = this.groupSuggestionRating.id;
        
                    var updatedGroupSuggestionRating = await this.dataService.postAsync<GroupSuggestionRatingDownloadModel>('GroupSuggestionRating/Edit', updateGroupSuggestionRating, GroupSuggestionRatingDownloadModel);
    
                    if (updatedGroupSuggestionRating != null) {
                        this.dialogRef.close({data: updatedGroupSuggestionRating});
                    }
                }
            }
            catch (err) {
                this.formErrorMessage = 'An unexpected error occured, please try again';
                this.formErrorMessageVisible = true;
                throw err;
            }
            finally {
                this.isLoading = false;
            }
        }
    }

}
