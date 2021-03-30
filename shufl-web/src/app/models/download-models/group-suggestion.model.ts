import { Album } from "./album.model";
import { GroupSuggestionRating } from "./group-suggestion-rating.model";
import { User } from "./user.model";

export class GroupSuggestion {
    identifier!: string;
    isRandom!: boolean;
    album!: Album;
    groupSuggestionRatings!: Array<GroupSuggestionRating>;
    createdBy!: User;
    createdOn!: string;

    constructor() {}
}