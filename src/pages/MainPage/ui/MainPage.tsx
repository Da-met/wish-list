import { Counter } from "entities/Counter";
import { useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";
import { ListBox } from "shared/ui/ListBox/ListBox";
import { Page } from "widgets/Page/Page";

const MainPage = () => {
    const [value, setValue] = useState('');
    const onChange = (val: string) => {
        setValue(val);
    }

    return (
        <Page >
            MAIN PAGE
            {/* <Counter></Counter> */}
            {/* <Input
                placeholder={"Введите имя"}
                value={value}
                onChange={onChange}
            /> */}
            {/* <div >
                <Button theme={ButtonTheme.OUTLINE} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.CLEAR} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.BACKGROUND} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.BACKGROUND_INVERTED} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.X} >какая-то кнопка</Button> 
            </div> */}
            <ListBox 
                defaultValue={'Выберите значение'}
                onChange={(value: string) => {}}
                value={undefined}
                // readonly={true}
                items={[
                    {value: '1', content: 'dp[ps fpsd'},
                    {value: '2', content: 'dp  sfgfhgfpsd'},
                    {value: '3', content: 'dp[psfpe55 dty sd'},
                ]}
            />
            
        </Page>
    );
};

export default MainPage;