import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { DataService } from "src/app/services/data.service";

@Component({
    selector: 'app-verify',
    templateUrl: './verify.component.html',
    styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {
    isLoaded: boolean = false;
    isError: boolean = false;

    constructor(private route: ActivatedRoute,
                private dataService: DataService) { }

    async ngOnInit(): Promise<void> {
        var routeParams = this.route.snapshot.params;
        console.log (routeParams.token)
        console.log(routeParams)
        console.log()

        if (routeParams && Object.keys(routeParams).length !== 0 && 
            routeParams.constructor === Object && 
            routeParams.token !== null) {
                console.log (routeParams.token)
                try {
                    await this.dataService.postWithoutResponseAsync(`User/Verify?verificationIdentifier=${routeParams.token}`, {});
                    this.isLoaded = true;
                }
                catch (err) {
                    console.log(err)
                    this.isError = true;
                }
        }
    }

}
