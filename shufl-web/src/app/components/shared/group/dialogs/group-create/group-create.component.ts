import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material/dialog";
import { Router } from "@angular/router";
import { GroupUploadModel } from "src/app/models/upload-models/group.model";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-group-create',
    templateUrl: './group-create.component.html',
    styleUrls: ['../../../../../../assets/scss/form.scss']
})
export class GroupCreateComponent implements OnInit {
    isLoading: boolean = false;
    groupNameActive: boolean = false;
    groupNamePopulated: boolean = false;
    formErrorMessage: string = "";
    formErrorMessageVisible: boolean = false;
    
    createGroupForm!: FormGroup;

    constructor(private dialogRef: MatDialogRef<GroupCreateComponent>,
                private formBuilder: FormBuilder,
                private router: Router,
                private dataService: DataService) { }

    ngOnInit(): void {
        this.buildForm();

        this.createGroupForm.setValue({
            groupName: ''
        });
    }

    public buildForm(): void {
        this.createGroupForm = this.formBuilder.group({
            groupName: ['', [Validators.required]],
        });
    }
    
    public changeInputState(input: NgModel, active: boolean): void {
        if (input.name === 'groupName') {
            this.groupNameActive = active;
            this.groupNamePopulated = input.value !== '';
        }
    }

    public async createGroupAsync(createGroupFormData: any): Promise<void> {
        if (!this.isLoading) {
            try {
                this.isLoading = true;
                this.formErrorMessageVisible = false;

                var newGroup = new GroupUploadModel(
                    createGroupFormData['groupName'],
                    true
                );
    
                var groupIdentifier = await this.dataService.postWithStringResponseAsync('Group/Create', newGroup);

                if (groupIdentifier != null && groupIdentifier !== '') {
                    this.dialogRef.close();
                    this.router.navigate([`/group/${groupIdentifier}`]);
                }
            }
            catch (err) {
                this.formErrorMessage = 'An unexpected error occured, please try again';
                this.formErrorMessageVisible = true;
                throw err;
            }
        }
    }

}
