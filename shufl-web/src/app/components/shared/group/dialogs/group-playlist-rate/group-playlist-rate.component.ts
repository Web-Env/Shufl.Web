import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { GroupPlaylistRatingDownloadModel } from "src/app/models/download-models/group-playlist-rating.model";
import { GroupPlaylistRatingUploadModel } from "src/app/models/upload-models/group-playlist-rating.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-playlist-rate',
    templateUrl: './group-playlist-rate.component.html',
    styleUrls: [
        './group-playlist-rate.component.scss',
        '../../../../../../assets/scss/form.scss'
    ]
})
export class GroupPlaylistRateComponent implements OnInit {
    isLoading: boolean = false;
    
    overallRatingActive: boolean = false;
    overallRatingPopulated: boolean = false;

    commentActive: boolean = false;

    formErrorMessage: string = "";
    formErrorMessageVisible: boolean = false;

    groupId!: string;
    groupPlaylistId!: string;

    groupPlaylistRating!: GroupPlaylistRatingDownloadModel;
    
    rateGroupPlaylistForm: FormGroup = new FormGroup({});

    constructor(formBuilder: FormBuilder,
                private dialogRef: MatDialogRef<GroupPlaylistRateComponent>,
                private dataService: DataService) {
        this.rateGroupPlaylistForm = formBuilder.group({
            overallRating: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
            comment: ['', [Validators.maxLength(1500)]]
        });
    }

    ngOnInit(): void {
        if (this.groupPlaylistRating != null) {
            this.rateGroupPlaylistForm.setValue({
                overallRating: this.groupPlaylistRating.overallRating,
                comment: this.groupPlaylistRating.comment
            });

            this.overallRatingPopulated = this.groupPlaylistRating.overallRating != null;
        }
    }
    
    public changeInputState(inputName: string, active: boolean): void {
        if (inputName === 'overallRating') {
            this.overallRatingActive = active;
            this.overallRatingPopulated = this.rateGroupPlaylistForm.controls[inputName].value !== '';
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
    
    public async rateGroupPlaylistAsync(rateGroupPlaylistFormData: any): Promise<void> {
        if (!this.isLoading && this.rateGroupPlaylistForm.valid) {
            try {
                this.isLoading = true;
                this.formErrorMessageVisible = false;

                if (this.groupPlaylistRating == null) {
                    var newGroupPlaylistRating = new GroupPlaylistRatingUploadModel(
                        this.groupId,
                        this.groupPlaylistId,
                        rateGroupPlaylistFormData['overallRating'],
                        rateGroupPlaylistFormData['comment']
                    );
        
                    var createdGroupPlaylistRating = await this.dataService.postAsync<GroupPlaylistRatingDownloadModel>('GroupPlaylistRating/Create', newGroupPlaylistRating, GroupPlaylistRatingDownloadModel);
    
                    if (createdGroupPlaylistRating != null) {
                        this.dialogRef.close({data: createdGroupPlaylistRating});
                    }
                }
                else {
                    var updateGroupPlaylistRating = new GroupPlaylistRatingUploadModel(
                        this.groupId,
                        this.groupPlaylistId,
                        rateGroupPlaylistFormData['overallRating'],
                        rateGroupPlaylistFormData['comment']
                    );
                    updateGroupPlaylistRating.groupPlaylistRatingId = this.groupPlaylistRating.id;
        
                    var updatedGroupPlaylistRating = await this.dataService.postAsync<GroupPlaylistRatingDownloadModel>('GroupPlaylistRating/Edit', updateGroupPlaylistRating, GroupPlaylistRatingDownloadModel);
    
                    if (updatedGroupPlaylistRating != null) {
                        this.dialogRef.close({data: updatedGroupPlaylistRating});
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
