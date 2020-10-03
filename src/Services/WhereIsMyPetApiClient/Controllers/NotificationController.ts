import BaseController from "./BaseController";
import $WhereIsMyPetApiClient from "../WhereIsMyPetApiClient";

export interface INotification {
    user_id: number;
    message: string;
    link: string;
    read: boolean;
    id: number;
    publication_date: string;
}

class NotificationController extends BaseController {

    public GetNotifications () {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return null;
        }
        return this.makeRequest<INotification[]>({
            method: "GET",
            url: "/notifications"
        });
    };

    public UpdateNotification (id: number) {
        const token = $WhereIsMyPetApiClient.getToken();

        if (!token) {
            return null;
        }
        return this.makeRequest<void>({
            method: "PATCH",
            url: `/notifications/${id}`,
            params: { 
                read: true
            },
        });
    };
}

export default NotificationController;