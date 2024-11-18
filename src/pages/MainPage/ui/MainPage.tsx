import { Counter } from "entities/Counter";
import { useState } from "react";
import { Button, ButtonTheme } from "shared/ui/Button/Button";
import { Input } from "shared/ui/Input/Input";

const MainPage = () => {
    const [value, setValue] = useState('');
    const onChange = (val: string) => {
        setValue(val);
    }

    return (
        <div >
            MAIN PAGE
            {/* <Counter></Counter> */}
            <Input
                placeholder={"Введите имя"}
                value={value}
                onChange={onChange}
            />
            <div >
                <Button theme={ButtonTheme.OUTLINE} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.CLEAR} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.BACKGROUND} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.BACKGROUND_INVERTED} >какая-то кнопка</Button>
                <Button theme={ButtonTheme.X} >какая-то кнопка</Button>

            </div>
            
        </div>
    );
};

export default MainPage;