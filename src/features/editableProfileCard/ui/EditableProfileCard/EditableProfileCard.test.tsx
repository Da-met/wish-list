import { fireEvent, screen } from '@testing-library/react';
import { ComponentRender } from "@/shared/lib/tests/componentRender/ComponentRender"
import { EditableProfileCard } from "./EditableProfileCard"
import { Profile } from "@/entities/Profile";
import { profileReducer } from "@/features/editableProfileCard/model/slice/profileSlice";
import userEvent from '@testing-library/user-event';




const profile: Profile = {
    id: 1,
    name: 'Admin',
    email: 'admin@yandex.ru',
};

const options = {
    initialState: {
        profile: {
            readonly: true,
            data: profile,
            form: profile,
        },
        user: {
            authData: { id: 1, name: 'Admin' },
        },
    },
    asyncReducers: {
        profile: profileReducer,
    },
};

describe('features/EditableProfileCard', () => {
    test('Режим рид онли должен переключиться', async () => {
        ComponentRender(<EditableProfileCard id="1" />, options);
        await userEvent.click(screen.getByTestId('EditableProfileCardHeader.EditButton'));
        expect(screen.getByTestId('EditableProfileCardHeader.CancelButton')).toBeInTheDocument();
    });
})