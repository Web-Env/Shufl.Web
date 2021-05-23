import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupAlbumRatingDownloadModel } from "src/app/models/download-models/group-album-rating.model";
import { GroupAlbumRatingUploadModel } from "src/app/models/upload-models/group-album-rating.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-album-rate',
    templateUrl: './group-album-rate.component.html',
    styleUrls: [
        './group-album-rate.component.scss',
        '../../../../../../assets/scss/form.scss'
    ]
})
export class GroupAlbumRateComponent implements OnInit {
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
    groupAlbumId!: string;

    groupAlbumRating!: GroupAlbumRatingDownloadModel;
    
    rateGroupAlbumForm: FormGroup = new FormGroup({});

    constructor(formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<GroupAlbumRateComponent>,
                private dataService: DataService) {
        this.rateGroupAlbumForm = formBuilder.group({
            overallRating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
            lyricsRating: ['', [Validators.min(0), Validators.max(10)]],
            vocalsRating: ['', [Validators.min(0), Validators.max(10)]],
            instrumentalsRating: ['', [Validators.min(0), Validators.max(10)]],
            structureRating: ['', [Validators.min(0), Validators.max(10)]],
            comment: ['', [Validators.maxLength(1500)]]
        });
    }

    ngOnInit(): void {
        if (this.groupAlbumRating != null) {
            this.rateGroupAlbumForm.setValue({
                overallRating: this.groupAlbumRating.overallRating,
                lyricsRating: this.groupAlbumRating.lyricsRating,
                vocalsRating: this.groupAlbumRating.vocalsRating,
                instrumentalsRating: this.groupAlbumRating.instrumentalsRating,
                structureRating: this.groupAlbumRating.structureRating,
                comment: this.groupAlbumRating.comment
            });

            this.overallRatingPopulated = this.groupAlbumRating.overallRating != null;
            this.lyricsRatingPopulated = this.groupAlbumRating.lyricsRating != null;
            this.vocalsRatingPopulated = this.groupAlbumRating.vocalsRating != null;
            this.instrumentalsRatingPopulated = this.groupAlbumRating.instrumentalsRating != null;
            this.structureRatingPopulated = this.groupAlbumRating.structureRating != null;
        }
    }
    
    public changeInputState(inputName: string, active: boolean): void {
        if (inputName === 'overallRating') {
            this.overallRatingActive = active;
            this.overallRatingPopulated = this.rateGroupAlbumForm.controls[inputName].value !== '';
        }
        else if (inputName === 'lyricsRating') {
            this.lyricsRatingActive = active;
            this.lyricsRatingPopulated = this.rateGroupAlbumForm.controls[inputName].value !== '';
        }
        else if (inputName === 'vocalsRating') {
            this.vocalsRatingActive = active;
            this.vocalsRatingPopulated = this.rateGroupAlbumForm.controls[inputName].value !== '';
        }
        else if (inputName === 'instrumentalsRating') {
            this.instrumentalsRatingActive = active;
            this.instrumentalsRatingPopulated = this.rateGroupAlbumForm.controls[inputName].value !== '';
        }
        else if (inputName === 'structureRating') {
            this.structureRatingActive = active;
            this.structureRatingPopulated = this.rateGroupAlbumForm.controls[inputName].value !== '';
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
    
    public async rateGroupAlbumAsync(rateGroupAlbumFormData: any): Promise<void> {
        if (!this.isLoading && this.rateGroupAlbumForm.valid) {
            try {
                this.isLoading = true;
                this.formErrorMessageVisible = false;

                if (this.groupAlbumRating == null) {
                    var newGroupAlbumRating = new GroupAlbumRatingUploadModel(
                        this.groupId,
                        this.groupAlbumId,
                        rateGroupAlbumFormData['overallRating'],
                        rateGroupAlbumFormData['lyricsRating'],
                        rateGroupAlbumFormData['vocalsRating'],
                        rateGroupAlbumFormData['instrumentalsRating'],
                        rateGroupAlbumFormData['structureRating'],
                        rateGroupAlbumFormData['comment']
                    );
        
                    var createdGroupAlbumRating = await this.dataService.postAsync<GroupAlbumRatingDownloadModel>('GroupAlbumRating/Create', newGroupAlbumRating, GroupAlbumRatingDownloadModel);
    
                    if (createdGroupAlbumRating != null) {
                        this.dialogRef.close({data: createdGroupAlbumRating});
                    }
                }
                else {
                    var updateGroupAlbumRating = new GroupAlbumRatingUploadModel(
                        this.groupId,
                        this.groupAlbumId,
                        rateGroupAlbumFormData['overallRating'],
                        rateGroupAlbumFormData['lyricsRating'],
                        rateGroupAlbumFormData['vocalsRating'],
                        rateGroupAlbumFormData['instrumentalsRating'],
                        rateGroupAlbumFormData['structureRating'],
                        rateGroupAlbumFormData['comment']
                    );
                    updateGroupAlbumRating.groupAlbumRatingId = this.groupAlbumRating.id;
        
                    var updatedGroupAlbumRating = await this.dataService.postAsync<GroupAlbumRatingDownloadModel>('GroupAlbumRating/Edit', updateGroupAlbumRating, GroupAlbumRatingDownloadModel);
    
                    if (updatedGroupAlbumRating != null) {
                        this.dialogRef.close({data: updatedGroupAlbumRating});
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
