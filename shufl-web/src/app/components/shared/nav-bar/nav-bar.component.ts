import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscriber } from 'rxjs/internal/Subscriber';

import { NavBarItem } from 'src/app/models/view-models/nav-bar-item.model';

@Component({
    selector: 'app-nav-bar',
    templateUrl: './nav-bar.component.html',
    styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
    homeItem: NavBarItem = new NavBarItem('home', 'Home', '');
    homeActive: boolean = false;

    searchItem: NavBarItem = new NavBarItem('search', 'Search', '');
    searchActive: boolean = false;

    groupsItem: NavBarItem = new NavBarItem('groups', 'Groups', 'group/woebtouh');
    groupsActive: boolean = false;

    userItem: NavBarItem = new NavBarItem('user', 'Account', '');
    userActive: boolean = false;

    routeChangeSubscriber: Subscriber<Event> = Subscriber.create(
        (ev) => {
            if (ev instanceof NavigationEnd) {
                this.processRouteChange(ev.urlAfterRedirects);
            }
        }
    )

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.setupRouteListener();
    }

    private setupRouteListener(): void {
        this.router.events._subscribe(this.routeChangeSubscriber);
    }

    private processRouteChange(url: string) {
        if (url === '/') {
            if (!this.homeActive) {
                this.resetActiveItems();
            }

            this.homeActive = true;
        }
        else if (this.isSearchUrl(url)) {
            if (!this.searchActive) {
                this.resetActiveItems();
            }

            this.searchActive = true;
        }
        else if (this.isGroupsUrl(url)) {
            if (!this.groupsActive) {
                this.resetActiveItems();
            }

            this.groupsActive = true;
        }
        else if (url === '/user') {
            if (!this.userActive) {
                this.resetActiveItems();
            }

            this.userActive = true;
        }
        else {
            this.resetActiveItems();
        }
    }

    private isSearchUrl(url: string): boolean {
        var extractedUrl = url.match(/(\/[\w+-]+)/g);
        if (extractedUrl !== null && extractedUrl.length !== 0) {
            url = extractedUrl[0];
            if (url === '/search' || url === '/artist' || url === '/album' || url === '/track') {
                return true;
            }
        }

        return false;
    }

    private isGroupsUrl(url: string): boolean {
        var extractedUrl = url.match(/(\/[\w+-]+)/g);
        if (extractedUrl !== null && extractedUrl.length !== 0) {
            url = extractedUrl[0];
            if (url === '/groups' || url === '/group') {
                return true;
            }
        }

        return false;
    }

    private resetActiveItems(): void {
        this.homeActive = false;
        this.searchActive = false;
        this.groupsActive = false;
        this.userActive = false;
    }
}
