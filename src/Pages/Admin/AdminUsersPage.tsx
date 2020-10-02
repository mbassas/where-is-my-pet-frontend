import React from "react";
import $WhereIsMyPetApiClient from "../../Services/WhereIsMyPetApiClient/WhereIsMyPetApiClient";
import { IUser } from "../../Services/WhereIsMyPetApiClient/Controllers/UserController";
import { Snackbar } from "@material-ui/core";
import MaterialTable from "material-table";
import { Alert } from "@material-ui/lab";

function AdminUsersPage() {
    const [users, setUsers] = React.useState<IUser[]>();
    const [isLoading, setIsLoading] = React.useState(true);
    const [toastMessage, setToastMessage] = React.useState("");

    async function loadUsers() {
        try {
            setIsLoading(true);
            const { data } = await $WhereIsMyPetApiClient.Users.GetUsersByStatus(["Suspicious"]);
            setUsers(data);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }
    React.useEffect(() => {
        loadUsers();
    }, []);

    async function changeUserStatus(userId: number, status: string, user: IUser) {
        try {
            setIsLoading(true);
            await $WhereIsMyPetApiClient.Users.UpdateUser(userId, { status });
            await loadUsers();
            setToastMessage(`User ${user.username} is now ${status}`);
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    }


    return (
        <div style={{ width: "100%" }}>
            <Snackbar 
                open={toastMessage !== ""}
                autoHideDuration={3000}
                onClose={() => setToastMessage("")}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={() => setToastMessage("")} severity="success">
                    {toastMessage}
                </Alert>
            </Snackbar>
            <MaterialTable
                isLoading={isLoading}
                columns={[
                    { title: 'Username', field: 'username' },
                    { title: 'Status', field: 'status' }
                ]}
                actions={[
                    {
                        icon: 'sentiment_satisfied_alt',
                        tooltip: 'Mark user as Trusted',
                        onClick: (e, row) => {
                            // @ts-ignore
                            changeUserStatus(row.id, "Trusted", row)
                        }
                    },
                    {
                        icon: 'sentiment_very_dissatisfied',
                        tooltip: 'Mark user as Banned',
                        onClick: async (e, row) => {
                            // @ts-ignore
                            changeUserStatus(row.id, "Banned", row)
                        }
                    }
                ]}
                localization={{
                    header: {
                        actions: 'Mark user status'
                    }
                }}
                data={users || []}
                title="Users"
                options={{
                    draggable: false,
                    sorting: false,
                    paging: false,
                    search: false,
                    actionsColumnIndex: -1
                }}
            />
        </div>
    )
};

export default AdminUsersPage;