export class NavBarItem {
    icon!: string;
    title!: string;
    url!: string;

    constructor(
        icon: string,
        title: string,
        url: string
    ) {
        this.icon = icon;
        this.title = title;
        this.url = url;
    }
}