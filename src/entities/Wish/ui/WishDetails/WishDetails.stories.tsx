import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { Wish } from 'entities/Wish';
import { WishDetails } from './WishDetails';


export default {
    title: 'entities/WishDetails',
    component: WishDetails,
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as ComponentMeta<typeof WishDetails>;

const Template: ComponentStory<typeof WishDetails> = (args) => <WishDetails {...args} />;

const wish: Wish = {
    id: 1,
    name: 'Кольцо Кони Лунарум',
    description: 'Конь символизирует богатство домашнего очага, символ семейного счастья, большой и дружной семьи.',
    img: 'f14f4340-0e9f-4268-a4a6-6209f0624b8b.jpg',
    url: 'https://vk.com/market/product/koltso-koni-lunarum-187012916-9660484',
    is_reserved: false,

    createdAt: '26.02.2022',
    user_id: 1,
    user: {
        img: 'data:image/jpeg;base64,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',
        name: 'Admin',
    }
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [StoreDecorator({
    wishDetails: {
        data: wish,
    },
})];

export const Loading = Template.bind({});
Loading.args = {};
Loading.decorators = [StoreDecorator({
    wishDetails: {
        isLoading: true,
    },
})];

export const Error = Template.bind({});
Error.args = {};
Error.decorators = [StoreDecorator({
    wishDetails: {
        error: 'error',
    },
})];
