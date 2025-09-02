
import { useState } from "react";

import { Page } from "@/widgets/Page/Page";

const MainPage = () => {
    const [value, setValue] = useState('');
    const onChange = (val: string) => {
        setValue(val);
    }

    return (
        <Page >
            MAIN PAGE

        </Page>
    );
};

export default MainPage;