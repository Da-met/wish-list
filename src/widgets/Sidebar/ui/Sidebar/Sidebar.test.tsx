import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from './Sidebar';
import { ComponentRender } from 'shared/lib/tests/componentRender/ComponentRender';


describe('Sidebar', () => {
    test('test', () => {
        ComponentRender(<Sidebar/>)
        expect(screen.getByTestId('sidebar')).toBeInTheDocument();
    });

    test('test toggle', () => {
        ComponentRender(<Sidebar/>);
        // const toggleBtn = screen.getByTestId('sidebar-toggle');
        // expect(screen.getByTestId('sidebar')).toBeInTheDocument();
        // fireEvent.click(toggleBtn);
        expect(screen.getByTestId('sidebar')).toHaveClass('collapsed');
    });
})